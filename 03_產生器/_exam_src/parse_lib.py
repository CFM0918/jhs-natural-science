# -*- coding: utf-8 -*-
"""解析歷屆會考 PDF：自然科答案(表格,用座標避免欄位錯位) + 題本文字(拆題)。"""
import pypdf, pdfplumber, re, os

HERE = os.path.dirname(os.path.abspath(__file__))

def _cluster_rows(words, tol=5):
    """依 top 座標做真正的鄰近聚類分列（避免固定格距誤差累積導致跨列錯位）。"""
    ws = sorted(words, key=lambda w: w['top'])
    rows = []
    cur = []
    cur_top = None
    for w in ws:
        if cur_top is None or abs(w['top'] - cur_top) <= tol:
            cur.append(w); cur_top = w['top'] if cur_top is None else cur_top
        else:
            rows.append(cur); cur = [w]; cur_top = w['top']
    if cur: rows.append(cur)
    return rows

def parse_answers(year):
    """回傳 {題號(int): 答案字母} 僅自然科欄。"""
    path = os.path.join(HERE, f'{year}P_Answer.pdf')
    out = {}
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            words = page.extract_words()
            nature_x = None
            for w in words:
                if w['text'] == '自然':
                    nature_x = w['x0']
            if nature_x is None:
                continue
            for row in _cluster_rows(words):
                numw = [w for w in row if w['text'].isdigit() and w['x0'] < 110]
                if not numw:
                    continue
                qn = int(numw[0]['text'])
                cand = [w for w in row if w['text'] in ('A','B','C','D') and abs(w['x0']-nature_x) < 20]
                if cand:
                    out[qn] = cand[0]['text']
    return out

PAGE_MARK = '\x01PAGE{}\x01'

def parse_questions(year):
    """回傳題本純文字（固定略過第1頁封面/說明頁；不用關鍵字比對，
    因題目內文可能巧合出現「注意事項」等詞而被誤判）。頁與頁間插入隱形標記，供之後判斷題目所在頁碼(內容頁編號從1起，對應 imgs/p{頁}.png)。"""
    path = os.path.join(HERE, f'{year}P_Nature.pdf')
    r = pypdf.PdfReader(path)
    parts = []
    for i, p in enumerate(r.pages[1:], start=1):
        parts.append(PAGE_MARK.format(i))
        parts.append(p.extract_text() or '')
    full = '\n'.join(parts)
    return full

def split_questions(full_text):
    """依「題號.」切題，逐行追蹤頁碼，回傳 [{n, body, page}]。"""
    lines = full_text.split('\n')
    skip_pat = re.compile(r'^(請|※|讀完|—|測驗說明|注意事項|作答方式|以下為錯誤)')
    page_mark_pat = re.compile(r'^\x01PAGE(\d+)\x01$')
    keep = []  # [(line, page)]
    cur_page = 1
    for ln in lines:
        s = ln.strip()
        m = page_mark_pat.match(s)
        if m:
            cur_page = int(m.group(1)); continue
        if not s: continue
        if skip_pat.match(s): continue
        if re.match(r'^\d+$', s) and len(s) <= 2: continue  # 純頁碼行
        keep.append((s, cur_page))
    # 不同年份排版不一致(有的「N. 」有空白、有的緊貼)，句點後有無空白/是否接數字
    # 都不可靠。改為只信任下面的「連續遞增」序號檢查來過濾小數點等假陽性。
    q_start = re.compile(r'^(\d{1,2})\.\s?(.*)')
    raw = []
    cur = None
    for s, pg in keep:
        m = q_start.match(s)
        if m:
            if cur: raw.append(cur)
            cur = {'n': int(m.group(1)), 'body': m.group(2).strip(), 'page': pg}
        elif cur:
            cur['body'] += '\n' + s
    if cur: raw.append(cur)
    # 只有「連續遞增」才視為真正題目；題幹內夾帶的子題組局部重編號(如1,2,3,4)
    # 併回前一題內文，不視為新題。
    items = []
    expected = 1
    for it in raw:
        if it['n'] == expected:
            items.append(it); expected += 1
        elif items:
            items[-1]['body'] += '\n' + str(it['n']) + '. ' + it['body']
    return items

OPT_RE = re.compile(r'\(([ABCD])\)\s*')

def split_stem_opts(body):
    """把題目本文切成 (題幹, {A:...,B:...,C:...,D:...})；找不到 4 個選項回傳 opts=None。"""
    m = OPT_RE.search(body)
    if not m:
        return body.strip(), None
    stem = body[:m.start()].strip()
    opt_text = body[m.start():]
    marks = list(OPT_RE.finditer(opt_text))
    opts = {}
    for i, mk in enumerate(marks):
        start = mk.end()
        end = marks[i+1].start() if i+1 < len(marks) else len(opt_text)
        opts[mk.group(1)] = opt_text[start:end].strip().rstrip('。').strip()
    if len(opts) != 4:
        return stem, None
    # 題幹尾端常殘留圖說文字(如「圖(一)圖(二)」重複標籤)，去除純圖說行
    stem = re.sub(r'(圖\([一二三四五六七八九十]+\)\s*)+$', '', stem).strip()
    return stem, opts

def build_year(year):
    ans = parse_answers(year)
    full = parse_questions(year)
    items = split_questions(full)
    out = []
    for it in items:
        stem, opts = split_stem_opts(it['body'])
        has_fig = bool(re.search(r'圖\s*[\(（]', it['body'])) or bool(re.search(r'表\s*[\(（]', it['body']))
        a = ans.get(it['n'])
        out.append({'n': it['n'], 'stem': stem, 'opts': opts, 'ans': a, 'has_fig': has_fig, 'page': it['page']})
    return out

if __name__ == '__main__':
    import json, io
    for year in [113]:
        ans = parse_answers(year)
        print(year, '答案數:', len(ans), '範例:', dict(list(ans.items())[:5]))
        full = parse_questions(year)
        items = split_questions(full)
        print(year, '拆出題目數:', len(items))
        with io.open(os.path.join(HERE, f'_dbg_{year}.txt'), 'w', encoding='utf-8') as f:
            for it in items[:6]:
                f.write(f"[{it['n']}] {it['body'][:200]}\n---\n")

# -*- coding: utf-8 -*-
"""HTML/MD 成品轉 PDF（playwright+chromium）。
用法：
  python topdf.py <冊>        # 轉某冊全部(如 八上)
  python topdf.py all         # 全部五冊
  python topdf.py test        # 只轉八上1-1簡報(驗證)
簡報/圖表(HTML)直接印；摘要/Bloom(MD)先簡易轉HTML再印。測驗(xlsx)不轉。"""
import os, glob, sys, re, html as _html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "02_加值成品")

def md_to_html(md):
    out, in_tbl = [], False
    for ln in md.split('\n'):
        if re.match(r'^\|', ln):
            cells=[c.strip() for c in ln.strip('|').split('|')]
            if re.match(r'^\|[\s\-:|]+\|?$', ln): continue
            if not in_tbl: out.append('<table>'); in_tbl=True
            tag='th' if all('-' not in c for c in cells) and not out[-1].startswith('<tr') else 'td'
            out.append('<tr>'+''.join(f'<td>{_html.escape(c)}</td>' for c in cells)+'</tr>')
            continue
        if in_tbl: out.append('</table>'); in_tbl=False
        if ln.startswith('### '): out.append(f'<h3>{_html.escape(ln[4:])}</h3>')
        elif ln.startswith('## '): out.append(f'<h2>{_html.escape(ln[3:])}</h2>')
        elif ln.startswith('# '): out.append(f'<h1>{_html.escape(ln[2:])}</h1>')
        elif ln.startswith('> '): out.append(f'<blockquote>{_html.escape(ln[2:])}</blockquote>')
        elif ln.startswith('- '): out.append(f'<li>{_html.escape(ln[2:])}</li>')
        elif ln.strip()=='': out.append('<br>')
        else: out.append(f'<p>{_html.escape(ln)}</p>')
    if in_tbl: out.append('</table>')
    body='\n'.join(out)
    css="body{font-family:\"Noto Sans TC\",sans-serif;padding:32px;line-height:1.7;color:#222}h1{color:#1a2e1a}h2{color:#6b4a32;border-bottom:2px solid #ddd;padding-bottom:4px}table{border-collapse:collapse;width:100%}td{border:1px solid #ccc;padding:6px 10px}li{margin:2px 0}blockquote{background:#faf6ec;border-left:4px solid #9fc8d8;padding:8px 14px;margin:8px 0}"
    return f'<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><style>{css}</style></head><body>{body}</body></html>'

def convert(page, src, dst, is_md):
    if is_md:
        htmlc = md_to_html(open(src, encoding='utf-8').read())
        tmp = dst + '.tmp.html'; open(tmp,'w',encoding='utf-8').write(htmlc)
        page.goto('file:///'+tmp.replace('\\','/'))
    else:
        page.goto('file:///'+src.replace('\\','/'))
    page.emulate_media(media='print')
    page.pdf(path=dst, print_background=True, prefer_css_page_size=True,
             margin={'top':'0','bottom':'0','left':'0','right':'0'})
    if is_md: os.remove(dst+'.tmp.html')

def run(targets, only_test=False):
    from playwright.sync_api import sync_playwright
    n=0
    with sync_playwright() as pw:
        b=pw.chromium.launch(); page=b.new_page()
        for book in targets:
            d=os.path.join(OUT, book)
            files = glob.glob(os.path.join(d,'*_授課簡報.html')) + glob.glob(os.path.join(d,'*_資訊圖表_16-9.html')) \
                  + glob.glob(os.path.join(d,'*_教材摘要與重點主題.md')) + glob.glob(os.path.join(d,'*_Bloom差異化教材報告.md'))
            if only_test: files=[f for f in files if '1-1_授課簡報' in f][:1]
            for f in sorted(files):
                dst=os.path.splitext(f)[0]+'.pdf'
                convert(page, f, dst, f.endswith('.md')); n+=1
                if only_test: print('測試轉出:', dst)
        b.close()
    return n

if __name__=='__main__':
    arg=sys.argv[1] if len(sys.argv)>1 else 'test'
    BOOKS=['生物','八上','八下','九上','九下']
    if arg=='test': print('完成', run(['八上'], only_test=True), '份(測試)')
    elif arg=='all': print('完成', run(BOOKS), '份 PDF')
    else: print('完成', run([arg]), '份 PDF')

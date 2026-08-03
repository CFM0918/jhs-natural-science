# -*- coding: utf-8 -*-
"""將簡答題 (題目,答案,解析) 轉成四選一單選題。
誘答策略：從「同節其他題答案」中，優先取與正解形狀相近者
  · 數值型(含數字且短)：優先同單位(°/cm/個…)
  · 短語型(≤6字) / 長句型：各自配對
不足 3 個時放寬到全部答案，仍不足才補通用選項。
以 md5 決定洗牌 → 跨次重產結果穩定。"""
import hashlib

GENERIC = ['以上皆非', '以上皆是', '無法判斷', '不一定']

def _rng(*parts):
    h = hashlib.md5('｜'.join(map(str, parts)).encode('utf-8')).hexdigest()
    return int(h, 16)

def _shuffle(seq, seed):
    """Fisher–Yates，用固定 seed 產生穩定亂序。"""
    a = list(seq); r = seed
    for i in range(len(a) - 1, 0, -1):
        r = (r * 1103515245 + 12345) & 0x7fffffff
        j = r % (i + 1)
        a[i], a[j] = a[j], a[i]
    return a

def _shape(s):
    s = str(s)
    if any(ch.isdigit() for ch in s) and len(s) <= 6:
        return 'num'
    return 'short' if len(s) <= 6 else 'long'

def _unit(s):
    return ''.join(ch for ch in str(s) if not (ch.isdigit() or ch in ' .'))

def _distractors(corr, pool, seed):
    """從 pool 選 3 個誘答，優先形狀/單位相近。"""
    corr = str(corr)
    uniq = [x for x in dict.fromkeys(map(str, pool)) if x != corr]
    shp = _shape(corr)
    same = [x for x in uniq if _shape(x) == shp]
    if shp == 'num':
        u = _unit(corr)
        su = [x for x in same if _unit(x) == u]
        if len(su) >= 3:
            same = su
    base = same if len(same) >= 3 else uniq
    picked = _shuffle(base, seed)[:3]
    # 不足補通用選項
    gi = 0
    while len(picked) < 3:
        g = GENERIC[gi % len(GENERIC)]; gi += 1
        if g != corr and g not in picked:
            picked.append(g)
    return picked[:3]

def build(quiz, code):
    """quiz: {卷名:[(題,答,解析)...]} → {卷名:[{q,opts,ci,a,e}...]}"""
    pool = [a for lv in quiz for (q, a, e) in quiz[lv]]
    out = {}
    for lv in quiz:
        items = []
        for i, (q, a, e) in enumerate(quiz[lv]):
            corr = str(a)
            seed = _rng(code, lv, i, q)
            dist = _distractors(corr, pool, seed)
            opts = _shuffle([corr] + dist, seed ^ 0x5a5a5a5a)
            items.append({'q': q, 'opts': opts, 'ci': opts.index(corr), 'a': corr, 'e': e})
        out[lv] = items
    return out

print("mcq loaded")

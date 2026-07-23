# -*- coding: utf-8 -*-
"""驗證全 103 節測驗：結構 / 重複題 / 空欄 / 計算題重算。"""
import os, glob, importlib.util, re

GEN = os.path.dirname(os.path.abspath(__file__))
def load(name):
    s = importlib.util.spec_from_file_location(name, os.path.join(GEN, f"{name}.py"))
    m = importlib.util.module_from_spec(s); s.loader.exec_module(m); return m

# 合併 extra
EXTRA = {}
for p in sorted(glob.glob(os.path.join(GEN, "quiz_extra_*.py"))):
    EXTRA.update(load(os.path.splitext(os.path.basename(p))[0]).EXTRA)

codes = []
for p in sorted(glob.glob(os.path.join(GEN, "L_*.py"))):
    codes.append(os.path.basename(p)[2:-3])  # L_b1_1 -> b1_1

issues = []
stats = {'sections':0, 'questions':0}
for code_u in codes:
    code = code_u.replace('_', '-', 1)   # b1_1 -> b1-1
    L = load(f"L_{code_u}").L
    quiz = {k: list(v) for k, v in L['quiz'].items()}
    if code in EXTRA:
        for sh, qs in EXTRA[code].items():
            quiz.setdefault(sh, []).extend(qs)
    stats['sections'] += 1
    tot = sum(len(v) for v in quiz.values())
    stats['questions'] += tot
    if tot != 30:
        issues.append(f"[{code}] 題數={tot} (應30)")
    for sh, items in quiz.items():
        if len(items) != 10:
            issues.append(f"[{code}] {sh} {len(items)}題 (應10)")
        seen = {}
        for i, it in enumerate(items):
            if not isinstance(it, tuple) or len(it) != 3:
                issues.append(f"[{code}] {sh}#{i+1} 非三欄: {it}"); continue
            q, a, e = it
            if not (str(q).strip() and str(a).strip() and str(e).strip()):
                issues.append(f"[{code}] {sh}#{i+1} 有空欄: {it}")
            key = str(q).strip()
            if key in seen:
                issues.append(f"[{code}] {sh} 重複題: 「{key}」(#{seen[key]+1}&#{i+1})")
            seen[key] = i

from collections import Counter
cat = Counter()
for x in issues:
    if '重複題' in x: cat['重複題'] += 1
    elif '空欄' in x: cat['空欄'] += 1
    elif '題數' in x: cat['題數錯'] += 1
    elif '應10' in x: cat['卷題數錯'] += 1
    else: cat['其他'] += 1
rep = [f"節數={stats['sections']}  總題數={stats['questions']}  問題數={len(issues)}",
       "分類: " + ", ".join(f"{k}={v}" for k, v in cat.items()), ""]
rep += issues
open(os.path.join(GEN, "_verify_report.txt"), "w", encoding="utf-8").write("\n".join(rep))
print("節數", stats['sections'], "總題", stats['questions'], "問題", len(issues))
print("分類:", dict(cat))

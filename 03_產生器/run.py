# -*- coding: utf-8 -*-
"""理化/地科 單節一鍵產生器（Windows 本機版）
用法： python run.py b1-1      # 產八上1-1 的 5 種成品
冊別前綴： b八上 c八下 d九上 e九下
輸出： ../02_加值成品/<冊>/
"""
import sys, os, importlib.util

GEN = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(GEN)

def load(name):
    p = os.path.join(GEN, f"{name}.py")
    s = importlib.util.spec_from_file_location(name, p)
    m = importlib.util.module_from_spec(s); s.loader.exec_module(m)
    return m

BOOK = {'a': '生物', 'b': '八上', 'c': '八下', 'd': '九上', 'e': '九下'}

def load_extra():
    """補充題庫（把每卷 8 題補到 10 題＝每節 30 題手做版）。
    合併所有 quiz_extra_*.py（每冊一檔）。無檔案則略過。"""
    import glob
    merged = {}
    for p in sorted(glob.glob(os.path.join(GEN, "quiz_extra_*.py"))):
        name = os.path.splitext(os.path.basename(p))[0]
        merged.update(load(name).EXTRA)
    return merged

def one(code, engine, slides, autobuild, extra):
    book = BOOK[code[0]]
    out = os.path.join(ROOT, "02_加值成品", book)
    os.makedirs(out, exist_ok=True)
    engine.OUT = out; slides.OUT = out
    L = load(f"L_{code.replace('-', '_')}").L
    if code in extra:                       # 併入補充題目 → 每卷 10 題
        for sheet, qs in extra[code].items():
            L['quiz'].setdefault(sheet, []).extend(qs)
    if not L.get('slides'):                # 精簡 L → 自動生成簡報/圖表
        autobuild.build(L)
    engine.gen_summary(L); engine.gen_bloom(L); engine.gen_quiz(L)
    _, t = slides.gen_slides(L); slides.gen_infographics(L)
    print(f"[OK] {code} 《{L['title']}》→ {book}/ 簡報{t}頁 測驗{sum(len(v) for v in L['quiz'].values())}題")

def main():
    codes = sys.argv[1:]                   # 可一次多課：python run.py b1-2 b1-3
    engine = load("engine"); slides = load("slides"); autobuild = load("autobuild")
    extra = load_extra()
    for code in codes:
        one(code, engine, slides, autobuild, extra)
    print(f"=== 完成 {len(codes)} 節 ===")

if __name__ == "__main__":
    main()

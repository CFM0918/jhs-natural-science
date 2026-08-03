# -*- coding: utf-8 -*-
"""關鍵字比對法，將歷屆試題題目分類到最接近的103節代碼。"""
import io, os, re

HERE = os.path.dirname(os.path.abspath(__file__))

def load_sections():
    secs = []
    for line in io.open(os.path.join(HERE, 'chapter_titles.txt'), encoding='utf-8'):
        parts = line.rstrip('\n').split('\t')
        if len(parts) < 3: continue
        code, title, themes = parts[0], parts[1], parts[2]
        kws = set()
        kws.add(title)
        for t in themes.split('|'):
            if t: kws.add(t)
        secs.append({'code': code, 'title': title, 'kws': kws})
    return secs

SECTIONS = load_sections()

def classify(stem):
    best, best_score = None, 0
    for s in SECTIONS:
        score = 0
        for kw in s['kws']:
            # 關鍵字本身若含常見助詞則截短比對核心詞
            core = kw
            if core and core in stem:
                score += len(core)  # 較長/較具體的關鍵字命中權重較高
        if score > best_score:
            best_score = score; best = s
    return (best['code'], best_score) if best else (None, 0)

if __name__ == '__main__':
    print('sections loaded:', len(SECTIONS))

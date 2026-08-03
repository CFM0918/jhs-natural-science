# -*- coding: utf-8 -*-
"""彙整全 103 節 MCQ 成單一題庫 JSON（供模擬考頁面 fetch 使用），鍵名精簡以縮小檔案。
c=code t=title b=book(冊) l=level(卷) q=題目 o=選項陣列 i=正解索引 e=解析"""
import os, glob, importlib.util, json

GEN = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(GEN)
def load(n):
    s = importlib.util.spec_from_file_location(n, os.path.join(GEN, n+'.py'))
    m = importlib.util.module_from_spec(s); s.loader.exec_module(m); return m
import mcq
EXTRA = {}
for p in sorted(glob.glob(os.path.join(GEN,'quiz_extra_*.py'))): EXTRA.update(load(os.path.basename(p)[:-3]).EXTRA)
BOOK = {'a':'生物','b':'八上','c':'八下','d':'九上','e':'九下'}

def main():
    bank = []
    for p in sorted(glob.glob(os.path.join(GEN,'L_*.py'))):
        runcode = os.path.basename(p)[2:-3].replace('_','-',1)
        L = load(os.path.basename(p)[:-3]).L
        quiz = {k:list(v) for k,v in L['quiz'].items()}
        if runcode in EXTRA:
            for sh,qs in EXTRA[runcode].items(): quiz[sh]=quiz.get(sh,[])+list(qs)
        M = mcq.build(quiz, L['code'])
        book = BOOK[runcode[0]]
        for lv, items in M.items():
            for it in items:
                bank.append({'c':L['code'],'t':L['title'],'b':book,'l':lv,'q':it['q'],'o':it['opts'],'i':it['ci'],'e':it['e']})
    out = os.path.join(ROOT, '02_加值成品', 'quizbank.json')
    json.dump(bank, open(out,'w',encoding='utf-8'), ensure_ascii=False, separators=(',',':'))
    print(f'OK: quizbank.json 共 {len(bank)} 題，大小 {os.path.getsize(out)/1024:.0f} KB')

if __name__=='__main__': main()

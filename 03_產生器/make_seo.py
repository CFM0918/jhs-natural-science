# -*- coding: utf-8 -*-
"""產生 sitemap.xml 與 robots.txt，供搜尋引擎收錄。"""
import os, glob, urllib.parse

GEN = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(GEN)
SITE = "https://cfm0918.github.io/jhs-natural-science/"
BOOKS = ['生物', '八上', '八下', '九上', '九下']

def q(path):
    return urllib.parse.quote(path)

def main():
    urls = ['', 'index.html', '歷屆試題總覽.html', '模擬考.html', '錯題本.html',
            '00_教材總目錄.html', '00_內容審閱.html', '00_教學內容審閱.html']
    for bk in BOOKS:
        d = os.path.join(ROOT, '02_加值成品', bk)
        if not os.path.isdir(d): continue
        for suffix in ('_互動教學.html', '_線上測驗.html'):
            for p in sorted(glob.glob(os.path.join(d, f'*{suffix}'))):
                fn = os.path.basename(p)
                urls.append(f'02_加值成品/{bk}/{fn}')
    for p in sorted(glob.glob(os.path.join(ROOT, '02_加值成品', '歷屆試題', '*年會考自然科.html'))):
        urls.append(f'02_加值成品/歷屆試題/{os.path.basename(p)}')

    items = []
    for u in urls:
        loc = SITE + q(u)
        priority = '1.0' if u in ('', 'index.html') else ('0.8' if '互動教學' in u else '0.6')
        items.append(f'  <url><loc>{loc}</loc><priority>{priority}</priority></url>')
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
           + '\n'.join(items) + '\n</urlset>\n')
    open(os.path.join(ROOT, 'sitemap.xml'), 'w', encoding='utf-8').write(xml)

    robots = f"User-agent: *\nAllow: /\nSitemap: {SITE}sitemap.xml\n"
    open(os.path.join(ROOT, 'robots.txt'), 'w', encoding='utf-8').write(robots)
    print(f'OK: sitemap.xml({len(urls)} URLs) + robots.txt 已產出')

if __name__ == '__main__': main()

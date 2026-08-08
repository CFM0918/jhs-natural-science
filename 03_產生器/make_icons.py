# -*- coding: utf-8 -*-
"""產生 PWA 圖示（icons/icon-192.png, icons/icon-512.png）：綠底黃字。"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'icons')
os.makedirs(OUT, exist_ok=True)

BG = (26, 46, 26)      # #1a2e1a 黑板綠
FG = (240, 216, 120)   # #f0d878 粉筆黃

FONT_CANDIDATES = [
    r'C:\Windows\Fonts\msjhbd.ttc',  # 微軟正黑體 粗體
    r'C:\Windows\Fonts\msjh.ttc',
    r'C:\Windows\Fonts\mingliu.ttc',
]

def make_icon(size):
    img = Image.new('RGB', (size, size), BG)
    draw = ImageDraw.Draw(img)
    text = '理'
    font = None
    for fp in FONT_CANDIDATES:
        if os.path.exists(fp):
            try:
                font = ImageFont.truetype(fp, int(size * 0.62))
                break
            except Exception:
                continue
    if font is None:
        font = ImageFont.load_default()
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((size - tw) / 2 - bbox[0], (size - th) / 2 - bbox[1]), text, font=font, fill=FG)
    # 邊框裝飾
    border = max(2, size // 40)
    draw.rectangle([border, border, size - border, size - border], outline=FG, width=border)
    return img

for sz in (192, 512):
    make_icon(sz).save(os.path.join(OUT, f'icon-{sz}.png'))
print('OK: icons/icon-192.png, icons/icon-512.png 已產出')

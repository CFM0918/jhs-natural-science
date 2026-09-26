# 圖解工具與授權

本版的教學文字與科學圖解由本專案設計。以下開源軟體協助產生向量圖與圖表；不是使用這些專案的教材。

| 軟體 | 用途 | 授權與來源 |
| --- | --- | --- |
| SVG.js 3.2.5 | 建立可縮放、可編輯的科學示意圖 | MIT；https://svgjs.dev/；完整授權在 `vendor/SVGJS-LICENSE.txt` |
| D3 7.9.0 | 數值比例尺、座標刻度、曲線與長條圖 | ISC；https://d3js.org/；完整授權在 `vendor/D3-LICENSE.txt` |
| Inkscape | 開啟與編輯 SVG；抽樣匯出 PNG 檢查 | GPL；https://inkscape.org/；本網站不散布 Inkscape 程式 |
| svgdom 0.1.22 | 建置時提供 SVG 文件環境 | MIT；https://github.com/svgdotjs/svgdom；僅為建置工具，未包含在網站執行檔 |

網站所需的 SVG.js、D3 已存放在 `vendor`，不依賴外部 CDN。中文字型由閱讀者裝置提供，不包含或散布字型檔。

`assets/diagrams` 的 97 個 SVG 是教學示意圖。未依真實比例、採簡化模型或使用假設數據的部分，請保留圖內註記，不宜移除後另作實驗紀錄。

`assets/formulas` 另收錄 12 幅 SVG：8 幅新增公式情境圖（排水、稀釋、路程位移、槓桿、功、熱平衡、波與回聲、電路），4 幅使用既有 ScienceArt 原創圖解模組重新輸出（熱傳播、折射、透鏡、電磁感應）。使用同一組 SVG.js / D3 建置工具。使用者提供的葡萄牙文海報截圖只供選題與圖文編排參考，未作為網站素材散布。

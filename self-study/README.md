# 國中自然自學網｜八上至九下

## 新增：國中理化公式與圖解

開啟 `formulas.html`，或從全課程地圖、各章新增入口進入。包括 30 張公式／關係卡（單位、適用條件、例題步驟、常見錯誤）、8 幅新繪主題圖與 4 幅既有圖解延伸、8 種互動計算、6 題觀念挑戰。圖解可放大，提供搜尋、主題篩選及列印速查表；列印時包含全部關係卡，不受目前篩選影響，並省略例題和圖像以利查閱。

此補充章不改變原本 23 章的編號及作答紀錄。不是高中公式大全，也不是官方必背清單；不加入拋體、動量、電容、理想氣體、熵、薄透鏡或電磁場定量公式。參考圖片只作編排構想，沒有嵌入或重製原海報。公式與圖解的範圍說明、課綱連結在小章節頁尾。

維護來源：`course-source/formulas.cjs` 與 `course-source/build-formulas.mjs`。執行 `node course-source/build.cjs` 會一併建置；單獨更新可執行 `node course-source/build-formulas.mjs`，驗證用 `node course-source/verify-formulas.cjs`。這些命令從專案根目錄執行，建置工具不必上傳 GitHub Pages。直接將本資料夾所有檔案（含 `assets`、`vendor`、`.nojekyll`）放入網站發布目錄即可。

本功能沒有 AI API、付費服務或學生資料上傳，互動計算完全在學生瀏覽器執行。驗收範圍詳見 `公式圖解驗收紀錄.md`。

這是一套可直接放上 GitHub Pages 的靜態自學網站，不需要資料庫或後端服務。內容涵蓋八上、八下、九上與九下的理化及九年級地球科學，共 23 章、690 題原創練習。

每章依「讀懂概念 → 看圖與資料 → 操作互動模型 → 闖關 → 章末測驗」安排，並提供：

- 清楚的分節教學、生活例子、常見迷思與立即檢查
- 原創示意圖、流程圖、資料表與可讀取的圖表資料
- 互動實驗模型、條件控制、觀察紀錄與六關小遊戲
- 每章 30 題四選一題庫，含中難與難題、完整解析、考點標籤
- 學習進度、作答紀錄與錯題回看；資料只儲存在使用者自己的瀏覽器
- 手機、平板與桌機響應式版面

## 課程範圍

- 八上：體積與密度、物質與溶液、波動與聲音、光與成像、溫度與熱、原子與元素
- 八下：化學反應、氧化還原、酸鹼鹽、反應速率與平衡、有機化合物、力與壓力
- 九上：直線運動、力與運動、功與能、基本電路、地球的水與地表、地球內部與地質、地球與宇宙
- 九下：電流效應與用電安全、磁與電磁感應、天氣、氣候海洋與永續

章節範圍參考指定的[國中自然科加值教材](https://cfm0918.github.io/jhs-natural-science/%E5%85%AB%E4%B8%8A.html)，再依翰林、康軒、南一共同核心重新編排。教學文字、圖解、互動程式、遊戲及題目均為本專案原創，不複製出版社題目。不同版本的章序可能不同，可從全課程頁搜尋主題對照。

題目難度屬編者估計，尚未經大規模學生作答數據校準，不代表官方會考等級認證。互動模型用於呈現概念與趨勢；各模型頁面均標示簡化條件，不應取代實際實驗或安全操作規範。

## 使用方式

### 精緻圖解版

本版新增 `diagram-gallery.html` 圖解館：97 張圖涵蓋 23 章，可搜尋主題、放大閱讀、下載 SVG。課程中的靜態圖與新版互動圖均可放大；在手機上可選「原始大小」後捲動閱讀。

向量圖的產生採用 SVG.js 與 D3；SVG 可直接以免費開源軟體 Inkscape 開啟，編輯標籤、線條或匯出 PNG。工具來源與授權見 `THIRD_PARTY.md`。這次也依介面設計檢核整理按鈕尺寸、鍵盤焦點、手機排版與圖解說明。

網站入口是 `courses.html`；`index.html` 為八上第一章。直接開啟即可閱讀。若瀏覽器在 `file://` 模式限制儲存或程式功能，建議在資料夾內啟動本機靜態伺服器：

```bash
python -m http.server 8000
```

接著開啟 `http://localhost:8000/courses.html`。

## 發布到 GitHub Pages

1. 建立一個 GitHub repository。
2. 將本資料夾內的所有檔案放到 repository 根目錄並推送到 `main`。
3. 到 repository 的 **Settings → Pages**。
4. 在 **Build and deployment** 選擇 **Deploy from a branch**。
5. 選擇 `main` 與 `/ (root)`，儲存並等待部署完成。
6. 首頁可使用 `https://你的帳號.github.io/儲存庫名稱/courses.html`。

若希望網站根網址直接進入課程總覽，可把 `courses.html` 複製為 `index.html`，並將原本八上第一章的 `index.html` 改名；同時要更新課程清單中的第一章連結。現成版本保留原始第一章檔名，以免破壞既有連結。

## 主要檔案

- `courses.html`：四學期課程總覽、搜尋與學期篩選
- `index.html`、`chapter2.html`～`chapter5.html`：原有八上第一至五章
- `g8a-6.html`、`g8b-*.html`、`g9a-*.html`、`g9b-*.html`：八上第六章至九下全部課程
- `*-data.js`、`questions*.js`：各章原創題庫、解析與課程資料
- `app.js`：題目、進度與瀏覽器儲存功能
- `science-models.js`、`course-labs.js`：18 組共用互動模型與闖關
- `curriculum.css`、`styles.css`：課程總覽、章節頁與響應式樣式
- `course-manifest.json`：23 章課程清單，可供後續工具讀取
- `diagram-gallery.html`：可搜尋的科學圖解館
- `assets/diagrams/`：97 張 SVG 原圖與圖解清單
- `science-art.js`：共用向量圖與圖表繪製程式
- `science-figures.css`、`figure-viewer.js`：圖文排版、放大檢視與既有控制項連動
- `vendor/`、`THIRD_PARTY.md`：本地開源程式與授權資訊
- `.nojekyll`：避免 GitHub Pages 使用 Jekyll 處理靜態檔案

## 維護與驗證

課程原始資料與產生器位於專案上一層的 `course-source` 資料夾。修改後可在專案根目錄執行：

網站 ZIP 是已建置成品，直接上傳即可，不需要 npm。以下重建指令僅適用保留完整本機專案（含 `course-source`）的情況。首次重建先安裝圖解工具：

```bash
npm install --prefix work/diagram-tools @svgdotjs/svg.js@3.2.5 svgdom@0.1.22 d3@7.9.0
```

```bash
node course-source/build.cjs
node course-source/verify.cjs
node course-source/verify-diagrams.mjs
```

驗證器會檢查章節數、題目結構、答案索引、選項重複、互動模型邊界、重要公式、內部連結、資源路徑與重複 HTML ID。

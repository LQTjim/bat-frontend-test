請製作一個台北市 YouBike 即時站點資訊
需按照設計稿製作(外觀,RWD, etc.) ： Figma
串接 Open API ：api document
請使用 React ( 使用 Next.js 加分 )
需將程式碼上傳至 github,並以 live demo 方式呈現(codeSandBox,GCP, etc.)
真實資料只需串接台北市 YouBike API,其餘縣市可用 假資料 or 空白示意
功能： 1.縣市搜尋 Input：

    可透過文字篩選縣市清單

    按鈕點擊,顯示/收合 縣市清單

    具備一鍵清除

縣市清單及 checkbox 渲染,需針對縣市搜尋 input 操作即時反饋

(ex. 輸入台北市 縣市清單顯示台北市 , checkbox 顯示台北市行政區)

2.行政區 checkbox：

預設為全選
勾選 / 取消勾選 後其餘 checkbox 狀態需跟著變動

Header：

點擊後需切換路由(頁面內容不需更動,路由可自行規劃)
-> [/active]對應第二題

加分區(非必需)：
表格區效能優化：
針對表格資料動態渲染
點擊表頭可進行排序
站點搜尋 Input：
表格資料渲染需針對 input 操作即時反饋
只需針對站點名稱篩選搜尋

感想:
必須在某些位置保留 server component 才有辦法對 metadata 或者使用一些 server component 的 api。layout 很多是共通型的不太適合在這裡派發個別 page 的內容，
所以在個別路由的 page.tsx 最好還是保留成 server component。

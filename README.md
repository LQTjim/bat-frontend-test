拿到這份**完整題目前**我從朋友手上那拿到 figma，自己找 API，其餘憑空想像做的[在這裡](https://lqtjim.github.io/ubike/)
用的是單純 react deploy 在 github page。

這份是用 next 寫的。

可以在 vscode `ctrl+shift+f` 搜尋`/*`看一些 component 的註解。

---

題目 5:請製作一個台北市 YouBike 即時站點資訊

- [x] 需按照設計稿製作(外觀,RWD, etc.) ： Figma
- [x] 串接 Open API ：api document(https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json)
- [x] 請使用 React ( 使用 Next.js 加分 )
      需將程式碼上傳至 github,並以 live demo 方式呈現(codeSandBox,GCP, etc.)
      真實資料只需串接台北市 YouBike API,其餘縣市可用 假資料 or 空白示意 。

&nbsp;1.縣市搜尋 Input：<font color=#800000>(客製化的 select & option 為符合 figma 樣式)</font>

- [x] 可透過文字篩選縣市清單

  按鈕點擊,顯示/收合 縣市清單

  具備一鍵清除<font color=#800000>(這個要求我理解為切換選擇縣市時清除掉資料)</font>

- [x] 縣市清單及 checkbox 渲染,需針對縣市搜尋 input 操作即時反饋<font color=#800000>(這個需求用另外一個帶有不同縣市資料的 [API](https://apis.youbike.com.tw/json/station-yb2.json)(我有自己找到一個，如連結。) 比較好體現，或者根據切換縣市有個別不同 API 比較好做)</font>
      (ex. 輸入台北市 縣市清單顯示台北市 , checkbox 顯示台北市行政區)

&nbsp;2.行政區 checkbox：

- [x] 預設為全選
      勾選 / 取消勾選 後其餘 checkbox 狀態需跟著變動

Header：

點擊後需切換路由(頁面內容不需更動,路由可自行規劃)
<font color=#800000>-> [/active]對應第二題</font>

加分區(非必需)：
表格區效能優化：

- [x] 針對表格資料動態渲染
- [x] 點擊表頭可進行排序<font color=#800000>針對可還空位和可借車輛</font>

站點搜尋 Input：

- [x] 表格資料渲染需針對 input 操作即時反饋
- [x] 只需針對站點名稱篩選搜尋

## <font color=#800000>自己多做的部分</font>

<font color=#800000>
1.站點搜尋的清除按鈕。

2.帶有 typeahead(應該也不算 typeahead) 的站點搜尋功能，具備清除功能(state persist 在 localstorage)，儲存上限為 5。

3.figma 內有，但沒提到的部分，手機板的 navbar(有鎖住 navbar 展開時的 body scroll。)，手機板的 select 和 text-input 的逆序(order)，實際縮放時對應不同尺寸的 padding、font-size 等...，盡量還原手機板 table 的 overflow。

3.loading 時 checkbox 的 skeleton

感想:
&nbsp;&nbsp;&nbsp;&nbsp;我覺得題目可以再多提供一個 **_pagination_** 的設計(含 figma)，不然在切換城市時，`fetch` 加上 render 多筆資料會使畫面卡頓。做了一個簡易測試，在展示資料時使用 `slice` 方法讓畫面只輸出五筆，在操作上順上不少。

&nbsp;&nbsp;&nbsp;&nbsp;手動 key in 的 input，我自己覺得不太適合做即時的資料搜尋並更新下方表格，個人體感不佳。而別的網站大多也不是走一次把全部資料拿進來的形式，大致上都是用 enter 敲擊後才 fetch 並更新下面的表格，然後 typeahead 的部分會顯示是 onChange 時 用關鍵字 call API 顯示商品(多數利用 debounce 在 key in 時 cancel 掉 API fetch flag(有些有錢的公司不會。))

&nbsp;&nbsp;&nbsp;&nbsp;在設計元件時必須在某些位置保留 server component 才有辦法對 metadata 或者使用一些 server component 的 api。layout 很多是共通型的不太適合在這裡派發個別 page 的內容，所以在個別路由的 page.tsx 最好還是保留成 server component。

&nbsp;&nbsp;&nbsp;&nbsp;本來想藉機試用 SWR，但實際上在這個 case 裡面，本身最好是不要 cache 住拿回來的資料(這邊主要指不設定 SWR option 情況下來自 server 的變動)，因為車位是會即時更新，但又不能使用 refreshInterval 這個 option 使 fetcher 自己 rerun，因為這樣動態渲染的 checkbox 的 check 狀態又會有問題。
</font>

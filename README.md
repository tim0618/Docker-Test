# 🚀 容器化全端專案範本 (Vue + C# .NET 8)

這是一個使用 **Vue.js** 作為前端，以及 **C# .NET 8** 作為後端 API 的全端應用程式基礎範本。整個專案已經完全 Docker 化，只需一行指令即可在任何電腦上無痛啟動。

## 📂 專案結構

- `DockerFE/` : Vue.js 前端專案 (使用 Vite 建立)
- `DockerBE/` : C# .NET 8 Web API 後端專案
- `docker-compose.yml` : Docker Compose 設定檔，負責統一調度前後端服務

## 🛠️ 事前準備

在執行此專案之前，請確保您的電腦已安裝以下軟體：
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

## 🚀 如何啟動專案

1. 開啟終端機，將路徑切換到此專案的最外層目錄（與 `docker-compose.yml` 同層）。
2. 輸入以下指令來建置並啟動所有容器：

   ```bash
   docker-compose up -d --build
   ```
   指令說明：
      up：啟動服務。
      -d：在背景執行 (Detached mode)，這樣您的終端機就不會被佔用。
      --build：強制重新讀取 Dockerfile 並打包最新的程式碼。
3. 啟動完成後，您可以打開瀏覽器測試以下網址：
- 前端畫面 (Vue)： http://localhost
- 後端 API 測試 (C#)： http://localhost:8080/weatherforecast

---

## 🛑 如何停止專案

若要停止並刪除正在運行的容器，請在同一個目錄下執行以下指令：

```bash
docker-compose down
```

---

## 🐳 Docker 相關概念與筆記
為了讓開發與部署更順利，本專案採用了以下 Docker 技術與架構：

### 映像檔 (Image) 與容器 (Container)
- Image： 唯讀的應用程式藍圖，包含程式碼、執行環境與系統套件。在此專案中，我們分別為前端與後端建立了專屬的 Image。
- Container： 將 Image 實際運行起來的實體。本專案啟動時，會同時產生兩個 Container（前端 Nginx 伺服器與後端 .NET API 伺服器）。

### 多階段建置 (Multi-stage Build)
前端與後端的 Dockerfile 皆採用了多階段建置技術，有效縮小最終映像檔的體積：
- C# 後端： 第一階段使用 .NET SDK 進行編譯與發佈；第二階段僅保留輕量級的 .NET Runtime 負責運行。
- Vue 前端： 第一階段使用 Node.js 進行打包 (build)；第二階段將編譯出的靜態檔案移入輕量級的 Nginx 伺服器提供服務。

### 跨來源資源共用 (CORS) 與網路配置
- Port 對應： 透過 docker-compose 設定，將前端容器對應到本機 80 Port，後端容器對應到本機 8080 Port。
- CORS 設定： 由於前後端在不同 Port 執行，後端的 Program.cs 已配置 CORS 規則，允許前端發送請求，避免瀏覽器因安全性限制而阻擋 API 呼叫。
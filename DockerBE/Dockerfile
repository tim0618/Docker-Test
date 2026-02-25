# 第一階段：使用 .NET 8.0 SDK 編譯
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# 把現在這個資料夾的所有東西都複製到容器的 /src 裡
COPY . .

# 執行還原
RUN dotnet restore

# 發佈專案
RUN dotnet publish -c Release -o /app/publish

# 第二階段：使用 .NET 8.0 Runtime 執行
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080

# 啟動應用程式
ENTRYPOINT ["dotnet", "DockerBE.dll"]
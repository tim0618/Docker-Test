<script setup>
import { ref, onMounted } from 'vue'

// 準備一個變數來裝後端傳來的資料
const forecasts = ref([])
// 準備一個變數來裝錯誤訊息
const errorMsg = ref('')

// 當網頁一載入完畢，就去呼叫 C# 的 API
onMounted(async () => {
  try {
    // 打向你本機的 C# API 網址
    const response = await fetch('http://localhost:8888/weatherforecast')
    if (!response.ok) {
      throw new Error('網路連線失敗')
    }
    // 把拿到的 JSON 存進變數裡
    forecasts.value = await response.json()
  } catch (error) {
    errorMsg.value = '無法取得資料：' + error.message
  }
})
</script>

<template>
  <div style="text-align: center; margin-top: 50px; font-family: sans-serif;">
    <h1>🌤️ 我的 Docker 前後端連線大成功！</h1>

    <div v-if="errorMsg" style="color: red; font-size: 20px;">
      {{ errorMsg }}
    </div>

    <div v-else-if="forecasts.length === 0" style="font-size: 20px; color: gray;">
      ⏳ 正在跟 C# 後端索取天氣資料...
    </div>

    <table v-else border="1" style="margin: 0 auto; border-collapse: collapse; width: 80%; max-width: 600px; text-align: center;">
      <thead style="background-color: #42b883; color: white;">
        <tr>
          <th style="padding: 10px;">日期 (Date)</th>
          <th style="padding: 10px;">溫度 (C)</th>
          <th style="padding: 10px;">溫度 (F)</th>
          <th style="padding: 10px;">天氣狀況 (Summary)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(day, index) in forecasts" :key="index">
          <td style="padding: 10px;">{{ day.date }}</td>
          <td style="padding: 10px;">{{ day.temperatureC }}°C</td>
          <td style="padding: 10px;">{{ day.temperatureF }}°F</td>
          <td style="padding: 10px;">{{ day.summary }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
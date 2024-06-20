const elText = document.getElementById("text"); // 獲取顯示本地時間的元素
const worldClockElement = document.getElementById("world-clock"); // 獲取世界時鐘元素
const timezoneSelect = document.getElementById("timezone-select"); // 獲取時區選擇下拉框元素
const elHour = document.querySelector(".hour"); // 指針：時
const elMinute = document.querySelector(".minute"); // 指針：分
const elSecond = document.querySelector(".second"); // 指針：秒
const paths = document.querySelectorAll("svg path");

// 更新本地時間的函式 Function to update local clock
function updateLocalClock() {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const second = date.getSeconds();
  elText.innerText = `${hour.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
}

// 更新所選時區的時鐘的函式 Function to update clock for selected timezone
function updateClock() {
  const selectedTimezone = timezoneSelect.value;
  // console.log(selectedTimezone);

  // 使用 Moment.js 中的 moment() 函式創建一個代表當前時間的 Moment 物件
  // 使用 tz() 方法將當前時間轉換為所選時區的時間，selectedTimezone 是所選的時區
  const now = moment().tz(selectedTimezone);

  // now 變數就包含了當前所選時區的時間。
  const hour = now.hours();
  const minute = now.minutes();
  const second = now.seconds();

  const hourDeg = hour * 30 + 90;
  const minuteDeg = minute * 6 + 90;
  const secondDeg = second * 6 + 90;

  elHour.style.transform = `rotate(${hourDeg}deg)`;
  elMinute.style.transform = `rotate(${minuteDeg}deg)`;
  elSecond.style.transform = `rotate(${secondDeg}deg)`;

  // const currentTime = now.format("YYYY.MM.DD HH:mm:ss");
  const currentTime = now.format("HH:mm:ss");
  const timezone = selectedTimezone.split("/").pop();

  // worldClockElement.innerHTML = `${selectedTimezone}：<br>${currentTime}`;
  worldClockElement.innerHTML = `${timezone}：${currentTime}`;

  // 遍歷所有 id 尋找時區
  paths.forEach((path) => {
    const timezone = selectedTimezone.split("/").pop();
    if (path.id == timezone || path.className == timezone) {
      console.log(1112);
    }
  });
}

// 初始化時區選項的函式 Function to initialize timezone options
function generateTimezoneOptions() {
  const timezones = moment.tz.names();
  timezones.forEach(function (timezone) {
    const option = document.createElement("option");
    option.value = timezone;
    option.textContent = timezone;
    timezoneSelect.appendChild(option);
  });
}

// 初始化時區選項 Initialize timezone options
generateTimezoneOptions();

// 首次更新本地時間和所選時區的時鐘 Update clocks initially
updateLocalClock();
updateClock();

// 每秒更新一次本地時間和所選時區的時鐘 Update clocks every second
setInterval(() => {
  updateLocalClock();
  updateClock();
}, 1000);

// 當時區改變時更新時鐘 Update clock when timezone changes
timezoneSelect.addEventListener("change", updateClock);

// 點擊地圖

const map = new jsVectorMap({
  selector: ".world-map",
  map: "world",
  regionStyle: {
    initial: {
      fill: "#000",
      stroke: "gold",
      strokeWidth: 0.1,
      fillOpacity: 1,
    },
  },
  onRegionClick(event, code) {
    const zone = moment.tz.zonesForCountry(code)[0];

    if (zone) {
      timezoneSelect.value = zone;
      updateClock();
    }

    // console.log(zone, code);
    // console.log(moment.tz(zone).format("llll"));
    // console.log(moment.tz(zone).format("HH:mm:ss"));
    // updateClock();
  },
});

const selectCity = document.getElementById("city");
let intervalId;
let ishaHour;
// Get Fata Function
function getData(iso = "Al Qāhirah") {
  const url = "https://api.aladhan.com/v1/timingsByCity";
  const parameter = {
    country: "eg",
    city: iso,
  };
  const queryString = new URLSearchParams(parameter).toString();
  let respons = fetch(`${url}?${queryString}`);
  respons
    .then((respons) => {
      return respons.json();
    })
    .then(({ data }) => {
      displayPrayerTime(data);
    });
}
getData();

// Set Prayer Times Function
function setPrayerTimes(index, content) {
  let hour = content.split(":");
  content = hour[0] % 24;
  var period = content < 12 ? "AM" : "PM";
  content = content % 12 || 12;
  hour[0] = content;
  content = hour.join(":");
  content = content + " " + period;
  document.querySelectorAll(".content .inner .time")[index].innerHTML = content;
}

// Set Time Of Now Function
function timeNow() {
  let time = new Date();
  let options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  time = time.toLocaleString("en-US", options);
  document.getElementById("timeNow").innerHTML = time;
  setTimeout(timeNow, 1000);
}
timeNow();

//  City
const cities = [
  { cityName: "القاهرة", iso: "Al Qāhirah" },
  { cityName: "الجيزه", iso: "Al Jīzah" },
  { cityName: "الاقصر", iso: "Al Uqşur" },
  { cityName: "بور سعيد", iso: "Būr Sa‘īd" },
  { cityName: "القليوبية", iso: "Al Qalyūbīyah" },
  { cityName: "أسوان", iso: "As Suways" },
  { cityName: "دمياط", iso: "Dumyāţ" },
];

// Create Select Option
for (const city of cities) {
  let option = `<option>${city.cityName}</option>`;
  selectCity.innerHTML += option;
}
// Change City Event
selectCity.addEventListener("change", function () {
  document.querySelector(".data-time h2").innerHTML = this.value;
  let isoName = "";
  for (const city of cities) {
    if (city.cityName === this.value) {
      isoName = city.iso;
    }
  }
  getData(isoName);
});
// Display time Function
function displayPrayerTime(data) {
  let { Fajr, Dhuhr, Asr, Maghrib, Isha } = data.timings;
  const day = document.querySelectorAll(".data-time p")[0];
  const todayDate = document.querySelectorAll(".data-time p")[1];
  ishaHour = Isha;
  setPrayerTimes(0, Dhuhr);
  setPrayerTimes(1, Asr);
  setPrayerTimes(2, Maghrib);
  setPrayerTimes(3, Isha);
  setPrayerTimes(4, Fajr);
  day.innerHTML = data.date.hijri.weekday.ar;
  todayDate.innerHTML = data.date.gregorian.date;
  checkTheNextPrayer(Fajr, Dhuhr, Asr, Maghrib, Isha);
}

// Calc Remaining Time Function
function calcRemainingTime(hour) {
  let today = new Date().toJSON().slice(0, 10);
  let nextDay = new Date();
  nextDay.setDate(new Date().getDate() + 1);
  nextDay = nextDay.toJSON().slice(0, 10);
  let otherPrayers = new Date(`${today}, ${hour}`).getTime();
  let fagr = calcFajrTime(hour);
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    let nowtime = new Date().getTime();
    let periodTime = otherPrayers - nowtime;
    if (periodTime < 0) otherPrayers = fagr;
    let diff = otherPrayers - nowtime;
    let hour = ~~(diff / 1000 / 60 / 60);
    let minute = ~~((diff % (1000 * 60 * 60)) / (1000 * 60));
    let sec = ~~((diff % (1000 * 60)) / 1000);
    document.querySelector(
      ".time #prayerTimes"
    ).innerHTML = `${hour}:${minute}:${sec}`;
  }, 1000);
}
// check The Next Prayer Function
function checkTheNextPrayer(Fajr, Dhuhr, Asr, Maghrib, Isha) {
  let today = new Date().toJSON().slice(0, 10);
  let nowTime = new Date().getTime();
  let fajrTime = new Date(`${today}, ${Fajr}`).getTime();
  let dhuhrTime = new Date(`${today}, ${Dhuhr}`).getTime();
  let asrTime = new Date(`${today}, ${Asr}`).getTime();
  let maghribTime = new Date(`${today}, ${Maghrib}`).getTime();
  let ishaTime = new Date(`${today}, ${Isha}`).getTime();
  switch (true) {
    case nowTime > dhuhrTime && nowTime < asrTime:
      calcRemainingTime(Asr);
      break;
    case nowTime > asrTime && nowTime < maghribTime:
      calcRemainingTime(Maghrib);
      break;
    case nowTime > maghribTime && nowTime < ishaTime:
      calcRemainingTime(Isha);
      break;
    case nowTime > fajrTime && nowTime < dhuhrTime:
      calcRemainingTime(Dhuhr);
      break;
    default:
      calcRemainingTime(Fajr);
      break;
  }
}

// Calc Fajr Time Function
function calcFajrTime(fajrTime) {
  let Isha = new Date();
  ishaHour = ishaHour.split(":");
  let [hour, minute] = ishaHour;
  Isha.setHours(hour, minute);

  let fajr = new Date();
  fajrTime = fajrTime.split(":");
  let [fajrHour, fajrMinute] = fajrTime;
  fajr.setHours(fajrHour, fajrMinute);

  let midnightLastDay = new Date();
  midnightLastDay.setHours(23, 59, 59);
  let midnightToDay = new Date();
  midnightToDay.setHours(0, 0, 0);

  let timeToMidnight = midnightLastDay.getTime() - Isha.getTime();
  let timeToNextFajr = fajr.getTime() - midnightToDay.getTime();
  let total = timeToMidnight + timeToNextFajr;
  return total;
}

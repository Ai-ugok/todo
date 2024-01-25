'use strict'

// 今日の日付を取得
const dateToday = new Date();
// 明日の日付を取得（参考：https://iwasawa-officialweb.com/2021/05/04/js-date/#toc6）ここから
const dateTomorrow = new Date();
dateTomorrow.setDate(dateTomorrow.getDate() + 1);
//1週間分の日付を取得
function nextData (d) {
  let dateNext = new Date();
  return dateNext.setDate(dateNext.getDate() + d);
}
// ここまで

// nextData関数の返り値をまとめておく
const dateNext2 = nextData(2);
const after2 = new Date(dateNext2);
const dateNext3 = nextData(3);
const after3 = new Date(dateNext3);
const dateNext4 = nextData(4);
const after4 = new Date(dateNext4);
const dateNext5 = nextData(5);
const after5 = new Date(dateNext5);
const dateNext6 = nextData(6);
const after6 = new Date(dateNext6);
const dateNext7 = nextData(7);
const after7 = new Date(dateNext7);

// 曜日の取得方法（参考：https://www.azukipan.com/posts/javascript-date/）ここから
const day1 = dateToday.getDay();
const wk = ["日", "月", "火", "水", "木", "金", "土"];
const week1 = wk[day1];
// 明日の曜日
const day2 = dateTomorrow.getDay();
const week2 = wk[day2];
// 1週間後の曜日
const day3 = after7.getDay();
const week3 = wk[day3];
// ここまで

// 必要な要素を取得
const btns = document.querySelectorAll('input[type="button"]');
const deadlines = document.getElementsByClassName(('deadline'));
const img = document.querySelector('img');

// nの値（カラーの番号）を保持（chatGPTの回答を参考にしました）
let nValue;

// 期末課題で追加した部分（ここから）
// URLに「2023-12-22」のような形で表記させるための関数
function todayDate_URL () {
  const td = dateToday.toJSON();
  const todayDate = td.split('T');
  return todayDate[0];   
};

function tomorrowDate_URL () {
  const trd = dateTomorrow.toJSON();
  const tomorrowDate = trd.split('T');
  return tomorrowDate[0];   
};
// （ここまで）

PetiteVue.createApp({
  // データプロパティ
  text: '',
  date: '',

  // タスクの表示
  today: dateToday.toLocaleDateString(),
  tomorrow: dateTomorrow.toLocaleDateString(),
  // next: after7.toLocaleDateString(),

  next2: after2.toLocaleDateString(),
  next3: after3.toLocaleDateString(),
  next4: after4.toLocaleDateString(),
  next5: after5.toLocaleDateString(),
  next6: after6.toLocaleDateString(),
  next7: after7.toLocaleDateString(),

  // 今日の曜日
  day1: week1,
  // 明日の曜日
  day2: week2,
  // 1週間後の曜日
  day3: week3,

  // カラーボタンが押されたときのイベント
  color (n) {
    // カラーボタンのトグル（nはカラーの番号）
    if (btns[n].value == 'on') {
      btns[n].style.border = 'solid 2px black';
      btns[n].value = 'off';
    } else if (btns[n].value == 'off') {
      btns[n].style.border = 'none';
      btns[n].value = 'on';
    }

    // nの値（カラーの番号）を保持（chatGPTの回答を参考にしました）
    nValue = n;
  },

  // 追加ボタンが押されたときのイベント
  add () {

    // タスクを追加する度にvalueをonにする→初期状態に戻す
    btns[nValue].value = 'on';

    // チェックボックスの生成
    let task = document.createElement('input');
    task.type = 'checkbox';
    task.id = 'checkbox';
    // チェックがついたらタスク削除
    task.addEventListener("click", () => {
      task.remove();
      label.remove();
      br.remove();
    });

    // ラベル（テキスト）の生成
    let label = document.createElement('label');
    label.for = 'checkbox';
    label.textContent = this.text;

    let br = document.createElement('br');

    // 選択されたカラーをラベル（テキスト）の背景色にする
    if (btns[nValue].id == 'red') {
      label.style.backgroundColor = 'lightcoral';
    }

    if (btns[nValue].id == 'orange') {
      label.style.backgroundColor = 'sandybrown';
    }

    if (btns[nValue].id == 'yellow') {
      label.style.backgroundColor = 'khaki';
    }

    if (btns[nValue].id == 'green') {
      label.style.backgroundColor = 'lightgreen';
    }

    if (btns[nValue].id == 'bluegreen') {
      label.style.backgroundColor = 'aquamarine';
    }

    if (btns[nValue].id == 'blue') {
      label.style.backgroundColor = 'lightskyblue';
    }

    if (btns[nValue].id == 'purple') {
      label.style.backgroundColor = 'plum';
    }

    if (btns[nValue].id == 'pink') {
      label.style.backgroundColor = 'pink';
    }

    // 入力された日付と締切日を比較する（chatGPTの回答を参考にしました）
    const dateObj = new Date(this.date);
    const todayObj = new Date(this.today);
    const tomorrowObj = new Date(this.tomorrow);
    // 「来週まで」は7日間いる
    const nextObj2 = new Date(this.next2);
    const nextObj3 = new Date(this.next3);
    const nextObj4 = new Date(this.next4);
    const nextObj5 = new Date(this.next5);
    const nextObj6 = new Date(this.next6);
    const nextObj7 = new Date(this.next7);

    // 入力された日付の時間を0にする→比較が可能になる（chatGPTの回答を参考にしました）
    dateObj.setHours(0, 0, 0, 0);

    // 入力された日付が今日なら・・・
    if (dateObj.getTime() == todayObj.getTime()) {
      deadlines[0].appendChild(br);
      deadlines[0].appendChild(label);
      deadlines[0].insertBefore(task, label);

      this.text = '';
      this.date = '';
      btns[nValue].style.border = 'none';
    }

    // 入力された日付が明日なら・・・
    if (dateObj.getTime() == tomorrowObj.getTime()) {
      deadlines[1].appendChild(br);
      deadlines[1].appendChild(label);
      deadlines[1].insertBefore(task, label);

      this.text = '';
      this.date = '';
      btns[nValue].style.border = 'none';
    }

    // 来週までのタスクを日付と一緒に表示（期末課題で追加しました）
    if (dateObj.getTime() == nextObj2.getTime()) {
      label.textContent = this.text + ' ' + '(' + this.next2 + ')'
    } else if (dateObj.getTime() == nextObj3.getTime()) {
      label.textContent = this.text + ' ' + '(' + this.next3 + ')'
    } else if (dateObj.getTime() == nextObj4.getTime()) {
      label.textContent = this.text + ' ' + '(' + this.next4 + ')'
    } else if (dateObj.getTime() == nextObj5.getTime()) {
      label.textContent = this.text + ' ' + '(' + this.next5 + ')'
    } else if (dateObj.getTime() == nextObj6.getTime()) {
      label.textContent = this.text + ' ' + '(' + this.next6 + ')'
    } else if (dateObj.getTime() == nextObj7.getTime()) {
      label.textContent = this.text + ' ' + '(' + this.next7 + ')'
    }

    // 入力された日付が1週間後なら・・・
    if (dateObj.getTime() == nextObj2.getTime()
     || dateObj.getTime() == nextObj3.getTime()
     || dateObj.getTime() == nextObj4.getTime()
     || dateObj.getTime() == nextObj5.getTime()
     || dateObj.getTime() == nextObj6.getTime()
     || dateObj.getTime() == nextObj7.getTime()) {
      deadlines[2].appendChild(br);
      deadlines[2].appendChild(label);
      deadlines[2].insertBefore(task, label);

      this.text = '';
      this.date = '';
      btns[nValue].style.border = 'none';
    }
        
  },

  // 期末課題で追加した部分（ここから）
  // API用のデータ

  // ドロップダウンメニューから選択された値を取ってくる
  city: '',

  // 天気アイコンを分けるため（v-if）
  todayCloud: false,
  todayClear: false,
  todayRain: false,
  todaySnow: false,
  todayThunderstorm: false,

  tomorrowCloud: false,
  tomorrowClear: false,
  tomorrowRain: false,
  tomorrowSnow: false,
  tomorrowThunderstorm: false,

  lang: 'ja', 
  appid: '79cf670c6bb57b15d64241c4cb02d476',

  // APIで取得した天気のデータを格納
  weatherList: [],
  todayWeatherList: [],
  tomorrowWeatherList: [],

  // 今日、明日の天気を別々で表示させるため（v-if）
  todayWeather: false,
  tomorrowWeather: false,

  // ドロップダウンメニューで選択される度に起動する
  async getProgramList () {

    this.todayWeather = true;
    this.tomorrowWeather = true;

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&lang=${this.lang}&appid=${this.appid}`;
    const res = await fetch(url);
    const obj = await res.json();
    this.weatherList = obj;
    // console.log(JSON.stringify(this.weatherList, null, 2));

    // 今日の方では今日の天気を取得するasync（明日も同様）
    if (this.todayWeather) {
      this.getProgramTodayList();
    }

    if (this.tomorrowWeather) {
      this.getProgramTomorrowList();
    }

  },

  // 今日の場合は↓を起動
  async getProgramTodayList () {
    
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&lang=${this.lang}&appid=${this.appid}`;
    const res = await fetch(url);
    const obj = await res.json();
    this.todayWeatherList = obj.list[1].weather;
    console.log(JSON.stringify(this.todayWeatherList, null, 2));

    // 曇りなら雲のアイコン、晴れなら太陽のアイコン・・・
    if (this.todayWeatherList[0].main == 'Clouds') {
      this.todayCloud = true;

      this.todayClear = false;
      this.todayRain = false;
      this.todaySnow = false;
      this.todayThunderstorm = false;      
    };
    if (this.todayWeatherList[0].main == 'Clear') {
      this.todayClear = true;
      
      this.todayCloud = false;
      this.todayRain = false;
      this.todaySnow = false;
      this.todayThunderstorm = false;
    };
    if (this.todayWeatherList[0].main == 'Rain') {
      this.todayRain = true;

      this.todayCloud = false;
      this.todayClear = false;
      this.todaySnow = false;
      this.todayThunderstorm = false;      
    };
    if (this.todayWeatherList[0].main == 'Snow') {
      this.todaySnow = true;
      
      this.todayCloud = false;
      this.todayClear = false;
      this.todayRain = false;
      this.todayThunderstorm = false;      
    };
    if (this.todayWeatherList[0].main == 'Thunderstorm') {
      this.todayThunderstorm = true;
      
      this.todayCloud = false;
      this.todayClear = false;
      this.todayRain = false;
      this.todaySnow = false;
    };

  },

  // 明日の場合は↓を起動
  async getProgramTomorrowList () {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&lang=${this.lang}&appid=${this.appid}`;
    const res = await fetch(url);
    const obj = await res.json();
    this.tomorrowWeatherList = obj.list[9].weather;
    console.log(JSON.stringify(this.tomorrowWeatherList, null, 2));

    if (this.tomorrowWeatherList[0].main == 'Clouds') {
      this.tomorrowCloud = true;

      this.tomorrowClear = false;
      this.tomorrowRain = false;
      this.tomorrowSnow = false;
      this.tomorrowThunderstorm = false;      
    };
    if (this.tomorrowWeatherList[0].main == 'Clear') {
      this.tomorrowClear = true;
      
      this.tomorrowCloud = false;
      this.tomorrowRain = false;
      this.tomorrowSnow = false;
      this.tomorrowThunderstorm = false;
    };
    if (this.tomorrowWeatherList[0].main == 'Rain') {
      this.tomorrowRain = true;

      this.tomorrowCloud = false;
      this.tomorrowClear = false;
      this.tomorrowSnow = false;
      this.tomorrowThunderstorm = false;      
    };
    if (this.tomorrowWeatherList[0].main == 'Snow') {
      this.tomorrowSnow = true;
      
      this.tomorrowCloud = false;
      this.tomorrowClear = false;
      this.tomorrowRain = false;
      this.tomorrowThunderstorm = false;      
    };
    if (this.tomorrowWeatherList[0].main == 'Thunderstorm') {
      this.tomorrowThunderstorm = true;
      
      this.tomorrowCloud = false;
      this.tomorrowClear = false;
      this.tomorrowRain = false;
      this.tomorrowSnow = false;
    };
    // （ここまで）

  },

}).mount();
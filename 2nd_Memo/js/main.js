//main.js

//　変数
//keyデータ
let keyDate;
let keyTitle;
let keyUScore;
let keyOScore;
//valueデータ
let valueSTime;
let valueETime;
let valueWether;
let valueWindSpeed;
let valueGame;
let valueSurface;
let valueSetCount;
let valueUName;
let valueOName;
let valueMemo;

let isFnOp;  //0:ShowTodaysWeather 1:Showlamda

/*
  メイン処理
*/

//初期設定
$(document).ready(function(){
  //日にち項目の初期値を設定(今日の日付)
  setToday();
  loadPage();
});


/* 
  外部API(OpenWeatherMap)を利用し天気、風速情報を取得
  (API実行時の情報しか取得できない仕様)
*/
$("#place").on("change", function() {
  isFnOp = 0;
  let targetCityName = $('option:selected').val();
  let appId = "97f2a97949c7e86968b41bdcfcd483ff";
  const requestUrl =
      "https://api.openweathermap.org/data/2.5/weather?APPID=" +
      appId +
      "&lang=ja&units=metric&q=" +
      targetCityName +
      ",jp;";

  // 外部APIに対し、GETメソッドで情報取得
  sendURL("GET", requestUrl, isFnOp);
});

/* XMLHttpRequestがブロックされるため要調査
//lamdaにてテニスコート情報を取得
$(document).ready(function(){
  //lamdaの処理を入れ込む
  const lamdaUrl = "https://khtpkiihzk.execute-api.ap-northeast-1.amazonaws.com/production/test"
  isFunctionOtion = 1;
  sendURL("GET", lamdaUrl, isFnOp);
});
*/

// シングルス、ダブルスの選択によって入力枠数変更
$("#singles, #doubles").on("click", function () {
  let userBoxNum = $('#userSide input[type=text]').length;
  let opponentBoxNum = $('#opponentSide input[type=text]').length;

  if(this.id === "singles"){
    $(this).addClass("selected");
    $("#doubles").removeClass("selected");
    // 入力枠が既に2つある場合、入力フォーム削除
    if( (userBoxNum == 2) && (opponentBoxNum == 2)) {
      $("#userSide input[type=text]").eq(1).remove();
      $("#opponentSide input[type=text]").eq(1).remove();
    }
  }else if(this.id === "doubles"){
    $(this).addClass("selected");
    $("#singles").removeClass("selected");
    // 入力枠が既に1つしかない場合、入力フォーム追加
    if( (userBoxNum == 1) && (opponentBoxNum == 1)) {
      $("#userSide").append('<input type="text" id="userName" />');
      $("#opponentSide").append('<input type="text" id="opponentName" />');
    }
  }
});

//サーフェス選択時の処理
$(".surface").on("click", function() {
  $(".surface").removeClass("selected");
  $(this).addClass("selected");
});

//セット数選択時の処理
$(".setCount").on("click", function() {
  $(".setCount").removeClass("selected");
  $(this).addClass("selected");
});

//保存イベント
$("#save").on("click", function () {
  //keyデータを取得しオブジェクトに格納
  setKeyDate();
  const keyObj = {
      date: keyDate,
      title: keyTitle,
      userScore: keyUScore,
      opponentScore: keyOScore,
  };

  //valueデータを取得しオブジェクトに格納
  setValueDate();
  const valueObj = {
      startTime: valueSTime,
      endTime: valueETime,
      weather: valueWether,
      wind: valueWindSpeed,
      gameStyle: valueGame,
      surface: valueSurface,
      setCount: valueSetCount,
      userName: valueUName,
      opponentName: valueOName,
      memo: valueMemo
  };

  //key、ValueをJSON形式に変換
  const jsonKey = JSON.stringify(keyObj);
  const jsonValue = JSON.stringify(valueObj);
  //JSONデータをローカルストレージに格納
  localStorage.setItem(jsonKey, jsonValue);

  const html =
    `<tr class=history><th class=historyList>
    ${keyObj.date} ${keyObj.title} ${keyObj.userScore}-${keyObj.opponentScore}
    </th><td id="edit">
    編集
    </td><td id="clear">
    削除
    </td></tr>`;
  $("#list").append(html);
});

//キャンセルイベント
$("#cancel").on("click", function () {
  alert("入力中の内容を破棄しました");
  $(".delete").val("");
  $("#cortSurface, #setCount").removeClass("selected");
});

//一括削除イベント
$("#allClear").on("click", function () {
  localStorage.clear();
  $("#list").empty();
});

//削除イベント
$(document).on("click", "#clear", function () {
  //クリックされた行番号の取得
  const row = $(this).closest('tr').index();
  //指定した行番号のkeyデータの取得
  const key = localStorage.key(row);
  localStorage.removeItem(key);
  //HTMLのListから指定した行番号の情報を削除
  let col = $(this).closest("tr").remove();
});

//編集イベント
$(document).on("click", "#edit", function () {
  //クリックされた行番号の取得
  const row = $(this).closest('tr').index();
  //指定した行番号のkeyデータの取得
  const key = localStorage.key(row);
  //指定した行番号のvalueデータの取得
  const value = localStorage.getItem(key);
  //JSONデータ→オブジェクトに変更
  const keyObj = JSON.parse(key);
  const valueObj = JSON.parse(value);
  //取得したkeyデータをHTMLに反映
  renderKeyData(keyObj);
  //取得したkeyデータをHTMLに反映
  renderKeyValue(valueObj);
});

/*
  関数
*/
//今日の日付をyyyymmdd形式で出力
function setToday() {
  let today = new Date();

  today.setDate(today.getDate());
  let yyyy = today.getFullYear();
  let mm = ("0"+(today.getMonth()+1)).slice(-2);
  let dd = ("0"+today.getDate()).slice(-2);

  $("#date").val(yyyy+'-'+mm+'-'+dd); 
}

//桁数を制限
function sliceMaxLength(elem, maxLength) {  
  elem.value = elem.value.slice(0, maxLength);  
} 

//指定したURLに対しmethodを実行
function sendURL(method, url, option){
  // Ajax通信用のオブジェクトを作成
  let xhr = new XMLHttpRequest();

  // 通信方式とURLを設定
  xhr.open(method, url);

  //通信を実行する
  xhr.send();

  //通信ステータスが変わったら実行される関数
  xhr.onreadystatechange = function () {
    //通信が完了
    if (xhr.readyState == 4) {
      if(option === 0){
        ShowTodaysWeather(xhr.responseText);
      }
      /*
      else if(option === 1) {
        Showlamda(xhr.responseText);
      }*/
    }
  }
}

//取得した天気、風速を表示   
function ShowTodaysWeather(response) {
  //API関数実行後、xhr.responseTextをJSON→オブジェクトに変換
  let obj = JSON.parse(response);

  let weather = obj.weather[0].description;
  let city = obj.name;
  let temp = obj.main.temp;
  let wind = obj.wind.speed;

  $("#weather").val(weather);
  $("#wind").val(wind);
}

/* XMLHttpRequestがブロックされるため要調査
//lamdaから取得した情報を表示   
function Showlamda(response) {
  //API関数実行後、xhr.responseTextをJSON→オブジェクトに変換
  let obj = JSON.parse(response);
  console.log(obj);
}
*/

//各変数にKeyデータを格納
function setKeyDate(){
  keyDate = $("#date").val();
  keyTitle = $("#title").val();
  keyUScore = $("#uScore").val();
  keyOScore = $("#oScore").val();
}

//各変数にvalueデータを格納
function setValueDate(){
  valueSTime = $("#startTime").val();
  valueETime = $("#endTime").val();
  valueWether = $("#weather").val();
  valueWindSpeed = $("#wind").val();
  valueGame = $("#gameStyle").find(".selected").text();
  valueSurface = $("#cortSurface").find(".selected").text();
  valueSetCount = $("#setCount").find(".selected").text();
  valueUName = $("#userName").val();
  valueOName = $("#opponentName").val();
  valueMemo = $("#tennisMemo").val();
}

//取得したkeyデータをHTMLに反映
function renderKeyData(key) {
  $("#date").val(key.date);
  $("#title").val(key.title);
  $("#uScore").val(key.userScore);
  $("#oScore").val(key.opponentScore);
}

//取得したkeyデータをHTMLに反映
function renderKeyValue(value) {
  $("#startTime").val(value.startTime);
  $("#endTime").val(value.endTime);
  $("#weather").val(value.weather);
  $("#wind").val(value.wind);
  $("#gameStyle li:contains("+value.gameStyle+")").addClass("selected");
  $("#cortSurface li:contains("+value.surface+")").addClass("selected");
  $("#setCount li:contains("+value.setCount+")").addClass("selected");
  $("#userName").val(value.userName);
  $("#opponentName").val(value.opponentName);
  $("#tennisMemo").val(value.memo);
}


//ページ読み込み時、取得済みの保存データ表示
function loadPage(){
  //ゴミが残らないようにListの中身を一度クリア
  $("#list").empty();
  for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      const keyObj = JSON.parse(key);
      const valueObj = JSON.parse(value);

      const html =
          `<tr class=history><th class=historyList>
          ${keyObj.date} ${keyObj.title} ${keyObj.userScore}-${keyObj.opponentScore}
          </th><td id="edit">
          編集
          </td><td id="clear">
          削除
          </td></tr>`;
      $("#list").append(html);
  }
}
import moment from 'moment';
import React, {useEffect} from "react";
import './App.css';

function App() {

  useEffect(() => {
    const clock = document.querySelector("#clock");

    function showHelpIMG() {
      clock.addEventListener("click", () => {
        window.open("헷갈릴때_보면_더_헷갈리는_그림.PNG", "a", "width=900, height=600, left=100, top=50");
      })
    }

    showHelpIMG();

    function getClock() {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, "0");
      const m = String(d.getMinutes()).padStart(2, "0");
      const s = String(d.getSeconds()).padStart(2, "0");

      let Dayfor;
      const today = moment().format("YYYY-MM-DD");
      const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD"); //어제
      // const tomorrow = moment().add(1, "days").format("YYYY-MM-DD"); // 내일

      const startStr = yesterday + " 21:00:00"; // 어제 21:00:00
      const endStr = today + " 20:59:59"; // 오늘 20:59:59

      const start = moment(startStr).format("YYYY-MM-DD HH:mm:ss");
      const end = moment(endStr).format("YYYY-MM-DD HH:mm:ss");
      const now = moment().format("YYYY-MM-DD HH:mm:ss");
      const flag = moment(now).isBetween(start, end); // 어제 21:00:00 ~ 오늘 20:59:59 사이인지 확인

      if(flag === true) {
        Dayfor = convertDay(moment(end).add(1,"days").day())
      } else {
        Dayfor = convertDay(moment(end).add(2,"days").day())
      }

      clock.innerHTML = `
      <p class="line1">현재 시각 ${h}:${m}:${s}</p>
      <p class="line2">지금 예약하면 <span class="highlight">${Dayfor}</span> 좌석이 예약됩니다.</p>
      `;
    }

    getClock();
    setInterval(getClock, 1000);

    function convertDay(dayNumber) {
      switch (dayNumber) {
        case 1:
          return "월요일";
          break;
        case 2:
          return "화요일";
          break;
        case 3:
          return "수요일";
          break;
        case 4:
          return "목요일";
          break;
        case 5:
          return "금요일";
          break;
        case 6:
          return "토요일";
          break;
        case 0:
          return "일요일";
          break;
      }
    }
  })
  
  return (
      <div id="items">
      <div class="column1">
        <div id="clock"></div>
        <iframe id="form"
          src="https://docs.google.com/forms/d/e/1FAIpQLScJT6AlqGneoc_4vxSbapAyMC6melfdvm_gKRS-S43QaQqzYA/viewform"
          class="items1"></iframe>
      </div>
      <div class="column2">
        <iframe id="iframe_content"
          src="https://docs.google.com/spreadsheets/d/1Fba6nUUGY9uGN5994iOvJdRD_O3EHsKLu5VqjLVuhOw/edit#gid=1998939352"
          class="items2"></iframe>
        <iframe id="iframe_content"
          src="https://docs.google.com/spreadsheets/d/1Fba6nUUGY9uGN5994iOvJdRD_O3EHsKLu5VqjLVuhOw/edit#gid=1051676199"
          class="items3"></iframe>
      </div>
    </div>
  );
}

export default App;

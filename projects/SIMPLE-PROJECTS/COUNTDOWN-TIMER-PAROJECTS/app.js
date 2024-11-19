import { months, days } from "./data.js";//import some data .............

const giveawayEndTime = document.querySelector("#giveaway-end-time");
const deadline = document.querySelector("#gifty-deadline");
const items = document.querySelectorAll(".items h4");

//set here our end of giveaway date ................

let temdate = new Date();
let temdYear = temdate.getFullYear();
let temMonth = temdate.getMonth();
let temDate = temdate.getDate();
console.log(temDate)
// const futureDate = new Date(2024, 8, 4, 14, 43, 0);

const futureDate = new Date(temdYear , temMonth , temDate + 10, 30 ,0 , 0 );

const years = futureDate.getFullYear();
const hours = futureDate.getHours();
const munites = futureDate.getMinutes();
const date = futureDate.getDate();

let month = futureDate.getMonth();
month = months[month];

let weekDay = days[futureDate.getDay()];

giveawayEndTime.innerText = `Giveaway End on ${weekDay} ${date} ${month} ${years}  ${hours}:${munites}`;

//future time in ms.......................

const futureTime = futureDate.getTime();

function reminingTime() {
  const today = new Date().getTime();
  const T = futureTime - today;

  // value 0f time in mile......

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHours = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  //  calcutate the value........

  const days = Math.floor(T / oneDay);
  const hours =  Math.floor((T % oneDay) / oneHours);
  const minutes = Math.floor((T % oneHours) / oneMinute);
  const seconds = Math.floor((T % oneMinute) / 1000);

  //set value on element..............

  const values = [days , hours , minutes , seconds];

  function formate(item){
    if(item < 10){
      return item = `0${item}`;
    }else{
      return item;
    };
  };

  items.forEach(function(element , index){
    element.innerText = formate(values[index]);
  });
  if(T < 0 ){
    clearInterval(countDown);
    deadline.innerHTML = `<h4 id="exprise">Sorry the giveway has been expired !!</4>`;
  };
};

let countDown = setInterval(reminingTime , 1000);
reminingTime();
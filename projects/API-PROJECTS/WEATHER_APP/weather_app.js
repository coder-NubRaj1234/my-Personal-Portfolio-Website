const weather_api = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const key = "&appid=f2edc4ef119c726f5b5f508da84e2504";

let temp = document.querySelector(".temp");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let input = document.querySelector(".search input");
let button = document.querySelector(".search button");
let cityName = document.querySelector(".city");
let weatherIcon = document.querySelector(".weather-icon");


let getData = async (city) =>{
    let respomse = await fetch(weather_api+city+`${key}`);
    if(!respomse.ok){
        alert("Invalite Name")
    };
    let data = await respomse.json();

    temp.innerText = Math.round(data.main.temp )+ "°c";
    humidity.innerText = data.main.humidity + "%";
    wind.innerText = data.wind.speed + " km/h";
    cityName.innerText = data.name;

    let weather = data.weather[0].main;

    if(weather =="Rain"){
        weatherIcon.src = "./images/rain.png";
    }else if(weather == "Clear"){
        weatherIcon.src = "./images/clear.png";
    }else if(weather == "Clouds"){
        weatherIcon.src = "./images/clouds.png";
    }else if(weather == "Drizzle"){
        weatherIcon.src = "./images/drizzle.png";
    }else if(weather == "Mist"){
        weatherIcon.src = "./images/mist.png";
    }else if(weather == "Snow"){
        weatherIcon.src = "./images/snow.png";
    }

    console.log(weather);

    console.log(data);
};

button.addEventListener("click" , () =>{
    getData(input.value)
});
window.addEventListener("load" , () =>{
    getData(input.value)
});


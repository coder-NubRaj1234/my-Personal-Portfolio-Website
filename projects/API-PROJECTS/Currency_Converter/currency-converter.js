// let Base_url = "https://v6.exchangerate-api.com/v6/911ddbb54049e47ce8b6d546/latest/USD";

const dropDown = document.querySelectorAll(".drop-down select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let input = document.querySelector(".amount input");
let msg = document.querySelector(".msg");

window.addEventListener("load" , () =>{
    getData();
});

for (let select of dropDown) {

    for (currCode in countryList) {

        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "NPR") {
            newOption.selected = "selected"
        }

        select.append(newOption);
    }
    select.addEventListener("change", (evn) => {
        flagUpdate(evn.target);
    });
};

let flagUpdate = (element) => {

    let curCode = element.value;// What Happend Here 
    let counteryCode = countryList[curCode];
    let newLink = `https://flagsapi.com/${counteryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newLink;
};

btn.addEventListener("click" , async(event) =>{
    event.preventDefault();
    
    let amountVal = input.value;
    
    if(amountVal === "" || amountVal < 1){
        input.value ="1";
        amountVal = 1;
    }
    getData();

});



const getData = async() =>{
    
    let URl = `https://v6.exchangerate-api.com/v6/911ddbb54049e47ce8b6d546/latest/${fromCurr.value}`;// Here from Exchange Rate Api Pass

    let response = await fetch(URl);
    if(!response.ok){
        console.log("Something Wrong With Your url")
    }
    let result =await response.json();

    let exchangeRate = result.conversion_rates[toCurr.value];//Here get Exchange Rate
    let totalExchangeRate = exchangeRate * input.value;
    let finalExchangeRate = totalExchangeRate.toFixed(2);

    msg.innerText = `${input.value} ${fromCurr.value}  = ${finalExchangeRate}  ${toCurr.value}`;


}

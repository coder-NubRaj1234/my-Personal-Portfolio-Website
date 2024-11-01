
let result = document.querySelector("#resul");
const btn = document.querySelector("#btn");


btn.addEventListener("click", async (event) => {
result.innerHTML = `<img src="./image/loadiung.svg" alt=""></img>`

    event.preventDefault()
    console.log("click");
    let email = document.getElementById("email").value;


    let key = "ema_live_aIvnFQFUCWSLA9sLLhfgVjkGuO0QI4qU4e7CA86r";
    const URL = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;

    let str = ``;

    let data = await fetch(URL);
    let ans = await data.json();
    console.log(ans)
    for (key of Object.keys(ans)) {
        if (ans[key] !== "") {
            str = str + `<div>${key} : ${ans[key]}</div> `;
        }
    }
    result.innerHTML = str;
})






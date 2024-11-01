let buttons = document.querySelectorAll(".displayValue");
let displayInput = document.querySelector("input[name ='display']");
let acBtn = document.querySelector("#ac");
let deleteBtn = document.querySelector("#de");
let equal = document.querySelector(".equal");


buttons.forEach((btn) =>{
    btn.addEventListener("click" , () =>{
        displayInput.value += btn.value;
    });
});
equal.addEventListener("click" , () =>{
    displayInput.value = eval(displayInput.value);
})
acBtn.addEventListener("click" , () =>{
    displayInput.value = "";
});
deleteBtn.addEventListener("click" , () =>{
    displayInput.value = displayInput.value.toString().slice(0,-1)
});

window.addEventListener("load" , () =>{
    displayInput.value = ""; 
});









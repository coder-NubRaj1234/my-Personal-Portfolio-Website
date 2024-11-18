import { loaderFilePath } from "./header.js";

//Whine user input value the input feild size scale..
{
    const allInputElements = document.querySelectorAll("form input ,form textarea");
    const form = document.querySelectorAll("form")
    form.forEach(function (fomrItem) {
        fomrItem.addEventListener("click", function (event) {
            setSclaeForInput(event);
        });
    });
    function setSclaeForInput(event) {
        allInputElements.forEach(function (item) {
            if (event.target == item) {
                item.style.transform = "scale(1.01)";
            } else if (item.style.transform) {
                item.style.transform = "";
            };
        });
    };

};

//this code for whine user send meassge from form ..........

//here send emial key..
const EmilKey = "1lpR-z-dR4iirjwP5"
{

    (function () {
        emailjs.init(EmilKey);
    })();
};

{
    let isContactFormSend = false;
    let isHairFormSend = false;
    const contactFormCon = document.querySelector("#form-container");
    const hairFormCon = document.getElementById("hair-me-container");



    //send mail loader .....
    const loaderElm = document.createElement("img");
    function loaderSet(width, container) {

        loaderElm.src = loaderFilePath;
        loaderElm.style.width = `${width}px`;

        if (isContactFormSend) {
            loaderElm.classList.add("loader");
            loaderElm.style.left = "47.5%";
        };

        if (isHairFormSend) {
            loaderElm.classList.add("loader");
            loaderElm.style.left = "45%";
        };

        container.prepend(loaderElm);
    };

    function loaderRomove() {
        loaderElm.remove();
    };


    //which fomr is submited..
    let contactFormFill = false;
    let hairFormFill = false;


    let isInputFieldFill;
    // contact form..........

    const contactForm = document.getElementById("form");

    // event for contact form........
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        isHairFormSend = false;
        isContactFormSend = true;
        const loaderWidth = 100;
        loaderSet(loaderWidth, contactFormCon);

        contactFormFill = true;
        setInputValue();
    });


    //hair form......
    const hairSendBtn = document.querySelector("#hair-send-btn");

    //event for hairform...........
    hairSendBtn.addEventListener("click", function (e) {
        e.preventDefault();
        isContactFormSend = false;
        isHairFormSend = true;

        const loaderWidth = 100;
        loaderSet(loaderWidth, hairFormCon);

        hairFormFill = true;
        setInputValue();
    });


    //input varibles...
    let inputNameElm;
    let inputEmailElm;
    let inputNumberElm;
    let inputMessageElm;

    //message input value
    let message;
    let name_Value;
    let email_Value;
    let number_Value;
    let message_Value;

    //message key value..

    let nameKey = "Name ";
    let emailKey = "Gmail id ";
    let numberKey = "Phone No ";
    let messageKey = "Message ";

    //varibles for emial..
    let emial;
    let emialIsValid = false;
    let userNumberLength = 0;
    let isGmailId = false;
    let phoneNumber = false;
    let isInputValue = false;

    const setOfNumber = "1234567890";
    //set of inpus elemets Array..

    let inputElmArray = [];
    let inputElmArrayValue = [];
    let inputLablesElmArray = [];

    let nameLableElm;
    let emailLableElm;
    let numberLableElm;
    let messageLableElm;

    //after input error check input value......

    const inputEmtyError = "<span>Fill This Field</span>";


    function checkInputValue() {


        nameLableElm = document.querySelector(`[for='${inputNameElm.id}']`);
        emailLableElm = document.querySelector(`[for='${inputEmailElm.id}']`);
        numberLableElm = document.querySelector(`[for='${inputNumberElm.id}']`);
        messageLableElm = document.querySelector(`[for='${inputMessageElm.id}']`);

        inputElmArray = [inputNameElm, inputEmailElm, inputNumberElm, inputMessageElm];
        inputElmArrayValue = [name_Value, email_Value, number_Value, message_Value];
        inputLablesElmArray = [nameLableElm, emailLableElm, numberLableElm, messageLableElm];



        inputElmArrayValue.forEach(function (items, index) {
            !items && items == '' ? loaderRomove() : '';
            if (items == "" || !items) {
                inputElmArray[index].classList.add("red-border");
                inputLablesElmArray[index].innerHTML = `${inputElmArray[index]?.name}${inputEmtyError}`;
                formHeightWidthSet();
            } else {
                inputElmArray[index].classList.remove("red-border");
                inputLablesElmArray[index].innerHTML = `${inputElmArray[index]?.name}${""}`;
                formHeightWidthSet();
            };
            //check here input field are fill or not..........
            isInputFieldFill = !items || items == "" ? false : true;

        });
    };

    //set forms inputs values..
    function setInputValue() {
        if (contactFormFill) {
            inputNameElm = document.getElementById("name");
            inputEmailElm = document.getElementById("email");
            inputNumberElm = document.getElementById("number");
            inputMessageElm = document.getElementById("message");

            name_Value = inputNameElm.value;
            email_Value = inputEmailElm.value;
            number_Value = inputNumberElm.value;
            message_Value = inputMessageElm.value;

            checkInputValue();
            checkForm(contactFormFill);

            message = "Somebody Contact You !!";

            checkFormValidation();
            contactFormFill = false;
            hairFormFill = false;


        } else if (hairFormFill) {

            inputNameElm = document.getElementById("h-name");
            inputEmailElm = document.getElementById("h-email");
            inputNumberElm = document.getElementById("h-number");
            inputMessageElm = document.getElementById("h-message");

            name_Value = inputNameElm.value;
            email_Value = inputEmailElm.value;
            number_Value = inputNumberElm.value;
            message_Value = inputMessageElm.value;

            checkInputValue();
            checkForm(hairFormFill);

            message = "Somebody Hair You !!";

            checkFormValidation();

            contactFormFill = false;
            hairFormFill = false;

        } else {
            console.log("Some Things wrongs  in input sections......");
        };
    };

    //check the form is valid or not........

    function checkFormValidation(fillForm) {
        if (name_Value && message_Value && emialIsValid && phoneNumber && isInputFieldFill) {
            var message = "";
            errorMessageForEmial(message);
            sendEmail(fillForm);
        }
    };

    //check Emial Validation..
    async function checkEmialValadition(fillForm) {

        emialIsValid = false;
        let key = "ema_live_c5zHw3qaY1nC4Gwkk2l9fknVeNy5PddLdbjQ7rRm";
        const URL = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email_Value}`;
        (async function () {

            let response = await fetch(URL);
            let result = await response.json();



            if (result.state == 'deliverable' || result.message !== "Validation error") {
                emialIsValid = true;

                inputEmailElm.classList.remove("red-border");
                checkFormValidation(fillForm);

            }
            else {
                emialIsValid = false;
                message = "<span>Incorrect emial addresh</span>";
                inputEmailElm.classList.add("red-border");
                errorMessageForEmial(message);
                loaderRomove();
            };

        })();

    };
    //set error in inpus...
    function errorMessageForEmial(errorMessgae) {
        if (inputEmailElm.id == "email") {
            inputEmailElm.labels[0].innerHTML = `${inputEmailElm?.name}${errorMessgae}`;
        } else if (inputEmailElm.id == "h-email") {
            inputEmailElm.labels[0].innerHTML = `${inputEmailElm?.name}${errorMessgae}`;
        };
    };
    //check number......
    function checkNumberValidtisan() {
        userNumberLength = 0;
        const regex = /^[0-9]+$/;

        if (regex.test(number_Value)) {

            for (let i = 0; i <= number_Value.length - 1; i++) {
                for (let j = 0; j <= setOfNumber.length - 1; j++) {
                    if (number_Value[i] == setOfNumber[j]) {
                        userNumberLength++;
                    };
                };
            };
        };


        phoneNumber = userNumberLength == 10 ? true : false;

        const numberErrorMessage = "<span>Enter Correct Number</span>"

        if (phoneNumber && number_Value) {
            inputNumberElm.classList.remove("red-border");
            numberLableElm.innerHTML = `${inputNumberElm?.name}${""}`;
        }
        else if (!phoneNumber && !number_Value) {
            inputNumberElm.classList.add("red-border");

        }
        else {
            inputNumberElm.classList.add("red-border");
            numberLableElm.innerHTML = numberLableElm.innerHTML = `${inputNumberElm?.name}${numberErrorMessage}`;
            loaderRomove();
        };

    };

    async function checkForm(fillForm) {


        //call numberValidtain ckeck function..
        checkNumberValidtisan();

        checkUserGmailId(fillForm);
    };
    function checkUserGmailId(fillForm) {
        email_Value = email_Value.trim();
        if (email_Value) {
            checkEmialValadition(fillForm);
        } else {
            emialIsValid = false;
            inputEmailElm.classList.add("red-border");
            errorMessageForEmial("<span>Fill This Field !!</span>");
        };
    };

    const conSendMessageElm = document.getElementById("con-sucess-mes");
    const hairSendMessageElm = document.getElementById("hair-form-message");

    const sendMessageSucess = "Thanks For Message. I Well Reply Soon <i class='fa-solid fa-check'></i>";
    const sendMessageFail = "Mess age Fail Try Again<i class='fa-regular fa-circle-xmark'></i>";

    function sendEmail() {
        const templateParams = {
            //those are value of inputes.............
            name_Value,
            email_Value,
            number_Value,
            message_Value,

            //those are key of value in email............
            nameKey,
            emailKey,
            numberKey,
            messageKey,

            //which form is fill and Give messags ..
            message,
        };

        emailjs.send('service_zo99ucs', 'template_0gdiohz', templateParams)
            .then(function (response) {
                loaderRomove();
                clearInputValue();
                sendMessage(sendMessageSucess);
            }, function (error) {
                loaderRomove();
                sendMessage(sendMessageFail);
                isContactFormSend ? conSendMessageElm.classList.add("red-color") : hairSendMessageElm?.classList.add("red-color");
            });
    };
    function sendMessage(message) {
        if (isContactFormSend) {
            conSendMessageElm.classList.remove("red-color")
            conSendMessageElm.innerHTML = message;
            setTimeout(function () {
                conSendMessageElm.innerHTML = "";
            }, 10000);
        }
        else if (isHairFormSend) {
            const hairSendMessageElm = document.createElement("p");
            hairSendMessageElm.classList.remove("red-color");
            hairSendMessageElm.setAttribute("id", "hair-form-message");
            hairSendMessageElm.innerHTML = message;
            hairFormCon.prepend(hairSendMessageElm);

            setTimeout(function () {
                hairSendMessageElm.remove();
            }, 10000);
        };
    };

    var clearInputValue = function () {
        inputElmArray.forEach(function (items, index) {
            items.value = "";
            items.classList.remove("red-border");
        });
        if (inputElmArray) {
            inputLablesElmArray.forEach(function (item, index) {
                item.innerHTML = inputElmArray[index]?.name;
            });
        };
    };
};


//set input fileds widths........
{
    let text_area = document.getElementById("text-area");
    const inputCon = document.getElementById("input");
    const inputConLable = document.querySelector("label[for='name']")


    var formHeightWidthSet = function () {
        text_area.style.height = `${inputCon.clientHeight - inputConLable.clientHeight}px`;
        text_area.style.width = `${inputCon.clientWidth}px`;
    };
    formHeightWidthSet();

}

export { clearInputValue, formHeightWidthSet };
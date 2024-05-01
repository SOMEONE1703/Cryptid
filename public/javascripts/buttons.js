var currentText='intro';
var currentNumber = '0';
var getText = '0';


//console.log(getAllJsons(currentText));


async function initialize() {
    try {
        const fileNames = await getAllJsons(currentText);
        drawIt('maps/' + currentText + '/' + fileNames[parseInt(currentNumber)]);
    } catch (error) {
        console.error("Error initializing:", error);
    }
}

initialize(); 

document.addEventListener("DOMContentLoaded", function() {
    // Add event listener to the button
    const button = document.getElementById("difficulty");
    button.addEventListener("click", async function() {

        currentText= button.textContent;
        if(currentText=='intro') currentText='normal';
        else currentText='intro';
        button.textContent = currentText;
        // Call your function here
        try {
            const fileNames = await getAllJsons(currentText);
            drawIt('maps/' + currentText + '/' + fileNames[parseInt(currentNumber)]);
        } catch (error) {
            console.error("Error handling difficulty change:", error);
        }
        //console.log(getAllJsons(currentText));
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Add event listener to the button
    const button = document.getElementById("number");
    button.addEventListener("click", async function() {

        currentNumber= button.textContent;
        if(currentText=='Intro') currentNumber=(parseInt(currentNumber)+1)%2193;
        else currentNumber=(parseInt(currentNumber)+1)%2224;
        button.textContent = ''+currentNumber;
        try {
            const fileNames = await getAllJsons(currentText);
            drawIt('maps/' + currentText + '/' + fileNames[parseInt(currentNumber)]);
        } catch (error) {
            console.error("Error handling difficulty change:", error);
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Add event listener to the button
    const button = document.getElementById("customNumber");
    const input = document.getElementById("custom");
    button.addEventListener("click", function() {
        console.log("here");
        getText= input.value;
        console.log(getText);
        if(getText.length) drawIt2(getText);
    });
});
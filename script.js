const container = document.getElementsByClassName("container");
const pixel = document.getElementsByClassName("pixel");
const slider = document.getElementById("slider");
const confirmValue = document.getElementById("confirmValue");
const sliderValue = document.getElementById("sliderValue");
const resetButton = document.getElementById("resetButton");
const colorPicker = document.getElementById("color");

const colorRadio = document.getElementById("colorRadio");
const rgbRadio = document.getElementById("rgbRadio");
const greyRadio = document.getElementById("greyRadio");

let p = slider.value;
sliderValue.textContent = `${p} x ${p}`;

resetButton.onclick = reset;

slider.oninput = function () {
    p = document.getElementById("slider").value;
    sliderValue.textContent = `${p} x ${p}`;
}

confirmValue.onclick = function () {
    p = document.getElementById("slider").value;
    grid(p);
}

function reset() {
    grid(p);
}

function coloring() {
    if (colorRadio.checked){     
        this.style.backgroundColor = colorPicker.value;
    }

    if (greyRadio.checked){
        let bgColor = this.style.backgroundColor;
        console.log(bgColor);
        if (bgColor.includes("rgb(0, 0, 0)")){
            ;//if black
        } else if (!bgColor.includes("rgba")){
            this.style.backgroundColor = "rgba(0, 0, 0, 0.1)"; //if not gray
        } else {
            let opacity = bgColor.substr(-2, 1);
            if (opacity == 9){
                this.style.backgroundColor = "rgb(0, 0, 0)";//black
            } else {
                this.style.backgroundColor = `rgba(0, 0, 0, 0.${++opacity})`;
            }
        }
    }

    if (rgbRadio.checked){
        this.style.backgroundColor = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`;
    }
}

function grid(p){
    while (pixel.length > 0)
        pixel[0].parentNode.removeChild(pixel[0]);
    
    for (let i = 0; i < p * p; i ++){
        let newDiv = document.createElement("div");
        newDiv.classList = "pixel";
        container[0].appendChild(newDiv);
        pixel[i].style.backgroundColor = "rgb(255, 255, 255)";
    }
    let str = "";
    let str2 = "";
    
    for (let i = 0; i < p; i++){
        str += "1fr ";
        str2 += '"';
        for (let i = 0; i < p; i++){
            str2 += ". ";
        }
        str2 += '"\n';
    }
    container[0].setAttribute(`style`, `grid-template-columns:${str};\ngrid-template-rows:${str};\ngrid-template-areas:\n${str2};`);
    for (let i = 0; i < pixel.length; i++){
        pixel[i].addEventListener("mouseover", coloring);
    }
}
grid(p);
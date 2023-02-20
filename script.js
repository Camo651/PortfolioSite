document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.getElementById("themeToggle").addEventListener("click", toggleColourMode);

let colourMode = 0;
toggleColourMode();
function toggleColourMode(){
    document.getElementById("themeToggle").dataset.theme = colourMode == 0 ? "dark" : "light";
    if(colourMode == 0){
        document.documentElement.style.setProperty('--background', '#0d0e0e');
        document.documentElement.style.setProperty('--foreground', '#151616');
        document.documentElement.style.setProperty('--textColour', '#ffffff');
        document.documentElement.style.setProperty('--accent', '#8bc5d4');
        document.getElementById("iFrameOverlayLight").style.opacity = "0";
        document.getElementById("iFrameOverlay").style.opacity = "1";
        document.getElementById("brightness").innerHTML = "brightness_1";
        document.getElementById("brightness").parentElement.style.justifyContent = "flex-start";
        

        colourMode = 1;
    }else{
        document.documentElement.style.setProperty('--background', '#edf1f1');
        document.documentElement.style.setProperty('--foreground', '#c6d2d2');
        document.documentElement.style.setProperty('--textColour', '#000000');
        document.documentElement.style.setProperty('--accent', '#153138');
        document.getElementById("iFrameOverlayLight").style.opacity = "1";
        document.getElementById("iFrameOverlay").style.opacity = "0";
        document.getElementById("brightness").innerHTML = "light_mode";
        document.getElementById("brightness").parentElement.style.justifyContent = "flex-end";


        colourMode = 0;
    }
}

animateText(0);
async function animateText(cycle){
    let id="thingsTxt";
    let elm = document.getElementById(id);
    let tape = ["Websites", "Games", "Mobile Apps", "Tools", "Mods", "Things", "Simulations", "Databases", "Webapps", "Servers", "Projects"];
    let longestTape = 0;
    for(let i = 0; i < tape.length; i++)
        if(tape[i].length > longestTape)
            longestTape = tape[i].length;
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{};':,./<>?`~";
    let oldTxt = elm.innerHTML;
    if(cycle >= tape.length){
        cycle = 0;
    }
    newTxt = tape[cycle];
    maxLen = Math.min(Math.max(oldTxt.length, newTxt.length), longestTape);
    //slowly change each character in the innerHTML to a random character
    for(let i = 0; i < longestTape; i++){
        await new Promise(resolve => setTimeout(resolve, 40));
        elm.innerHTML = editChar(elm.innerHTML, i, chars[Math.floor(Math.random() * chars.length)]);
    }
    await new Promise(resolve => setTimeout(resolve, 20));
    let currTxt = elm.innerHTML;
    //slowly change each character in the innerHTML to the correct character
    maxLen = Math.max(currTxt.length, newTxt.length);
    for(let i = 0; i < maxLen; i++){
        await new Promise(resolve => setTimeout(resolve, 40));
        let newChar = newTxt.length > i ? newTxt[i] : " ";
        elm.innerHTML = editChar(elm.innerHTML, i, newChar);
    }
    elm.innerHTML = newTxt;
    //call this function again after a delay
    setTimeout(function(){
        animateText(cycle+1);
    },Math.random() * 1000 + 2000);
}

function editChar(str, index, chr) {
    if(chr == undefined || chr == null)
        chr = " ";
    if(index > str.length-1)
        return str + chr;
    return str.substr(0,index) + chr + str.substr(index+1);
}

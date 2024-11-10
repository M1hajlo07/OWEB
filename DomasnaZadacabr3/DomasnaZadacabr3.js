let zborovi = ["kniga", "kuce", "zivot", "sonce", "oko", "raka", "mozok", "topka", "drvo", "avion"];
let obidi = 5; 
let izbran_zbor;
var vlez = document.getElementById("word-input");
var rezultat = document.getElementById("result");
var obid = document.getElementById("attempts");
var button = document.getElementById("submit-btn");
var newbutton = document.getElementById("new-submit-btn");
var hint_e = document.getElementById("pomos"); 
function start() {
    obidi = 5;
    izbran_zbor = zborovi[Math.floor(Math.random() * zborovi.length)]; 
    let hint = izbran_zbor.charAt(0) + izbran_zbor.charAt(1) + "_".repeat(izbran_zbor.length - 2); 
    hint_e.textContent = "Pomos: " + hint; 
    obid.textContent = "Imas vkupno 5 obidi."; 
    rezultat.textContent = ""; 
    vlez.value = ""; 
    button.disabled = false; 
    vlez.disabled = false; 
    newbutton.style.display = "none";
    button.style.display = "inline-block"; 
    obid.style.display = "inline-block";
  
}

function proveri() {
    let tek_zbor = vlez.value;
    if (tek_zbor.length !== izbran_zbor.length) { 
        window.alert("Zborot treba da sodrzi " + izbran_zbor.length + " bukvi.");
        vlez.value = "";
        return;
    }
    obidi--; 
    if (tek_zbor === izbran_zbor) { 
        rezultat.textContent = "Uspesno go pogodivte zborot!!!";
        window.alert("Igrata e uspesno zavrsena!");
        newbutton.style.display = "inline-block";
        button.style.display = "none"; 
        vlez.disabled = true; 
        obid.style.display = "none"; 
    }
     else {
        if (obidi > 0) {
            obid.textContent = "Preostanati obidi: " + obidi; 
            vlez.value = "";
            window.alert("Gresen zbor! Probaj uste ednas.");
        } else {
            rezultat.innerHTML = "Ne uspea da go pogodis zborot vo dozvolenite obidi.<br>Baraniot zbor bese: " + izbran_zbor;
            window.alert("Igrata ne e uspesno zavrsena.");
            newbutton.style.display = "inline-block";
            vlez.disabled = true; 
            button.style.display = "none";
            obid.style.display = "none"; 
            
        }
    }
}
newbutton.addEventListener("click",start);
button.addEventListener("click", proveri); 
window.addEventListener("load", start, false);

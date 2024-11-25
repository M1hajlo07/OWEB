var broj;
var numTries=5;
function start(){

broj=Math.floor(Math.random()*10)+1;
document.getElementById("pogodoci").style.display="none";
numTries=5;
document.getElementById("broj").value="";
}
function proveriBroj(){
    var brojce=document.getElementById("broj").value;
    brojce=parseInt(brojce);
    if(brojce<0 || brojce>10){
        window.alert("Vnesovte gresen broj! Obidete se povtorno!");
        document.getElementById("broj").value="";
        return;

    }
    else{
        if(brojce==broj){
            var pogodok= 5-numTries;
            window.alert("Go pogodivte brojot so " + pogodok + " pogodoci");
            document.getElementById("broj").value=" ";
            start();
        }
        else{
            if(numTries>1){
            numTries--;
            document.getElementById("pogodoci").style.display="inline-block";
            document.getElementById("pogodoci").innerHTML="Imate uste " + numTries + " pogodoci";
            document.getElementById("broj").value="";
        }
        else{
                window.alert("Ne uspeavte.");
                start();
        }

         }
    }
}
window.addEventListener("load",start,false);
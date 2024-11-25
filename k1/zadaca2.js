var counter=0;
function dodadiKvadrat(){
var pom1=document.createElement("div");
var kvadrat=document.getElementById("kocka");
pom1.className=kvadrat.className;
pom1.id="kocka" + counter++;
document.getElementById("pom").appendChild(pom1);
pom1.addEventListener('click', Klikni);
pom1.addEventListener('mouseenter', hover);
pom1.addEventListener('mouseleave', trgni);
}
function Klikni(){
   
    this.style.borderRadius = "10%";   
}
function hover(){
   
    this.style.backgroundColor = "green";
}
function trgni(){
   
    this.style.backgroundColor = "white";
}

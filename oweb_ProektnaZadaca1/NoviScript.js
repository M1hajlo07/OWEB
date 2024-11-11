let currentSlide = 0;
function showSlide(index) {
    const slides = document.querySelectorAll('.heading');
    const totalSlides = slides.length;

    if (index >= totalSlides - 2) {
        currentSlide = totalSlides - 3;
    } else if (index < 0) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }

    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(${-currentSlide * (100 / 3)}%)`;
}

function moveSlide(direction) {
    showSlide(currentSlide + direction);
}


showSlide(currentSlide);

function funk(car){   
var objectSliki = {title:car,slika1: car+'1'+'.jpg', slika2: car+'2'+'.jpg', slika3:car+'3'+'.jpg'};
localStorage.setItem("slika",JSON.stringify(objectSliki));
window.location.href = "galerija.html"
}
function setImages(){
    sessionClicked=1;
    var carInteractionsStorage = [
        {"title":"nissan","likes":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="nissan")?.likes ?? 0,"comments":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="nissan")?.comments??[]},
        {"title":"toyota","likes":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="toyota")?.likes??0,"comments":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="toyota")?.comments??[]},
        {"title":"renault","likes":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="renault")?.likes??0,"comments":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="renault")?.comments??[]},
        {"title":"toyotac","likes":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="toyotac").likes??0,"comments":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="toyotac")?.comments??[]},
        {"title":"duster","likes":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="duster").likes??0,"comments":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="duster")?.comments??[]},
        {"title":"qashqai","likes":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="qashqai")?.likes??0,"comments":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="qashqai")?.comments??[]},
        {"title":"highlander","likes":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="highlander")?.likes??0,"comments":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="highlander")?.comments??[]},
        {"title":"megane","likes":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="megane")?.likes??0,"comments":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="megane")?.comments??[]},
        {"title":"dacia","likes":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="dacia")?.likes??0,"comments":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="dacia")?.comments??[]},
        {"title":"yaris","likes":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="yaris")?.likes??0,"comments":JSON.parse(localStorage.getItem("interactions"))?.find(o=>o.title==="yaris")?.comments??[]}
    ];
    localStorage.setItem("interactions",JSON.stringify(carInteractionsStorage));
    var storage = localStorage.getItem("slika");
    var JSONStorage = JSON.parse(storage);
    document.getElementById("slika1").src=JSONStorage.slika1;
    document.getElementById("slika2").src=JSONStorage.slika2;
    document.getElementById("slika3").src=JSONStorage.slika3;
    var title = JSONStorage.title;
    var like = JSON.parse(localStorage.getItem("interactions")).find(o=>o.title===title).likes;
    document.getElementById("counter").innerHTML=like;
    displayComments(title);
}

function incrementLikes(object){
    var title = JSON.parse(object).title;
    var heart= document.getElementById("heart");
    var interactions = JSON.parse(localStorage.getItem("interactions"));
    if(sessionClicked===1){
    interactions.find(o=>o.title===title).likes++;
    sessionClicked=0;
    heart.style.color='rgb(239, 75, 75)';
    }
    else if(sessionClicked==0)
    {
        interactions.find(o=>o.title===title).likes--;
        sessionClicked=1;
        heart.style.color="white"
    }
    localStorage.setItem("interactions",JSON.stringify(interactions));
    var like = JSON.parse(localStorage.getItem("interactions")).find(o=>o.title===title).likes;
    document.getElementById("counter").innerHTML=like;
}
function postComment(object) {
    var date = new Date().toLocaleString();
    const comment = document.getElementById("commentBox").value;
    var commentData = { value: comment, date: date };
    if (comment.trim() !== "") {
        var title = JSON.parse(object).title;
        var interactions = JSON.parse(localStorage.getItem("interactions"));
        interactions.find(o=>o.title===title).comments.push(commentData);
        localStorage.setItem("interactions",JSON.stringify(interactions));
        displayComments(title);
        document.getElementById("commentBox").value = "";
    }
}

function displayComments(title) {
    var interactions = JSON.parse(localStorage.getItem("interactions"));
    var carData = interactions.find(o => o.title === title);
    const commentsDiv = document.getElementById("postedComments");
    commentsDiv.innerHTML = "";

    carData.comments.forEach((element, index) => {
        var y = document.createElement("label");
        var x = document.createElement("br");
        var p = document.createElement("label");
        var z = document.createElement("label");
        var node = document.createTextNode(element.value);
        var nodeDate = document.createTextNode(element.date);

        y.style.fontSize = "1.2em";
        z.style.fontStyle = "oblique";
        z.style.fontSize = "0.8em";
        y.style.marginRight = "50px";
        y.appendChild(node);
        z.appendChild(nodeDate);
        var deleteBtn = document.createElement("span");
        deleteBtn.textContent = "Избриши"; 
        deleteBtn.style.cursor = "pointer";
        deleteBtn.style.fontSize = "15px";
        deleteBtn.style.color = "rgb(239, 75, 75)"; 
        deleteBtn.addEventListener("click", function() {
            carData.comments.splice(index, 1);
            localStorage.setItem("interactions", JSON.stringify(interactions));
            displayComments(title);
        });

        commentsDiv.appendChild(y);
        commentsDiv.appendChild(x);
        commentsDiv.appendChild(p);
        commentsDiv.appendChild(z);
        commentsDiv.appendChild(deleteBtn);
        commentsDiv.appendChild(x);
        
    });
}
function displayOpinions()
{       localStorage.setItem("opinions",localStorage.getItem("opinions")??JSON.stringify([]));
        var opinions = JSON.parse(localStorage.getItem("opinions"));
        const opinionsContainer = document.getElementById('opinionsContainer');
        opinions.forEach((element, index) => {
        const newOpinion = document.createElement('div');
        newOpinion.classList.add('opinion');
        newOpinion.innerHTML = `
                <strong>Оцена:</strong> ${element.rating} <br>
                <strong>Препорака:</strong> ${element.recommend} <br>
                <strong>Мислење:</strong> ${element.opinionText}
            `;
            opinionsContainer.appendChild(newOpinion); 
        });
        opinionTextarea.value = '';
        document.querySelectorAll('input[name="recommend"]').forEach(input => input.checked = false);
        document.getElementById('rating').selectedIndex = 0;
}
function postOpinions()
{
    if (!recommendYes.checked && !recommendNo.checked) {
        alert("Мора да изберете дали ја препорачувате оваа веб страна!");
        return false; 
    }
    const rating = document.getElementById('rating').value;
    const recommend = document.querySelector('input[name="recommend"]:checked');
    const opinionTextarea = document.getElementById('opinionTextarea');
    const opinionText = opinionTextarea.value.trim();
    var opinionStorageData = {rating:rating,recommend:recommend.value,opinionText:opinionText};
    var opinions=JSON.parse(localStorage.getItem("opinions"));
    opinions.push(opinionStorageData);
    localStorage.setItem("opinions",JSON.stringify(opinions));
    const newOpinion = document.createElement('div');
        newOpinion.classList.add('opinion');
        newOpinion.innerHTML = `
                <strong>Оцена:</strong> ${rating} <br>
                <strong>Препорака:</strong> ${recommend.value} <br>
                <strong>Мислење:</strong> ${opinionText}
            `;
            opinionsContainer.appendChild(newOpinion); 

        opinionTextarea.value = '';
        document.querySelectorAll('input[name="recommend"]').forEach(input => input.checked = false);
        document.getElementById('rating').selectedIndex = 0;
    } 
        function alertForm() {
        var name = document.getElementById("name");
        var email = document.getElementById("email");
        var phone = document.getElementById("phone");
        var surname = document.getElementById("surname");
        var message = document.getElementById("message");

            if (name.value === "" || email.value === "" || phone.value === "" || surname.value === "" || message.value === "") {
                window.alert("Пополнете ги сите полиња.");
            } else {
                window.alert("Успешно закажавте тест возење!");
                name.value = "";
                email.value = "";
                phone.value = "";
                surname.value = "";
                message.value = "";
            }
        }
function test (text){
    localStorage.setItem("testTitle",text);
        
} 
function displayTitle()
{
    document.getElementById('testtitle').innerHTML=localStorage.getItem("testTitle");
}
       
    



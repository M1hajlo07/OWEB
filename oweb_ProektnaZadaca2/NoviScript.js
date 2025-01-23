let currentSlide = 0;

function showSlide(index) {
    const $slides = $('.heading');
    const totalSlides = $slides.length;

    if (index >= totalSlides - 2) {
        currentSlide = totalSlides - 3;
    } else if (index < 0) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }

    $('.slider').css('transform', `translateX(${-currentSlide * (100 / 3)}%)`);
}

function moveSlide(direction) {
    showSlide(currentSlide + direction);
}

showSlide(currentSlide);

function funk(car) {
    const objectSliki = {
        title: car,
        slika1: car + '1' + '.jpg',
        slika2: car + '2' + '.jpg',
        slika3: car + '3' + '.jpg'
    };
    localStorage.setItem("slika", JSON.stringify(objectSliki));
    window.location.href = "galerija.html";
}

function setImages() {
    sessionClicked = 1;
    const carInteractionsStorage = [
        { title: "nissan", likes: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "nissan")?.likes ?? 0, comments: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "nissan")?.comments ?? [] },
        { title: "toyota", likes: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "toyota")?.likes ?? 0, comments: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "toyota")?.comments ?? [] },
        { title: "renault", likes: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "renault")?.likes ?? 0, comments: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "renault")?.comments ?? [] },
        { title: "toyotac", likes: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "toyotac")?.likes ?? 0, comments: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "toyotac")?.comments ?? [] },
        { title: "duster", likes: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "duster")?.likes ?? 0, comments: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "duster")?.comments ?? [] },
        { title: "qashqai", likes: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "qashqai")?.likes ?? 0, comments: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "qashqai")?.comments ?? [] },
        { title: "highlander", likes: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "highlander")?.likes ?? 0, comments: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "highlander")?.comments ?? [] },
        { title: "megane", likes: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "megane")?.likes ?? 0, comments: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "megane")?.comments ?? [] },
        { title: "dacia", likes: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "dacia")?.likes ?? 0, comments: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "dacia")?.comments ?? [] },
        { title: "yaris", likes: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "yaris")?.likes ?? 0, comments: JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === "yaris")?.comments ?? [] }
    ];

    localStorage.setItem("interactions", JSON.stringify(carInteractionsStorage));

    const storage = localStorage.getItem("slika");
    const JSONStorage = JSON.parse(storage);

    $("#slika1").attr("src", JSONStorage.slika1);
    $("#slika2").attr("src", JSONStorage.slika2);
    $("#slika3").attr("src", JSONStorage.slika3);

    const title = JSONStorage.title;
    const like = JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === title)?.likes;

    $("#counter").text(like);
    displayComments(title);
}

function incrementLikes(object) {
    const title = JSON.parse(object).title;
    const $heart = $("#heart");
    const interactions = JSON.parse(localStorage.getItem("interactions"));

    if (sessionClicked === 1) {
        interactions.find(o => o.title === title).likes++;
        sessionClicked = 0;
        $heart.css('color', 'rgb(239, 75, 75)');
    } else if (sessionClicked === 0) {
        interactions.find(o => o.title === title).likes--;
        sessionClicked = 1;
        $heart.css('color', 'white');
    }

    localStorage.setItem("interactions", JSON.stringify(interactions));

    const like = JSON.parse(localStorage.getItem("interactions"))?.find(o => o.title === title)?.likes;
    $("#counter").text(like);
}

function postComment(object) {
    const date = new Date().toLocaleString();
    const comment = $("#commentBox").val().trim();

    if (comment !== "") {
        const title = JSON.parse(object).title;
        const interactions = JSON.parse(localStorage.getItem("interactions"));

        interactions.find(o => o.title === title).comments.push({ value: comment, date });
        localStorage.setItem("interactions", JSON.stringify(interactions));

        displayComments(title);
        $("#commentBox").val("");
    }
}

function displayComments(title) {
    const interactions = JSON.parse(localStorage.getItem("interactions"));
    const carData = interactions.find(o => o.title === title);

    const $commentsDiv = $("#postedComments").empty();

    carData.comments.forEach((element, index) => {
        const $comment = $(`
            <label style="font-size:1.2em; margin-right:50px;">${element.value}</label><br>
            <label style="font-style:oblique; font-size:0.8em;">${element.date}</label>
            <span style="cursor:pointer; font-size:15px; color:rgb(239, 75, 75);">Избриши</span><br>
        `);

        $comment.find("span").on("click", function () {
            carData.comments.splice(index, 1);
            localStorage.setItem("interactions", JSON.stringify(interactions));
            displayComments(title);
        });

        $commentsDiv.append($comment);
    });
}

function displayOpinions() {
    localStorage.setItem("opinions", localStorage.getItem("opinions") ?? JSON.stringify([]));

    const opinions = JSON.parse(localStorage.getItem("opinions"));
    const $opinionsContainer = $('#opinionsContainer').empty();

    opinions.forEach((element) => {
        $opinionsContainer.append(`
            <div class="opinion">
                <strong>Оцена:</strong> ${element.rating}<br>
                <strong>Препорака:</strong> ${element.recommend}<br>
                <strong>Мислење:</strong> ${element.opinionText}
            </div>
        `);
    });

    $('#opinionTextarea').val("");
    $('input[name="recommend"]').prop('checked', false);
    $('#rating').prop('selectedIndex', 0);
}

function postOpinions() {
    if (!$('#recommendYes').is(':checked') && !$('#recommendNo').is(':checked')) {
        alert("Мора да изберете дали ја препорачувате оваа веб страна!");
        return;
    }

    const rating = $('#rating').val();
    const recommend = $('input[name="recommend"]:checked').val();
    const opinionText = $('#opinionTextarea').val().trim();

    const opinionStorageData = { rating, recommend, opinionText };
    const opinions = JSON.parse(localStorage.getItem("opinions"));

    opinions.push(opinionStorageData);
    localStorage.setItem("opinions", JSON.stringify(opinions));

    $('#opinionsContainer').append(`
        <div class="opinion">
            <strong>Оцена:</strong> ${rating}<br>
            <strong>Препорака:</strong> ${recommend}<br>
            <strong>Мислење:</strong> ${opinionText}
        </div>
    `);

    $('#opinionTextarea').val("");
    $('input[name="recommend"]').prop('checked', false);
    $('#rating').prop('selectedIndex', 0);
}

function alertForm() {
    const name = $('#name').val();
    const email = $('#email').val();
    const phone = $('#phone').val();
    const surname = $('#surname').val();
    const message = $('#message').val();

    if (!name || !email || !phone || !surname || !message) {
        alert("Пополнете ги сите полиња.");
    } else {
        alert("Успешно закажавте тест возење!");
        $('#name, #email, #phone, #surname, #message').val("");
    }
}

function test(text) {
    localStorage.setItem("testTitle", text);
}

function displayTitle() {
    $('#testtitle').text(localStorage.getItem("testTitle"));
}

window.onload = function () {
    UpdateNews();
    
};

function UpdateNews() {
    fetch('news.json')
    .then(response => response.json())
    .then(data => {
            console.log(data)
            let news = data;     
            let newsCards = "";
            let i = 0
            news.forEach(element => {
                if(i > 2500){i=0}
                i += 100
                let card =  `
                    <div data-aos-delay="${i}" data-aos="flip-${element.id%2==0?"up":"down"}" data-aos-duration="1000" class="col-6 col-lg-4 w-s-100">
                        <div id="${element.id}" class="card mb-4 newsCard" rel="newsCard" onclick=ShowDetails(${element.id})>
                            <img src="${element.ImagePath}" class="img-fluid">
                            <div class="card-body cbt">
                                <h2 style="display-6">${element.Head}</h2>
                                <p class="text-muted">${element.Date}</p>
                                <p class="text-muted">${element.Comments.length ? 'Комментариев: ' + element.Comments.length : "Нет комментариев"}</p>
                            </div>
                        </div>
                    </div>
                `;
                newsCards += card;
            });
            document.getElementById("detailPage").innerHTML = `<div id="newsContainer" class="row" data-masonry='{"percentPosition": true}'>`
            document.getElementById("newsContainer").innerHTML = newsCards;
            
            
            // Инициализация Masonry после загрузки контента
            var grid = document.querySelector('#newsContainer');
            new Masonry(grid, {
                itemSelector: '.col-6', 
                percentPosition: true
            });
            setTimeout(function () {
                var grid = document.querySelector('#newsContainer');
                if (grid) {
                    new Masonry(grid, {
                        itemSelector: '.col-6',
                        percentPosition: true
                    });
                }
            }, 500);
    })
    .catch(error => console.error('Ошибка GET:', error));
    
    
}

function ShowDetails(id){
    console.log(id)
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'news.json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            let news = JSON.parse(xhr.responseText);    
            for(let i =0;i<news.length;i++){
                if(news[i].id == id){
                    news = news[i]
                }
            } 
            console.log(news)
            let ul=""
            if(news.Comments.length>0){
                for(let i = 0;i<news.Comments.length;i++){
                    let li = `
                    <li class="comments-list d-flex my-3">
                        <div class="row">
                            <div class="col-sm-12 col-md-2 d-flex justify-content-center">
                                <img src="images/user.png" class="img-thumbnail img-fluid" alt="">
                            </div>
                            <div class="col-sm=12 col-md-10">
                                <div class="row">
                                    <div class="col-12 comments-list-des">
                                        ${news.Comments[i].Author} - ${news.Comments[i].CommentDate}
                                    </div>
                                </div>
                                <div class="row h-75 d-flex align-items-center">
                                    <div class="col-12 text-align-center">
                                        ${news.Comments[i].Description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    `
                    ul+=li
                }
            }
            else{
                ul="Комментарии отсутствуют"
            }
            
            let detailCard = `
            <div data-aos-delay="0" data-aos="zoom-in" data-aos-duration="1000" class="container">
                <div data-aos="fade-left" data-aos-duration="500" class="row">
                    <div class="col-12">
                        <button type="button" class="btn-close" onclick=UpdateNews()></button>
                    </div>
                </div>
                <div data-aos="fade-right" data-aos-duration="1000" class="row d-flex flex-column flex-md-row">
                    <div class="col-6 text-start text-muted">Дата: ${news.Date}</div>
                    <div class="col-6 text-muted text-start text-md-end">Идентификатор новости: ${news.id}</div>
                </div>
                <div data-aos="fade-right" data-aos-duration="3000" class="row">
                    <p class="display-3 fw-bold">${news.Head}</p>
                    <p>${news.MiniHead}</p>
                    <p>Автор: ${news.Author}</p>
                </div>
                <div data-aos="zoom-in" data-aos-duration="1000" class="row">
                    <div  class="col-12 d-flex justify-content-center">
                        <img src="${news.ImagePath}" alt="" srcset="" class="img-fluid">
                    </div>
                </div>
                <div data-aos="fade-up" data-aos-duration="1000" class="row mt-5">
                    <p>
                        ${news.Description}
                    </p>
                </div>
                <div data-aos="flip-up" data-aos-duration="1000" class="row">
                    <h2>Комментарии:</h2>
                    <ul id="comments-lists" class="comments-lists comments">
                    ${ul}
                    </ul>
                </div>
            </div>

            `
            
            document.getElementById("detailPage").innerHTML = detailCard;
            document.querySelector('.display-2').scrollIntoView();
        } else {
            console.error('Ошибка загрузки файла');
        }
    };
    xhr.send();
}

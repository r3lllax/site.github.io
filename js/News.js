window.onload = UpdateNews;

function UpdateNews() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'news.json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            let news = JSON.parse(xhr.responseText);     
            let newsCards = "";
            news.forEach(element => {
                let card =  `
                    <div class="col-6 col-lg-4">
                        <div id="${element.id}" class="card mb-4 newsCard" rel="newsCard" onclick=ShowDetails(${element.id})>
                            <img src="${element.ImagePath}" class="mxc card-img-top img-fluid">
                            <div class="card-body">
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
        } else {
            console.error('Ошибка загрузки файла');
        }
    };
    xhr.send();
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
                            <div class="col-2">
                                <img src="images/user.png" class="img-thumbnail img-fluid" alt="">
                            </div>
                            <div class="col-10">
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
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <button type="button" class="btn-close" onclick=UpdateNews()></button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6 text-start text-muted">Дата:${news.Date}</div>
                    <div class="col-6 text-end text-muted">Идентификатор новости: ${news.id}</div>
                </div>
                <div class="row">
                    <p class="display-3 fw-bold">${news.Head}</p>
                    <p>${news.MiniHead}</p>
                    <p>Автор: ${news.Author}</p>
                </div>
                <div class="row">
                    <div class="col-12 d-flex justify-content-center">
                        <img src="${news.ImagePath}" alt="" srcset="" class="img-fluid">
                    </div>
                </div>
                <div class="row mt-5">
                    <p>
                        ${news.Description}
                    </p>
                </div>
                <div class="row">
                    <h2>Комментарии:</h2>
                    <ul id="comments-lists" class="comments-lists comments">
                    ${ul}
                    </ul>
                </div>
            </div>

            `
            
            document.getElementById("detailPage").innerHTML = detailCard;
            
            // Инициализация Masonry после загрузки контента
            var grid = document.querySelector('#newsContainer');
            new Masonry(grid, {
                itemSelector: '.col-6', 
                percentPosition: true
            });
        } else {
            console.error('Ошибка загрузки файла');
        }
    };
    xhr.send();
}
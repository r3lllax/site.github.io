window.onload = function () {
    UpdateCards();
};

function UpdateCards(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'famousPersones.json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            let news = JSON.parse(xhr.responseText);    
            let CardList = ""
            let i = 0
            news.forEach(element => {
                if(i > 450){i=0}
                i += 150
                let Card = `
                <div data-aos-delay="${i}" data-aos="zoom-in" data-aos-duration="1000" class="col">
                    <div class="card h-100 shadow-sm" >
                        <img src="${element.MainImagePath}" class="card-img-top" alt="${element.Head}" loading="lazy" >
                        <div class="card-body">
                            <h5 class="card-title">${element.Head}</h5>
                            <p class="card-text">${element.MiniHead}</p>
                            <a class="btn btn-outline-primary mt-auto" onclick=openModal(${element.id})>Подробнее</a>
                        </div>
                    </div>
                </div>
                `
                CardList+=Card
            });
            let Cards = `
            <div data-aos="fade-down" data-aos-duration="1000" class="row">
                <h1 data-aos="zoom-in" data-aos-duration="1200" class="text-center mb-5 display-4 col-12 text-light fpH">Выдающиеся люди, связанные с городом</h1>
                <div data-aos="fade-down" data-aos-duration="1000" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                    
                        ${CardList}
                    
                </div>
                
            </div>
            `
            document.getElementById("cardsContainer").innerHTML=Cards
            
        } else {
            console.error('Ошибка загрузки файла');
        }
    };
    xhr.send();
}

function openModal(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'famousPersones.json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            let person = JSON.parse(xhr.responseText);     
            for(let i = 0;i<person.length;i++){
                if(person[i].id == id){
                    person = person[i]
                }
            }
            let carouselList =`
            `
            for(let i = 0;i<person.CarouselImagePath.length;i++){
                let image= ``
                if(i==0){
                    image = `
                    <div class="carousel-item active">
                        <img src="${person.CarouselImagePath[i].ImagePath}" class="d-block w-100 mw100" alt="...">
                    </div>
                    `
                }
                else{
                    image = `
                    <div class="carousel-item">
                        <img src="${person.CarouselImagePath[i].ImagePath}" class="d-block w-100 mw100" alt="...">
                    </div>
                    `
                }
                
                carouselList+=image
            }
            let carousel = `
            <div id="carousel1" class="carousel slide carousel-fade" data-bs-ride="carousel">
                <div class="carousel-inner">
                    ${carouselList}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carousel1" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carousel1" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            `

            let AchivmentsList = ``
            for(let i =0;i<person.Achivments.length;i++){
                let Achivment = `
                    <li>${person.Achivments[i].Achivment}</li>
                `
                AchivmentsList+=Achivment
            }

            document.getElementById("myModal").innerHTML=`
                <div class="modal-dialog modal-fullscreen-md-down modal-dialog-centered">
                    <div class="modal-content modalka">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">${person.Head} (${person.YearsOfLife})</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="container">
                                ${person.CarouselImagePath.length>0?carousel:"<h2>К сожалению, нет дополнительных фото</h2>"}
                                <div class="text mt-2">
                                    <p><strong>Биография:</strong> ${person.Biography}</p>
                                    <p>
                                        <strong>Достижения:</strong>
                                        <ul>
                                            ${AchivmentsList}
                                        </ul>
                                    </p>
                                    <p><strong>Цитата: </strong>${person.Quote}</p>
                                    <p><strong>Интересный факт: </strong>${person.InterestingFact}</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        </div>
                    </div>
                </div>

    `
    var myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();
        } else {
            console.error('Ошибка загрузки файла');
        }
    };
    xhr.send();
    
  }

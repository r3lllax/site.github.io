window.onload = UpdateRests();

function openModal(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'restaurants.json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            let rests = JSON.parse(xhr.responseText);     
            console.log(rests)
            for(let i = 0;i<rests.length;i++){
                if(rests[i].id == id){
                    rests = rests[i]
                }
            }
            console.log(rests)
            let rating=''
            console.log(Math.round(rests.Rating))
            for(let i=0;i<Math.round(rests.Rating);i++){
                rating+="⭐"
            }
            if(rating.length<5){
                rating+="☆"
            }
            console.log(rating)
            
            let ul = ''
            for(let i = 0;i<rests.Comments.length;i++){
                let li = `
                    <li class="otzivi-list"><img src="images/user.png" width="50px">"${rests.Comments[i].Description}" – ${rests.Comments[i].Author}</li>
                `
                ul+=li
            }


            document.getElementById("myModal").innerHTML=`
                <div class="modal-dialog modal-fullscreen-md-down modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title display-6" id="modalLabel">${rests.Title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                        </div>
                        <div class="modal-body">
                            <div class="contrainer">
                                <p>
                                    <strong>Рейтинг:</strong>${rating}(${rests.Rating}/5)
                                </p>
                                <p>
                                    <strong>Кухня:</strong> ${rests.KitchenType}
                                </p>
                                <p>
                                    <strong>Особенности:</strong> ${rests.Specials}
                                </p>
                                <p>
                                    <strong>Меню:</strong> ${rests.Menu}
                                </p>
                                <p><strong>Отзывы:</strong></p>
                                <ul class="otzivi-lists px-0">
                                    ${ul}
                                </ul>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                            <button class="btn btn-primary" data-bs-target="#OtzivModal" data-bs-toggle="modal" data-bs-dismiss="modal">Оставить отзыв</button>
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

function UpdateRests() {

    document.getElementById("contentSection").innerHTML =`
    <div class="container">
            <div class="row">
                <div class="col-12">
                    <p class="display-3">Кафе и рестораны Рыбинска</p>
                    <p>Добро пожаловать в гид по лучшим заведениям Рыбинска! Здесь вы найдете разнообразные кафе, рестораны и места для быстрого перекуса, которые удовлетворят любой вкус и бюджет.</p>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-12">
                    <h2 id="cafe" class="display-2">Кафе</h2>
                </div>
            </div>
            <div id="containerForCafes" class="row"></div> 
            <div class="row mb-2">
                <div class="col-12">
                    <h2 id="rest" class="display-2">Рестораны</h2>
                </div>
            </div>
                <div id="containerForRests" class="row">
            </div>
            <div class="row mb-2">
                <div class="col-12">
                    <h2 id="fast-food" class="display-2">Фаст-фуд</h2>
                </div>
            </div>
                <div id="containerForFast-food" class="row"></div> 
            </div>
    </div>
    `

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'restaurants.json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            let rests = JSON.parse(xhr.responseText);     
            console.log(rests)
            let Cafes = ''
            let Rests = ''
            let FastFood = ''
            let i = 0
            rests.forEach(element => {
                
                if(i > 100){i=0}
                i += 50
                let card = `
                        <div data-aos-delay="${i}" data-aos="fade-${element.id%2==0?"down":"down"}" data-aos-duration="1200" class="col-lg-4 col-md-12 col-sm-12 d-flex justify-content-center">
                            <div class="card mycard w-100" style="width: 18rem;" onclick="openModal(${element.id})">
                                <img class="card-img-top rounded" src="${element.ImagePath}" alt="Card image cap">
                                <p class="text-center mycardp2">${element.Title}</p>
                            </div>
                        </div>
                    `
                if(element.Type == "cafe"){
                    Cafes+=card
                }
                else if(element.Type == "rest"){
                    Rests+=card
                }
                else{
                    FastFood+=card
                }
                
            });
            document.getElementById("containerForCafes").innerHTML=Cafes
            document.getElementById("containerForRests").innerHTML=Rests
            document.getElementById("containerForFast-food").innerHTML=FastFood
            
            
            
        } else {
            console.error('Ошибка загрузки файла');
        }
    };
    xhr.send();
}

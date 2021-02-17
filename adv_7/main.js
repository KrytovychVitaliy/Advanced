//http://www.omdbapi.com/?i=tt3896198&apikey=b7427879


document.getElementById('x').style.display = 'none'; //невидимість "X"

document.querySelector('input').addEventListener('input', () => document.getElementById("x").style.removeProperty('display')); //видимість "X" при введенні тексту в input

document.querySelector('input').addEventListener('focus', function () { //видимість "X" при фокусі і наявності тексту в input
    if (document.querySelector("input").value) document.getElementById("x").style.removeProperty('display');
});

document.querySelector('input').addEventListener('keypress', function(event){ //відправка запиту при кліку на кнопку Enter
    if (event.key === 'Enter') getXML();
});

document.getElementById('get').addEventListener('click', getXML); //клік по кнопці search

//клік по кнопці search
//
function getXML(num = 1, count = 1){ 
    if (document.querySelector('input').value) { //якщо введено текст для пошуку
        let countPage = num; //скільки сторінок по 10 фільмів потрібно вивести
        let countRecurs = count; //лічильник - який зараз цикл рекурсії - також, яку сторінку виводити
        document.getElementById('x').style.display = 'none'; //повернення невидимість "X"
        document.querySelector('main').innerHTML = ''; //попередня очистка блоку виведення фільмів
        mainPromise(countRecurs)
            .then(function(a){
                render(a);
                console.log(a);
            })
            .catch(error => console.log(error));
        countPage--;
        countRecurs++;
        if (countPage > 0) return getXML(countPage, countRecurs);
    };
};

//проміс списку фільмів
//
function mainPromise(countRecurs){
    return new Promise(function (resolve, reject) {
        let htt = `http://www.omdbapi.com/?s=${document.getElementById('input_text').value}&page=${countRecurs}&apikey=b7427879`;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', htt);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const a = JSON.parse(xhr.responseText);
                resolve(a);
            };
        };
        xhr.onerror = function (error) {
            reject('Error: No movie list received from server!');
        };
        xhr.send();
    });
};

//функція видруку карточок фільмів в main
//
function render(a) { 
    for (let i = 0; i < a.Search.length; i++) {
        let elem = `<div class="element">
                        <img class="poster" src='${a.Search[i].Poster.includes('http') ? a.Search[i].Poster : ''}'>
                        <div class="title"><p>${a.Search[i].Title ? a.Search[i].Title : ''}</p></div>
                        <div class="type">${a.Search[i].Type ? a.Search[i].Type : ''}</div>
                        <div class="year">${a.Search[i].Year ? a.Search[i].Year : ''}</div>
                        <div class="details" onclick="detailsClick(event)" data-id="${a.Search[i].imdbID}">More details</div>
                    </div>`;
        document.querySelector('main').insertAdjacentHTML("beforeend", elem);
    };
};

//карточка одного фільму = деталі
//
function detailsClick(event) { 
    detailPromise(event)
    .then(
        function (a){
            let elem = `<div class="background_container" onclick="backgroundClick(event)">
                            <div class="div_container">
                                <div class="div_container2">
                                    <div class="div_left">
                                        <img class="poster_element" src=${a.Poster.includes('http') ? a.Poster : ''}>
                                    </div>
                                    <div class="div_right">
                                        <div class="title_element"><h1>${a.Title ? a.Title : ''}</h1></div>
                                        <div>${a.Rated ? a.Rated : ''} ${a.Year ? a.Year : ''} ${a.Genre ? a.Genre : ''}</div>
                                        <div>${a.Plot ? a.Plot : ''}</div>
                                        <div><span>Written by: </span>${a.Writer ? a.Writer : ''}</div>
                                        <div><span>Directed by: </span>${a.Director ? a.Director : ''}</div>
                                        <div><span>Starring: </span>${a.Actors ? a.Actors : ''}</div>
                                        <div><span>BoxOffice: </span>${a.BoxOffice ? a.BoxOffice : ''}</div>
                                        <div><span>Awards: </span>${a.Awards ? a.Awards : ''}</div>
                                        <div><span>Ratings: </span>
                                            <p>${a.Ratings[0] ? a.Ratings[0].Source : ''} ${a.Ratings[0] ? a.Ratings[0].Value : ''}</p>
                                            <p>${a.Ratings[1] ? a.Ratings[1].Source : ''} ${a.Ratings[1] ? a.Ratings[1].Value : ''}</p>
                                            <p>${a.Ratings[2] ? a.Ratings[2].Source : ''} ${a.Ratings[2] ? a.Ratings[2].Value : ''}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            document.querySelector('body').insertAdjacentHTML("afterbegin", elem);
            document.body.style.overflow = 'hidden';
        }
    )
    .catch(error => console.log(error));
};

//проміс до деталів фільму
//
function detailPromise(event) { 
    return new Promise(function (resolve, reject) {
        let htt = `http://www.omdbapi.com/?i=${event.target.dataset.id}&apikey=b7427879`;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', htt);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const a = JSON.parse(xhr.responseText);
                resolve(a);
            };
        };
        xhr.onerror = function (error) {
            reject('Error: Movie not found on server!');
        };
        xhr.send();
    });
};

//закриття карточки 1 фільму - клік по сірому background
//
function backgroundClick(event) { 
    if (event.target.classList.contains('background_container')) {
        document.querySelector('.background_container').remove();
        document.body.style.overflow = "auto";
    };
};

//клік по Х
//
function xClick() { 
    document.querySelector('input').value = ''; //очищення input
    document.getElementById('x').style.display = 'none'; //невидимість "Х"
};
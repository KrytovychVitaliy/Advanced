//http://www.omdbapi.com/?i=tt3896198&apikey=b7427879


document.getElementById('x').style.display = 'none'; //невидимість "X"

document.getElementById('input_text').addEventListener('input', () => document.getElementById("x").style.removeProperty('display')); //видимість "X" при введенні тексту в input

document.getElementById('input_text').addEventListener('focus', function () { //видимість "X" при фокусі і наявності тексту в input
    if (document.querySelector("input").value) document.getElementById("x").style.removeProperty('display');
});

document.querySelector('input').addEventListener('keypress', function(event){ //відправка запиту при кліку на кнопку Enter
    event.preventDefault();
    if (event.key === 'Enter') getXML();
});

document.getElementById('get').addEventListener('click', function(event){ //клік по кнопці search
    event.preventDefault();
    getXML();
} );

//клік по кнопці search
//
function getXML(){
    if (document.getElementById('input_text').value) { //якщо введено текст для пошуку
        document.getElementById('x').style.display = 'none'; //повернення невидимість "X"
        document.querySelector('main').innerHTML = ''; //попередня очистка блоку виведення фільмів
        let htt = 'http://www.omdbapi.com/';
        const title = `?s=${document.getElementById('input_text').value}`;
        htt += title;
        let response = null;
        if (document.getElementById('input_year').value){
            const year = `&y=${document.getElementById('input_year').value}`;
            htt += year;
        };
        if (document.getElementById('input_plot').value === 'full'){
            const plot = `&plot=full`;
            htt += plot;
        };
        if (document.getElementById('input_response').value === 'xml'){
            response = `&r=xml`;
            htt += response;
        } 
        if (document.getElementById('input_page').value
            && +document.getElementById('input_page').value > 1
            ){
            const page = `&page=${Math.round(+document.getElementById('input_page').value)}`;
            htt += page;
        } 
        htt += '&apikey=b7427879';
        mainPromise(htt)
            .then(function(a){
                if (response){
                    render(xmlData(a));
                } else {
                    render(JSON.parse(a));
                };
            })
            .catch(error => console.log(error));
    };
};

function xmlData(xml){
    let arr = xml.split('<result ').slice(1);
    let Search = [];

    arr.forEach(obj => {
        const newObj = {};

        const titleStart = obj.indexOf('title="') + 'title="'.length;
        const titleEnd = obj.indexOf('"', titleStart);
        newObj.Title = obj.slice(titleStart, titleEnd);

        const idStart = obj.indexOf('imdbID="') + 'imdbID="'.length;
        const idEnd = obj.indexOf('"', idStart);
        newObj.imdbID = obj.slice(idStart, idEnd);

        const typeStart = obj.indexOf('type="') + 'type="'.length;
        const typeEnd = obj.indexOf('"', typeStart);
        newObj.Type = obj.slice(typeStart, typeEnd)

        const yearStart = obj.indexOf('year="') + 'year="'.length;
        const yearEnd = obj.indexOf('"', yearStart);
        newObj.Year = obj.slice(yearStart, yearEnd)

        const posterStart = obj.indexOf('poster="') + 'poster="'.length;
        const posterEnd = obj.indexOf('"', posterStart);
        newObj.Poster = obj.slice(posterStart, posterEnd);

        Search.push(newObj)
    });
    return {Search};
};

//проміс списку фільмів
//
function mainPromise(htt){
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', htt);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.responseText);              
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
    document.getElementById('input_text').value = ''; //очищення input
    document.getElementById('x').style.display = 'none'; //невидимість "Х"
};
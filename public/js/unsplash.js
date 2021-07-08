const localurl = 'http://localhost:3000'
const herokurl = 'https://bbidas.herokuapp.com/'
const unsPlashurl = 'https://api.unsplash.com/search/photos'

const api = new ApiHandler(window.location.href.split('/')[2].split(':').includes('localhost') ? localurl : herokurl)

const apiSplash = new ApiHandler(unsPlashurl)

const homeContainer = document.querySelector('.home-top')
const homeContainer2 = document.querySelector('.home-top2')

function trailer() {
    api.screensHandler()
        .then(res => queryForImages(res.data, 'friends'))
        .catch(err => console.log(err))
}
trailer();

setInterval(() => {

    document.querySelector('.home-top').classList.add('fadeOpacity')
    setTimeout(() => {
        trailer()
    }, 1900);
    // setTimeout(() => {

    // }, 3100);

}, 90000);

function queryForImages(res, query) {
    const randomNum = Math.trunc(Math.random() * 60 - 1)

    const url = `?page=${randomNum}&per_page=12&query=${query}&client_id=${res}`

    apiSplash
        .apiSplash(url)
        .then(response => printImages(response.data.results))
        .catch(err => {
            console.log(err)
            document.querySelector('.home-top').classList.remove('fadeOpacity')
        })
}

function printImages(dataImg) {
    let image

    homeContainer.textContent = ''

    for (let i = 0; i < 12; i++) {
        image = dataImg[i].urls.thumb
        let str = ` <div class="col-lg-2 col-md-4 col-sm-6 p-5" ><img class="shadow " src="${image}" alt="image"></div>`

        homeContainer.insertAdjacentHTML('afterbegin', str)
    }
    // console.log('ahora')
    document.querySelector('.home-top').classList.remove('fadeOpacity')
}

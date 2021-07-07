const localurl = 'http://localhost:3000'
const herokurl = 'https://bbidas.herokuapp.com/'
const unsPlashurl = 'https://api.unsplash.com/search/photos'

const api = new ApiHandler(window.location.href.split('/')[2].split(':').includes('localhost') ? localurl : herokurl)

const apiSplash = new ApiHandler(unsPlashurl)

const accesKey = 'aD6Jjsp_D3qn_bkX-NRQe-eLZwRlFaf9HPi6_mf7hpQ'

;(function () {
    api.keyHandler()
        .then(res => queryForImages(res.data, 'friends'))
        .catch(err => console.log(err))
})()

function queryForImages(res, query) {
    const randomNum = Math.trunc(Math.random() * 10 - 1)

    const url = `?page=${randomNum}&per_page=14&query=${query}&client_id=${res}`

    apiSplash
        .apiSplash(url)
        .then(response => printImages(response.data.results))
        .catch(err => console.log(err))
}

function printImages(dataImg) {
    let image
    for (let i = 0; i < 6; i++) {
        image = dataImg[i].urls.thumb

        let str = ` <div ><img class="shadow " src="${image}" alt="image"></div>`

        document.querySelector('.home-top').insertAdjacentHTML('afterbegin', str)
    }
    for (let i = 6; i < 12; i++) {
        image = dataImg[i].urls.thumb

        let str = ` <div ><img  class="shadow " src="${image}" alt="image"></div>`

        document.querySelector('.home-bottom').insertAdjacentHTML('afterbegin', str)
    }
}

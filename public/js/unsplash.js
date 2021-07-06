const accesKey = 'aD6Jjsp_D3qn_bkX-NRQe-eLZwRlFaf9HPi6_mf7hpQ'

const endPoint = 'https://api.unsplash.com/search/photos'

// const endPoint = 'https://api.unsplash.com/search/photos'?query=cat&client_id=' + accesKey

async function getImages(query) {
    const randomNum = Math.trunc(Math.random() * 10 - 1)
    //The code will be here
    let response = await fetch(`https://api.unsplash.com/search/photos?page=${randomNum}&per_page=14&query=${query}&client_id=${accesKey}`)
    let jsonResponse = await response.json()
    let imagesList = await jsonResponse.results

    createImages(imagesList)
}

function createImages(imagesList) {
    console.log(imagesList)

    for (let i = 0; i < 14; i++) {
        // const image = document.createElement('img')
        image = imagesList[i].urls.thumb
        let str = ` <div style="margin:0 0 5px 5px"><img src="${image}" alt="image"></div>`
        document.querySelector('.home-top').insertAdjacentHTML('afterbegin', str)
    }
    // for (let i = 7; i < 14; i++) {
    //     // const image = document.createElement('img')
    //     image = imagesList[i].urls.thumb
    //     let str = ` <div style="margin:0 0 5px 5px"><img src="${image}" alt="image"></div>`
    //     document.querySelector('.home-bottom').insertAdjacentHTML('afterbegin', str)
    // }
}

getImages('friends')

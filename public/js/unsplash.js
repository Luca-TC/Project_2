const accesKey = 'aD6Jjsp_D3qn_bkX-NRQe-eLZwRlFaf9HPi6_mf7hpQ'

const endPoint = 'https://api.unsplash.com/search/photos'

// const endPoint = 'https://api.unsplash.com/search/photos'?query=cat&client_id=' + accesKey

async function getImages(query) {
    //The code will be here
    let response = await fetch(`https://api.unsplash.com/search/photos?page=0&per_page=30&query=${query}&client_id=${accesKey}`)
    let jsonResponse = await response.json()
    let imagesList = await jsonResponse.results

    createImages(imagesList)
}

function createImages(imagesList) {
    console.log(imagesList)

    for (let i = 0; i < imagesList.length; i++) {
        // const image = document.createElement('img')
        image = imagesList[i].urls.thumb
        let str = `<div class="col-md-3"> <img src="${image}" alt="image"></div>`
        document.querySelector('.row').insertAdjacentHTML('afterbegin', str)
    }
}

getImages('friend solidary')

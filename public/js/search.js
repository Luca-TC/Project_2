const api = new ApiHandler(window.location.href.split('/')[2].split(':').includes('localhost') ? 'http://localhost:3000' : 'https://bbidas.herokuapp.com/')
document.querySelector('.container-places').classList.add('move')

let timeout
document.querySelector('#search').addEventListener('keyup', () => {
        document.querySelector('.small-alert').classList.remove('alert')
        document.querySelector('.container-places').classList.remove('move')

        const search = document.querySelector('#search').value

        clearTimeout(timeout)
        console.log(search.length)

        search.length ? timeout = setTimeout(() => searchStart(search), 500) : timeout = setTimeout(() => allPlaces(), 500)
})


document.querySelector('#search').addEventListener('keydown', () => {
        clearTimeout(timeout)
})


function searchStart(searchString) {
        api.searchPlaces(searchString)
                .then(res => {
                        if (res.data.length) {
                                printMatches(res.data)
                                setTimeout(() => {
                                        document.querySelector('.container-places').classList.add('move')
                                }, 200);
                        } else {
                                document.querySelector('.small-alert').classList.add('alert')
                        }
                })
                .catch(err => console.log(err))
}

function allPlaces() {
        // console.log('entro al all places function')
        api.allPlaces()
                .then(res => {
                        if (res.data.length) {
                                printMatches(res.data)
                                setTimeout(() => {
                                        document.querySelector('.container-places').classList.add('move')
                                }, 200);
                        } else {
                                document.querySelector('.small-alert').classList.add('alert')
                        }
                })
                .catch(err => console.log(err))

}

function printMatches(data) {
        // console.log(data)
        const placesContainer = document.querySelector('.container-places')

        placesContainer.textContent = ''

        data.forEach(place => {
                const html = `
                    <div class='col-md-3'>
                        <img src='${place.image}' alt='img.jpg' />
                    </div>
                    <div class='col-md-3 p-3 mb-5'>
                            <h5>${place.name}</h5>
                            <p class="text-truncate">${place.task_info.description}</p>
                            <p>${place.address.city} </p>
                            <p disabled>(${place.address.state})</p>
                            <p>${place.rooms}</p>
                            <a class='btn btn-outline-dark btn-sm ' href='/places/details/${place._id}}'>Details</a>
                    </div>`

                placesContainer.insertAdjacentHTML('beforeend', html)

        });


}


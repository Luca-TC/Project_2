const api = new ApiHandler('http://localhost:5000')

api.getFullPlaces()
    .then(response => {
        data = response.data

        const pruebaDiv = document.querySelector('.prueba')

        data.forEach(elm => {
            //     console.log(elm)
            let str = `<p><a href="" class="link" data-id="${elm._id}" >${elm.place_name}</a></p>`
            pruebaDiv.insertAdjacentHTML('beforeend', str)
        })
    })
    .then(response => {
        document.querySelectorAll('.link').forEach(elm => elm.addEventListener('click', e => myFunction(e)))
    })
    .catch(err => console.log(err))
    .catch(err => console.log(err))

//

//

function myFunction(e) {
    e.preventDefault()

    const id = e.currentTarget.dataset.id

    const pruebaDiv2 = document.querySelector('.prueba2')

    api.getOneRegister(id)
        .then(res => {
            let str = `<p>${res.place_name}</p>
                 <p>${res.place_name}</p>
                 <p>${res.place_name}</p>`
            pruebaDiv2.insertAdjacentHTML('beforeend', str)
        })
        .catch(err => console.log(err))
}

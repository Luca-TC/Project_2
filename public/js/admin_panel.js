const api = new ApiHandler(`http://localhost:3000`)

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

    pruebaDiv2.textContent = ''

    api.getOneRegister(id)
        .then(res => {
            res = res.data
            console.log(res)
            let str = `<p>${res.place_name}</p>
                        <a href =""  data-id="${res._id}" data-accept="${true}"class="btn btn-info confirm"> accept </a>
                        <a href ="" data-id="${res._id}" data-accept="${false}" class="btn btn-danger confirm"> refuse </a>`
            pruebaDiv2.insertAdjacentHTML('beforeend', str)
        })
        .then(() => document.querySelectorAll('.confirm').forEach(btn => btn.addEventListener('click', e => confirmApplication(e))))

        .catch(err => console.log(err))
}

function confirmApplication(e) {
    e.preventDefault()
    const id = e.currentTarget.dataset.id

    console.log(id)

    api.updatePendingHostAndPlace(id)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

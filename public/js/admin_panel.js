const api = new ApiHandler(`http://localhost:3000`)
const pruebaDiv2 = document.querySelector('.prueba2')
const pruebaDiv = document.querySelector('.prueba')

function printPlacesNames() {
    api.getFullPlaces()
        .then(response => {
            data = response.data

            data.forEach(elm => {
                console.log(elm)
                let str = `<p><a href="" class="link" data-id="${elm._id}" >${elm.name}</a></p>`
                pruebaDiv.insertAdjacentHTML('beforeend', str)
            })
        })
        .then(response => {
            document.querySelectorAll('.link').forEach(elm => elm.addEventListener('click', e => myFunction(e)))
        })
        .catch(err => console.log(err))
}

printPlacesNames()
//

//

function myFunction(e) {
    e.preventDefault()

    const id = e.currentTarget.dataset.id

    clearPage('divRight')

    api.getOneRegister(id)
        .then(res => {
            res = res.data
            console.log(res)
            let str = `<p>${res.name}</p>
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
    console.log(e.currentTarget.dataset.accept)
    if (e.currentTarget.dataset.accept === 'true') {
        clearPage('divRight')

        api.updatePendingHostAndPlace(id)
            .then(res => {
                console.log(res)
                let str = ` <form>
            <textarea name="content" id="answer" cols="30" rows="10"></textarea>
        <button type='submit' id='buttonForm' data-id="${res.data._id}" data-accept="${true}" class='btn btn-primary'>Submit</button>
    </form>`
                pruebaDiv2.insertAdjacentHTML('beforeend', str)
                document.querySelector('#buttonForm').addEventListener('click', e => showForm(e))
            })

            .catch(err => console.log(err))
    } else {
        api.deleteHostPlace(id)
            .then(place => console.log(place))
            .catch(err => console.log(err))
    }
}

function showForm(e) {
    e.preventDefault()
    const answer = document.querySelector('#answer').value
    const id = e.currentTarget.dataset.id
    const obj = { answer, id }
    api.tryPost(obj)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    clearPage('divLeft')
    printPlacesNames()
}

function clearPage(div) {
    div === 'divLeft' ? (pruebaDiv.textContent = '') : (pruebaDiv2.textContent = ''.textContent = '')
}

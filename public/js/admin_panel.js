const api = new ApiHandler(`http://localhost:3000`)
const leftPan = document.querySelector('.leftPan')
const rightPan = document.querySelector('.rightPan')

function printPlacesNames() {
    //
    api.getFullPlaces()
        .then(response => {
            //
            data = response.data

            data.forEach(elm => {
                //
                let link = `<p><a href="" class="link" data-id="${elm._id}" >${elm.name}</a></p>`

                leftPan.insertAdjacentHTML('beforeend', link)
            })
        })
        .then(() => {
            document.querySelectorAll('.link').forEach(elm => elm.addEventListener('click', e => myFunction(e)))
        })
        .catch(err => console.log(err))
}
printPlacesNames()
//

//

function myFunction(e) {
    //
    e.preventDefault()

    const id = e.currentTarget.dataset.id

    clearPage('divRight')

    api.getOneRegister(id)
        .then(res => {
            console.log(res)
            //
            res = res.data

            let buttons = `<p>${res.name}</p>
                        <a href =""  data-id="${res._id}" data-accept="${true}"class="btn btn-warning confirm"> accept </a>
                        <a href ="" data-id="${res._id}" data-accept="${false}" class="btn btn-danger confirm"> refuse </a>
                        <img src="${res.image}" alt="">`
            rightPan.insertAdjacentHTML('beforeend', buttons)

            return res
        })
        .then(res => {
            document.querySelectorAll('.confirm').forEach(btn => btn.addEventListener('click', e => confirmApplication(e)))
            return res
        })
        .then(res => gmapsRoute(res))
        .catch(err => console.log(err))

    openModal()
}

function confirmApplication(e) {
    //
    e.preventDefault()

    const id = e.currentTarget.dataset.id

    if (e.currentTarget.dataset.accept === 'true') {
        clearPage('divRight')

        api.updatePendingHostAndPlace(id)
            .then(res => {
                let form = ` <form>
                                <textarea name="content" id="answer" cols="30" rows="10"></textarea>
                                <button type='submit' id='buttonForm' data-id="${res.data._id}" data-accept="${true}" class='btn btn-primary'>Submit</button>
                            </form>`

                rightPan.insertAdjacentHTML('beforeend', form)
            })
            .then(() => document.querySelector('#buttonForm').addEventListener('click', e => showForm(e)))
            .catch(err => console.log(err))
        //
    } else {
        //
        clearPage('divr')
        clearPage('divLeft')

        api.deleteHostPlace(id)
            .then(place => '????????????????????')
            .catch(err => console.log(err))

        printPlacesNames()
    }
}

function showForm(e) {
    //
    e.preventDefault()

    const answer = document.querySelector('#answer').value

    const id = e.currentTarget.dataset.id

    const obj = { answer, id }

    api.tryPost(obj)
        .then(res => '????????????????????')
        .catch(err => console.log(err))

    clearPage('divLeft')
    clearPage('right')
    printPlacesNames()
}

function clearPage(div) {
    div === 'divLeft' ? (leftPan.textContent = '') : (rightPan.textContent = ''.textContent = '')
}

//

//

// blurs

const overlay = document.querySelector('.overlay')

// const modalButton = document.querySelectorAll('.show-modal')

const modal = document.querySelector('.modal')
const btnClose = document.querySelector('.close-modal')

const closeModal = () => {
    // modal.classList.add('hidden')
    rightPan.textContent = ''
    rightPan.classList.remove('opacity')
    overlay.classList.add('hidden')
    rightPan.classList.remove('modal')
}

// modalButton.forEach(element => {
//     element.addEventListener('click', openModal)
// })

// btnClose.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

function openModal() {
    // modal.classList.remove('hidden')

    rightPan.classList.add('modal')
    rightPan.classList.add('opacity')
    overlay.classList.remove('hidden')
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal()
    }
})

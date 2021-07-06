const api = new ApiHandler(`http://localhost:3000`)
const leftPan = document.querySelector('.leftPan')
const rightPan = document.querySelector('.rightPan')

document.querySelector('.places').addEventListener('click', e => printPlacesNames(e))
document.querySelector('.contracts').addEventListener('click', e => printContracts(e))

function printPlacesNames(e) {
    if (e) {
        e.preventDefault()
    }
    //
    leftPan.textContent = ''
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
function printContracts() {
    //
    e.preventDefault()
}
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

            let buttons = ` <a href ="" data-id="${res._id}" data-details="${res}" 
                            class="btn btn-info confirm"> Details </a>
                            <h3>${res.name}</h3>
                            <h5>${res.address.road}</h5>
                            <h4>${res.address.city} (${res.address.state})</h4>
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
                let form = `<h4>Custom email to the host </h4>
                            <h5>or default email acceptation if blank</h4> 
                            <form>
                                <textarea name="content" id="answer" cols="30" rows="10"></textarea>
                                <button type='submit' id='buttonForm' data-id="${res.data._id}" data-accept="${true}" class='btn btn-primary'>Submit</button>
                            </form>`

                rightPan.insertAdjacentHTML('beforeend', form)
            })
            .then(() => document.querySelector('#buttonForm').addEventListener('click', e => showForm(e)))
            .catch(err => console.log(err))
        //

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

    closeModal()
    clearPage('divLeft')
    clearPage('right')
    printPlacesNames()
}

function clearPage(div) {
    div === 'divLeft' ? (leftPan.textContent = '') : (rightPan.textContent = ''.textContent = '')
}

//

//

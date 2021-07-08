const api = new ApiHandler(window.location.href.split('/')[2].split(':').includes('localhost') ? 'http://localhost:3000' : 'https://bbidas.herokuapp.com/')

const leftPan = document.querySelector('.leftPan')

const rightPan = document.querySelector('.rightPan')

window.onload = function () {
    document.querySelector('.places-pending').addEventListener('click', e => printPlacesNames(e))

    document.querySelector('.contracts').addEventListener('click', e => printContracts(e))

    document.querySelector('.places-live').addEventListener('click', e => placesLive(e))
}

function printPlacesNames(e) {

    if (e) e.preventDefault()

    clearPage('divLeft')

    api.getFullPlaces()
        .then(response => {

            data = response.data

            let title = `<h3> Pending approve </h3> <hr />`

            leftPan.insertAdjacentHTML('beforeend', title)

            data.forEach(elm => {

                let link = `<p><a href="" class="link" data-id="${elm._id}" >${elm.name}</a></p>`

                leftPan.insertAdjacentHTML('beforeend', link)
            })
        })
        .then(() => {
            document.querySelectorAll('.link').forEach(elm => elm.addEventListener('click', e => registerInfo(e)))
        })
        .catch(err => console.log(err))
}
printPlacesNames()


function placesLive(e) {
    if (e) e.preventDefault()

    clearPage('divLeft')

    api.getFullPlacesLive()
        .then(response => {

            data = response.data

            let title = `<h3> Live Places </h3> <hr />`

            leftPan.insertAdjacentHTML('beforeend', title)

            data.forEach(elm => {

                let link = `<p><a href="" class="link-live" data-id="${elm._id}" >${elm.name}</a></p>`

                leftPan.insertAdjacentHTML('beforeend', link)
            })
        })
        .then(() => document.querySelectorAll('.link-live').forEach(elm => elm.addEventListener('click', e => showLiveOptions(e))))
        .catch(err => console.log(err))
}


function showLiveOptions(e) {
    if (e) e.preventDefault()

    const id = e.currentTarget.dataset.id

    api.getOneRegister(id)
        .then(res => {

            res = res.data

            let buttons = ` 
                            <h3>${res.name}</h3>
                            <h5>${res.address.road}</h5>
                            <h4>${res.address.city} (${res.address.state})</h4>
                        <a href =""  data-id="${res._id}" data-delete="${false}"class="btn btn-warning btn-live"> Put in pending </a>
                        <a href ="" data-id="${res._id}" data-delete="${true}" class="btn btn-danger btn-live"> Delete </a>
                        <img src="${res.image}" class="mt-5" alt="place img">`

            rightPan.insertAdjacentHTML('beforeend', buttons)
        })
        .then(() => document.querySelectorAll('.btn-live').forEach(elm => elm.addEventListener('click', e => pendingOrDelete(e))))
        .catch(err => console.log(err))

    openModal()
    makeRigthPanBigger()
}


function pendingOrDelete(e) {

    if (e) e.preventDefault()

    const placeToDelete = e.currentTarget.dataset.delete

    const id = e.currentTarget.dataset.id

    console.log(id)

    if (placeToDelete === 'true') {

        api.deleteHostPlace(id)
            .then(() => {
                closeModal()
                placesLive()
            })
            .catch(err => console.log(err))
    } else {

        api.returnPlaceToPending(id)
            .then(() => {
                closeModal()
                placesLive()
            })
            .catch(err => console.log(err))
    }
}


function printContracts(e) {

    clearPage('divLeft')

    if (e) e.preventDefault()

    api.getFullContracts()
        .then(res => {

            data = res.data

            let tableContracts = `
                    <div>
                    <table class="table-contracts">
                        <thead>
                            <td style="width: 25%">Place</td>
                            <td>Applicant</td>
                            <td>Host</td>
                            <td>Posted</td>
                            <td>Viewed</td>
                        </thead>
                    </table>
                    </div>
                    <hr />
            `
            leftPan.insertAdjacentHTML('beforeend', tableContracts)

            let table = document.querySelector('.table-contracts')

            data.forEach(elm => {

                let rows = `
                    <tr>
                        <td><a href='/places/details/${elm.place_id?._id}' target='_blank'>${elm.place_id?.name}</a></td>
                        <td><a href='/user/details/${elm.user_applicant_id._id}' target='_blank'>${elm.user_applicant_id.name}</a></td>
                        <td><a href='/user/details/${elm.host_id._id}' target='_blank'>${elm.host_id.name}</a></td>
                        <td>${elm.createdAt.split('T')[0]}</td>
                        <td>${elm.updatedAt.split('T')[0]}</td>
                    </tr>
                `
                table.insertAdjacentHTML('beforeend', rows)
            })
        })
        .catch(err => console.log(err))
}


function registerInfo(e) {

    if (e) e.preventDefault()

    const id = e.currentTarget.dataset.id

    clearPage('divRight')

    api.getOneRegister(id)
        .then(res => {

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

            gmapsRoute(res)
        })
        .catch(err => console.log(err))

    openModal()

    makeRigthPanBigger()
}

function confirmApplication(e) {

    if (e) e.preventDefault()

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

    } else {

        clearPage('divr')
        clearPage('divLeft')

        api.deleteHostPlace(id)
            .then(place => '????????????????????')
            .catch(err => console.log(err))

        closeModal()

        printPlacesNames()
    }
}

function showForm(e) {

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

function makeRigthPanBigger() {
    document.querySelector('.rightPan').classList.add('col-md-6')
}


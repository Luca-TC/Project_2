const api = new ApiHandler(window.location.href.split('/')[2].split(':').includes('localhost') ? 'http://localhost:3000' : 'https://bbidas.herokuapp.com/')

const leftPan = document.querySelector('.leftPan')

const rightPan = document.querySelector('.rightPan')

window.onload = function () {
    document.querySelector('.myhomes').addEventListener('click', e => printPlacesNames(e))

    document.querySelector('.applications').addEventListener('click', e => printApplications(e))

    // document.querySelector('.backToProfile').addEventListener('click', e => placesLive(e))
}

function printPlacesNames() {
    // if (e) e.preventDefault()

    clearPage('divLeft')

    api.getMyPlaces()
        .then(response => {

            data = response.data
            let title = `<h3> YOUR PROJECTS </h3> <hr />`

            leftPan.insertAdjacentHTML('beforeend', title)
            data.forEach(elm => {

                let link = `<p><a href="" class="link" data-id="${elm._id}" >${elm.name} (${elm.address.city})</a></p>`

                leftPan.insertAdjacentHTML('beforeend', link)
            })
        })
        .then(() => {
            document.querySelectorAll('.link').forEach(elm => elm.addEventListener('click', e => editMyPlace(e)))
        })
        .catch(err => console.log(err))
}
printPlacesNames()


function editMyPlace(e) {

    if (e) e.preventDefault()

    const id = e.currentTarget.dataset.id

    clearPage('divRight')

    api.getOneRegister(id)
        .then(res => {

            res = res.data

            let buttons = `<img src="${res.image}" alt="">
                            <p>${res.name}</p>
                        <a id="button" data-id="${res._id}" data-accept="${false}" class="btn btn-outline-danger delete"> delete </a>
                         <form>

            <div class='form-group'>
                <label for='place_name'>Nombre del lugar:</label>
                <input type='text' class='form-control' id='place_name' name='name' value="${res.name}" />
            </div>
            <div class='form-group'>
                <label for='name_description'>Task name:</label>
                <input type='text' class='form-control' name='task_name' id='task_name' value="${res.task_info.name}" />
            </div>
            <div class='form-group'>
                <label for='task_description'>Task Description:</label>
                <input type='text' class='form-control' name='description' id='task_description' value="${res.task_info.description}" />
                <small id='description-help' class='form-text text-muted'>Description of the task to do</small>
            </div>
            <div class='form-group'>
                <label for='task_time'>WorkingTime:</label>
                <input type='number' class='form-control' name='working_hours' id='task_time'  value="${res.task_info.working_hours}"/>
                <small id='description-help' class='form-text text-muted'>time in hours per day</small>
            </div>
            <div class='form-group'>
                <label for='number_rooms'>Num of rooms:</label>
                <input type='number' class='form-control' name='rooms' min='0' id='rooms'  value="${res.rooms}"/>
                <small id='description-help' class='form-text text-muted'>Number of avail rooms</small>
            </div>
            <div class='form-group'>
                <label for='road'>Address</label>
                <input type='text' class='form-control' name='road' id='road'  value="${res.address.road}"/>
                <small id='description-help' class='form-text text-muted'>Your Address</small>
            </div>
            <div class='form-group'>
                <label for='number'>Number</label>
                <input type='number' class='form-control' name='number' min='0' id='number' value="${res.address.number}" />
                <small id='description-help' class='form-text text-muted'>your addressnumber</small>
            </div>
            <div class='form-group'>
                <label for='city'>City</label>
                <input type='text' class='form-control' name='city' min='0' id='city' value="${res.address.city}" />
                <small id='description-help' class='form-text text-muted'>Your city</small>
            </div>
            <div class='form-group'>
                <label for='state'>State</label>
                <input type='text' class='form-control' name='state' id='state'  value="${res.address.state}"/>
                <small id='description-help' class='form-text text-muted'>Your state</small>
            </div>
           

            <button id="button" data-accept="${true}" type='submit' data-id="${res._id}" class='btn btn-primary'>Submit</button>
        </form>
                       `

            rightPan.insertAdjacentHTML('beforeend', buttons)

            return res
        })
        .then(res => {
            document.querySelectorAll('#button').forEach(btn => btn.addEventListener('click', e => {
                if (e.currentTarget.dataset.accept === 'true') {
                    sendEdits(e)
                    return res
                } else {
                    console.log(e.currentTarget.dataset)
                    deleteMyPlace(e)
                    return res
                }
            }))

        })
        .catch(err => console.log(err))

    openModal()
    makeRigthPanBigger()

}


function printApplications(e) {

    clearPage('divLeft')

    if (e) e.preventDefault()

    api.getFullApplicants()
        .then(res => {

            data = res.data

            let tableContracts = `
                    <div>
                    <table class="table table-contracts">
                    <thead>
                     <tr>
                        <th scope="col">#</th>
                        <th scope="col">Place</th>
                        <th scope="col">Applicant</th>
                        <th scope="col">Posted</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                     </tr>
                    </thead>
                    </table>
                    </div>
                    <hr />
                    <table class="table">
  
            `
            leftPan.insertAdjacentHTML('beforeend', tableContracts)

            let table = document.querySelector('.table-contracts')
            let count = 0
            data.forEach(elm => {
                console.log(elm)
                count++
                let rows = `
                   <tr>
                        <th scope="row">${count}</th>
                        <td><a href='/places/details/${elm.place_id?._id}' target='_blank'>${elm.place_id?.name}</a></td>
                        <td><a href='/user/details/${elm.user_applicant_id._id}' data-id=${elm.user_applicant_id._id} target='_blank'>${elm.user_applicant_id.name}</a></td>
                        <td>${elm.updatedAt.split('T')[0]}</td>
                        <td>${elm.start_date}</td>
                        <td>${elm.final_date}</td>
                        <td><button data-delete="${true}" data-id="${elm._id}" class="btn btn-outline-danger btn-sm btn-application">Delete</button></td>
                        <td><button data-delete="${false}" data-id="${elm._id}" class="btn btn-outline-primary btn-sm btn-application">Confirm</button></td>
                   </tr>
                       
                    
                `
                table.insertAdjacentHTML('beforeend', rows)

            })
        })
        .then(res => {
            document.querySelectorAll('.btn-application').forEach(btn => btn.addEventListener('click', e => confirmOrDeleteApplication(e)))

            return res
        })
        .catch(err => console.log(err))
}


function confirmOrDeleteApplication(e) {

    if (e) e.preventDefault()

    console.log(e.currentTarget.dataset.id)
    const id = e.currentTarget.dataset.id

    if (e.currentTarget.dataset.delete !== 'true') {

        api.updatePendingApplicant(id)
            .then(res => {
                clearPage('divRight')
                let form = `<h4>Custom email to the Applicant </h4>
                                <h5>or default email acceptation if blank</h4> 
                                <form class="mt-3">
                                <div class="form-group">
                                    <label for="subject">Subject</label>
                                    <input type="text" id="subject" class="form-control">
                                </div>    
                                <div class="form-group">
                                <label for="answer">Message</label>
                                    <textarea name="content" id="answer" class="mt-3 form-control" cols="60" rows="10"></textarea>
                                    </div>
                                    <button type='submit' id='buttonForm' data-id="${res.data._id}" data-accept="${true}" class='btn btn-primary'>Send</button>
                                </form>`

                rightPan.insertAdjacentHTML('beforeend', form)

                printApplications()
            }).then(() => {
                makeRigthPanBigger()
                openModal()
            })
            .then(() => document.querySelector('#buttonForm').addEventListener('click', e => sendEmail(e)))
            .catch(err => console.log(err))

    } else {

        clearPage('divr')
        clearPage('divLeft')

        api.deleteApplicant(id)
            .then(place => '????????????????????')
            .catch(err => console.log(err))

        closeModal()

        printPlacesNames()
    }
}


function sendEmail(e) {
    if (e) e.preventDefault()
}







function deleteMyPlace(e) {
    const id = e.currentTarget.dataset.id


    api.deleteHostPlace(id)
        .then(place => console.log('deleted', place))
        .catch(err => console.log(err))

    clearPage('divr')
    clearPage('divLeft')
    printPlacesNames()
    closeModal()
}


function sendEdits(e) {

    if (e) e.preventDefault()

    const form = document.querySelectorAll('form input')

    const allInputsValue = []

    form.forEach(elm => {
        allInputsValue.push(elm.value)
    })

    const id = e.currentTarget.dataset.id


    const obj = { id, placeName, name, description, working_hours, rooms, road, number, city, state }

    api.updateMyPlace(obj)
        .then(() => printPlacesNames())
        .catch(err => console.log(err))

    clearPage('ok')

    closeModal()
}

function clearPage(div) {
    div === 'divLeft' ? (leftPan.textContent = '') : (rightPan.textContent = ''.textContent = '')
}

function makeRigthPanBigger() {
    document.querySelector('.rightPan').classList.add('col-md-5')
}
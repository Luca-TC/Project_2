const api = new ApiHandler(`http://localhost:3000`)
const leftPan = document.querySelector('.leftPan')
const rightPan = document.querySelector('.rightPan')

function printPlacesNames() {
    //
    api.getMyPlaces()
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

function myFunction(e) {
    e.preventDefault()

    const id = e.currentTarget.dataset.id

    clearPage('divRight')

    api.getOneRegister(id)
        .then(res => {
            // console.log(res)
            //
            res = res.data

            let buttons = `<p>${res.name}</p>
                        <a href =""  data-id="${res._id}" data-accept="${true}"class="btn btn-outline-warning edit"> Edit </a>
                        <a href ="" data-id="${res._id}" data-accept="${false}" class="btn btn-outline-danger edit"> delete </a>`
            rightPan.insertAdjacentHTML('beforeend', buttons)

            return res
        })
        .then(res => {
            document.querySelectorAll('.edit').forEach(btn => btn.addEventListener('click', e => getFormMyPlaces(e))) //da completare
            return res
        })
        // .then(res => gmapsRoute(res))
        .catch(err => console.log(err))
}

function getFormMyPlaces(e) {
    e.preventDefault()

    const id = e.currentTarget.dataset.id
    if (e.currentTarget.dataset.accept === 'true') {
        clearPage('divRight')
        //    console.log('admin-panel', id)
        api.getMyPlaceToEdit(id)
            .then(res => {
                let form = ` <form>

            <div class='form-group'>
                <label for='place_name'>Nombre del lugar:</label>
                <input type='text' class='form-control' id='place_name' name='name' value="${res.data.name}" />
            </div>
            <div class='form-group'>
                <label for='name_description'>Task name:</label>
                <input type='text' class='form-control' name='task_name' id='task_name' value="${res.data.task_info.name}" />
            </div>
            <div class='form-group'>
                <label for='task_description'>Task Description:</label>
                <input type='text' class='form-control' name='description' id='task_description' value="${res.data.task_info.description}" />
                <small id='description-help' class='form-text text-muted'>Description of the task to do</small>
            </div>
            <div class='form-group'>
                <label for='task_time'>WorkingTime:</label>
                <input type='number' class='form-control' name='working_hours' id='task_time'  value="${res.data.task_info.working_hours}"/>
                <small id='description-help' class='form-text text-muted'>time in hours per day</small>
            </div>
            <div class='form-group'>
                <label for='number_rooms'>Num of rooms:</label>
                <input type='number' class='form-control' name='rooms' min='0' id='rooms'  value="${res.data.rooms}"/>
                <small id='description-help' class='form-text text-muted'>Number of avail rooms</small>
            </div>
            <div class='form-group'>
                <label for='road'>Address</label>
                <input type='text' class='form-control' name='road' id='road'  value="${res.data.address.road}"/>
                <small id='description-help' class='form-text text-muted'>Your Address</small>
            </div>
            <div class='form-group'>
                <label for='number'>Number</label>
                <input type='number' class='form-control' name='number' min='0' id='number' value="${res.data.address.number}" />
                <small id='description-help' class='form-text text-muted'>your addressnumber</small>
            </div>
            <div class='form-group'>
                <label for='city'>City</label>
                <input type='text' class='form-control' name='city' min='0' id='city' value="${res.data.address.city}" />
                <small id='description-help' class='form-text text-muted'>Your city</small>
            </div>
            <div class='form-group'>
                <label for='state'>State</label>
                <input type='text' class='form-control' name='state' id='state'  value="${res.data.address.state}"/>
                <small id='description-help' class='form-text text-muted'>Your state</small>
            </div>
            <div class='form-group'>
                <label for='image'>Image</label>
                <input type='file' class='form-control' name='image' id='image' value="${res.data.name}" />
                <small id='description-help' class='form-text text-muted'>Real screen of your place(house must appear)</small>
            </div>

            <button id="buttonForm" type='submit' class='btn btn-primary'>Submit</button>
        </form>`

                rightPan.insertAdjacentHTML('beforeend', form)
            })
            .then(() => document.querySelector('#buttonForm').addEventListener('click', e => sendEdits(e)))
            .catch(err => console.log(err))
    } else {
        // console.log('delete',place)
        api.deleteHostPlace(id)
            .then(place => console.log('deleted', place))
            .catch(err => console.log(err))

        clearPage('divr')
        clearPage('divLeft')
        printPlacesNames()
    }
}

function sendEdits(e) {
    e.preventDefault()
    const form = document.querySelectorAll('form input')
const placeName = form[0].value
const taskName = form[1].value
const taskDescription = form[2].value
const taskTime = form[3].value
const roomn = form[4].value
const road = form[5].value
const number = form[6].value
const city = form[7].value
const state = form[8].value
const image = form[9].value
// const input10 = form[10].value

    console.log('form.input',form)

}

function clearPage(div) {
    div === 'divLeft' ? (leftPan.textContent = '') : (rightPan.textContent = ''.textContent = '')
}

const api = new ApiHandler(`http://localhost:3000`)
const leftPan = document.querySelector('.leftPan')
const rightPan = document.querySelector('.rightPan')
/*DOESN'T WORK FUNCTION PRINTPLACENAMES AFTER SUBMITING EDIT FORM */
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
    openModal()
}

function getFormMyPlaces(e) {
    e.preventDefault()

    const id = e.currentTarget.dataset.id
    if (e.currentTarget.dataset.accept === 'true') {
        clearPage('divRight')
        //  console.log('admin-panel inside get form', id)
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
           

            <button id="buttonForm" type='submit' data-id="${res.data._id}" class='btn btn-primary'>Submit</button>
        </form>`

                rightPan.insertAdjacentHTML('beforeend', form)
                document.querySelector('#buttonForm').addEventListener('click', e => sendEdits(e))
            })
            // .then(() => )
            .catch(err => console.log(err))
        openModal()
    } else {
        // console.log('delete',place)
        api.deleteHostPlace(id)
            .then(place => console.log('deleted', place))
            .catch(err => console.log(err))

        clearPage('divr')
        clearPage('divLeft')
        printPlacesNames()
        closeModal()
    }
}

function sendEdits(e) {
    e.preventDefault()
    const form = document.querySelectorAll('form input')
    const allInputsValue = []
    form.forEach(elm => {
        allInputsValue.push(elm.value)
    })

    const id = e.currentTarget.dataset.id
    //  console.log('boh', id)
    const [placeName, name, description, working_hours, rooms, road, number, city, state] = allInputsValue
    const obj = { id, placeName, name, description, working_hours, rooms, road, number, city, state }
    // console.log('sono un obj',obj)
    api.updateMyPlace(obj)
    clearPage('ok')
    closeModal()
}

function clearPage(div) {
    div === 'divLeft' ? (leftPan.textContent = '') : (rightPan.textContent = ''.textContent = '')
}

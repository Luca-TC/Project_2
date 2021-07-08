const api = new ApiHandler(window.location.href.split('/')[2].split(':').includes('localhost') ? 'http://localhost:3000' : 'https://bbidas.herokuapp.com/')

const leftPan = document.querySelector('.leftPan')

const rightPan = document.querySelector('.rightPan')



function editMyPRofile(e) {

    if (e) e.preventDefault()

    const id = e.currentTarget.dataset.id

    clearPage('divRight')

    api.getMyProfileInfo(id)
        .then(res => {

            res = res.data

            let buttons = `<img src="${res.image}" alt="">
                            <p>${res.name}</p>
                        <a id="button" data-id="${res._id}" data-accept="${false}" class="btn btn-outline-danger delete"> delete </a>
                         <form>

            <div class='form-group'>
                <label for='place_name'>Your Name:</label>
                <input type='text' class='form-control' id='name' name='name' value="${res.name}" />
            </div>
            <div class='form-group'>
                <label for='name_description'>insert your Email:</label>
                <input type='email' class='form-control' name='username' id='userName' value="${res.task_info.name}" />
            </div>
            <div class='form-group'>
                <label for='task_description'>Change your password:</label>
                <input type='password' class='form-control' name='pwd' id='password' value="${res.task_info.description}" />
                <small id='description-help' class='form-text text-muted'>Description of the task to do</small>
            </div>
            <div class='custom-file'>
                <label for='task_time'>Insert your photo</label>
                <input type='file' class='custom-file-input' name='image' id='image'  value="${res.task_info.working_hours}" required/>
                <small id='description-help' class='form-text text-muted'>Insert your photo</small>
            </div>
            <div class='form-group'>
                <label for='description'>Tell us your story:</label>
                <input type='text' class='form-control' name='description' id='description'  value="${res.rooms}"/>
                <small id='description-help' class='form-text text-muted'>Tell us your story</small>
            </div>
            <div class='form-group'>
                <label for='road'>Address</label>
                <input type='text' class='form-control' name='road' id='road'  value="${res.address.road}"/>
                <small id='description-help' class='form-text text-muted'>Your Address</small>
            </div>
            <div class='form-group'>
                <label for='number'>Number</label>
                <input type='number' class='form-control' name='number' min='0' id='number' value="${res.address.number}" />
                <small id='description-help' class='form-text text-muted'>Your addressnumber</small>
            </div>
            <div class='form-group'>
                <label for='city'>City</label>
                <input type='text' class='form-control' name='city' id='city' value="${res.address.city}" />
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
                }
                //  else {
                //     console.log(e.currentTarget.dataset)
                //     deleteMyPlace(e)
                //     return res
                // }
            }))

        })
        .catch(err => console.log(err))

    openModal()
    makeRigthPanBigger()

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

    api.updateMyProfile(obj)
        // .then(() => printPlacesNames())
        // .catch(err => console.log(err))

    clearPage('ok')

    closeModal()
}

function clearPage(div) {
    div === 'divLeft' ? (leftPan.textContent = '') : (rightPan.textContent = ''.textContent = '')
}

function makeRigthPanBigger() {
    document.querySelector('.rightPan').classList.add('col-md-5')
}
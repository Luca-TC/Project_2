const api = new ApiHandler(window.location.href.split('/')[2].split(':').includes('localhost') ? 'http://localhost:3000' : 'https://bbidas.herokuapp.com/')

const leftPan = document.querySelector('.leftPan')

const rightPan = document.querySelector('.rightPan')

window.onload = function () {
    document.querySelector('.myProfileEdit').addEventListener('click', e => editMyProfile(e))
}

function editMyProfile(e) {

    if (e) e.preventDefault()

    const id = e.currentTarget.dataset.id



    clearPage('divRight')

    api.getMyProfileInfo(id)
        .then(res => {

            res = res.data

            let form = `<img src="${res.image}" alt="">
                            <p>${res.name}</p>
                         <form enctype='multipart/form-data'>

            <div class='form-group'>
                <label for='place_name'>Your Name:</label>
                <input type='text' class='form-control' id='name' name='name' value="${res.name}" />
            </div>
            <div class='form-group'>
                <label for='name_description'>insert your Email:</label>
                <input type='email' class='form-control' name='username' id='username' value="${res.username}" />
            </div>
            <div class='form-group'>
                <label for='task_description'>Change your password:</label>
                <input type='password' class='form-control' name='pwd' id='pwd' value="" />
            </div>
            <div class='form-group'>
                <label for='description'>Tell us your story:</label>
                <input type='text' class='form-control' name='description' id='description'  value="${res.description}"/>
            </div>
            <div class='form-group'>
                <label for='road'>Address</label>
                <input type='text' class='form-control' name='road' id='road'  value="${res.address?.road}"/>
            </div>
            <div class='form-group'>
                <label for='number'>Number</label>
                <input type='number' class='form-control' name='number' min='0' id='number' value="${res.address?.number}" />
                <small id='description-help' class='form-text text-muted'>Your addressnumber</small>
            </div>
            <div class='form-group'>
                <label for='city'>City</label>
                <input type='text' class='form-control' name='city' id='city' value="${res.address?.city}" />
                <small id='description-help' class='form-text text-muted'>Your city</small>
            </div>
            <div class='form-group'>
                <label for='state'>State</label>
                <input type='text' class='form-control' name='state' id='state'  value="${res.address?.state}"/>
            </div>
           

            <button id="button" data-accept="${true}" type='submit' data-id="${res._id}" class='btn btn-primary'>Submit</button>
        </form>
                       `

            rightPan.insertAdjacentHTML('beforeend', form)

            return res
        })
        .then(res => {
            document.querySelectorAll('#button').forEach(btn => btn.addEventListener('click', e => {
                if (e.currentTarget.dataset.accept === 'true') {
                    sendEdits(e)
                    return res
                }
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

    // <<<<<<< HEAD
    // =======

    // >>>>>>> 1635a82d49d2b71fa12528f9da4839e9b44d3fac
    const [name, username, pwd, description, road, number, city, state] = allInputsValue
    const obj = { id, name, username, pwd, description, road, number, city, state }

    console.log(obj)

    api.updateMyProfile(obj)
        .then(obj => console.log(obj))
        .catch(err => console.log(err))

    clearPage('ok')

    closeModal()
    reloadProfile()
}

function reloadProfile() {
    window.location.reload()
    return false
}


function clearPage(div) {
    div === 'divLeft' ? (leftPan.textContent = '') : (rightPan.textContent = ''.textContent = '')
}

function makeRigthPanBigger() {
    document.querySelector('.rightPan').classList.add('col-md-5')
}

// document.querySelector('.profile-img').addEventListener('click', (e) => {
//     e.stopPropagation()
//     const profileNav = document.querySelector('.profileNav')

//     profileNav.classList.add('profileNav-load')

// })


// document.querySelector('.profileNav').addEventListener('mouseout', () => {
//     const profileNav = document.querySelector('.profileNav')

//     console.log('out')
//     profileNav.classList.remove('profileNav-load')
// })
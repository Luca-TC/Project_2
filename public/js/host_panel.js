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
   console.log('funziono')
    e.preventDefault()

    const id = e.currentTarget.dataset.id

    clearPage('divRight')

    api.getOneRegister(id)
        .then(res => {
            console.log(res)
            //
            res = res.data

            let buttons = `<p>${res.name}</p>
                        <a href =""  data-id="${res._id}" data-accept="${true}"class="btn btn-outline-warning edit"> Edit </a>
                        <a href ="" data-id="${res._id}" data-accept="${false}" class="btn btn-outline-danger confirm"> delete </a>`
            rightPan.insertAdjacentHTML('beforeend', buttons)

            return res
        })
        .then(res => {
           // document.querySelectorAll('.edit').forEach(btn => btn.addEventListener('click', e => (e))) da completare
            return res
        })
       // .then(res => gmapsRoute(res))
        .catch(err => console.log(err))
}













function clearPage(div) {
    div === 'divLeft' ? (leftPan.textContent = '') : (rightPan.textContent = ''.textContent = '')
}
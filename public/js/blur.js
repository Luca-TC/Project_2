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
    if (e.key === 'Escape' && !modal?.classList.contains('hidden')) {
        closeModal()
    }
})

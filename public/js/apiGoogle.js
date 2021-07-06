//

const { emails } = require('../../utils')
console.log(emails(email))

const gmapsRoute = res => {
    //
    const { road, city } = res.address

    const currentLocation = road + ' ' + city

    geoCode(currentLocation)
}

//

//

const geoCode = location => {
    let geocoder = new google.maps.Geocoder()

    geocoder.geocode({ address: location }, (res, status) => {
        console.log(res)
        let latLng = res[0].geometry.location

        let cords = { lat: latLng.lat(), lng: latLng.lng() }

        if (status === 'OK') showScreen(cords)
    })
}

//

//

function showScreen(cords) {
    //
    const { lat, lng } = cords

    const latLng = new google.maps.LatLng(lat, lng)

    const rightPan = document.querySelector('.rightPan')

    const div = `<div class="map" style="height: 300px; background:blue;"> </div>`

    rightPan.insertAdjacentHTML('beforeend', div)

    const viewOptions = {
        position: latLng,
        pov: {
            heading: 34,
            pitch: 10,
        },
    }

    const map = document.querySelector('.map')

    new google.maps.StreetViewPanorama(map, viewOptions)
}

class ApiHandler {
    constructor(baseUrl) {
        this.BASE_URL = baseUrl

        this.app = axios.create({
            baseURL: this.BASE_URL,
        })
    }

    getFullPlaces = () => this.app.get('/api/places')

    getFullPlacesLive = () => this.app.post('/api/placeslive')

    getFullContracts = () => this.app.post('/api/contracts')

    getMyPlaces = () => this.app.get(`/api/myplaces`)

    getMyPlaceToEdit = id => this.app.get(`/api/myplace/edit/${id}`) //da completare

    getOneRegister = id => this.app.get(`/api/onePlace/${id}`)

    updateMyPlace = data => this.app.post(`/places/updateMyPlace`, data)

    returnPlaceToPending = id => this.app.post(`/places/returnPending/${id}`)

    updatePendingHostAndPlace = id => this.app.post(`/api/updateHostPlace/${id}`)

    deleteHostPlace = id => this.app.post(`/api/deleteHostPlace/${id}`)

    tryPost = data => this.app.post('/places/postEmail', data)

    keyHandler = () => this.app.get('/api/unsplash')

    apiSplash = url => this.app.get(url)
}

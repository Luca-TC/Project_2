class ApiHandler {
    constructor(baseUrl) {
        this.BASE_URL = baseUrl

        this.app = axios.create({
            baseURL: this.BASE_URL,
        })
    }

    getFullPlaces = () => this.app.get('/api/places')

    getMyPlaces = () => this.app.get(`/api/myplaces`)

    getMyPlaceToEdit = id => this.app.get(`/api/myplace/edit/${id}`) //da completare

    getOneRegister = id => this.app.get(`/api/onePlace/${id}`)

    updateMyPlace = id => this.app.post(`/api/updateMyPlace/${id}`)

    updatePendingHostAndPlace = id => this.app.post(`/api/updateHostPlace/${id}`)

    deleteHostPlace = id => this.app.post(`/api/deleteHostPlace/${id}`)

    tryPost = data => this.app.post('/places/postEmail', data)
}

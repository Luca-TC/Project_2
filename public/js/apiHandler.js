class ApiHandler {
    constructor(baseUrl) {
        this.BASE_URL = baseUrl

        this.app = axios.create({
            baseURL: this.BASE_URL,
        })
    }

    getFullPlaces = () => this.app.get('/api/places')

    getFullPlacesLive = () => this.app.get('/api/placeslive')

    getFullContracts = () => this.app.get('/api/contracts')
    
    getFullApplicants = () => this.app.get('/api/applicants')

    getMyPlaces = () => this.app.get(`/api/myplaces`)

    getMyPlaceToEdit = id => this.app.get(`/api/myplace/edit/${id}`) //da completare

    getOneRegister = id => this.app.get(`/api/onePlace/${id}`)

    updateMyPlace = data => this.app.put(`/places/updateMyPlace`, data)

    returnPlaceToPending = id => this.app.put(`/places/returnPending/${id}`)

    updatePendingHostAndPlace = id => this.app.put(`/api/updateHostPlace/${id}`)
    
    updatePendingApplicant = id => this.app.put(`/api/updateApplicant/${id}`)

    deleteHostPlace = id => this.app.delete(`/api/deleteHostPlace/${id}`)

    deleteApplicant = id => this.app.delete(`/api/deleteApplicant/${id}`)

    tryPost = data => this.app.post('/places/postEmail', data)

    keyHandler = () => this.app.get('/api/unsplash')

    apiSplash = url => this.app.get(url)
}

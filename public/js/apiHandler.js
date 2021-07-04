class ApiHandler {
    constructor(baseUrl) {
        this.BASE_URL = baseUrl

        this.app = axios.create({
            baseURL: this.BASE_URL,
        })
    }

    getFullPlaces = () => this.app.post('/api/places')

    getOneRegister = id => this.app.post(`/api/onePlace/${id}`)
}

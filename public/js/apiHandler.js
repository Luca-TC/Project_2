class ApiHandler {
    constructor(baseUrl) {
        this.BASE_URL = baseUrl

        this.app = axios.create({
            baseURL: this.BASE_URL,
        })
    }

    getFullList = () => this.app.get('/places/api/all')

    getOneRegister = id => this.app.get(`/places/api/${id}`)
}

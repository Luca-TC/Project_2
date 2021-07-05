class ApiHandler {
    constructor(baseUrl) {
        this.BASE_URL = baseUrl

        this.app = axios.create({
            baseURL: this.BASE_URL,
        })
    }

    getFullPlaces = () => this.app.get('/api/places')

    getOneRegister = id => this.app.get(`/api/onePlace/${id}`)

    updatePendingHostAndPlace = id => this.app.post(`/api/updateHostPlace/${id}`)
}

class ApiHandlerPost {
    constructor(baseUrl, bodyFormData) {
        this.app = axios.create({
            method: 'post',
            url: baseUrl,
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    }

    tryPost = () => this.app('/api/postTry')
}

// var bodyFormData = new FormData();
// And then add the fields to the form you want to send:

// bodyFormData.append('userName', 'Fred');
// If you are uploading images, you may want to use .append

// bodyFormData.append('image', imageFile);
// And then you can use axios post method (You can amend it accordingly)

// axios({
//   method: "post",
//   url: "myurl",
//   data: bodyFormData,
//   headers: { "Content-Type": "multipart/form-data" },
// })
//   .then(function (response) {
//     //handle success
//     console.log(response);
//   })
//   .catch(function (response) {
//     //handle error
//     console.log(response);
//   });

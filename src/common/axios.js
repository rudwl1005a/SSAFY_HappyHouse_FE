import axios from 'axios'

export default axios.create({
    // baseURL: 'http://3.34.190.221:8080',
    baseURL: 'http://localhost:8080',
    headers: {'Content-type': 'application/json'},
    // withCredentials : true,
})
import axios from "axios";

axios.defaults.baseURL = 'https://purrfect-matches-06bb403f2068.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true
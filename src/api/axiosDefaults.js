import axios from "axios";

axios.defaults.baseURL = 'https://purrfect-matches-06bb403f2068.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

// Export instances to attach interceptors to.
// One for the request, and one for the response.
export const axiosReq = axios.create();
export const axiosRes = axios.create();
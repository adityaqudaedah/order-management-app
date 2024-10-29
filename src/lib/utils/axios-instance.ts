import axios from "axios";

const instance = axios.create({
    baseURL : "https://mock.apidog.com/m1/523540-0-default/api"
})

export default instance
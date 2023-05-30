import axios from "axios";

axios.defaults.baseURL = "https://nodejs-post-app.herokuapp.com/api";

const http = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete,
};
export default http;

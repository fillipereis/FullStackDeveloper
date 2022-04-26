import ApiAxios from "./axios";

let PostLoginUrl = axios.create({ loginURL: `http://localhost:8000/api/login` });

export default {

  postLogin() {
    ApiAxios.post(this.PostLoginUrl);
    return PostLoginUrl;
  }
}

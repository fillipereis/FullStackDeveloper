import ApiAxios from "./axios";

let GetCookieUrl = axios.create({ cookieURL: `http://localhost:8000/sanctum/csrf-cookie` });

export default {

  getCookie() {
    ApiAxios.get(this.getCookieUrl);
    return GetCookieUrl;
  }
}

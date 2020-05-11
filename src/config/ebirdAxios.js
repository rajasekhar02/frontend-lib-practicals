import Axios from "axios";

const secret = "o5f0i0rurfkj";
const baseURL = "https://api.ebird.org/v2";
const restAPIAxios = Axios.create({
  baseURL,
  headers: {
    "x-ebirdapitoken": secret
  }
});

export default restAPIAxios;

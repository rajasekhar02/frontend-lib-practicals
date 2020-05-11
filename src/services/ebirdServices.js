import restAPIAxios from "@/config/ebirdAxios";
import Axios from "axios";
import { accessToken } from "mapbox-gl";

export const getRecentObservations = (regionCode, params) => {
  return restAPIAxios.get(`/data/obs/${regionCode}/recent`, { params });
};

export const getListOfCountries = () => {
  return Axios.get(`https://restcountries.eu/rest/v2/all`);
};

export const reverseGeocodingService = (longitude, latitude) => {
  return Axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`,
    { params: { access_token: accessToken, types: "country" } }
  );
};
export default {
  getRecentObservations,
  getListOfCountries,
  reverseGeocodingService
};

import axios, { AxiosResponse } from "axios";
import { GEO_API_URL } from "@env";

const GeoCodeServices = {
  querySearchCity(query: any): Promise<AxiosResponse<any, any>> {
    return axios.get(`${GEO_API_URL}/search?${query}`);
  },
  querySearchLatLon(query: any): Promise<AxiosResponse<any, any>> {
    return axios.get(`${GEO_API_URL}/reverse?${query}`);
  },
};

export default GeoCodeServices;

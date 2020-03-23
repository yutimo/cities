import axios from "axios";

export default function(id) {
  return axios.get(`/cities/${id}/overview`);
}
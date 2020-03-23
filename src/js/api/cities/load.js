import axios from "axios";

export default function() {
  return axios.get('/classifiers/cities');
}
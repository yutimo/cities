import axios from "axios";

export default function(selectedCities, selectedMetric) {
  return axios.get('/chart/treemap', {
    params: {
      cities: selectedCities,
      metric: selectedMetric
    }
  })
}
import axios from 'axios';

class ApiClientBase {
  //apiBaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://storkrecruit-api.herokuapp.com';
  apiBaseUrl = 'http://localhost:8080';
  Get(endpoint, params) {
    const config = {};
    if (params) config.params = params;
    return axios.get(this.apiBaseUrl + endpoint);
  }
  Post(endpoint, data) {
    if (!data) data = new FormData();
    return axios.post(this.apiBaseUrl + endpoint, data);
  }
}

export default ApiClientBase;

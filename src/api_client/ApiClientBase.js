import axios from 'axios';

class ApiClientBase {
  //apiBaseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://storkrecruit-api.herokuapp.com';
  apiBaseUrl = 'https://storkrecruit-api.herokuapp.com';
  serviceId = 'service_stork';
  templateId = 'template_jf4iv1s';
  publicKey = 'Dj0YvZ0Kvb5X-oIfQ';
  Get(endpoint, params) {
    const config = {};
    if (params) config.params = params;
    return axios.get(this.apiBaseUrl + endpoint, config);
  }
  Post(endpoint, data) {
    if (!data) data = new FormData();
    return axios.post(this.apiBaseUrl + endpoint, data);
  }

  Put(endpoint, data) {
    if (!data) data = new FormData();
    return axios.put(this.apiBaseUrl + endpoint, data);
  }
}

export default ApiClientBase;

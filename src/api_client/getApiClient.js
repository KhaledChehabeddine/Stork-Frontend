import ApiClient from './ApiClient';

let apiClient = new ApiClient();

export default function getApiClient(){
  if (apiClient === null) apiClient = new ApiClient();
  return apiClient;
}

import axios from 'axios';
const Fetch = require('./apiConfig');

export async function search(params) {
  return axios.get(Fetch.demoUrl);
}

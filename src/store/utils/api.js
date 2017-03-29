// import Vue from 'vue'
import axios from 'axios'

export default {
  get(url, request) {
    return axios.get(url, request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }
}
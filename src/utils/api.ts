/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
/** eslint-disable-next-line no-underscore-dangle */
import axios from 'axios';

let headers:any = {};
headers['Content-Type'] = 'application/json';
headers.withCredentials = true;
headers.Accept = 'application/json';
headers['Access-Control-Allow-Origin'] = '*';

/**
 * @description Make a get request to an api using this method
 *
 * @param {string} url Complete url (e.g., http://www.google.com)
 * @param {object} params The params to be appended
 * @param {object} header The headers to be sent with the api
 *
 * @returns {object} The response from the server
 */
const getApi = (url:string, params = {}, header = {}) => {
  headers = { ...headers, ...header };
  return axios.get(url, { params, headers })
    .then((response) => response)
    .catch((e) => {
      throw e;
    });
};

/**
 * @description Make a post request to an api using this method
 *
 * @param {string} url Complete url (e.g., http://www.google.com)
 * @param {object} data Body of the post api
 * @param {object} header The headers to be sent with the api
 *
 * @returns {object} The response from the server
 */
const postApi = (url:string, data = {}, header = {}) => {
  headers = { ...headers, ...header };
  return axios.post(url, data, { headers })
    .then((response) => response)
    .catch((e) => {
      throw e;
    });
};

/**
 * @description Make a delete request to an api using this method
 *
 * @param {string} url Complete url (e.g., http://www.google.com)
 * @param {object} params of the delete api
 * @param {object} header The headers to be sent with the api
 *
 * @returns {object} The response from the server
 */
const deleteApi = (url: string, data = {}, params = {}, header = {}) => {
  headers = { ...headers, ...header };
  return axios.delete(url, { data, params, headers })
    .then((response) => response)
    .catch((e) => {
      throw e;
    });
};

/**
 * @description Make a patch request to an api using this method
 *
 * @param {string} url Complete url (e.g., http://www.google.com)
 * @param {object} data Body of the patch api. Mostly the data to be updated
 * @param {object} header The headers to be sent with the api.
 *
 * @returns {object} The response from the server
 */
const patchApi = (url: string, data = {}, header = {}) => {
  headers = { ...headers, ...header };
  return axios.patch(url, data, { headers })
    .then((response) => response)
    .catch((e) => {
      throw e;
    });
};

/**
 * @description Make a patch request to an api using this method
 *
 * @param {string} url Complete url (e.g., http://www.google.com)
 * @param {object} data Body of the patch api. Mostly the data to be updated
 * @param {object} header The headers to be sent with the api.
 *
 * @returns {object} The response from the server
 */
const putApi = (url: string, data = {}, header = {}) => {
  headers = { ...headers, ...header };
  return axios.put(url, data, { headers })
    .then((response) => response)
    .catch((e) => {
      throw e;
    });
};

const apiRequests = {
  get: getApi,
  post: postApi,
  delete: deleteApi,
  patch: patchApi,
  put: putApi,
};
export default apiRequests;

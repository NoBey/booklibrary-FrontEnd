import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page }) {
  return request(`/api/user/list/${page}`, {
    method: 'GET'
  });
}

export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}
export function login(values) {
  return request(`/api/login`, {
    method: 'POST',
    headers:{
    　　　　'Content-Type' : 'application/json'
   },
    body: JSON.stringify(values),
  });
}
export function patch(values) {
  return request(`/api/user/update`, {
    method: 'POST',
    headers:{
    　　　　'Content-Type' : 'application/json'
   },
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('/api/user', {
    method: 'POST',
    headers:{
    　　　　'Content-Type' : 'application/json'
  },
    body: JSON.stringify(values),
  });
}

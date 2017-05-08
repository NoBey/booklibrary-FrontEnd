import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function list() {
  return request(`/book/list/`,{
    method: 'GET'
  });
}

export function remove(values) {
  return request(`/book/delete`, {
    method: 'POST',
    headers:{
    　　　　'Content-Type' : 'application/json'
   },
      body: JSON.stringify(values),
  });
}

export function patch(values) {
  return request(`/book/update`, {
    method: 'POST',
    headers:{
    　　　　'Content-Type' : 'application/json'
   },
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('/book/add', {
    method: 'POST',
    headers:{
    　　　　'Content-Type' : 'application/json'
   },
    body: JSON.stringify(values)
  });
}

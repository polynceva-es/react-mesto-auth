const BASE_URL = 'https://auth.nomoreparties.co';
const HEADERS = {'Content-Type': 'application/json'};

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json(); 
}
export function register(values) {
  return fetch (`${BASE_URL}/signup`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({password: values.password, email: values.email})
  })
  .then(res=> getResponseData(res))
}

export function login(values) {
  return fetch (`${BASE_URL}/signin`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({password: values.password, email: values.email})
  })
  .then(res=> getResponseData(res))
  .then(res=> {return res;})
}

export function checkToken(jwt) {
  return fetch (`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {...HEADERS, 'Authorization': `Bearer ${jwt}`}
  })
  .then(res=> getResponseData(res))
}
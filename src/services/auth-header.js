export function authHeader() {
  // return authorization header with token
  let token = JSON.parse(localStorage.getItem('token'));

  if (token) {
      return { 'Authorization': 'Bearer ' + token };
  } else {
      return {};
  }
}
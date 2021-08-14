function authHeader() {
  // return authorization header with token
  let token = localStorage.getItem('token');

  if (token) {
      return { 'Authorization': 'Bearer ' + token };
  } else {
      return {};
  }
}

export default authHeader;
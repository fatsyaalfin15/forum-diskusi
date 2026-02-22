const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const fetchWithAuth = (url, options = {}) => {
  const token = localStorage.getItem('token');

  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...options.headers,
    },
  });
};

export { BASE_URL, fetchWithAuth };

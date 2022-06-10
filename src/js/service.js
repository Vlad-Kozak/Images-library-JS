const axios = require('axios');

const url = 'https://pixabay.com/api';

export async function fetchImages(search, page) {
  const response = await axios.get(url, {
    params: {
      key: '27967151-ab8cfc2615dc84471ea9a640f',
      q: search,
      page: page,
      per_page: 40,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });

  return response.data;
}

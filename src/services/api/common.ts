import axios from 'axios';

const getAmadeusToken = async () => {
  const url = 'https://test.api.amadeus.com/v1/security/oauth2/token';
  const clientId = process.env.REACT_APP_API_KEY
  const clientSecret = process.env.REACT_APP_API_SECRET
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const data = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`

  try {
    const response = await axios.post(url, data, { headers });
    return response.data.access_token;
  } catch (error) {
    throw error;
  }
}


export { getAmadeusToken }

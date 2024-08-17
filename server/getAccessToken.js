const axios = require('axios');
const querystring = require('querystring');

async function getAccessToken(code) {
  const params = querystring.stringify({
    app_id: '1269268458224712782',
    app_secret: '4r6K74CL8n7OM9wcGKMG',
    code: code,
    redirect_uri: 'https://www.fidovn.com/website/',
    grant_type: 'authorization_code'
  });

  try {
    const response = await axios.post('https://oauth.zaloapp.com/v4/oa/access_token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('Full Response:', response.data);
    console.log('Access Token:', response.data.access_token);
  } catch (error) {
    console.error('Error fetching Access Token:', error.response ? error.response.data : error.message);
  }
}

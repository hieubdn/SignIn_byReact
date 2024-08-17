const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const app = express();

const PORT = 3002;

app.get('/website/', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send('Mã xác thực không có trong URL');
  }

  console.log('Authorization Code:', code);

  try {
    const params = querystring.stringify({
      app_id: '1269268458224712782',
      app_secret: '4r6K74CL8n7OM9wcGKMG',
      code: code,
      redirect_uri: 'https://www.fidovn.com/website/',
      grant_type: 'authorization_code',
    });

    const response = await axios.post(
      'https://oauth.zaloapp.com/v4/oa/access_token',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('Full Response:', response.data);
    console.log('Access Token:', response.data.access_token);

    res.send(
      'Mã xác thực đã nhận và Access Token là: ' + response.data.access_token
    );
  } catch (error) {
    console.error(
      'Error fetching Access Token:',
      error.response ? error.response.data : error.message
    );
    res.status(500).send('Có lỗi xảy ra khi lấy Access Token');
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

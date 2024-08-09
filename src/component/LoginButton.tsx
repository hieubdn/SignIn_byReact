import React, { useEffect, useState } from 'react';
import './LoginButton.css'; // Import file CSS

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

interface FacebookUserInfo {
  id: string;
  name: string;
  email: string;
  picture: {
    data: {
      url: string;
    };
  };
}

const LoginButton: React.FC = () => {
  const [userInfo, setUserInfo] = useState<FacebookUserInfo | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isTokenShortened, setIsTokenShortened] = useState<boolean>(true);

  useEffect(() => {
    // Initialize the Facebook SDK when it is loaded
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '399614392711678', // Replace with your App ID
        cookie: true,
        xfbml: true,
        version: 'v20.0' // Ensure this is the correct version
      });
    };
  }, []);

  const handleFacebookLogin = () => {
    window.FB.login((response: any) => {
      if (response.authResponse) {
        setAccessToken(response.authResponse.accessToken);
        window.FB.api('/me', { fields: 'name,email,picture' }, (userInfo: FacebookUserInfo) => {
          setUserInfo(userInfo);
          console.log('Access Token:', response.authResponse.accessToken);
          console.log('User Info:', userInfo);
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'public_profile,email' });
  };

  const toggleTokenView = () => {
    setIsTokenShortened(!isTokenShortened);
  };

  const getDisplayToken = () => {
    if (!accessToken) return '';
    return isTokenShortened ? accessToken.substring(0, 30) + '...' : accessToken;
  };

  return (
    <div className="login-container">
      {!userInfo ? (
        <button onClick={handleFacebookLogin} className="facebook-button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
            alt="Facebook Logo"
            className="facebook-logo"
          />
          Đăng nhập bằng Facebook
        </button>
      ) : (
        <div className="user-info">
          <h2>Welcome, {userInfo.name} !</h2>
          <img
            src={userInfo.picture.data.url}
            alt="Avatar"
            className="avatar"
          />
          <p><strong>Email :</strong> {userInfo.email}</p>
          <p><strong>ID:</strong> {userInfo.id}</p>
          <p>
            <strong>Access Token: </strong> {getDisplayToken()}{' '}
            {accessToken && (
              <button onClick={toggleTokenView} className="toggle-button">
                {isTokenShortened ? 'Hiển thị đầy đủ' : 'Rút gọn'}
              </button>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginButton;

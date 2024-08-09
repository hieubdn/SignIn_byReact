import React, { useState } from 'react';
import './App.css';
import GoogleSignIn from './component/GoogleSignIn'

const App: React.FC = () => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const handleLoginSuccess = (token: string) => {
    setLoginSuccess(true);
    setAccessToken(token);
  };

  const handleLogout = () => {
    setLoginSuccess(false);
    setAccessToken(null);
  };

  // Rút gọn Token
  const shortenToken = (token: string) => {
    return token.length > 30 ? `${token.substring(0, 30)}...` : token;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>LOGIN</h1>
        {loginSuccess && <p style={{ color: 'green' }}>Signed in successfully!</p>}
        {accessToken && (
          <p>
            Access Token: <strong>{shortenToken(accessToken)}</strong>
          </p>
        )}
        <GoogleSignIn onLoginSuccess={handleLoginSuccess} onLogout={handleLogout} />
      </header>
    </div>
  );
}

export default App;

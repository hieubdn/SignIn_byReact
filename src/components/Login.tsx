import React, { useState } from 'react';
import axios from 'axios';

interface UserInfo {
    id: string;
    name: string;
    picture: {
        data: {
            url: string;
        };
    };
    phone?: string;
}

const Login: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const generateCodeVerifierAndState = (): { codeVerifier: string, state: string } => {
        const generateRandomString = (length: number, mixedCase: boolean): string => {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let result = '';
            for (let i = 0; i < length; i++) {
                let char = chars.charAt(Math.floor(Math.random() * chars.length));
                if (mixedCase && i % 2 === 0) {
                    char = char.toUpperCase();
                }
                result += char;
            }
            return result;
        };
        
        return {
            codeVerifier: generateRandomString(43, true),
            state: generateRandomString(32, false),
        };
    };

    const handleLogin = async () => {
        try {
            const { codeVerifier, state } = generateCodeVerifierAndState();

            const sha256 = async (data: string) => {
                const encoder = new TextEncoder();
                const dataArray = encoder.encode(data);
                const hashBuffer = await crypto.subtle.digest('SHA-256', dataArray);
                return hashBuffer;
            };

            const base64UrlEncode = (input: ArrayBuffer) => {
                const base64 = btoa(String.fromCharCode(...new Uint8Array(input)));
                return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
            };

            const codeChallenge = await sha256(codeVerifier);
            const codeChallengeEncoded = base64UrlEncode(codeChallenge);

            const authorizationUrl = `https://oauth.zaloapp.com/v4/permission?app_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&code_challenge=${codeChallengeEncoded}&code_challenge_method=S256&state=${state}`;
            
            window.open(authorizationUrl, '_blank', 'width=600,height=600');
            
            const checkForUrl = () => {
                if (window.location.search.includes('code=')) {
                    const code = new URLSearchParams(window.location.search).get('code');
                    if (code) {
                        fetchAccessToken(code, codeVerifier);
                    }
                }
            };

            const interval = setInterval(checkForUrl, 1000);
            setTimeout(() => clearInterval(interval), 120000);

        } catch (error) {
            console.error('Lỗi trong quá trình đăng nhập:', error);
        }
    };

    const fetchAccessToken = async (code: string, codeVerifier: string) => {
        try {
            const response = await axios.post('https://oauth.zaloapp.com/v4/access_token', null, {
                params: {
                    app_id: process.env.REACT_APP_CLIENT_ID,
                    code,
                    grant_type: 'authorization_code',
                    code_verifier: codeVerifier,
                },
                headers: {
                    secret_key: process.env.REACT_APP_CLIENT_SECRET!,
                },
            });
            fetchUserInfo(response.data.access_token);
        } catch (error) {
            console.error('Lỗi khi lấy mã truy cập:', error);
        }
    };

    const fetchUserInfo = async (token: string) => {
        try {
            const response = await axios.get('https://graph.zalo.me/v2.0/me', {
                params: {
                    fields: 'id,name,picture,phone',
                },
                headers: {
                    access_token: token,
                },
            });
            setUserInfo(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
        }
    };

    return (
        <div>
            <button onClick={handleLogin}>Đăng nhập với Zalo</button>
            {userInfo && (
                <div>
                    <h2>{userInfo.name}</h2>
                    <p>ID: {userInfo.id}</p>
                    <p>Điện thoại: {userInfo.phone ?? 'Không có'}</p>
                    <img src={userInfo.picture.data.url} alt="Ảnh đại diện người dùng" />
                </div>
            )}
        </div>
    );
};

export default Login;

import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, UserCredential } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaSignOutAlt } from 'react-icons/fa';


const firebaseConfig = {
    apiKey: "AIzaSyCBPoYPl1Gtc3bHZsMCM_c6BkDYMgtu8T4",
    authDomain: "logingg-80631.firebaseapp.com",
    projectId: "logingg-80631",
    storageBucket: "logingg-80631.appspot.com",
    messagingSenderId: "381332090322",
    appId: "1:381332090322:web:a6cdda7bed58cc51ab6c0b",
    measurementId: "G-SM665ZG1SW"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

interface GoogleSignInProps {
    onLoginSuccess: (accessToken: string) => void;
    onLogout: () => void;
}

const GoogleSignIn: React.FC<GoogleSignInProps> = ({ onLoginSuccess, onLogout }) => {
    const [user, loading, error] = useAuthState(auth);

    const signInWithGoogle = async () => {
        try {
            const result: UserCredential = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const accessToken = credential?.accessToken;

            console.log('Signed in successfully!');

            if (accessToken) {
                onLoginSuccess(accessToken);
            }
        } catch (error) {
            console.error('Error signing in with Google: ', error);
            alert('Error signing in with Google: ' + (error as Error).message);
        }
    };

    const signOutUser = async () => {
        try {
            await signOut(auth);
            console.log('Signed out successfully!');
            onLogout();
        } catch (error) {
            console.error('Error signing out: ', error);
            alert('Error signing out: ' + (error as Error).message);
        }
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {(error as Error).message}</p>}
            {user ? (
                <div>
                    <p>Name: <strong style={{ color: 'red' }}>{user.displayName}</strong></p>
                    <p>ID: <strong>{user.uid}</strong></p>
                    <img src={user.photoURL || ''} alt="User Avatar" style={{ width: '10rem', borderRadius: '50%' }} />
                    <button
                        onClick={signOutUser}
                        style={{
                            display: 'flex',
                            fontSize: '1rem',
                            alignItems: 'center',
                            padding: '1rem',
                            background: '#F4F4F4',
                            color: 'black',
                            border: 'none',
                            borderRadius: '15rem'
                        }}
                    >
                        <FaSignOutAlt style={{ paddingLeft: '0.5rem', marginRight: '10px' }} />
                        <strong style={{ paddingLeft: '0.5rem' }}>Sign Out</strong>
                    </button>
                </div>
            ) : (
                <button
                    onClick={signInWithGoogle}
                    style={{
                        display: 'flex',
                        fontSize: '2rem',
                        alignItems: 'center',
                        padding: '1rem',
                        background: '#F4F4F4',
                        color: 'black',
                        border: 'none',
                        borderRadius: '15px'
                    }}
                >
                    <img
                        src="data:image/png;base64,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"
                        alt="Google logo"
                        style={{ width: '50px', marginRight: '40px' }}
                    />
                    Sign in with Google
                </button>
            )}
        </div>
    );
};

export default GoogleSignIn;

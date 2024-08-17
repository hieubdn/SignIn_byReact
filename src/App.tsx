// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ZaloLoginButton from './components/ZaloLoginButton';
// import ZaloCallback from './components/ZaloCallback';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<ZaloLoginButton />} />
//         <Route path="/website" element={<ZaloCallback />} />
//         {/* Các route khác của ứng dụng */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React from 'react';
import Login from './components/Login';

const App: React.FC = () => {
    return (
        <div className="App">
            <Login />
        </div>
    );
};

export default App;


import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './components/Homepage';
import SigninPage from './features/auth/SigninPage';
import SignupPage from './features/auth/SignupPage';

function App() {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col h-screen">
      <Header auth={auth} />
      <Routes>
        <Route
          exact="true"
          path="/"
          element={<Homepage auth={auth} />}
        />
        <Route
          exact="true"
          path="/signup"
          element={<SignupPage />}
        />
        <Route
          exact="true"
          path="/signin"
          element={<SigninPage />}
        />
      </Routes>
    </div>
  );
}

export default App;

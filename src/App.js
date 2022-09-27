import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SigninPage from './features/auth/SigninPage';
import SignupPage from './features/auth/SignupPage';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Routes>
        <Route
          exact="true"
          path="/"
          element={<h1 className="text-3xl text-center">WASSCE Passco</h1>}
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

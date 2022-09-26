import { Route, Routes } from 'react-router-dom';
import SignupPage from './features/auth/SignupPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<h1 className="text-3xl text-center">WASSCE Passco</h1>}
        />
        <Route
          path="/signup"
          element={<SignupPage />}
        />
      </Routes>
    </div>
  );
}

export default App;

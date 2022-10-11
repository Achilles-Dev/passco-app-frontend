import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './components/Homepage';
import AddAnswer from './features/answers/AddAnswer';
import SigninPage from './features/auth/SigninPage';
import SignupPage from './features/auth/SignupPage';
import AddQuestion from './features/questions/AddQuestion';
import EditQuestion from './features/questions/EditQuestion';
import QuestionsList from './features/questions/QuestionsList';
import AddSubject from './features/subjects/AddSubject';
import EditSubject from './features/subjects/EditSubject';

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
        <Route
          exact="true"
          path="/subjects/add"
          element={<AddSubject auth={auth} />}
        />
        <Route
          exact="true"
          path="/subjects/:subjectId"
          element={<h1>No content</h1>}
        />
        <Route
          exact="true"
          path="/subjects/:subjectId/edit"
          element={<EditSubject auth={auth} />}
        />
        <Route
          exact="true"
          path="/questions/add"
          element={<AddQuestion auth={auth} />}
        />
        <Route
          exact="true"
          path="/questions/:questionId/edit"
          element={<EditQuestion auth={auth} />}
        />
        <Route
          exact="true"
          path="/answers/:questionId/add"
          element={<AddAnswer auth={auth} />}
        />
        <Route
          exact="true"
          path="/subjects/:subjectId/:year/questions"
          element={<QuestionsList auth={auth} />}
        />
      </Routes>
    </div>
  );
}

export default App;

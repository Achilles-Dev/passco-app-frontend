import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectSubjectById } from '../features/subjects/subjectsSlice';
import { fetchQuestions, resetQuestions, selectAllQuestions } from '../features/questions/questionsSlice';
import Spinner from './Spinner';
import QuestionsList from '../features/questions/QuestionsList';
import { addSignedInUser } from '../features/users/usersSlice';

const QuestionsPage = ({ auth }) => {
  const { subjectId, year } = useParams();
  const id = auth.ids[0];
  const dispatch = useDispatch();
  const questions = useSelector(selectAllQuestions);
  const status = useSelector((state) => state.questions.status);
  const subject = useSelector((state) => selectSubjectById(state, subjectId));
  const [content, setContent] = useState('');

  useEffect(() => {
    if (status === 'loading') {
      setContent(<Spinner />);
    } else {
      setContent(
        <QuestionsList
          questions={questions}
          subjectId={subjectId}
          userId={id}
          year={year}
        />,
      );
    }
  }, [status]);

  useEffect(() => {
    if (auth.entities[id]) {
      const { token } = auth.entities[id];
      dispatch(resetQuestions());
      dispatch(fetchQuestions({ token, year, subjectId }));
      dispatch(addSignedInUser(auth.entities[id].user));
    }
  }, [dispatch, auth, year]);

  return (
    <div className="m-2 p-3 bg-white h-screen">
      <h2 className="text-center text-blue-400 text-3xl m-2">
        {` ${subject.name} questions for the year, ${year}`}
      </h2>
      <div className="p-3 text-lg border border-blue-400">
        { content }
      </div>
    </div>
  );
};

QuestionsPage.propTypes = {
  auth: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.number),
    entities: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
};

export default QuestionsPage;

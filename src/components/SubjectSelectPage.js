import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllSubjects, selectSubjectById } from '../features/subjects/subjectsSlice';
import { fetchQuestions } from '../features/questions/questionsSlice';

const SubjectSelectPage = ({ auth }) => {
  const id = auth.ids[0];
  let { subjectId } = useParams();
  const navigate = useNavigate();
  const singleSubject = useSelector((state) => selectSubjectById(state, subjectId));
  const multipleSubjects = useSelector((selectAllSubjects));
  const [subject, setSubject] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [subjectIdMessage, setSubjectIdMessage] = useState('');
  const [year, setYear] = useState('');
  const [yearMessage, setYearMessage] = useState('');
  const currentYear = new Date().getFullYear();
  const yearLength = currentYear - 1989;
  const yearRange = Array.from({ length: yearLength }, (_, i) => i + 1990);
  const dispatch = useDispatch();

  useEffect(() => {
    if (subjectId !== '0') {
      setSubject(singleSubject);
    } else {
      setSubjects(multipleSubjects);
    }
  }, [singleSubject, multipleSubjects]);

  const handleYearSelect = () => {
    const selectedYear = document.querySelector('#year').value;
    setYear(selectedYear);
    if (yearMessage !== '') {
      setYearMessage('');
    }
  };

  const handleSubjectSelect = () => {
    const id = document.querySelector('#subject-id').value;
    subjectId = Number(id);
    if (subjectIdMessage !== '') {
      setSubjectIdMessage('');
    }
  };

  const handleSubmit = () => {
    if (auth.entities[id] && (subjectId > 0) && (year !== '')) {
      const { token } = auth.entities[id];
      dispatch(fetchQuestions({ token, year, subjectId }));
      navigate(`/subjects/${subjectId}/${year}/questions`);
    } else if (year !== '' && (subjectId === '0' && typeof subjectId !== 'number')) {
      setSubjectIdMessage('Please choose a subject');
    } else if (year === '') {
      setYearMessage('Please choose a year');
    }
  };

  return (
    <div className="m-2 p-3 bg-white h-screen">
      <h2 className="text-center text-blue-400 text-3xl m-2">
        Welcome to the questions bank.
        { Object.keys(subject).length !== 0
          ? (
            <p className="text-xl">
              {' Select question year for'}
              <span className="text-red-400 text-2xl">{` ${subject.name.toUpperCase()} `}</span>
              to continue.
            </p>
          )
          : <p className="text-xl"> Select subject and question year to continue.</p>}
      </h2>
      { Object.keys(subject).length === 0
        ? (
          <div className="p-3 text-lg">
            <div className="flex flex-col justify-center px-3 md:px-10 mt-10">
              <select
                id="year"
                className="block py-2.5 px-0 w-auto text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
                onChange={handleYearSelect}
              >
                <option selected>Choose year</option>
                { yearRange.map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
              <span className="text-red-600">{yearMessage}</span>
            </div>
            <div className="flex flex-col justify-center px-3 md:px-10 mt-10">
              <select
                id="subject-id"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                onChange={handleSubjectSelect}
              >
                <option className="h-full" selected>Choose subject</option>
                { subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
              <span className="text-red-600">{subjectIdMessage}</span>
            </div>
          </div>
        )
        : (
          <div className="p-3 text-lg">
            <div className="flex flex-col justify-center px-3 md:px-10 mt-10">
              <select
                id="year"
                className="block py-2.5 px-0 w-auto text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
                onChange={handleYearSelect}
              >
                <option selected>Choose year</option>
                { yearRange.map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
              <span className="text-red-600">{yearMessage}</span>
            </div>
          </div>
        )}
      <div className="flex mt-5">
        <button
          type="button"
          className="btn-primary disabled:btn-primary-light"
          onClick={handleSubmit}
        >
          Click to begin
        </button>
      </div>
    </div>
  );
};

SubjectSelectPage.propTypes = {
  auth: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.number),
    entities: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
};

export default SubjectSelectPage;

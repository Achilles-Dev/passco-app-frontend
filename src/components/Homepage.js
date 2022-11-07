import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => (
  <div className="py-5">
    <h1 className="text-3xl text-center">WASSCE Passco</h1>
    <div className="mx-3 mt-5">
      <Link to="/subjects/0" className="btn-primary mt-5">Go to Questions Page </Link>
    </div>
  </div>
);

export default Homepage;

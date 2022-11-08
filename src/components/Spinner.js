import React from 'react';

const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin w-12 h-12 border-1 border-r-2 border-l-2 border-blue-400 rounded-full" role="status" />
  </div>
);

export default Spinner;

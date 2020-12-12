import React from 'react';

const FullPageLoader = () => {
  return (
    <div className='fp-container'>
      <div className='spinner-grow text-success fp-loader' role='status'>
        <span className='sr-only'></span>
      </div>
    </div>
  );
};

export default FullPageLoader;

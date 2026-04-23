import React from 'react';

const Toast = ({ message, type }) => (
  <div className={`toast toast-${type}`}>
    <span>{type === 'add' ? '❤️' : '💔'}</span>
    {message}
  </div>
);

export default Toast;

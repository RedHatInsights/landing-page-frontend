import React from 'react';

const ScalprumProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return children;
};

const ScalprumComponent = () => 'Scalprum Component Mock';

module.exports.ScalprumComponent = ScalprumComponent;
module.exports.ScalprumProvider = ScalprumProvider;

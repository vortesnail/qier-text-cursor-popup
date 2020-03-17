import React from 'react';

interface HelloProps {
  compiler: string;
  framework: string;
}

const Hello = (props: HelloProps) => {
  const { compiler, framework } = props;
  return (
    <h1>
      Hello from {compiler} and {framework}!
    </h1>
  );
};

export default Hello;

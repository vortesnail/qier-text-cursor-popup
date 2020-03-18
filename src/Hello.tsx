import React from 'react';
import './Hello.less';

interface HelloProps {
  compiler: string;
  framework: string;
}

const Hello = (props: HelloProps) => {
  const { compiler, framework } = props;
  return (
    <h1 className="hello">
      Hello from {compiler} and {framework}!
    </h1>
  );
};

export default Hello;

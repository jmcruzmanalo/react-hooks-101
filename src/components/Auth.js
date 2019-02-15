import React, { useContext } from 'react';
import AuthContext from '../auth-context';

const Auth = () => {
  const auth = useContext(AuthContext);
  console.log(auth);
  return (
    <>
      <h1>Auth</h1>
      <button onClick={auth.login} type="button">
        Login
      </button>
    </>
  );
};

export default Auth;

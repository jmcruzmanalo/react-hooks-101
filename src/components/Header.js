import React, { useContext } from 'react';
import AuthContext from '../auth-context';

const Header = (props) => {
  const authContext = useContext(AuthContext);
  const { onLoadTodos, onLoadAuth } = props;
  return (
    <header>
      {authContext.authStatus && (
        <button key="todosButton_key" type="button" onClick={onLoadTodos}>
          Todo List
        </button>
      )}
      <button key="authButton_key" type="button" onClick={onLoadAuth}>
        Auth
      </button>
    </header>
  );
};

export default Header;

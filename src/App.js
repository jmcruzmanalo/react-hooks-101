import React, { useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';
import AuthContext from './auth-context';

const App = () => {
  const [route, setRoute] = useState('AUTH');
  const [authStatus, setAuthStatus] = useState(false);
  const switchPage = (page) => {
    setRoute(page);
  };

  const login = () => {
    setAuthStatus(true);
  };

  return (
    <div className="App ">
      <AuthContext.Provider
        value={{
          authStatus,
          login,
        }}
      >
        <Header onLoadTodos={() => switchPage('TODO')} onLoadAuth={() => switchPage('AUTH')} />
        <hr />
        {route === 'TODO' && <Todo />}
        {route === 'AUTH' && <Auth />}
      </AuthContext.Provider>
    </div>
  );
};

export default App;

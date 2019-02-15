import { createContext } from 'react';

const authContext = createContext({ authStatus: false, login: () => {} });

export default authContext;

import React, { createContext, useReducer } from 'react';
import './App.css';
import Navbar from './Navbar'
import Login from './Login';
import { Route} from 'react-router-dom'
import Signup from './Signup';
import Logout from './Logout';
import {initialState,reducer} from './UseReducer'
export const UserContext = createContext()

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <div className="App">
    <UserContext.Provider value={{state,dispatch}}>
      <Navbar />
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/register'>
        <Signup />
      </Route>
      <Route path='/logout'>
        <Logout />
      </Route>
      </UserContext.Provider>
    </div>
    
  );
}

export default App;

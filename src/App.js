import React from 'react'

import './App.css';
import { Header } from './components/Header/Header';

import {QueryClient,QueryClientProvider} from 'react-query'
import 'bootstrap/dist/css/bootstrap.min.css';
import { elements } from './Router/elements';
import { Router } from './Router/Router';

function App() {

  const queryclient = new QueryClient();
  return (
    <QueryClientProvider client={queryclient}>
    <div>
      <Header/>
      {elements.map(data=>
        <Router isAuth={data.isAuth} path={data.path} element={data.element}/>
        )}
    </div>
    </QueryClientProvider>
  )
}

export default App

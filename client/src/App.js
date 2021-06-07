import './App.css';

import {Home} from './Home';
import {Author} from './Author';
import {Book} from './Book';
import {Issue} from './Issue';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
       Library Managment System
     </h3>

     <Navigation/>

     <Switch>
       <Route path='/' component={Home} exact/>
       <Route path='/author' component={Author}/>
       <Route path='/Book' component={Book}/>
       <Route path='/Issue' component={Issue}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

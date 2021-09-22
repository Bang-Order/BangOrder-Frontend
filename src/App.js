import './logo.svg';
import './App.css';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Redirect from="/" exact to="login" />
      </Router>
    </div>
  );
}

export default App;

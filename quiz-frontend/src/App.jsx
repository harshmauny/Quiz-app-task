import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './components/Home';
import Login from './components/login';
import Register from './components/register';
import Quiz from './components/quiz';
function App() {
  return (
    <Router>
      <div >
        <Switch>

          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/quiz" component={Quiz} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;

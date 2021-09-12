import './App.css';
import LoginPage from './components/Login';
import LeadsPage from './components/Leads';
import OverviewPage from './components/Overview';
import { Route, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/leads" component={LeadsPage} />
      <Route exact path="/overview" component={OverviewPage} />
    </BrowserRouter>
  );
}

export default App;

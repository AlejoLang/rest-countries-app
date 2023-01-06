import CountryPage from 'pages/country';
import MainPage from 'pages/Main';
import SearchPage from 'pages/search';
import { Route, Switch } from 'wouter';
import './App.css';

function App() {

  return (
    <div className="App">
      
      <Switch >
        <Route path='/' component={MainPage} />
        <Route path='/search/:country' component={SearchPage} />
        <Route path='/country/:country' component={CountryPage} />
      </Switch>
    </div>
  );
}

export default App;

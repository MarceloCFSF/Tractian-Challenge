import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Header } from './components/Header';
import Home from './pages/Home/index';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

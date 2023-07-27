import UpdatePlace from './components/AddNewPlace/UpdatePlace';
import ShowTouristPlace from './components/showTouristPlace/ShowTouristPlace';
import AddNewPlace from './components/AddNewPlace/AddNewPlace';
import NotFound from './components/notFound/NotFound';
import './App.css';
import { Provider } from "react-redux";
import store from './store';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/'> <ShowTouristPlace></ShowTouristPlace></Route>
          <Route path='/create-tourist-place'> <AddNewPlace /></Route>
          <Route path='/update-tourist-place/:id'> <UpdatePlace /></Route>
          <Route path='*'> <NotFound></NotFound> </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

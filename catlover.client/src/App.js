import logo from './logo.svg';
import './App.css';
import CatsComponent from './components/cats/catsComponent'
import BreedsComponent from './components/breeds/breedsComponent'
import HomeComponent from './components/home/homeComponent'
import PageNotFoundComponent from './components/pageNotFound/pageNotFoundComponent';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<HomeComponent/>}/>
          <Route exact path="/cats" element={<CatsComponent/>}/>
          <Route exact path="/breeds" element={<BreedsComponent/>}/>
          <Route path="*" element={<PageNotFoundComponent/>}/>
        </Routes>
    </Router>
    );
}

export default App;

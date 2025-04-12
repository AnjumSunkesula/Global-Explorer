import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from "./components/welcome"
import Login from "./components/login";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' Component={WelcomePage}/>
          <Route path='/login' Component={Login} />  



        </Routes>
      </Router>
    </>
  )
}

export default App;

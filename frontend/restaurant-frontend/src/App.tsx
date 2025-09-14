import './App.css'
// import Button from "@mui/material/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
// JS (includes Popper)(without bundle.min.js -elements like off canvas doesn't work )
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Layout from './components/Layout.tsx'
import Dashboard from './pages/Dashboard'


function App() {

  return (
      <>

          <Dashboard/>


      </>
  )
}

export default App

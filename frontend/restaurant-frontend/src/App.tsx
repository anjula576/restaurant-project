import viteLogo from '/vite.svg'
import './App.css'
import Button from "@mui/material/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';


function App() {

  return (
      <>
          <h1>anjula wiraj</h1>
          <img src={viteLogo}/>
          <Button variant="contained" color="primary">
              Hello MUI
          </Button>
          <div className="container mt-5">
              <Card style={{width: '18rem'}}>
                  <Card.Body>
                      <Card.Title>React-Bootstrap Card</Card.Title>
                      <Card.Text>
                          This card is styled with Bootstrap but used as a React component.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
              </Card>
          </div>
      </>
  )
}

export default App

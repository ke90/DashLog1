import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Row,Col} from 'react-bootstrap';
import LoggedIn from './Login/LoggedIn';

function NavBar() {
  return (


<nav className="navbar navbar-expand-lg bg-dark text-white" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand  text-white" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor02">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <a className="nav-link active  text-white" href="#">Home
            <span className="visually-hidden">(current)</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link  text-white" href="#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link  text-white" href="#">Pricing</a>
        </li>
        <li className="nav-item">
          <a className="nav-link  text-white" href="#">About</a>
        </li>
      </ul>
      <form className="d-flex">
      <div className='ml-auto' style={{ marginTop: 0 }}>
              <LoggedIn />
            </div>
      </form>
    </div>
  </div>
</nav>


  );
}

export default NavBar;
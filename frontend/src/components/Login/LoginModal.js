import React, { useState } from 'react';
import { Modal, Row, Col, CardHeader } from 'react-bootstrap';
import Login from './Login'
import Registration from './Registration'
import NewPasswort from './NewPasswort'


function LoginModal({ show, handleClose }) {
  const [activeView, setActiveView] = useState('Login');

  const handleViewChange = (view) => {
    setActiveView(view);
  }

  let title = 'Login';
  let loginActive = '';
  let registrationActive = '';
  let passwordActive = '';

  switch (activeView) {
    case 'Login':
      loginActive = 'activeDiv';
      break;
    case 'Registrierung':
      title = 'Registrierung';
      registrationActive = 'activeDiv';
      break;
    case 'PasswortVergessen':
      title = 'Passwort vergessen';
      passwordActive = 'activeDiv';
      break;
    default:
      break;
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Row>
          <Col
            className={`p-2 text-center hoverDiv ${loginActive}`}
            onClick={() => handleViewChange('Login')}
          >
            <CardHeader>Login</CardHeader>
          </Col>
          <Col
            className={`p-2 text-center hoverDiv ${registrationActive}`}
            onClick={() => handleViewChange('Registrierung')}
          >
            <CardHeader>Registrierung</CardHeader>
          </Col>
        </Row>

        {activeView === 'Login' && <Login handleClose={handleClose} />}
        {activeView === 'Registrierung' && <Registration handleClose={handleClose} />}
        {activeView === 'PasswortVergessen' && <NewPasswort handleClose={handleClose} />}

        {activeView !== 'PasswortVergessen' && activeView !== 'Registrierung' &&(
          <div className="mt-3">
              <a onClick={() => handleViewChange('PasswortVergessen')}>Passwort vergessen?</a>
          </div>
        )}



      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;

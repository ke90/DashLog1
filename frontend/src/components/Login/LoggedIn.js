import React, { useState } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Logout from './Logout';
import LoginModal from './LoginModal';

function LoggedIn() {
    const user = useSelector((state) => state.user.loggedInUser);
    const loggedIn = useSelector((state) => state.user.loggedIn);
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
  return (
    <div>
        {loggedIn ? (
            <div>Eingeloggt als {user.user_name} {user.user_first_name}
                <span className='ms-3'><Logout /></span>
            </div>
        ):(
            <>
                <Button variant="primary" onClick={handleShow}>Login</Button>
                <LoginModal show={showModal} handleClose={handleClose} />
            </>
        )}
    </div>
  );
}

export default LoggedIn;
import React from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2'
import axios from 'axios';
import { useDispatch } from 'react-redux';


function Logout() {
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post('http://localhost:8000/authentication/logoutUser/');

        if (response.status === 200) {
            localStorage.clear();
            dispatch({ type: 'RESET_USER'});

            Swal.fire({
                title: 'AUSGELOGGT',
                text: `Besuchen Sie uns bald wieder!`,
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
              })
        }else{
            Swal.fire(
                'Fehlgesechlagen',
                'Versuchen Sie es erneut!',
                'danger'
              )
        }
      } catch (error) {
        console.error('Ausloggen fehlgeschlagen:', error);
        Swal.fire({
            title: 'FEHLGESCHLAGEN',
            text: `Ausloggen fehlgeschlagen.`,
            icon: 'danger',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
      }

  };

  return (
          <Button variant="info" onClick={handleLogout}>
            Logout
          </Button>
  );
}

export default Logout;

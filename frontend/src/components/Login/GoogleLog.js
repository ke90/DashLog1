import React from 'react';
import axios from 'axios';  // Stellen Sie sicher, dass axios installiert ist
import { GoogleLogin } from '@react-oauth/google';
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';


function GoogleLog() {
  const dispatch = useDispatch();

  const responseMessage = async (response) => {
    console.log(response);
    try {
      const result = await axios.post('http://localhost:8000/authentication/googleLogin/', {
        credential: response.credential,
      });
      console.log(result)
      if (result.status === 200) {
        const token = result.data.token;
        localStorage.setItem('token', token);

        dispatch({ type: 'SET_USER', payload: result.data.data});

        Swal.fire({
            title: 'EINGELOGGT',
            text: `Sie sind als ${result.data.data.user_id} ${result.data.data.user_name} ${result.data.data.user_first_name} mit dem Token ${token} eingeloggt.`,
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
      console.error('Anmeldung fehlgeschlagen:', error);
      Swal.fire({
          title: 'FEHLGESCHLAGEN',
          text: `Login fehlgeschlagen.`,
          icon: 'danger',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        })
    }
    };


const errorMessage = (error) => {
    console.log(error);
};


  return (
    <div>
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
  </div>
  );
}

export default GoogleLog;
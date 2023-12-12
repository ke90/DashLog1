import React from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

const FacebookLog = () => {
  const dispatch = useDispatch();

  const responseFacebook = async (response) => {
    console.log(response);
    try {
      const result = await axios.post('http://localhost:8000/authentication/facebookLogin/', {
        access_token: response.accessToken,
      });
      console.log(result);
      if (result.status === 200) {
        const token = result.data.token;
        localStorage.setItem('token', token);

        dispatch({ type: 'SET_USER', payload: result.data.data });

        Swal.fire({
          title: 'EINGELOGGT',
          text: `Sie sind als ${result.data.data.user_id} ${result.data.data.user_name} ${result.data.data.user_first_name} mit dem Token ${token} eingeloggt.`,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire(
          'Fehlgeschlagen',
          'Versuchen Sie es erneut!',
          'error'
        );
      }
    } catch (error) {
      console.error('Anmeldung fehlgeschlagen:', error);
      Swal.fire({
        title: 'FEHLGESCHLAGEN',
        text: 'Login fehlgeschlagen.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div>
      <FacebookLogin
        appId="888457135771440" // Ersetzen Sie dies mit Ihrer Facebook App ID
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        onFailure={errorMessage}
      />
    </div>
  );
};

export default FacebookLog;

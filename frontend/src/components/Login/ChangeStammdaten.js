import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PasswordValidation from './PasswordValidation';
import { useDispatch } from 'react-redux';


function ChangeStammdaten() {
    const user = useSelector((state) => state.user.loggedInUser);
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

    const [samePassword, setsamePassword] = useState(false)
    const [userData, setUserData] = useState({
      firstName: '', 
      lastName: '', 
      email: '', 
      password: '',
      password2: '',
    });
  
    const changeUser = async (e) => {

        if(userData.password == userData.password2){

            const response = await axios.post('http://localhost:8000/authentication/changeUser/', userData,config);

            if (response.status == 200){

                console.log(response)
                let token = response.data.token
                dispatch({ type: 'SET_USER', payload: response.data.data});

                localStorage.removeItem('token');
                localStorage.setItem('token', token );

                Swal.fire({
                    title: 'Erfolgreich',
                    text: "Sie haben das Profil erfolgreich bearbeitet.",
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                    })
            }else{
                Swal.fire({
                    title: 'Fehlgeschlagen',
                    text: "Das Profil wurde nicht bearbeitet. Versuchen Sie es erneut.",
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                    })
            }
  
        }else{
            Swal.fire({
                title: 'Passwort',
                text: "Das Passwort muss identisch sein....",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })
        }
    };
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData({...userData,[name]: value,});
    };
  
  useEffect(() => {
      setUserData({
        firstName: user.user_first_name,
        lastName: user.user_name,
        email: user.user_email,
        password: '',
        password2: '',
      });
    }, [user]);

    useEffect(() => {
        console.log(userData)
    }, [userData]);

  return (
    <Form className='ms-5'>
    <div className='text-left'>Profil bearbeiten</div>
    <hr></hr>
    <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
            <Form.Control
            type="email"
            name="email"
            value={userData.email}
            placeholder="Email"
            onChange={handleChange}
            />
    </FloatingLabel>

    <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
            <Form.Control
            type="text"
            name="lastName"
            placeholder="Name"
            value={userData.lastName}
            onChange={handleChange}
            />
    </FloatingLabel>
    <FloatingLabel controlId="floatingInput" label="Vorname" className="mb-3">
            <Form.Control
            type="text"
            name="firstName"
            value={userData.firstName}
            placeholder="Vorname"
            onChange={handleChange}
            />
    </FloatingLabel>
    <FloatingLabel controlId="floatingInput" label="Passwort" className="mb-3">
            <Form.Control
            type="password"
            name="password"
            placeholder="Passwort"
            onChange={handleChange}
            />
    </FloatingLabel>
    <FloatingLabel controlId="floatingInput" label="Passwort wiederholen" className="mb-3">
            <Form.Control
            type="password"
            name="password2"
            placeholder="Passwort wiederholen"
            onChange={handleChange}
            />
    </FloatingLabel>

    <div>
        <PasswordValidation password={userData.password}/>
    </div>
    <Button variant="primary" type="button" className="mt-4" onClick={changeUser}>
      Speichern
    </Button>
  </Form>
  );
}

export default ChangeStammdaten;
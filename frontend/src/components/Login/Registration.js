import React, { useState } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import Swal from 'sweetalert2'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import PasswordValidation from './PasswordValidation'

function Registration({ handleClose }) {
  const [formData, setFormData] = useState({username: '', vorname: '', nachname: '', email: '',password: ''});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log(e.target)
    const { name, value } = e.target;
    setFormData({...formData,[name]: value});
  };

  const handleReg = async (e) => {
    e.preventDefault();
    console.log('User Data:', formData);

        const response = await axios.post('http://localhost:8000/authentication/reg/', {
          email: formData.email,
          password: formData.password,
          user_first_name: formData.vorname,
          user_name: formData.nachname,
        });

        if (response.status === 200) {
            const token = response.data.token;
            localStorage.setItem('token', token);

            dispatch({ type: 'SET_USER', payload: response.data.data});

            Swal.fire({
                title: 'REGISTRIERT',
                text: "Sie erhalten in Kürze eine Bestätigungsmail. Bitte bestätigen sie Ihre Registrierung.",
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
              })
        }else{
            Swal.fire({
                title: 'FEHLGESCHLAGEN',
                text: "Bitte wenden Sie sich an den Systemadministrator.",
                icon: 'danger',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
              })
        }
  };

  return (

        <Form className='mt-5'>
            <FloatingLabel controlId="floatingInput1" label="Vorname" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Vorname"
              name="vorname"
              value={formData.vorname}
              onChange={handleChange}
            />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput2" label="Nachname" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nachname"
              name="nachname"
              value={formData.nachname}
              onChange={handleChange}
            />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput3" label="Email" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            </FloatingLabel>
          
            <FloatingLabel controlId="floatingInput4" label="Passwort" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Passwort"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            </FloatingLabel>
            
            <PasswordValidation password={formData.password}/>
          <Button variant="primary mt-3" onClick={handleReg}>
            Registrieren
          </Button>
        </Form>
  );
}

export default Registration;
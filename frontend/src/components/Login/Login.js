import React, { useState } from 'react';
import { Button, Form,FloatingLabel,Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import GoogleLog from './GoogleLog'; 
import FacebookLog from './FacebookLog'; 

function Login({ handleClose }) {
  const [formData, setFormData] = useState({email: '',password: ''});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData,[name]: value});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post('http://localhost:8000/authentication/loginUser/', {
          email: formData.email,
          password: formData.password,
        });

        if (response.status === 200) {
            const token = response.data.token;
            localStorage.setItem('token', token);
            dispatch({ type: 'SET_USER', payload: response.data.data});

            handleClose();
            Swal.fire({
                title: 'EINGELOGGT',
                text: `Sie sind als ${response.data.data.user_id} ${response.data.data.user_name} ${response.data.data.user_first_name} mit dem Token ${token} eingeloggt.`,
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

  return (
<>

        <Form className='mt-5'>
            <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
                <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Passwort" className="mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Passwort"
              value={formData.password}
              onChange={handleChange}
            />
            </FloatingLabel>

          <Button variant="primary mt-3" onClick={handleLogin}>
            Login
          </Button>
          <div className='mt-3'>
            <Row>
              <Col><GoogleLog handleClose={handleClose}/></Col>
              {/* <Col><FacebookLog /></Col> */}

            </Row>
          </div>
        </Form>
  </>
  );
}

export default Login;

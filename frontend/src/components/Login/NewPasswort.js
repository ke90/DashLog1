import React, { useState } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import Swal from 'sweetalert2'


function NewPasswort({ handleClose }) {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleReset = (e) => {
    e.preventDefault();
    Swal.fire({
        title: 'Zurückgesetzt',
        text: "Sie erhalten eine Email mit einem Link um ein neues Passwort zu vergeben!",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
            handleClose();
        }
      })
  };

  return (

        <Form className='mt-5'>

            <p><strong>Sie erhalten eine Email mit einem Link um das Passwort zurückzusetzen!</strong></p>
            <FloatingLabel controlId="floatingInput4" label="Email" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            </FloatingLabel>
          <Button variant="primary mt-3" onClick={handleReset}>
            Passort zurücksetzen
          </Button>
        </Form>
  );
}

export default NewPasswort;
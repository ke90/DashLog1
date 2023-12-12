import React, { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel, Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Profilepic from '../Profilepic'
import ChangeStammdaten from './ChangeStammdaten'
import ProfilPicUploadModal from './ProfilPicUploadModal'
import FadeInPage from '../FadeInPage'


function ProfilView({ handleClose }) {
  const [modalShow, setModalShow] = useState(false);

  const handleOpenModal = () => {
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
  };

  return (
  <>
    <FadeInPage>
    <Container className='mt-5'>

    <Row>
        <Col md={4} className="p-5" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
            <Row className="justify-content-center">
                <Profilepic />
            </Row>
            <Row>
                <Button onClick={handleOpenModal} variant="warning" className=''>
                    Profilbild bearbeiten
                </Button>

            </Row>
            <Row className='mt-5'>
              <span><strong>Abbonement</strong></span>
              <hr></hr>
              <span>Premium Ultimate 20 €/Monat</span>
            </Row>
            <Row className='mt-5'> 
              <span><strong>Nächste Abbuchung</strong></span>
              <hr></hr>
              <span>20.04.2023</span>
            </Row>
            <Row className='mt-5'>
              <span><strong>Nächste Abbuchung</strong></span>
              <hr></hr>
              <span>20.04.2023</span>
            </Row>
            <Row className='mt-5'>
              <span><strong>Letzter Login</strong></span>
              <hr></hr>
              <span>25.01.2020</span>
            </Row>
            <Row>
              <Button variant="danger" className='mt-5'>Kündigen</Button>
            </Row>
        </Col>
        <Col md={8}>
          <ChangeStammdaten />
     
        </Col>
    </Row>
     
    </Container>
    
    </FadeInPage>
    <ProfilPicUploadModal show={modalShow} onHide={handleCloseModal} />

    </>
  );

}

export default ProfilView;
import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

function Kennzahlen({Tag, Woche, Monat, Jahr, setFilterTimestamp, setFilterType, filterTimestamp}) {

  const handleCardClick = (item) => {
    if (filterTimestamp != '') {
      setFilterTimestamp('');
      setFilterType('');
    } else {
      setFilterTimestamp(item);
      setFilterType(2);
    }
  };

  const getCardClassName = (timePeriod) => {
    return `timefilter shadow text-center d-flex flex-column justify-content-between h-100 w-100 ${filterTimestamp === timePeriod ? 'active-filter' : ''}`;
  };

  return (
    <Container fluid>
      <Row xs={1} md={2} lg={4} className="g-3">
        <Col>
          <div className="d-flex h-100">
            <Card 
              onClick={() => handleCardClick('24h')} 
              className={getCardClassName('24h')}
            >
              <Card.Body>
                <Card.Title>Fehlermeldungen in den letzten 24h</Card.Title>
                <Card.Text><h3>{Tag}</h3></Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col>
          <div className="d-flex h-100">
            <Card 
              onClick={() => handleCardClick('1w')} 
              className={getCardClassName('1w')}
            >
              <Card.Body>
                <Card.Title>Fehlermeldungen in der letzten Woche</Card.Title>
                <Card.Text><h3>{Woche}</h3></Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col>
          <div className="d-flex h-100">
            <Card 
              onClick={() => handleCardClick('1m')} 
              className={getCardClassName('1m')}
            >
              <Card.Body>
                <Card.Title>Fehlermeldungen im letzten Monat</Card.Title>
                <Card.Text><h3>{Monat}</h3></Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col>
          <div className="d-flex h-100">
            <Card 
              onClick={() => handleCardClick('1y')} 
              className={getCardClassName('1y')}
            >
              <Card.Body>
                <Card.Title>Fehlermeldungen im letzten Jahr</Card.Title>
                <Card.Text><h3>{Jahr}</h3></Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>

      </Row>
    </Container>
  );
}

export default Kennzahlen;
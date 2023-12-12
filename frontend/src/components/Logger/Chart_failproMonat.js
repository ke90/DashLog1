import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Chart_failproMonat({ data }) {


  if (!data) {
    return <div>Warte auf Daten...</div>;
  }

  return (
    <Container fluid>
      <Card className="shadow">
        <Card.Body>
          <Card.Title>Anzahl der Fehler pro Monat</Card.Title>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="monat" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="anzahl_fehler" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </Container>
  );

}

export default Chart_failproMonat;

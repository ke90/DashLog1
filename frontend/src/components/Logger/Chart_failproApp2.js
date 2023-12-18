import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

function Chart_failproApp2({ data }) {

  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    if (!data) {
      return;
    }
    console.log(data)

const appNames = [...new Set(data.map((entry) => entry.app))];

  const transformed = [
    ...["fehler_1_tag", "fehler_1_woche", "fehler_1_monat", "fehler_1_jahr"].map(
      (name) => ({
        name,
        ...Object.fromEntries(
          appNames.map((appName, index) => [
            `${appName}`,
            data.find((entry) => entry.app === appName)[name],
          ])
        ),
      })
    ),
  ];
      
  setTransformedData(transformed);

  }, [data]); 
  
  useEffect(() => {
    console.log(transformedData) 
  }, [transformedData]);

  if (!data) {
    return <div>Warte auf Daten...</div>;
  }

  return (
    <Container fluid>
      <Card className="shadow">
        <Card.Body>
          <Card.Title>Anzahl der Fehler pro App</Card.Title>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={transformedData}>
              <CartesianGrid strokeDasharray="3 3" />
              {/* <XAxis dataKey="name" /> */}
              <XAxis
                    dataKey="name"
                    tickFormatter={(value) => {
                      switch (value) {
                        case 'fehler_1_tag':
                          return '24h';
                        case 'fehler_1_woche':
                          return 'letzte Woche';
                        case 'fehler_1_monat':
                          return 'letzten Monat';
                        case 'fehler_1_jahr':
                          return 'letztes Jahr';
                        default:
                          return value;
                      }
                    }}
                  />
              <YAxis />
              <Tooltip />
              <Legend />

              {transformedData && Object.keys(transformedData[0] || {})
                .filter((key) => key !== 'name')
                .map((key, index) => (
                  <Bar
                    key={key}
                    dataKey={key}
                    name={key}
                    fill={`rgba(0, 128, 255, 0.${index * 2 + 2})`}                  />
                ))}
            </BarChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Chart_failproApp2;

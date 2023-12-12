import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart, BarController, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
// import 'chartjs-adapter-date-fns';
// import 'chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.css';

// Registrieren Sie die Skala für die Y-Achse

function Chart_failproApp({ data }) {
  if (!data) {
    return <div>Warte auf Daten...</div>;
  }
  Chart.register(CategoryScale, LinearScale, BarController, Title, Tooltip, Legend);

  // Daten für das Diagramm
  const chartData = {
    labels: ['1 Tag', '1 Woche', '1 Monat', '1 Jahr'],
    datasets: data.map(app => ({
      label: app.app_name,
      data: [
        app.fehler_1_tag,
        app.fehler_1_woche,
        app.fehler_1_monat,
        app.fehler_1_jahr,
      ],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    })),
  };

  // Optionen für das Diagramm
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Container fluid>
      <Card className="shadow">
        <Card.Body>
          <Card.Title>Anzahl der Fehler pro App</Card.Title>
          <Bar data={chartData} options={chartOptions} />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Chart_failproApp;

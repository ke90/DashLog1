import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { Form, Row, Col, Offcanvas, Button, Modal, Fade } from "react-bootstrap";
import Kennzahlen from "./Kennzahlen";
import Chart_failproApp2 from "./Chart_failproApp2";
import Chart_failproMonat from "./Chart_failproMonat";
import FadeInPage from '../FadeInPage';

function LogTable() {
  const [tableData, setTableData] = useState([]);
  const [chart_failproApp, setchart_failproApp] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fehlerproMonat, setfehlerproMonat] = useState([]);
  const [filterApp, setFilterApp] = useState("");
  const [filterType, setFilterType] = useState("");
  const [anzahl1Tag, setAnzahl1Tag] = useState(0);
  const [anzahl1Woche, setAnzahl1Woche] = useState(0);
  const [anzahl1Monat, setAnzahl1Monat] = useState(0);
  const [anzahl1Jahr, setAnzahl1Jahr] = useState(0);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [apps, setApps] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterTimestamp, setFilterTimestamp] = useState("");

  const handleRowClick = (row) => {
    console.log(row);
    setSelectedRow(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOffcanvasToggle = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const formatDateToGerman = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Monate sind 0-basiert
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  };

  const sortDataByTimestamp = (data) => {
    return data.sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
  };

  const applyFilters = () => {
    let filtered = tableData;

    if (filterApp) {
      filtered = filtered.filter((row) => row.app_id == filterApp);
    }

    if (filterType) {
      // if (filterType == "1" || filterType == "") {
      //   setFilterTimestamp("");
      // }
      filtered = filtered.filter((row) => row.type_id.toString() == filterType);
    }

    if (filterTimestamp) {
      const now = new Date();
      let timestampLimit;

      switch (filterTimestamp) {
        case "24h":
          timestampLimit = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case "1w":
          timestampLimit = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "1m":
          timestampLimit = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case "1y":
          timestampLimit = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          break;
        default:
          timestampLimit = now;
      }

      // const timestampLimitGermanFormat = formatDateToGerman(timestampLimit);
      if (filterTimestamp) {
        filtered = filtered.filter((row) => {
          const rowDate = new Date(row.timestamp);
          return rowDate >= timestampLimit;
        });
      }
    }



    setFilteredData(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [tableData, filterApp, filterType, filterTimestamp]);

  useEffect(() => {
    let eventSource;

    const startProcess = async () => {
      try {
        const response = await axios.post(
          "http://backend:8000/logger/load_logs/"
        );

        if (response.status === 200) {
          console.log("Initiales Laden der Daten erfolgreich");
          setTableData(response.data.data.data);
          //Änderung der Kennzahlen
          if (response.data.data.kennzahlen) {
            setAnzahl1Tag(response.data.data.kennzahlen[0].Anzahl_1_Tag);
            setAnzahl1Woche(response.data.data.kennzahlen[0].Anzahl_1_Woche);
            setAnzahl1Monat(response.data.data.kennzahlen[0].Anzahl_1_Monat);
            setAnzahl1Jahr(response.data.data.kennzahlen[0].Anzahl_1_Jahr);
          }

          if (response.data.data.chart_failproApp) {
            setchart_failproApp(response.data.data.chart_failproApp);
          }

          if (response.data.data.fehlerproMonat) {
            setfehlerproMonat(response.data.data.fehlerproMonat);
          }
          if (response.data.data.apps) {
            setApps(response.data.data.apps);
          }

          const eventSource = new EventSource(
            "http://backend:8000/logger/stream_events/"
          );

          eventSource.onmessage = function (event) {
            // console.log(event.data)
            const newData = JSON.parse(event.data);

            const data = newData.data;
            setTableData((prevData) =>
              sortDataByTimestamp([...prevData, ...data])
            );

            if (newData.kennzahlen) {
              const kennzahlen = newData.kennzahlen;
              setAnzahl1Tag(kennzahlen[0].Anzahl_1_Tag);
              setAnzahl1Woche(kennzahlen[0].Anzahl_1_Woche);
              setAnzahl1Monat(kennzahlen[0].Anzahl_1_Monat);
              setAnzahl1Jahr(kennzahlen[0].Anzahl_1_Jahr);
            }

            if (newData.chart_failproApp) {
              // if(response.data.data.chart_failproApp){
              const chart_failproApp = newData.chart_failproApp;
              setchart_failproApp(chart_failproApp);
            }

            if (newData.fehlerproMonat) {
              const fehlerproMonatnew = newData.fehlerproMonat;
              setfehlerproMonat(fehlerproMonatnew);
            }
          };

          eventSource.onerror = function (error) {
            console.error("Fehler beim Stream:", error);
            eventSource.close();
          };
        } else {
          console.log("Initiales Laden der Daten fehlgeschlagen");
        }
      } catch (error) {
        console.error("Initiales Laden der Daten fehlgeschlagen", error);
      }
    };

    startProcess();
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  const columns = [
    {
      name: "",
      cell: (row) => (
        <FontAwesomeIcon
          icon={row.type_id === 1 ? faCheckCircle : faExclamationTriangle}
          style={{ color: row.type_id === 1 ? "green" : "red" }}
        />
      ),
    },
    { name: "App", selector: (row) => row.app },
    { name: "Message", selector: (row) => row.m_type },
    { name: "Text", selector: (row) => row.message_text },
    {
      name: "Timestamp",
      selector: (row) => row.timestamp,
      sortable: true,
      format: (row) => formatDateToGerman(row.timestamp),
      // width: "10px",
    },
    ,
  ];

  return (
<>
{tableData.length > 0 ? (
      <div className="m-5">
        <FadeInPage> 
      <div className="mb-4">
        <Kennzahlen
          Tag={anzahl1Tag}
          Woche={anzahl1Woche}
          Monat={anzahl1Monat}
          Jahr={anzahl1Jahr}
          setFilterTimestamp={setFilterTimestamp}
          setFilterType={setFilterType}
          filterTimestamp={filterTimestamp}
        />
      </div>
      <Row className="justify-content-end">
        <Col xs="auto">
          <Button variant="primary" onClick={handleOffcanvasToggle}>
            Live Dashboard
          </Button>
        </Col>
      </Row>
      <div className="filter-container">
        <Form>
          <Row>
            <Col md={4}>
              <Form.Group controlId="filterApp">
                <Form.Label>App</Form.Label>
                <Form.Select
                  value={filterApp}
                  onChange={(e) => setFilterApp(e.target.value)}
                >
                  <option value="">Alle Apps</option>
                  {apps &&
                    apps.map((app) => (
                      <option key={app.id} value={app.id}>
                        {app.app}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="filterType">
                <Form.Label>Message</Form.Label>
                <Form.Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="">Alle Messages</option>
                  <option value="1">Success</option>
                  <option value="2">Fail</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="filterTimestamp">
                <Form.Label>Zeitstempel</Form.Label>
                <Form.Select
                  value={filterTimestamp}
                  onChange={(e) => setFilterTimestamp(e.target.value)}
                >
                  <option value="">Alle Zeiten</option>
                  <option value="24h">Letzte 24 Stunden</option>
                  <option value="1w">Letzte Woche</option>
                  <option value="1m">Letzter Monat</option>
                  <option value="1y">Letztes Jahr</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        onRowClicked={handleRowClick}
        className="custom-data-table" // Fügen Sie hier Ihre benutzerdefinierte Klasse hinzu

      />

      <Offcanvas
        show={showOffcanvas}
        onHide={handleOffcanvasToggle}
        className="custom-offcanvas"
        placement="top"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Übersicht Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row className="mb-4">
            <Chart_failproApp2 data={chart_failproApp} />
          </Row>
          <Row>
            <Chart_failproMonat data={fehlerproMonat} />
          </Row>
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Meldungdetails</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRow && (
            <div>
              <p>App: {selectedRow.app}</p>
              <p>
                Status: {selectedRow.m_type}
                {selectedRow.type_id == 1 ? (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ color: "green" }}
                    size="xl"
                  />
                ) : selectedRow.type_id == 2 ? (
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    style={{ color: "red" }}
                    size="xl"
                  />
                ) : null}
              </p>
              <p>Datum: {formatDateToGerman(selectedRow.timestamp)}</p>
              <p>Meldung: {selectedRow.message_text}</p>
              {/* Weitere Datenfelder hier anzeigen */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Schließen
          </Button>
        </Modal.Footer>
      </Modal>
</FadeInPage>
    </div>
) : (
  <div>
  </div>
)}
    </>
  );
}

export default LogTable;

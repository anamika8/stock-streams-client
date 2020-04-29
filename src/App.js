import React, { useState, useEffect } from "react";
import Search from "./Components/Search.jsx";
import Feed from "./Components/Feed.jsx";
import Counts from "./Components/Counts.jsx";

import { Container, Col, Row, Navbar } from "react-bootstrap";

export default function App() {
  const [data, setData] = useState([]);

  return (
    <div>
      <Navbar className="justify-content-center" bg="primary" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="./stocksIcon.jpg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          <b>Stock Streams</b>
        </Navbar.Brand>
      </Navbar>
      <br />

      <Search searchItem={setData} />

      <br />
      <Counts data={data} />

      <br />
      <Container>
        <Row>
          <Col>
            {data.length == 0 ? <h3>Search for a stock or two!</h3> : <></>}
            <Feed data={data} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

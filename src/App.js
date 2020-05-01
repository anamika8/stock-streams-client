import React, { useState, useEffect } from "react";
import Search from "./Components/Search.jsx";
import Feed from "./Components/Feed.jsx";
import Count from "./Components/Count.jsx";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";

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
      <Count data={data} />
      <br />

      {data.length == 0 ? (
        <img
          src="https://www.belltraininggroup.com.au/wp-content/uploads/2017/02/Business_Success.jpg"
          alt="Stock-exchange"
          className="img-stock"
        />
      ) : (
        <Feed data={data}></Feed>
      )}
    </div>
  );
}

import React from "react";
import Tweet from "./Tweet.jsx";
import { Container, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// helps capture the list of tweets and display them in row format
export default function Feed({ data }) {
  // sort by created_at date in stocktwits system
  const sortedData = data.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const feedStyling = {
    paddingLeft: "0px",
    paddingBottom: "10px",
    paddingTop: "10px",
    listStyleType: "none",
    margin: "0px"
  };
  return (
    <Container>
      <Row>
        <Col
          md={{ span: 5.5, offset: 0 }}
          xs={{ span: 8, offset: 0 }}
          sm={{ span: 8, offset: 0 }}
          lg="auto"
          xl="auto"
        >
          <ul style={feedStyling}>
            {sortedData.map(content => (
              <Tweet content={content} />
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

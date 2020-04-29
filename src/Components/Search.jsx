import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
export default function Search({ callback }) {
  const [search, setSearch] = useState("");

  const handleSubmit = evt => {
    evt.preventDefault();
    const rawSearch = new FormData(evt.target);

    // separate stock terms from search form
    const splitSearch = rawSearch
      .get("stock-symbol")
      .replace(/\s/g, "")
      .split(",");

    // call api for each search term
    const allTweets = [];

    Promise.all(
      splitSearch.map(stock => fetch(`http://localhost:9000/${stock}`))
    )
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(data => {
        console.log(data);
        if (data[0].response.status == 404) {
          alert("Invalid search term, try GOOG or BB");
        } else {
          data.forEach(search => {
            search.messages.forEach(message => {
              allTweets.push(message);
            });
          });
          callback(allTweets);
        }
      });
  };

  return (
    <Form inline className="justify-content-center" onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        placeholder="Search ex: AAPL, WMT"
        className=" mr-sm-2"
        name="stock-symbol"
        onChange={e => setSearch(e.target.value)}
      />
      <Button type="submit">SEARCH</Button>
    </Form>
  );
}

import React, { useState } from "react";
import { Form, Button, FormLabel } from "react-bootstrap";
//import Symbol from './Symbol.jsx'
export default function Search({ callback }) {
  const [search, setSearch] = useState("");

  async function getTweets(symbol) {
    const url = `https://api.stocktwits.com/api/2/streams/symbol/${symbol}.json`;
    const response = await fetch(url, {
      method: "GET",
      //mode: 'cors', // no-cors, *cors, same-origin
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response;
  }

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

    Promise.all(splitSearch.map(stock => getTweets(stock)))
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(data => {
        console.log(data);
        if (data[0].response.status === 404) {
          alert("Invalid search term, try GOOG or BB");
        } else {
          data.forEach(search => {
            const searchSymbol = search.symbol.symbol;
            console.log(`searchSymbol = ${searchSymbol}`);
            search.messages.forEach(message => {
              message.symbol = searchSymbol;
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
        name="stock-symbol"
        type="text"
        placeholder="Search"
        className=" mr-sm-2"
        onChange={e => setSearch(e.target.value)}
      />
      <Button type="submit">SEARCH</Button>
    </Form>
  );
}

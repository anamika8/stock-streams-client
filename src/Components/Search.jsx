import React, { useState, useEffect } from "react";
import { Form, Button, FormLabel } from "react-bootstrap";
//import Symbol from './Symbol.jsx'
export default function Search({ searchItem }) {
  const [search, setSearch] = useState("");

  async function getTweets(symbol) {
    const url = `http://localhost:8080/${symbol}`;
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

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const rawSearch = new FormData(event.target);

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
          searchItem(allTweets);
        }
      });
  };

  /* useEffect(() => {
    const intervalId = setTimeout(() => {
      //setData(data);
      //setSearch(e.target.value);
      handleSearch();
    }, 1000);
    return () => clearTimeout(intervalId);
  }, []);*/

  return (
    <Form inline className="justify-content-center" onSubmit={handleSubmit}>
      <Form.Control
        name="stock-symbol"
        type="text"
        placeholder="Search"
        className=" mr-sm-2"
        value={search}
        onChange={handleSearch}
      />
      <Button type="submit">SEARCH</Button>
    </Form>
  );
}

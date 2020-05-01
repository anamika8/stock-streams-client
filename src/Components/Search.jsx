import React, { useState, useEffect } from "react";
import { Form, Button, FormLabel } from "react-bootstrap";
//import Symbol from './Symbol.jsx'
export default function Search({ searchItem }) {
  const [search, setSearch] = useState("");
  const [searchCount, setSearchCount] = useState(1);

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  const triggerSearch = () => {
    callTweetsApi(search);
  };

  useEffect(() => {
    if (searchCount > 0) {
      const intervalId = setTimeout(() => {
        triggerSearch();
        setSearchCount(count => count + 1);
      }, 30000);
      return () => clearTimeout(intervalId);
    }
  }, [searchCount]);

  const callTweetsApi = allSearchItems => {
    console.log(`Triggering search for stock items: ${search}`);
    // separate stock terms from search form
    const splitSearch = allSearchItems.replace(/\s/g, "").split(",");

    // call api for each search term
    const allTweets = [];

    Promise.all(
      splitSearch.map(
        stock => fetch(`https://stock-streams-api-v1.herokuapp.com/${stock}`)
        //fetch(`http://localhost:9000/${stock}`)
      )
    )
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(data => {
        console.log(data);
        if (data[0].response.status === 404) {
          alert("Invalid search term, try GOOG or BB");
        } else {
          data.forEach(search => {
            const searchSymbol = search.symbol.symbol;
            search.messages.forEach(message => {
              message.symbol = searchSymbol;
              allTweets.push(message);
            });
          });
          searchItem(allTweets);
        }
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const rawSearch = new FormData(event.target);
    const allSearchItems = rawSearch.get("stock-symbol");
    callTweetsApi(allSearchItems);
  };

  return (
    <Form inline className="justify-content-center" onSubmit={handleSubmit}>
      <Form.Control
        name="stock-symbol"
        type="text"
        placeholder="Search ex: WMT, AMZN"
        className=" mr-sm-2"
        value={search}
        onChange={handleSearch}
      />
      <Button type="submit">SEARCH</Button>
    </Form>
  );
}

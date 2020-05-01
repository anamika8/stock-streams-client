import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

// helps trigger the search and store all the searched items
export default function Search({ searchItem }) {
  // keeps the comma-separated stock symbols that have been searched
  const [search, setSearch] = useState("");
  // used to keep a count of the number of times a search has been triggered
  const [searchCount, setSearchCount] = useState(1);

  /**
   * Method triggered with the search text box onChange event
   * @param {*} event
   */
  const handleSearch = event => {
    setSearch(event.target.value);
  };

  /**
   * Utility method for automatic search for new tweets with existing
   * search terms.
   */
  const triggerSearch = () => {
    if (search === "") {
      console.log("No search items provided yet, hence not calling the API");
    } else {
      callTweetsApi(search);
    }
  };

  /**
   * Here we want to fire off an automatic search after
   * every 30 seconds
   */
  useEffect(() => {
    if (searchCount > 0) {
      const intervalId = setTimeout(() => {
        triggerSearch();
        setSearchCount(count => count + 1);
      }, 30000);
      return () => clearTimeout(intervalId);
    }
  }, [searchCount]);

  /**
   * The method from where the API call is made.
   * The search items are split, stripped off white-spaces and are
   * used for parallel calls. All responses are collected and sent back
   * to the calling method as a callback.
   *
   * @param {*} allSearchItems -- comma-separated list of search items
   */
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

  /**
   * Method called when the search button is clicked or enter
   * key is pressed.
   * @param {*} event
   */
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
        className="wrapper mr-sm-2"
        value={search}
        onChange={handleSearch}
      />
      <Button type="submit">SEARCH</Button>
    </Form>
  );
}

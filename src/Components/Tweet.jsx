import React from "react";
import { Media } from "react-bootstrap";
import Linkify from "react-linkify";
import ReactHtmlParser from "react-html-parser";

// helps display the tweet, user's name, image and tweet time in local time
export default function Tweet({ content }) {
  let tweetText = content.body;
  const variablesUsed = content.symbols.map(symbol => symbol.symbol);
  for (let i = 0; i < variablesUsed.length; i++) {
    tweetText = tweetText.replace(
      "$" + variablesUsed[i],
      `<a target="_blank" href="http://stocktwits.com/symbol/${variablesUsed[i]}">$${variablesUsed[i]}</a>`
    );
  }

  const mediaStyling = { borderBottomStyle: "solid", paddingBottom: "4px" };
  return (
    <Media style={mediaStyling} as="li">
      <img
        width={64}
        height={64}
        className="align-self-start mr-3"
        src={content.user.avatar_url}
        alt="user avatar"
      />
      <Media.Body>
        <h5>{content.user.name}</h5>
        <Linkify>{ReactHtmlParser(tweetText)}</Linkify>
        <br></br>
        <small>{new Date(content.created_at).toLocaleString()}</small>
      </Media.Body>
    </Media>
  );
}

import React from "react";
import SymbolCount from "./SymbolCount.jsx";

// helps render the div to show the tweet count for every search symbol.
// the tweet count associated with each symbol is counted here and
// passed to the child component
export default function Counts({ data }) {
  let symbolsArray = [];
  for (let i = 0; i < data.length; i++) {
    symbolsArray.push(data[i].symbol);
  }
  let symbolsCountObject = {};
  for (let i = 0; i < symbolsArray.length; i++) {
    if (symbolsArray[i] in symbolsCountObject) {
      symbolsCountObject[symbolsArray[i]]++;
    } else {
      symbolsCountObject[symbolsArray[i]] = 1;
    }
  }

  let symbolCountList = [];
  Object.keys(symbolsCountObject).forEach(function(key) {
    symbolCountList.push(key + "," + symbolsCountObject[key]);
  });

  return (
    <div className="wrapper">
      {symbolCountList.map(content => (
        <SymbolCount content={content} />
      ))}
    </div>
  );
}

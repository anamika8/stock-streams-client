import React from "react";
import SymbolCount from "./SymbolCount.jsx";

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

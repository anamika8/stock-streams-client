import React from "react";
import { Badge, Button } from "react-bootstrap";

export default function SymbolCount({ content }) {
  const symbolPlusCount = content.split(",");
  const symbolName = symbolPlusCount[0];
  const symbolCount = symbolPlusCount[1];
  return (
    <div id="element1">
      <Button variant="success" className="justify-content-center">
        {symbolName} <Badge variant="light">{symbolCount}</Badge>
      </Button>
    </div>
  );
}

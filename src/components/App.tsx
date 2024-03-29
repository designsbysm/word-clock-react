import React from "react";

import Row from "./Row";
import { getRandomGrid, getWordGrid } from "../library/grid";

const App = () => {
  const [wordGrid, setWordGrid] = React.useState(getWordGrid());
  const [randomGrid] = React.useState(getRandomGrid());
  const [refresh, setRefresh] = React.useState(true);

  if (refresh) {
    setInterval(() => {
      setWordGrid(getWordGrid());
    }, 60000);

    setRefresh(false);
  }

  return (
    <div className="app">
      <div className="grid">
        {wordGrid.map((row, index) => {
          return <Row key={index} cells={row} random={randomGrid} row={index} words={wordGrid} />;
        })}
      </div>
    </div>
  );
};

export default App;

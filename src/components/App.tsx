import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import Grid from "./Grid";
import { addFallbacks, applyWordListToGrid, getWordsList, makeGrid } from "../library/grid";
import { NUMBER_OF_CELLS, NUMBER_OF_ROWS } from "../library/types";

const App = styled.div({
  alignItems: "center",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  placeContent: "center",
});

const Component = () => {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), 6000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const randomGrid = useMemo(() => {
    const newGrid = makeGrid(NUMBER_OF_CELLS, NUMBER_OF_ROWS);

    return addFallbacks(newGrid);
  }, []);

  const words = useMemo(() => {
    const hours = now.getHours();
    const minutes = now.getMinutes();

    return getWordsList(hours, minutes);
  }, [now]);

  const timeGrid = applyWordListToGrid(randomGrid, words);

  return (
    <App>
      <Grid grid={timeGrid} />
    </App>
  );
};

export default Component;

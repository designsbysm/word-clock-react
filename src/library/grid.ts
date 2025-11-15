import { Cell, CellGrid, CellRow, hoursMap, minutesMap, othersMap, Word } from "./types";

export const addFallbacks = (grid: CellGrid) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let chars: string[] = [];

  const random = () => {
    if (!chars.length) {
      chars = [...alphabet];
    }

    const index = Math.floor(Math.random() * chars.length);
    const char = chars[index];
    chars.splice(index, 1);

    return char;
  };

  return grid.map(row =>
    row.map(cell => ({
      ...cell,
      fallback: random(),
    }))
  );
};

export const applyWordListToGrid = (grid: CellGrid, words: Word[]) =>
  grid.map((row, index) => {
    const rowWords = words.filter(word => word.line === index);
    return applyWordListToRow(row, rowWords);
  });

const applyWordListToRow = (row: CellRow, words: Word[]) => {
  const rowMap = new Map<number, string>();

  words.forEach(word => {
    const characters = [...word.characters];
    characters.forEach((character, index) => {
      rowMap.set(word.start + index, character);
    });
  });

  return row.map((cell, index) => ({ ...cell, character: rowMap.get(index) }));
};

const getHours = (hours: number, minutes: number) => {
  if (minutes > 30) {
    hours++;
  }

  if (hours > 12) {
    hours = hours - 12;
  } else if (hours === 0) {
    hours = 12;
  }

  return hoursMap.get(hours);
};

const getMinutes = (minutes: number) => {
  const words: (Word | undefined)[] = [];

  if (isBetween(2, 7, minutes) || isBetween(53, 58, minutes)) {
    words.push(minutesMap.get(5));
    words.push(othersMap.get("minutes"));
  } else if (isBetween(7, 13, minutes) || isBetween(47, 53, minutes)) {
    words.push(minutesMap.get(10));
    words.push(othersMap.get("minutes"));
  } else if (isBetween(13, 17, minutes) || isBetween(42, 47, minutes)) {
    words.push(minutesMap.get(15));
    words.push(othersMap.get("a"));
  } else if (isBetween(17, 25, minutes) || isBetween(35, 42, minutes)) {
    words.push(minutesMap.get(20));
    words.push(othersMap.get("minutes"));
  } else if (isBetween(25, 35, minutes)) {
    words.push(minutesMap.get(30));
    words.push(othersMap.get("a"));
  }

  if (minutes > 30) {
    words.push(othersMap.get("to"));
  } else {
    words.push(othersMap.get("past"));
  }

  return words;
};

export const getWordsList = (hours: number, minutes: number) =>
  [othersMap.get("its"), getMinutes(minutes), getHours(hours, minutes), othersMap.get("oclock")]
    .flat()
    .filter(word => !!word);

const isBetween = (min: number, max: number, value: number) => value > min && value <= max;

export const makeGrid = (cells: number, rows: number) =>
  Array(rows)
    .fill(null)
    .map(() => Array<Cell>(cells).fill({ character: undefined, fallback: undefined }));

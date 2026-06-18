interface Props {
  deckSize: number;
  drawnSize: number;
  handleStartNewGame: () => void;
  undoMove: () => void;
  redoMove: () => void;
  selected?: string;
}

export function Header({
  deckSize,
  drawnSize,
  handleStartNewGame,
  undoMove,
  redoMove,
  selected,
}: Props) {
  return (
    <>
      <div className="header-row">
        <h1>Klondike | t-rav4</h1>
        <div className="button" onClick={handleStartNewGame}>
          New Game
        </div>
        <div className="button" onClick={redoMove}>
          Redo Move
        </div>
        <div className="button" onClick={undoMove}>
          Undo Move
        </div>
      </div>
      <p>Deck size: {deckSize}</p>
      <p>Drawn size: {drawnSize}</p>
      <p>Selected: {selected ? JSON.stringify(selected) : "None"}</p>
    </>
  );
}

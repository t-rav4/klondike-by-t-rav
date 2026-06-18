import { useGame } from "./hooks/useGame";
import { Card } from "./ui/components/Card";
import { DeckPile } from "./ui/components/DeckPile";
import { DrawnPile } from "./ui/components/DrawnPile";
import { Header } from "./ui/components/Header";
import { FoundationPile } from "./ui/components/FoundationPile";
import { Tableau } from "./ui/components/Tableau";
import { getDraggedCards } from "./engine/getDraggedCards";
import { CARD_LAYOUT } from "./constants/cardLayout";
import backgroundImage from "/black-hexagon-bg.webp";

function App() {
  const { state, dragging, startDrag, startNewGame, elapsedSeconds, won, drawCard, undoMove, redoMove } = useGame();

  const draggedCards = getDraggedCards(dragging, state);

  return (
    <div 
      className="game"
      style={{
          "--card-gap": `${CARD_LAYOUT.gap}px`,
          "--card-width": `${CARD_LAYOUT.width}px`,
          "--card-height": `${CARD_LAYOUT.height}px`,
          "--tableau-overlap": `${CARD_LAYOUT.overlap}px`,
          "backgroundImage": `url(${backgroundImage})`
        } as React.CSSProperties
      }>
      <Header
        deckSize={state.deck.length}
        drawnSize={state.drawn.length}
        selected={draggedCards?.[0]?.id ?? "None"}
        handleStartNewGame={startNewGame}
        redoMove={redoMove} 
        undoMove={undoMove}
      />

      {/* Game Area */}
      <div className="top-row">
        <div className="draw-pile-area">
          <DeckPile hasCards={state.deck.length > 0} onClick={drawCard} />
          <DrawnPile
            cards={state.drawn}
            dragging={dragging}
            startDrag={startDrag}
          />
        </div>
        <FoundationPile
          dragging={dragging}
          piles={state.foundation}
          startDrag={startDrag}
        />
      </div>

      <Tableau
        piles={state.tableau}
        dragging={dragging}
        startDrag={startDrag}
      />

      {dragging && draggedCards.length > 0 && (
        <div
          className="drag-preview"
          style={{
            left: dragging.mouseX - dragging.grabOffsetX,
            top: dragging.mouseY - dragging.grabOffsetY,
          }}
        >
          {draggedCards.map((card, idx) => (
            <div
              key={card.id}
              style={{
                position: "absolute",
                top: idx * CARD_LAYOUT.tableauOffset,
              }}
            >
              <Card card={card} />
            </div>
          ))}
        </div>
      )}

      {won && (
        <div className="win-overlay">
          <h1>You Win!</h1>
          <button onClick={startNewGame}>New Game</button>
        </div>
      )}

      <div>
        <p>{elapsedSeconds}</p>
      </div>
    </div>
  );
}

export default App;

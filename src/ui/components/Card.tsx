import { getCardColour } from "../../engine/helpers";
import type { Card as CardType } from "../../engine/types";

type Props = {
  card: CardType;
  onPointerDown?: (e: React.PointerEvent) => void;
  isDragging?: boolean;
};

const suitSymbols = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};

export function Card({ card, onPointerDown, isDragging }: Props) {
  if (!card.isFaceUp) {
    return <div className="card facedown" />;
  }

  const isRed = getCardColour(card) === "red";

  return (
    <div
      className={`
                card ${isRed ? "red" : "black"}
                ${isDragging ? "dragging" : ""}   
            `}
      onPointerDown={onPointerDown}
    >
      {card.rank}
      {suitSymbols[card.suit]}
    </div>
  );
}

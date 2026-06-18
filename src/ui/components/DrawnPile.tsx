import type { Card as CardType } from "../../engine/types";
import type { DragSource, DragState } from "../../hooks/useGame";
import { Card } from "./Card";

interface Props {
  cards: CardType[];
  dragging: DragState | null;
  startDrag: (
    source: Exclude<DragSource, null>,
    mouseX: number,
    mouseY: number,
    grabOffsetX: number,
    grabOffsetY: number,
  ) => void;
}

export function DrawnPile({ cards, dragging, startDrag }: Props) {
  const visibleCards = cards.slice(-3);

  return (
    <div className="drawn-pile">
      {visibleCards.map((card, idx) => {
        const isTopCard = idx === visibleCards.length - 1;

        const isBeingDragged = dragging?.source.type === "DRAWN" && isTopCard;

        return (
          <Card
            key={card.id}
            card={card}
            isDragging={isBeingDragged}
            onPointerDown={(e) => {
              if (!isTopCard) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const grabOffsetX = e.clientX - rect.left;
              const grabOffsetY = e.clientY - rect.top;

              startDrag(
                { type: "DRAWN" },
                e.clientX,
                e.clientY,
                grabOffsetX,
                grabOffsetY,
              );
            }}
          />
        );
      })}
    </div>
  );
}

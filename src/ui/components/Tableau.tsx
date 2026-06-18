import type { Card as CardType } from "../../engine/types";
import { createDropZoneRef } from "../../engine/useDropZone";
import type { DragSource, DragState } from "../../hooks/useGame";
import { Card } from "./Card";

interface Props {
  piles: CardType[][];
  dragging: DragState;
  startDrag: (
    source: Exclude<DragSource, null>,
    mouseX: number,
    mouseY: number,
    grabOffsetX: number,
    grabOffsetY: number,
  ) => void;
}

export function Tableau({ piles, dragging, startDrag }: Props) {
  const handlePointerDown = (
    e: React.PointerEvent,
    pileIndex: number,
    cardIndex: number,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const grabOffsetX = e.clientX - rect.left;
    const grabOffsetY = e.clientY - rect.top;
    startDrag(
      {
        type: "TABLEAU",
        pileIndex,
        cardIndex,
      },
      e.clientX,
      e.clientY,
      grabOffsetX,
      grabOffsetY,
    );
  };

  return (
    <div className="tableau">
      {piles.map((pile, pileIndex) => (
        <div
          key={pileIndex}
          className="tableau-pile"
          ref={createDropZoneRef(`tableau-${pileIndex}`, {
            type: "TABLEAU",
            pileIndex,
          })}
        >
          {pile.length === 0 && <div className="pile-placeholder" />}
          {pile.map((card, cardIndex) => {
            const isBeingDragged =
              dragging?.source?.type === "TABLEAU" &&
              dragging.source.pileIndex === pileIndex &&
              cardIndex >= dragging.source.cardIndex;

            return (
              <Card
                key={card.id}
                card={card}
                isDragging={isBeingDragged}
                onPointerDown={(e) =>
                  handlePointerDown(e, pileIndex, cardIndex)
                }
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

import type { Card as CardType } from "../../engine/types";
import { createDropZoneRef } from "../../engine/useDropZone";
import type { DragSource, DragState } from "../../hooks/useGame";
import { Card } from "./Card";

interface Props {
  dragging: DragState;
  piles: CardType[][];
  startDrag: (
    source: Exclude<DragSource, null>,
    mouseX: number,
    mouseY: number,
    grabOffsetX: number,
    grabOffsetY: number,
  ) => void;
}

export function FoundationPile({ dragging, piles, startDrag }: Props) {
  return (
    <div className="foundation-area">
      {piles.map((pile, pileIndex) => {
        const isBeingDragged =
          dragging?.source.type === "FOUNDATION" &&
          dragging.source.pileIndex === pileIndex;
        return (
          <div
            key={pileIndex}
            className="pile-placeholder"
            ref={createDropZoneRef(`foundation-${pileIndex}`, {
              type: "FOUNDATION",
              pileIndex: pileIndex,
            })}
          >
            {pile.length > 0 ? (
              <Card
                isDragging={isBeingDragged}
                card={pile[pile.length - 1]}
                onPointerDown={(e: React.PointerEvent) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const grabOffsetX = e.clientX - rect.left;
                  const grabOffsetY = e.clientY - rect.top;
                  startDrag(
                    {
                      type: "FOUNDATION",
                      pileIndex: pileIndex,
                    },
                    e.clientX,
                    e.clientY,
                    grabOffsetX,
                    grabOffsetY,
                  );
                }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

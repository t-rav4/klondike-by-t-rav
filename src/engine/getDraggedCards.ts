import type { DragState } from "../hooks/useGame";
import type { GameState } from "./types";

export const getDraggedCards = (dragging: DragState, state: GameState) => {
    if (!dragging) return [];

    if (dragging.source.type === "TABLEAU") {
      const pile = state.tableau[dragging.source.pileIndex];

      return pile.slice(dragging.source.cardIndex);
    }

    if (dragging.source.type === "DRAWN") {
      const card = state.drawn[state.drawn.length - 1];

      return card ? [card] : [];
    }

    if (dragging.source.type === "FOUNDATION") {
      const pile = state.foundation[dragging.source.pileIndex];
      const card = pile[pile.length - 1];

      return card ? [card] : [];
    }

    return [];
  };

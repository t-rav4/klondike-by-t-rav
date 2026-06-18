import type { GameState, GameMove } from "../types";
import {
  canMoveDrawnToFoundationPile,
  canMoveDrawnToTableau,
  canMoveFoundationToFoundation,
  canMoveFromFoundationToTableau,
  canMoveTableauToFoundationPile,
  canMoveTableauToTableau,
} from "./moveRules";

export function canApplyMove(state: GameState, move: GameMove): boolean {
  switch (move.type) {
    case "DRAW_FROM_DECK":
      return state.deck.length > 0;

    case "MOVE_TABLEAU_TO_TABLEAU":
      return canMoveTableauToTableau(state, move);

    case "MOVE_DRAWN_TO_TABLEAU":
      return canMoveDrawnToTableau(state, move);

    case "MOVE_DRAWN_TO_FOUNDATION":
      return canMoveDrawnToFoundationPile(state, move);

    case "MOVE_TABLEAU_TO_FOUNDATION":
      return canMoveTableauToFoundationPile(state, move);

    case "MOVE_FROM_FOUNDATION_TO_TABLEAU":
      return canMoveFromFoundationToTableau(state, move);

    case "MOVE_FOUNDATION_TO_FOUNDATION":
      return canMoveFoundationToFoundation(state, move);

    case "RECYCLE_DRAWN_TO_DECK":
      return state.deck.length === 0 && state.drawn.length > 1;
  }
}

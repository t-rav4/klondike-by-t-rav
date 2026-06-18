import type { GameState, GameMove } from "./types";
import { canApplyMove } from "./rules/canApplyMove";
import { drawFromDeck, recycleDrawnPile } from "./moves/deckMoves";
import {
  moveFromDrawnToFoundation,
  moveFromDrawnToTableau,
  moveFromFoundationToTableau,
  moveWithinTableau,
} from "./moves/tableauMoves";
import {
  moveFromFoundationToFoundation,
  moveFromTableauToFoundation,
} from "./moves/foundationMoves";

export function gameReducer(state: GameState, move: GameMove): GameState {
  if (!canApplyMove(state, move)) {
    return state;
  }

  switch (move.type) {
    case "DRAW_FROM_DECK":
      return drawFromDeck(state);

    case "RECYCLE_DRAWN_TO_DECK":
      return recycleDrawnPile(state);

    case "MOVE_TABLEAU_TO_TABLEAU":
      return moveWithinTableau(state, move);

    case "MOVE_TABLEAU_TO_FOUNDATION":
      return moveFromTableauToFoundation(state, move);

    case "MOVE_DRAWN_TO_TABLEAU":
      return moveFromDrawnToTableau(state, move);

    case "MOVE_DRAWN_TO_FOUNDATION":
      return moveFromDrawnToFoundation(state, move);

    case "MOVE_FROM_FOUNDATION_TO_TABLEAU":
      return moveFromFoundationToTableau(state, move);

    case "MOVE_FOUNDATION_TO_FOUNDATION":
      return moveFromFoundationToFoundation(state, move);

    default:
      return state;
  }
}

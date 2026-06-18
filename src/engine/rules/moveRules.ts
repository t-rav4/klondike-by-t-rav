import type { GameState, GameMove } from "../types";
import { canPlaceOnFoundationPile } from "./foundationPlacement";
import { canPlaceOnTableau } from "./tableauPlacement";

// Tableau placements

export function canMoveTableauToTableau(
  state: GameState,
  move: Extract<GameMove, { type: "MOVE_TABLEAU_TO_TABLEAU" }>,
): boolean {
  const fromPile = state.tableau[move.from];
  const toPile = state.tableau[move.to];

  if (!fromPile.length) return false;

  const pickUpIndex = move.cardIndex ?? fromPile.length - 1;
  const movingCard = fromPile[pickUpIndex];
  if (!movingCard) return false;

  return canPlaceOnTableau(movingCard, toPile);
}

export function canMoveDrawnToTableau(
  state: GameState,
  move: Extract<GameMove, { type: "MOVE_DRAWN_TO_TABLEAU" }>,
): boolean {
  const movingCard = state.drawn[state.drawn.length - 1];

  return canPlaceOnTableau(movingCard, state.tableau[move.to]);
}

export function canMoveFromFoundationToTableau(
  state: GameState,
  move: Extract<GameMove, { type: "MOVE_FROM_FOUNDATION_TO_TABLEAU" }>,
): boolean {
  const foundationPile = state.foundation[move.from];
  const movingCard = foundationPile[foundationPile.length - 1];

  return canPlaceOnTableau(movingCard, state.tableau[move.to]);
}

// Foundation placements

export function canMoveDrawnToFoundationPile(
  state: GameState,
  move: Extract<GameMove, { type: "MOVE_DRAWN_TO_FOUNDATION" }>,
): boolean {
  const movingCard = state.drawn[state.drawn.length - 1];
  const foundationPile = state.foundation[move.to];

  return canPlaceOnFoundationPile(movingCard, foundationPile);
}

export function canMoveTableauToFoundationPile(
  state: GameState,
  move: Extract<GameMove, { type: "MOVE_TABLEAU_TO_FOUNDATION" }>,
): boolean {
  const fromPile = state.tableau[move.from];
  if (move.cardIndex !== fromPile.length - 1) {
    return false;
  }

  const movingCard = fromPile[move.cardIndex];
  const foundationPile = state.foundation[move.to];

  return canPlaceOnFoundationPile(movingCard, foundationPile);
}

export function canMoveFoundationToFoundation(
  state: GameState,
  move: Extract<GameMove, { type: "MOVE_FOUNDATION_TO_FOUNDATION" }>,
): boolean {
  const fromPile = state.foundation[move.from];
  if (fromPile.length > 1) return false; // Can only move an Ace to another foundation

  const movingCard = fromPile[fromPile.length - 1];

  const targetPile = state.foundation[move.to];

  return canPlaceOnFoundationPile(movingCard, targetPile);
}

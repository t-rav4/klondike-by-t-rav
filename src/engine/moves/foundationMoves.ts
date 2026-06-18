import type { GameState, GameMove } from "../types";

export function moveFromTableauToFoundation(
  state: GameState,
  move: Extract<GameMove, { type: "MOVE_TABLEAU_TO_FOUNDATION" }>,
): GameState {
  const fromPile = state.tableau[move.from];
  const movingCard = fromPile[move.cardIndex];

  const updatedFoundation = state.foundation.map((foundationPile, idx) => {
    if (idx === move.to) {
      return [...foundationPile, movingCard];
    }

    return foundationPile;
  });

  const updatedTableau = state.tableau.map((pile, idx) => {
    if (idx === move.from) {
      const remainingCards = pile.slice(0, move.cardIndex);
      if (remainingCards.length > 0) {
        const updatedPile = [...remainingCards];

        updatedPile[updatedPile.length - 1] = {
          ...updatedPile[updatedPile.length - 1],
          isFaceUp: true,
        };

        return updatedPile;
      }
      return [];
    }

    return pile;
  });

  return { ...state, tableau: updatedTableau, foundation: updatedFoundation };
}

export function moveFromFoundationToFoundation(
  state: GameState,
  move: Extract<GameMove, { type: "MOVE_FOUNDATION_TO_FOUNDATION" }>,
): GameState {
  const fromPile = state.foundation[move.from];
  const movingCard = fromPile[fromPile.length - 1];

  return {
    ...state,
    foundation: state.foundation.map((pile, pileIndex) => {
      if (pileIndex === move.from) {
        return []; // This move only occurs when moving 1 card to another foundation pile hence - we can simply return single array
      }
      if (pileIndex === move.to) {
        return [...pile, movingCard];
      }
      return pile;
    }),
  };
}

import type { GameState, GameMove } from "../types";

export function moveWithinTableau(
  state: GameState,
  move: Extract<GameMove, { type: "MOVE_TABLEAU_TO_TABLEAU" }>,
): GameState {
  const fromPile = state.tableau[move.from];

  const pickupIndex = move.cardIndex ?? fromPile.length - 1;
  const selected = fromPile.slice(pickupIndex);

  if (selected.length === 0) return state;

  const updatedTableau = state.tableau.map((pile, idx) => {
    if (idx === move.from) {
      const remainingCards = pile.slice(0, pickupIndex);

      // Need to flip up the card that was underneath the card(s) being moved
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

    if (idx === move.to) {
      return [...pile, ...selected]; // Places picked up card(s) to the destination pile
    }

    return pile;
  });

  return {
    ...state,
    tableau: updatedTableau,
  };
}

export function moveFromDrawnToTableau(
  state: GameState,
  move: Extract<GameMove, { type: "MOVE_DRAWN_TO_TABLEAU" }>,
): GameState {
  const movingCard = state.drawn[state.drawn.length - 1];
  if (!movingCard) return state;

  const remainingDrawPile = state.drawn.slice(0, -1);
  const updatedTableau = state.tableau.map((pile, pileIndex) => {
    if (pileIndex === move.to) {
      return [...pile, movingCard];
    }

    return pile;
  });

  return {
    ...state,
    drawn: remainingDrawPile,
    tableau: updatedTableau,
  };
}

export function moveFromDrawnToFoundation(
  state: GameState,
  move: Extract<GameMove, { type: "MOVE_DRAWN_TO_FOUNDATION" }>,
): GameState {
  const drawnCard = state.drawn[state.drawn.length - 1];
  const updatedFoundation = state.foundation.map((pile, idx) => {
    if (idx === move.to) {
      return [...pile, drawnCard];
    }
    return pile;
  });

  return {
    ...state,
    drawn: state.drawn.slice(0, -1),
    foundation: updatedFoundation,
  };
}

export function moveFromFoundationToTableau(
  state: GameState,
  move: Extract<GameMove, { type: "MOVE_FROM_FOUNDATION_TO_TABLEAU" }>,
): GameState {
  const foundationPile = state.foundation[move.from];
  const updatedPile = state.foundation.map((pile, pileIndex) => {
    if (pileIndex === move.from) {
      return foundationPile.slice(0, -1);
    }
    return pile;
  });

  const updatedTableau = state.tableau.map((pile, pileIndex) => {
    if (pileIndex === move.to) {
      const movingCard = foundationPile[foundationPile.length - 1];
      return [...pile, movingCard];
    }
    return pile;
  });

  return { ...state, foundation: updatedPile, tableau: updatedTableau };
}

import type { Card, GameState } from "../types";

export function drawFromDeck(state: GameState): GameState {
  const deck = [...state.deck];
  const drawnCards: Card[] = [];

  for (let i = 0; i < 3; i++) {
    const card = deck.pop();
    if (!card) break;

    drawnCards.push({
      ...card,
      isFaceUp: true,
    });
  }

  return {
    ...state,
    deck,
    drawn: [...state.drawn, ...drawnCards],
  };
}

export function recycleDrawnPile(state: GameState): GameState {
  return {
    ...state,
    deck: [...state.drawn].reverse().map((card) => ({
      ...card,
      isFaceUp: false,
    })),
    drawn: [],
  };
}

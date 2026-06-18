import type { GameState } from "./types";

export function hasWon(state: GameState): boolean {
  const foundationCards = state.foundation.reduce(
    (sum, pile) => sum + pile.length,
    0,
  );

  return foundationCards === 52;
}

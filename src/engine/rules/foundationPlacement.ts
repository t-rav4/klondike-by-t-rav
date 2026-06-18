import { isOneRankHigher } from "../helpers";
import type { Card } from "../types";

export function canPlaceOnFoundationPile(
  movingCard: Card,
  foundationPile: Card[],
): boolean {
  if (foundationPile.length === 0) {
    return movingCard.rank === "A";
  }

  const topOfPile = foundationPile[foundationPile.length - 1];

  // Suit must be the same
  if (topOfPile.suit !== movingCard.suit) {
    return false;
  }

  return isOneRankHigher(movingCard, topOfPile);
}

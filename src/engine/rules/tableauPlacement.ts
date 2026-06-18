import { getCardColour, isOneRankLower } from "../helpers";
import type { Card } from "../types";

export function canPlaceOnTableau(
  movingCard: Card,
  destinationPile: Card[],
): boolean {
  // Rule: can only place Kings in empty piles
  if (destinationPile.length === 0) {
    return movingCard.rank === "K";
  }

  const targetCard = destinationPile[destinationPile.length - 1];

  // Rule: Must be face up
  if (!targetCard.isFaceUp) {
    return false;
  }

  // Rule: colour must differ
  if (getCardColour(movingCard) === getCardColour(targetCard)) {
    return false;
  }

  // Rule: rank must be one lower
  return isOneRankLower(movingCard, targetCard);
}

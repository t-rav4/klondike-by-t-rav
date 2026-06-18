import type { Card } from "./types";

const order = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export function getCardColour(card: Card): "red" | "black" {
  return card.suit === "hearts" || card.suit === "diamonds" ? "red" : "black";
}

export function isOneRankLower(moving: Card, target: Card) {
  return order.indexOf(moving.rank) === order.indexOf(target.rank) - 1;
}

export function isOneRankHigher(moving: Card, target: Card) {
  return order.indexOf(moving.rank) === order.indexOf(target.rank) + 1;
}

export function isPointInsideRect(x: number, y: number, rect: DOMRect) {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

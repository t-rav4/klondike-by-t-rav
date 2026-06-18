import { RANKS, SUITS } from "./constants";
import type { Card, GameState } from "./types";

function createDeck(): Card[] {
  return SUITS.flatMap((suit) =>
    RANKS.map((rank) => ({
      id: `${rank}-${suit}`,
      suit,
      rank,
      isFaceUp: false,
    })),
  );
}

// 'Fisher-Yates' shuffle
export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function dealCards(deck: Card[]): { drawDeck: Card[]; tableau: Card[][] } {
  const deckCopy = [...deck];

  const tableau = Array.from({ length: 7 }, (_, idx) => {
    const pile = deckCopy.splice(0, idx + 1);

    return pile.map((card, cardIdx) => ({
      ...card,
      isFaceUp: cardIdx === pile.length - 1, // Set bottom card face up
    }));
  });

  return { drawDeck: deckCopy, tableau };
}

export function createInitialState(): GameState {
  const shuffledDeck = shuffleDeck(createDeck());

  const { drawDeck, tableau } = dealCards(shuffledDeck);

  return {
    deck: drawDeck,
    drawn: [],
    foundation: [[], [], [], []],
    tableau: tableau,
  };
}

export function createInitialHistoryState() {
  return {
    past: [],
    present: createInitialState(),
    future: [],
    hasStarted: false
  };
}
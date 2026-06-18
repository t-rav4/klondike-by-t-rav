export type Suit = "hearts" | "diamonds" | "clubs" | "spades";

export type Rank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export interface Card {
  id: string;
  suit: Suit;
  rank: Rank;
  isFaceUp: boolean;
}

export interface GameState {
  deck: Card[];
  drawn: Card[];

  tableau: Card[][];
  foundation: Card[][];
}

export type GameMove =
  | {
      type: "DRAW_FROM_DECK";
    }
  | {
      type: "RECYCLE_DRAWN_TO_DECK";
    }
  | {
      type: "MOVE_TABLEAU_TO_TABLEAU";
      from: number;
      to: number;
      cardIndex: number;
    }
  | {
      type: "MOVE_TABLEAU_TO_FOUNDATION";
      from: number;
      to: number;
      cardIndex: number;
    }
  | {
      type: "MOVE_DRAWN_TO_TABLEAU";
      to: number;
    }
  | {
      type: "MOVE_DRAWN_TO_FOUNDATION";
      to: number;
    }
  | {
      type: "MOVE_FROM_FOUNDATION_TO_TABLEAU";
      from: number;
      to: number;
    }
  | {
      type: "MOVE_FOUNDATION_TO_FOUNDATION";
      from: number;
      to: number;
    };

export type SystemAction =
  | {
      type: "START_NEW_GAME";
    }
  | {
      type: "UNDO_MOVE";
    }
  | {
      type: "REDO_MOVE";
    };

export type GameAction = GameMove | SystemAction;

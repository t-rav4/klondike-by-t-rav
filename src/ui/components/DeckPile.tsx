interface Props {
  hasCards: boolean;
  onClick: () => void;
}

export function DeckPile({ hasCards, onClick }: Props) {
  return (
    <div
      className={`deck-pile ${
        hasCards ? "deck-pile--full" : "deck-pile--empty"
      }`}
      onClick={onClick}
    />
  );
}

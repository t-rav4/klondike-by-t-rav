import { useEffect, useReducer, useState } from "react";
import { createInitialHistoryState } from "../engine/setup";
import type { GameMove } from "../engine/types";
import { resolveDropTarget, type DropTarget } from "../engine/dropResolver";
import { historyReducer } from "../engine/historyReducer";
import { hasWon } from "../engine/hasWon";

export type DragSource =
  | {
      type: "TABLEAU";
      pileIndex: number;
      cardIndex: number;
    }
  | {
      type: "DRAWN";
    }
  | {
      type: "FOUNDATION";
      pileIndex: number;
    }
  | null;

export type DragState = {
  source: Exclude<DragSource, null>;
  mouseX: number;
  mouseY: number;

  grabOffsetX: number;
  grabOffsetY: number;
} | null;

export function useGame() {
  const [history, dispatch] = useReducer(
    historyReducer,
    undefined,
    createInitialHistoryState
  );

  const state = history.present;

  const hasStartedGame = history.hasStarted;
  const won = hasWon(state);
  
  const [dragging, setDragging] = useState<DragState>(null);
  useEffect(() => {
    if (!dragging) return;

    function handlePointerMove(e: PointerEvent) {
      updateDrag(e.clientX, e.clientY);
    }

    function handlePointerUp(e: PointerEvent) {
      finishDrag(e.clientX, e.clientY);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragging, finishDrag]);


  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  useEffect(() => {
    if (!hasStartedGame || won) return;

    const interval = setInterval(() => {
        setElapsedSeconds(seconds => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
}, [hasStartedGame, won]);


  const drawCard = () => {
    dispatch({
      type: state.deck.length > 0 ? "DRAW_FROM_DECK" : "RECYCLE_DRAWN_TO_DECK",
    });
  };

  function startDrag(
    source: Exclude<DragSource, null>,
    mouseX: number,
    mouseY: number,
    grabOffsetX: number,
    grabOffsetY: number,
  ) {
    setDragging({ source, mouseX, mouseY, grabOffsetX, grabOffsetY });
  }

  function updateDrag(mouseX: number, mouseY: number) {
    setDragging((prev) =>
      prev
        ? {
            ...prev,
            mouseX,
            mouseY,
          }
        : null,
    );
  }

  function endDrag() {
    setDragging(null);
  }

  function finishDrag(mouseX: number, mouseY: number) {
    if (!dragging) {
      endDrag();
      return;
    }

    const target = resolveDropTarget(mouseX, mouseY);

    if (target) {
      applyDrop(dragging.source, target);
    }

    endDrag();
  }

  const applyDrop = (source: DragSource, target: DropTarget) => {
    switch (target.type) {
      case "FOUNDATION":
        dropOnFoundationPile(source, target.pileIndex);
        break;

      case "TABLEAU":
        dropOnTableauPile(source, target.pileIndex);
        break;
    }
  };

  const dropOnTableauPile = (dragging: DragSource, targetPile: number) => {
    if (!dragging) return;

    let move: GameMove | null = null;

    if (dragging.type === "TABLEAU") {
      move = {
        type: "MOVE_TABLEAU_TO_TABLEAU",
        from: dragging.pileIndex,
        to: targetPile,
        cardIndex: dragging.cardIndex,
      };
    }

    if (dragging.type === "DRAWN") {
      move = {
        type: "MOVE_DRAWN_TO_TABLEAU",
        to: targetPile,
      };
    }

    if (dragging.type === "FOUNDATION") {
      move = {
        type: "MOVE_FROM_FOUNDATION_TO_TABLEAU",
        from: dragging.pileIndex,
        to: targetPile,
      };
    }

    if (!move) return;
    dispatch(move);
  };

  const dropOnFoundationPile = (dragging: DragSource, targetPile: number) => {
    if (!dragging) return;

    let move: GameMove | null = null;

    if (dragging.type === "TABLEAU") {
      move = {
        type: "MOVE_TABLEAU_TO_FOUNDATION",
        from: dragging.pileIndex,
        to: targetPile,
        cardIndex: dragging.cardIndex,
      };
    }

    if (dragging.type === "DRAWN") {
      move = {
        type: "MOVE_DRAWN_TO_FOUNDATION",
        to: targetPile,
      };
    }

    if (dragging.type === "FOUNDATION") {
      move = {
        type: "MOVE_FOUNDATION_TO_FOUNDATION",
        from: dragging.pileIndex,
        to: targetPile,
      };
    }

    if (!move) return;
    dispatch(move);
  };

  const startNewGame = () => {
    setDragging(null);
    setElapsedSeconds(0);
    dispatch({ type: "START_NEW_GAME" });
  };

  const undoMove = () => {
    dispatch({ type: "UNDO_MOVE" });
  };

  const redoMove = () => {
      dispatch({ type: "REDO_MOVE" });
  };

  return {
    state,
    dragging,
    startDrag,
    drawCard,
    won,
    startNewGame,
    elapsedSeconds,
    undoMove,
    redoMove
  };
}

import type { GameAction, GameState } from "./types";
import { gameReducer } from "./gameReducer";
import { createInitialHistoryState } from "./setup";

type HistoryState = {
    past: GameState[];
    present: GameState;
    future: GameState[];
    hasStarted: boolean;
};

export function historyReducer(state: HistoryState, action: GameAction): HistoryState {

    switch (action.type) {
        case "START_NEW_GAME":
            return createInitialHistoryState();

        case "UNDO_MOVE":
            if (state.past.length === 0) {
                return state;
            }

            const prev = state.past[state.past.length - 1];
            return {
                past: state.past.slice(0, -1),
                present: prev,
                future: [
                    state.present,
                    ...state.future,
                ],
                hasStarted: state.hasStarted
            };

        case "REDO_MOVE":
            if (state.future.length === 0) {
                return state;
            }

            const next = state.future[0];
            return {
                past: [
                    ...state.past, state.present
                ],
                present: next,
                future: state.future.slice(1),
                hasStarted: state.hasStarted
            };
    }

    // Forward on all other game moves
    const newPresent = gameReducer(state.present, action);

    if (newPresent === state.present) {
        return state;
    }

    return {
        past: [...state.past, state.present],
        present: newPresent,
        future: [],
        hasStarted: true
    };
}
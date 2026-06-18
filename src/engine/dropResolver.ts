import { dropZoneRegistry } from "./dropZoneRegistry";

export type DropTarget =
  | {
      type: "FOUNDATION";
      pileIndex: number;
    }
  | {
      type: "TABLEAU";
      pileIndex: number;
    };

export function resolveDropTarget(x: number, y: number): DropTarget | null {
  for (const zone of dropZoneRegistry.getZones()) {
    const rect = zone.element.getBoundingClientRect();

    const isPointInsideRect =
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

    if (isPointInsideRect) {
      return zone.target;
    }
  }

  return null;
}

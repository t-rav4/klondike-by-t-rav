import { dropZoneRegistry } from "../engine/dropZoneRegistry";
import type { DropTarget } from "../engine/dropResolver";

export function createDropZoneRef(id: string, target: DropTarget) {
  return (element: HTMLDivElement | null) => {
    if (!element) {
      dropZoneRegistry.unregister(id);
      return;
    }

    dropZoneRegistry.register(id, element, target);
  };
}

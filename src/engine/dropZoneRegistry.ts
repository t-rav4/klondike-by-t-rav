import type { DropTarget } from "./dropResolver";

type RegisteredDropZone = {
  element: HTMLElement;
  target: DropTarget;
};

export class DropZoneRegistry {
  private zones = new Map<string, RegisteredDropZone>();

  register(id: string, element: HTMLElement, target: DropTarget) {
    this.zones.set(id, {
      element,
      target,
    });
  }

  unregister(id: string) {
    this.zones.delete(id);
  }

  getZones() {
    return [...this.zones.values()];
  }
}

export const dropZoneRegistry = new DropZoneRegistry();

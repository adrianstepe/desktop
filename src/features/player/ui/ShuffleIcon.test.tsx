import { act } from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createRoot, Root } from "react-dom/client";
import { ShuffleIcon } from "./ShuffleIcon";
import type { ShuffleMode } from "../store/playerStore";

// @ts-expect-error - act support flag in vitest browserless DOM environment
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const SPARKLE = "svg path[d^='M8 0']";

describe("ShuffleIcon", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    container = null;
    root = null;
  });

  const render = (mode: ShuffleMode, size = 18) => {
    act(() => {
      root?.render(<ShuffleIcon mode={mode} size={size} />);
    });
    const box = container?.querySelector<HTMLElement>("[data-shuffle-mode]");
    return { box, sparkle: container?.querySelector(SPARKLE) ?? null };
  };

  it("keeps the same icon size in every mode", () => {
    for (const mode of ["off", "playlist", "smart"] as const) {
      const { box } = render(mode, 24);
      expect(box?.style.width).toBe("24px");
      expect(box?.style.height).toBe("24px");
    }
  });

  it("shows the sparkle only in smart mode", () => {
    expect(render("off").sparkle).toBeNull();
    expect(render("playlist").sparkle).toBeNull();
    expect(render("smart").sparkle).not.toBeNull();
  });

  it("has no extra indicator dot", () => {
    render("playlist");
    expect(container?.querySelector(".rounded-full")).toBeNull();
  });

  it("renders a custom icon when one is given", () => {
    act(() => {
      root?.render(
        <ShuffleIcon mode="smart" icon={<i data-testid="custom" />} />,
      );
    });
    expect(container?.querySelector("[data-testid='custom']")).not.toBeNull();
    expect(container?.querySelector(SPARKLE)).not.toBeNull();
  });
});

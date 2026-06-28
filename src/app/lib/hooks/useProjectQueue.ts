"use client";

import { useCallback, useMemo, useState } from "react";

export type Direction = "left" | "right";

export interface QueueItem<T> {
  data: T;
  /** Stable slot this item currently occupies in the viewport. */
  slot: "left" | "center" | "right";
}

/**
 * Circular queue that always exposes exactly 3 visible items:
 *   left = centerIndex - 1 (wrapped)
 *   center = centerIndex
 *   right  = centerIndex + 1 (wrapped)
 *
 * Works for any number of items ≥ 3.
 */
export function useProjectQueue<T>(items: T[], initialIndex = 0) {
  const total = items.length;

  const [centerIndex, setCenterIndex] = useState(
    () => ((initialIndex % total) + total) % total
  );

  const previousIndex = useMemo(
    () => (centerIndex - 1 + total) % total,
    [centerIndex, total]
  );

  const nextIndex = useMemo(
    () => (centerIndex + 1) % total,
    [centerIndex, total]
  );

  /** Always exactly 3 items in this array — no matter how large `items` is. */
  const visible: QueueItem<T>[] = useMemo(
    () => [
      { data: items[previousIndex], slot: "left" },
      { data: items[centerIndex], slot: "center" },
      { data: items[nextIndex], slot: "right" },
    ],
    [items, previousIndex, centerIndex, nextIndex]
  );

  /** Right card clicked → advance forward */
  const advance = useCallback(() => {
    setCenterIndex((i) => (i + 1) % total);
  }, [total]);

  /** Left card clicked → retreat backward */
  const retreat = useCallback(() => {
    setCenterIndex((i) => (i - 1 + total) % total);
  }, [total]);

  /** Jump directly to a given index */
  const goToIndex = useCallback(
    (index: number) => {
      setCenterIndex(((index % total) + total) % total);
    },
    [total]
  );

  const goTo = useCallback(
    (direction: Direction) => {
      if (direction === "right") advance();
      else retreat();
    },
    [advance, retreat]
  );

  return {
    centerIndex,
    previousIndex,
    nextIndex,
    visible,
    advance,
    retreat,
    goTo,
    goToIndex,
  };
}
"use client";

import { useCallback, useEffect, useState } from "react";

/** A list of ids kept in this browser (favourites, pantry). Safe if storage is blocked. */
export function useStoredList(key: string) {
  const [items, setItems] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const value: unknown = JSON.parse(raw);
        if (Array.isArray(value)) setItems(value.filter((x): x is string => typeof x === "string"));
      }
    } catch {
      /* storage blocked or corrupted: start empty */
    }
    setReady(true);
  }, [key]);

  const save = useCallback(
    (next: string[]) => {
      setItems(next);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* ignore */
      }
    },
    [key],
  );

  const toggle = useCallback(
    (id: string) => save(items.includes(id) ? items.filter((i) => i !== id) : [...items, id]),
    [items, save],
  );

  return { items, ready, toggle, save };
}

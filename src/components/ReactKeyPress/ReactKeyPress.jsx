import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import KeyPressProvider from "./KeyPressProvider";

export default function ReactKeyPress({ children }) {
  const [childrenItems, setChildrenItems] = useState([]);

  const keypressListener = useRef(new window.keypress.Listener());

  const registerChildren = useCallback(
    ({ id, name, keyCombo, onKeyEventRef }) => {
      const itemObj = { id, name, keyCombo, onKeyEventRef };
      setChildrenItems((prev) => [...prev, itemObj]);
    },
    []
  );

  const unregisterChildren = useCallback((itemId) => {
    setChildrenItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  useEffect(() => {
    const listener = keypressListener.current;
    // As different children can have different key sets
    // so mapping over all and attaching listener independently
    const combos = childrenItems.map((item) => {
      const { keyCombo, onKeyEventRef } = item;
      return listener.simple_combo(keyCombo, () => {
        const onKeyEvent = onKeyEventRef.current;
        onKeyEvent();
      });
    });

    return () => {
      if (!listener) return;
      // unregister all on cleanup
      listener.unregister_many(combos);
    };
  }, [childrenItems]);

  const contextValue = useMemo(
    () => ({
      // expose only required props of each item for HelpContainer
      keyPressItems: childrenItems.map(({ id, name, keyCombo }) => ({
        id,
        name,
        keyCombo,
      })),
      registerChildren,
      unregisterChildren,
    }),
    [childrenItems, registerChildren, unregisterChildren]
  );

  return <KeyPressProvider value={contextValue}>{children}</KeyPressProvider>;
}

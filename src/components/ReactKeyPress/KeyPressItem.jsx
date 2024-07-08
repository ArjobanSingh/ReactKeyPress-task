import { useEffect, useId } from "react";
import { useLatestValue } from "../../hooks/useLatestValue";
import { useKeyPressValue } from "./KeyPressProvider";

export default function KeyPressItem({ children, name, keyCombo, onKeyEvent }) {
  const itemId = useId();

  // This returns a stable ref object, with current being latest fn reference
  const onKeyEventRef = useLatestValue(onKeyEvent);
  const { registerChildren, unregisterChildren } = useKeyPressValue();

  // only on mount, unmount
  useEffect(() => {
    const propsObj = {
      id: itemId,
      name,
      keyCombo,
      onKeyEventRef,
    };
    registerChildren(propsObj);

    return () => {
      unregisterChildren(itemId);
    };
  }, [
    itemId,
    keyCombo,
    name,
    onKeyEventRef,
    registerChildren,
    unregisterChildren,
  ]);

  return children;
}

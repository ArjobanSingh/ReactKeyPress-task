import { useEffect, useId, forwardRef, useImperativeHandle } from "react";
import { useLatestValue } from "../../hooks/useLatestValue";
import { useKeyPressValue } from "./KeyPressProvider";

const KeyPressItem = forwardRef(function KeyPressItem(
  { children, name, keyCombo, onKeyEvent },
  ref
) {
  const itemId = useId();

  // This returns a stable ref object, with current being latest fn reference
  const onKeyEventRef = useLatestValue(onKeyEvent);
  const { registerChildren, unregisterChildren } = useKeyPressValue();

  // in case the callee wants to unregister event programmatically
  useImperativeHandle(ref, () => ({
    unregisterEvent: () => unregisterChildren(itemId),
  }));

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
    keyCombo,
    name,
    // following won't change in lifecycle of item, adding for best practices
    itemId,
    onKeyEventRef,
    registerChildren,
    unregisterChildren,
  ]);

  return children;
});

export default KeyPressItem;

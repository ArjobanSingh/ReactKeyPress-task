import { useKeyPressValue } from "./ReactKeyPress/KeyPressProvider";

export default function HelpContainer() {
  const { keyPressItems } = useKeyPressValue();

  return (
    <div className="help-container">
      {keyPressItems.map(({ id, name, keyCombo }) => (
        <div
          key={id}
        >{`Click ${name} or Press ${keyCombo} to toggle ${name}`}</div>
      ))}
    </div>
  );
}

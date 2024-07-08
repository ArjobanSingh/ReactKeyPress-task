import { useState } from "react";
import ReactKeyPress from "./components/ReactKeyPress";
import HelpContainer from "./components/HelpContainer";

const toggledStyle = {
  color: "#000",
  backgroundColor: "#caca93",
};

function Box({ name, keyCombo }) {
  const [isToggled, setIsToggled] = useState(false);

  const onToggle = () => setIsToggled((prev) => !prev);
  return (
    <ReactKeyPress.Item name={name} keyCombo={keyCombo} onKeyEvent={onToggle}>
      <div
        className="box"
        style={isToggled ? toggledStyle : undefined}
        onClick={onToggle}
      >
        {name}
      </div>
    </ReactKeyPress.Item>
  );
}

const D_ID = 4;
const boxes = [
  { id: 1, name: "A", keyCombo: "shift s" },
  { id: 2, name: "B", keyCombo: "shift s" },
  { id: 3, name: "C", keyCombo: "shift s" },
  { id: D_ID, name: "D", keyCombo: "shift s" },
];

function App() {
  const [hiddenBoxes, setHiddenBoxes] = useState(new Set());

  const toggleD = () => {
    setHiddenBoxes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(D_ID)) newSet.delete(D_ID);
      else newSet.add(D_ID);
      return newSet;
    });
  };

  return (
    <ReactKeyPress>
      <div className="box-container">
        {boxes.map((box) =>
          hiddenBoxes.has(box.id) ? null : (
            <Box key={box.id} name={box.name} keyCombo={box.keyCombo} />
          )
        )}
      </div>

      <button className="button" onClick={toggleD}>
        {hiddenBoxes.has(D_ID) ? "Mount D" : "Umount D"}
      </button>
      <HelpContainer />
    </ReactKeyPress>
  );
}

export default App;

import { useContext } from "react";
import { createContext } from "react";

const KeyPressContext = createContext({});

export default function KeyPressProvider({ children, value }) {
  return (
    <KeyPressContext.Provider value={value}>
      {children}
    </KeyPressContext.Provider>
  );
}

export const useKeyPressValue = () => {
  const value = useContext(KeyPressContext);
  if (!value) {
    throw new Error("Please wrap with KeyPressProvider");
  }
  return value;
};

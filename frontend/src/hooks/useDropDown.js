import { useContext } from "react";
import DropDownContext from "../context/DropDrownContext";

const useDropDown = () => {
  const context = useContext(DropDownContext);
  if (!context) {
    throw new Error("DropDown context is not in scope!");
  }
  return context;
};

export default useDropDown;

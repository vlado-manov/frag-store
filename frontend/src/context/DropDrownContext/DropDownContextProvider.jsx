import { useState } from "react";

import DropDownContext from ".";

const DropDownContextProvider = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <DropDownContext.Provider value={[isDropdownOpen, setIsDropdownOpen]}>
      {children}
    </DropDownContext.Provider>
  );
};

export default DropDownContextProvider;

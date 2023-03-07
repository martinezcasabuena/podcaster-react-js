import React, { useContext } from "react";
import { AppContext } from "../App";

const Header = () => {
  const { loading } = useContext(AppContext);
  return (
    <div>
      <h2 className="header-container">Podcaster</h2>
      {loading && <span>Loading...</span>}
    </div>
  );
};

export default Header;

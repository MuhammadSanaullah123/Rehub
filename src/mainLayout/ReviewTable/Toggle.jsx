import React, { useState } from "react";

//mui

import Switch from "@mui/material/Switch";

function Toggle({
  name, indexSwitch, indextest, row, check, handleChangeCheck,
}) {
  // const [check, setCheck] = useState(false);

  // const handleChangeCheck = () => {
  //   setCheck(!check);
  // };

  return (
    <Switch name={name} id={name} checked={check} onClick={handleChangeCheck} />
  );
}

export default Toggle;

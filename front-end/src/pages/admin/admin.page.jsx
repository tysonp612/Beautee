import React from "react";
//grid
import { GridComponent } from "./../../components/grid/grid.component";
export const AdminPage = () => {
  const openHour = 10;
  const closeHour = 19;
  return (
    <div>
      HELLO FROM ADMIN
      {/* GRID */}
      <GridComponent openHour={openHour} closeHour={closeHour} />
    </div>
  );
};

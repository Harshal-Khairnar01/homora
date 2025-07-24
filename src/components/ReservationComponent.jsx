"use client";

import React, { useState } from "react";
import CalenderInput from "./CalenderInput";

const ReservationComponent = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  return (
    <div>
      <CalenderInput
        value={dateRange}
        onChange={(value) => setDateRange(value.selection)}
      />
    </div>
  );
};

export default ReservationComponent;

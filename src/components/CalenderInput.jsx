"use client";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import React from "react";

import { DateRange } from "react-date-range";

const CalenderInput = ({ value, onChange,disabledDates, ...props }) => {
  return (
    <div>
      <DateRange
        ranges={[value]}
        minDate={new Date()}
        onChange={onChange}
        disabledDates={disabledDates}
        {...props}
      />
    </div>
  );
};

export default CalenderInput;

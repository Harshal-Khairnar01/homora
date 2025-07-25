import { CircleMinus, CirclePlus } from "lucide-react";
import React, { useCallback } from "react";

const CounterInput = ({ value, onChange }) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value == 1) return;
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className=" w-fit bg-gray-200 p-4 flex flex-col items-center gap-2 rounded-lg border-2 border-gray-500/10">
      <div className=" cursor-pointer" onClick={onAdd}>
        <CirclePlus />
      </div>
      <div>{value || 0}</div>
      <div className=" cursor-pointer" onClick={onReduce}>
        <CircleMinus />
      </div>
    </div>
  );
};

export default CounterInput;

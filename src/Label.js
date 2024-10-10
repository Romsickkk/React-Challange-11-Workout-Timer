import { memo } from "react";

function Label({ labelName, type, min = 0, max = 1, value = 1, onChange }) {
  return (
    <div>
      <label>{labelName}</label>
      <input
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
      <span>{value}</span>
    </div>
  );
}

export default memo(Label);

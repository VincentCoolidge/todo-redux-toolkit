import React, { useState } from "react";
import { useAppDispatch } from "hooks/redux";
import { todosSlice } from "store/reducers/TodosSlice";

const InputForm: React.FC = () => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const { addTodo } = todosSlice.actions;

  const handleAddItem = () => {
    if (value.trim() !== "") {
      dispatch(addTodo(value.trim()));
      setValue("");
    }
  };

  return (
    <div className="input-form">
      <input
        className="input-form__field"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What needs to be done?"
        type="text"
      />
      <button className="input-form__button-add" onClick={handleAddItem}>
        Add Item
      </button>
    </div>
  );
};

export default InputForm;

import React, { useEffect, useState } from "react";
import { useAppDispatch } from "hooks/redux";
import { todosSlice } from "store/reducers/TodosSlice";

enum filterItems {
  ALL = "All",
  ACTIVE = "Active",
  COMPLETED = "Completed",
}

const Filter: React.FC<{ todosLn: number }> = ({ todosLn }) => {
  const [filter, setFilter] = useState<filterItems>(filterItems.ALL);
  const [numberEl, setNumberEl] = useState(todosLn);
  const dispatch = useAppDispatch();
  const { showAllItems, showAllCompleted, showAllNotCompleted } =
    todosSlice.actions;

  useEffect(() => {
    if (filterItems.ALL === filter) {
      setNumberEl(todosLn);
    }
  }, [filter, todosLn]);

  const handleAllItems = () => {
    dispatch(showAllItems());
    setFilter(filterItems.ALL);
  };

  const handleAllCompleted = () => {
    dispatch(showAllCompleted());
    setFilter(filterItems.ACTIVE);
  };

  const handleAllNotCompleted = () => {
    dispatch(showAllNotCompleted());
    setFilter(filterItems.COMPLETED);
  };

  return (
    <div style={{ margin: "20px" }}>
      <span>{`${numberEl} item left`}</span>
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <button
          style={{
            backgroundColor: filter === filterItems.ALL ? "red" : "blue",
          }}
          onClick={handleAllItems}
        >
          All
        </button>
        <button
          style={{
            backgroundColor: filter === filterItems.COMPLETED ? "red" : "blue",
          }}
          onClick={handleAllNotCompleted}
        >
          Active
        </button>
        <button
          style={{
            backgroundColor: filter === filterItems.ACTIVE ? "red" : "blue",
          }}
          onClick={handleAllCompleted}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default Filter;

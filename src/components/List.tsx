import React from "react";
import { useAppSelector } from "hooks/redux";
import InputForm from "./InputForm";
import Item from "./Item";
import Filter from "./Filter";
import { useDrop } from "react-dnd";
import { useAppDispatch } from "hooks/redux";
import { todosSlice } from "store/reducers/TodosSlice";

const List: React.FC = () => {
  const { todos } = useAppSelector((state) => state.todosReducer);
  const dispatch = useAppDispatch();
  const { updateListOrder } = todosSlice.actions;

  const [, drop] = useDrop({
    accept: "TODO_ITEM",
    hover(item: { id: number; index: number }) {
      const dragIndex = item.index;
      const hoverIndex = todos.findIndex((todo) => todo.id === item.id);

      if (dragIndex === hoverIndex) {
        return;
      }

      dispatch(updateListOrder({ dragIndex, hoverIndex }));
    },
  });

  return (
    <div className="container">
      <h1>todos</h1>
      <InputForm />
      <ul
        style={{ display: `${todos.length ? "block" : "none"}` }}
        ref={drop}
        className="container__list"
      >
        {todos.map((item, i) => (
          <div key={item.id} className="container__list-item" style={{}}>
            <Item todo={item} index={i} />
          </div>
        ))}
      </ul>
      <Filter todosLn={todos.length} />
    </div>
  );
};

export default List;

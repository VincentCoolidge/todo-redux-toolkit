import React, { useState, useRef } from "react";
import { ITodo } from "types/types";
import { useAppDispatch } from "hooks/redux";
import { todosSlice } from "store/reducers/TodosSlice";
import useOnClickOutside from "hooks/useClickOutside";
import { useDrag, useDrop } from "react-dnd";

interface IItem {
  todo: ITodo;
  index: number;
}

interface IDragItem {
  id: number;
  index: number;
}

const Item: React.FC<IItem> = ({ todo, index }) => {
  const [editText, setEditText] = useState(todo.text);
  const [editState, setEditState] = useState(false);
  const elementRef = useRef(null);

  const dispatch = useAppDispatch();
  const { removeTodo, editTodo, toggleTodo, updateListOrder } =
    todosSlice.actions;

  const [, drag] = useDrag({
    type: "TODO_ITEM",
    item: { type: "TODO_ITEM", id: todo.id, index },
  });

  const [, drop] = useDrop({
    accept: "TODO_ITEM",
    hover(item: IDragItem) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      dispatch(updateListOrder({ dragIndex, hoverIndex }));

      item.index = hoverIndex;
    },
  });

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditState(false);
  };

  const handleSave = () => {
    dispatch(editTodo({ id: todo.id, updatedText: editText }));
    setEditState(false);
  };

  const handleDoubleClick = () => {
    setEditState(true);
  };

  const handleRemove = () => dispatch(removeTodo(todo.id));

  const handleClickOutside = () => {
    if (editState) {
      dispatch(editTodo({ id: todo.id, updatedText: editText }));
      setEditState(false);
    }
  };

  useOnClickOutside(elementRef, handleClickOutside);

  return (
    <li ref={(node) => drag(drop(node))} className="list-item">
      <input
        className="list-item__checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
      />
      {editState ? (
        <>
          <input
            className="list-item__input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <div className="list-item__button-block">
            <button
              className="list-item__button-block_cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="list-item__button-block_save"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <span
            className="list-item__text"
            style={{ userSelect: "none", paddingLeft: 5, paddingRight: 5 }}
            onDoubleClick={handleDoubleClick}
            ref={elementRef}
          >
            {todo.text}
          </span>
          <button className="list-item__remove" onClick={handleRemove}>
            Delete
          </button>
        </>
      )}
    </li>
  );
};

export default Item;

import React from "react";
import PropTypes from "prop-types";
import { Calendar } from "antd";
import dayjs from "dayjs";

import "./TodosCalendar.css";

const TodosCalendar = ({ todos }) => {
  const getCellRender = (date) => {
    const dateString = dayjs(date).toDate().toDateString();

    const dateTodos = todos.filter(
      (todo) =>
        dayjs(todo.deadline).toDate().toDateString() === dateString &&
        todo.status !== "Completed"
    );

    if (dateTodos.length > 0) {
      return (
        <div className="has-tasks">
          {dateTodos.map((todo) => (
            <div key={todo.id} className="task">
              <div>{todo.title}</div>
              <div>{todo.description}</div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="custom-calendar-container">
      <Calendar className="custom-calendar" cellRender={getCellRender} />
    </div>
  );
};

TodosCalendar.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default TodosCalendar;

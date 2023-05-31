import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  CloseOutlined,
  EditOutlined,
  ClockCircleOutlined,
  CheckOutlined,
  FlagOutlined,
} from "@ant-design/icons";

const TodosList = ({
  handleDelete,
  handleEdit,
  handleComplete,
  sortedTodos,
}) => {
  const { t } = useTranslation();
  return (
    <ul>
      {sortedTodos.map((todo) => (
        <li
          className={todo.status === "Completed" ? "completed" : ""}
          key={todo.id}
        >
          <div className="todo-title">{todo.title}</div>
          <div className="todo-description">{todo.description}</div>
          <div className="todo-dates">
            <div className="todo-deadline">
              <ClockCircleOutlined className="clock-circle" />
              {todo.deadline}
            </div>
            {todo.updatedAt && (
              <div className="todo-updated-at">
                {t("updated.at")} {todo.updatedAt}
              </div>
            )}
            {todo.priority !== 0 ? (
              <div className="todo-priority">
                <FlagOutlined className="flag-outlined" />
                {todo.priority}
              </div>
            ) : null}
          </div>
          <button
            onClick={() => handleDelete(todo.id)}
            className="button-delete"
          >
            <CloseOutlined />
          </button>
          <button onClick={() => handleEdit(todo.id)} className="button-edit">
            <EditOutlined />
          </button>
          {todo.status !== "Completed" && (
            <button
              onClick={() => handleComplete(todo.id)}
              className="button-complete"
            >
              <CheckOutlined />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

TodosList.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleComplete: PropTypes.func.isRequired,
  sortedTodos: PropTypes.array.isRequired,
};

export default TodosList;

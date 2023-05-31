import React, { useState } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

import "./TodoForm.css";

const { Option } = Select;

const TodoForm = ({ onSubmit, selectedTodoData }) => {
  const [title, setTitle] = useState(
    selectedTodoData ? selectedTodoData.title : ""
  );
  const [description, setDescription] = useState(
    selectedTodoData ? selectedTodoData.description : ""
  );
  const [deadline, setDeadline] = useState(
    selectedTodoData ? selectedTodoData.deadline : ""
  );
  const [priority, setPriority] = useState(
    selectedTodoData ? selectedTodoData.priority : null
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (description.trim() === "" || deadline.trim() === "") {
      return;
    }

    onSubmit({ title, description, deadline, priority });
    setTitle("");
    setDescription("");
    setDeadline("");
    setPriority(null);
  };

  const { t } = useTranslation();

  const priorityOptions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="header-form">{t("form.header")}</h2>
      <input
        className="input-task"
        label="Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t("label.title")}
      />
      <input
        className="input-task"
        label="Description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={t("label.description")}
      />
      <input
        className="input-date"
        label="Deadline"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <Select
        className="input-priority"
        value={priority}
        onChange={(value) => setPriority(value)}
        placeholder={t("select.priority")}
      >
        {priorityOptions.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
      <button onClick={handleSubmit} className="button-secondary">
        {t("add.button")}
      </button>
    </form>
  );
};

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  selectedTodoData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    priority: PropTypes.number,
  }),
};

export default TodoForm;

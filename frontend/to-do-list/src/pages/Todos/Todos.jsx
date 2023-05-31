import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Spin } from "antd";
import { Select } from "antd";

import Layout from "../../components/Layout/Layout";
import TodoForm from "../../components/TodoForm/TodoForm";
import TodosList from "../../components/TodosList/TodosList";
import TaskCalendar from "../../components/TodosCalendar/TodosCalendar";

import "./Todos.css";
import { useState } from "react";
import Header from "../../components/Header/Header";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import {
  CloseOutlined,
  LoadingOutlined,
  ControlOutlined,
} from "@ant-design/icons";
import {
  useCompleteTodoMutation,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../../api/TodoApi";

const Todos = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [createTodo] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [completeTodo] = useCompleteTodoMutation();
  const { Option } = Select;
  const {
    data: todos = [],
    refetch,
    isLoading: todosLoading,
  } = useGetTodosQuery();
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [activeTab, setActiveTab] = useState("todos");
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("priority");

  useEffect(() => {
    refetch();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleShowModal = () => {
    setShowModal(true);
    document.documentElement.classList.add("modal-open");
  };

  const handleComplete = (todoId) => {
    completeTodo(todoId)
      .unwrap()
      .then(() => {});
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTodo(null);
  };

  const handleEdit = (todoId) => {
    setSelectedTodo(todoId);
    handleShowModal();
  };

  const handleCreateTodoSubmit = (todo) => {
    createTodo(todo)
      .unwrap()
      .then(() => {
        handleCloseModal();
      });
  };

  const handleUpdateTodoSubmit = (todo) => {
    updateTodo({ todoId: selectedTodo, body: todo })
      .unwrap()
      .then(() => {
        handleCloseModal();
        setSelectedTodo(null);
      });
  };

  const handleDelete = (taskId) => {
    deleteTodo(taskId)
      .unwrap()
      .then(() => {});
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const sortTodos = (todos) => {
    if (sortBy === "priority") {
      return todos.sort((a, b) => {
        if (a.priority === 0 && b.priority === 0) {
          return new Date(a.createdAt) - new Date(b.createdAt);
        } else if (a.priority === 0) {
          return 1;
        } else if (b.priority === 0) {
          return -1;
        } else {
          return a.priority - b.priority;
        }
      });
    } else if (sortBy === "creation") {
      return todos.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else {
      return todos;
    }
  };

  const sortedTodos = sortTodos(filteredTodos);

  const modalRoot = document.getElementById("modal-root");

  return (
    <Layout>
      <>
        <Header />
        <div className="tab-container">
          <button
            className={`tab-button ${
              activeTab === "todos" ? "active" : "inactive"
            }`}
            onClick={() => handleTabChange("todos")}
          >
            {t("tasks.tab")}
          </button>
          <button
            className={`tab-button ${
              activeTab === "calendar" ? "active" : "inactive"
            }`}
            onClick={() => handleTabChange("calendar")}
          >
            {t("calendar.tab")}
          </button>
        </div>
        <div className="search-container">
          <input
            className="input-search"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder={t("search.input")}
          />
        </div>
        <div className="sort-container">
          <ControlOutlined className="control-outlined" />
          <Select
            className="custom-select"
            defaultValue="priority"
            onChange={handleSortChange}
          >
            <Option value="priority">{t("sort.priority")}</Option>
            <Option value="creation">{t("sort.creation")}</Option>
          </Select>
        </div>
        {activeTab === "todos" ? (
          <>
            <button className="todo-button" onClick={handleShowModal}></button>
            {!todosLoading ? (
              filteredTodos.length > 0 ? (
                <TodosList
                  todos={filteredTodos}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  handleComplete={handleComplete}
                  sortedTodos={sortedTodos}
                />
              ) : (
                <p className="no-tasks">{t("no.tasks")}</p>
              )
            ) : (
              <Spin
                className="spin"
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 50, color: "#7e64ff" }}
                    spin
                  />
                }
              />
            )}
          </>
        ) : (
          <div className="calendar-container">
            <TaskCalendar todos={todos} />
          </div>
        )}
        {showModal &&
          createPortal(
            <div className="modal-background" onClick={handleCloseModal} />,
            modalRoot
          )}
        {showModal &&
          createPortal(
            <div className="modal">
              <Modal
                show={showModal}
                onHide={handleCloseModal}
                className="modal-content"
              >
                <Modal.Body className="modal-body">
                  <TodoForm
                    onSubmit={
                      selectedTodo
                        ? handleUpdateTodoSubmit
                        : handleCreateTodoSubmit
                    }
                    selectedTodoData={
                      selectedTodo
                        ? todos.find((todo) => todo.id === selectedTodo)
                        : null
                    }
                  />
                  <button onClick={handleCloseModal} className="button-delete">
                    <CloseOutlined />
                  </button>
                </Modal.Body>
              </Modal>
            </div>,
            modalRoot
          )}
      </>
    </Layout>
  );
};

export default Todos;

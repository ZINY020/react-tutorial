import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";

export default function Edit({ todos, setTodos }) {
  const navigate = useNavigate();
  const [editedTodo, setEditedTodo] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editedTodo.id && editedTodo.title && editedTodo.content) {
      // Find the index of the todo to be updated
      const index = todos.findIndex((todo) => todo.id === editedTodo.id);
      if (index !== -1) {
        // Create a copy of the todos array and update the specific todo
        const updatedTodos = [...todos];
        updatedTodos[index] = editedTodo;
        setTodos(updatedTodos);
        navigate("/"); // Navigate back to the main page after editing
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        <form
          style={{
            height: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          onSubmit={handleSubmit}
        >
          <div>
            <input
              name="title"
              placeholder="제목"
              value={editedTodo.title || ""}
              onChange={handleInputChange}
              style={{
                width: "100%",
                height: "60px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ height: "400px" }}>
            <textarea
              name="content"
              placeholder="내용"
              value={editedTodo.content || ""}
              onChange={handleInputChange}
              style={{
                resize: "none",
                height: "100%",
                width: "100%",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "12px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "orange",
              cursor: "pointer",
            }}
          >
            수정하기
          </button>
        </form>
      </Container>
    </>
  );
}

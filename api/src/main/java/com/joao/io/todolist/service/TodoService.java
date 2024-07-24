package com.joao.io.todolist.service;

import com.joao.io.todolist.dto.req.ChangeTodoStateReqDTO;
import com.joao.io.todolist.dto.req.CreateTodoReqDTO;
import com.joao.io.todolist.dto.res.TodoResDTO;

import java.util.List;
import java.util.Optional;

public interface TodoService  {
    
    TodoResDTO createTodo(CreateTodoReqDTO dto);

    List<TodoResDTO> getAllTodos(Optional<String> category);

    void deleteTodo(Integer id);

    void changeTodoState(Integer id, ChangeTodoStateReqDTO dto);
}

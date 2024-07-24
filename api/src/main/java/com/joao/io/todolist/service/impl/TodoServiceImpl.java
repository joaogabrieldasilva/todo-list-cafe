package com.joao.io.todolist.service.impl;

import com.joao.io.todolist.dto.req.ChangeTodoStateReqDTO;
import jakarta.annotation.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joao.io.todolist.dto.req.CreateTodoReqDTO;
import com.joao.io.todolist.dto.res.TodoResDTO;
import com.joao.io.todolist.model.Todo;
import com.joao.io.todolist.repository.TodoRepository;
import com.joao.io.todolist.service.TodoService;

import java.util.List;
import java.util.Optional;

@Service
public class TodoServiceImpl implements TodoService {

    @Autowired
    private TodoRepository todoRepository;

    @Override
    public TodoResDTO createTodo(CreateTodoReqDTO dto) {

        Todo todo = todoRepository.save(Todo.builder().description(dto.description()).category(dto.category()).completed(false).build());

        return new TodoResDTO(todo.getId(), todo.getDescription(), todo.getCategory(), todo.getCompleted());
    }

    @Override
    public List<TodoResDTO> getAllTodos(Optional<String> category) {

        if (category.isPresent()) {
            return todoRepository.findAllByCategory(category).stream().map(todo -> new TodoResDTO(todo.getId(), todo.getDescription(), todo.getCategory(), todo.getCompleted())).toList();
        }
        return todoRepository.findAll().stream().map(todo -> new TodoResDTO(todo.getId(), todo.getDescription(), todo.getCategory(), todo.getCompleted())).toList();

    }

    @Override
    public void deleteTodo(Integer id) {
        todoRepository.deleteById(id);
    }

    @Override
    public void changeTodoState(Integer id, ChangeTodoStateReqDTO dto) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new RuntimeException(""));

        todo.setCompleted(dto.completed());

        System.out.println(dto.completed());
        System.out.println(todo.getCompleted());


        todoRepository.save(todo);
    }
}

package com.joao.io.todolist.controller;

import com.joao.io.todolist.dto.req.ChangeTodoStateReqDTO;
import com.joao.io.todolist.dto.req.CreateTodoReqDTO;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.joao.io.todolist.dto.res.TodoResDTO;
import com.joao.io.todolist.service.TodoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/todos")
@AllArgsConstructor
public class TodoController {

    @Autowired
    private TodoService todoService;


    @PostMapping
    public ResponseEntity<TodoResDTO> createTodo(@RequestBody CreateTodoReqDTO dto) {

        TodoResDTO todo = todoService.createTodo(dto);

        return new ResponseEntity<TodoResDTO>(todo, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TodoResDTO>> getAllTodos(@RequestParam(name = "category") Optional<String> category) {

        List<TodoResDTO> todos = todoService.getAllTodos(category);

        return ResponseEntity.ok(todos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteTodo(@PathVariable("id") Integer id) {

        todoService.deleteTodo(id);

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/state")
    public ResponseEntity changeTodoState(@PathVariable("id") Integer id, ChangeTodoStateReqDTO dto) {

        todoService.changeTodoState(id, dto);

        return ResponseEntity.ok().build();
    }





}

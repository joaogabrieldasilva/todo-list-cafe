package com.joao.io.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joao.io.todolist.model.Todo;

import java.util.List;
import java.util.Optional;

public interface TodoRepository extends JpaRepository<Todo, Integer> {

    List<Todo> findAllByCategory(Optional<String> category);

}

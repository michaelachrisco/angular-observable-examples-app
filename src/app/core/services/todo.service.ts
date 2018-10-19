import { Injectable } from '@angular/core';

import {
  Observable,
  of as observableOf,
}                     from 'rxjs';
import {
  map,
  shareReplay,
}                     from 'rxjs/operators';

import { ApiService } from '../api/api.service';
import {
  mockTodoList,
  Todo,
}                     from '../models/todo';

@Injectable()
export class TodoService {
  constructor(
    private apiService: ApiService,
  ) { }

  public getTodos(): Observable<Todo[]> {
    return this.apiService.todo.getTodos().pipe(map((response: Todo[]) => response));
  }

  public getTodosCreate(): Observable<Todo[]> {
    return observableOf(mockTodoList);
  }

  public getTodoByID(id: number): Observable<Todo> {
    return this.apiService.todo.getTodoByID(id).pipe(map((response: Todo) => response));
  }

  public getTodoByIDHot(id: number): Observable<Todo> {
    return this.apiService.todo.getTodoByID(id).pipe(
      shareReplay(1),
      map((response: Todo) => response),
    );
  }

  public createTodo(payload: Todo): Observable<Todo> {
    return this.apiService.todo.createTodo(payload).pipe(map((response: Todo) => response));
  }

  public updateTodo(id: number, todo: Todo): Observable<void> {
    return this.apiService.todo.updateTodo(id, todo).pipe(map((response: never) => response));
  }

  public deleteTodo(id: number): Observable<void> {
    return this.apiService.todo.deleteTodo(id).pipe(map((response: never) => response));
  }
}

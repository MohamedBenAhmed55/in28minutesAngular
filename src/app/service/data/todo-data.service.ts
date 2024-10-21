import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../../list-todos/list-todos.component';
import { API_URL } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: HttpClient) { }

  retrieveAllTodos(username: string) {
    return this.http.get<Todo[]>(`${API_URL}/users/${username}/todos`)
  }

  deleteTodo(username: string, id: number) {
    return this.http.delete(`${API_URL}/users/${username}/todos/${id}`)

  }

  retrieveTodo(username: string, id: number) {
    return this.http.get<Todo>(`${API_URL}/users/${username}/todos/${id}`)
  }

  updateTodo(username: string, id: number, todo: Todo) {
    console.log(todo, "hehe")
    return this.http.put(`
      ${API_URL}/users/${username}/todos/${id}`
      , todo)
  }

  createTodo(username: string, todo: Todo) {
    console.log(todo, "hehe")
    return this.http.post(`
      ${API_URL}/users/${username}/todos`
      , todo)
  }
}

import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {

  id: number
  todo: any = Todo

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router) {
    this.id = 0
    this.todo = new Todo(-1, '', false, new Date());

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    if (this.id != -1) {
      this.todo = new Todo(this.id, '', false, new Date());
      this.todoService.retrieveTodo('in28Minutes', this.id).subscribe(
        data => this.todo = data
      )
    }

  }

  saveTodo() {
    if (this.id == -1) {
      this.todoService.createTodo('in28Minutes', this.todo)
        .subscribe(
          data => {
            console.log(data)
            this.router.navigate(['todos'])
          },
          error => {
            console.log(error)
          }
        )
    } else {
      this.todoService.updateTodo('in28Minutes', this.id, this.todo)
        .subscribe(
          data => {
            console.log(data)
            this.router.navigate(['todos'])
          }
        )
    }
  }
}

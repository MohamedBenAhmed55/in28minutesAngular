import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

export class Todo {

  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date) {

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrl: './list-todos.component.css'
})
export class ListTodosComponent implements OnInit {



  todos : Todo[] | undefined

  message : string | undefined
  // = [
  //   new Todo(1, 'Learn to Dance', false, new Date()),
  //   new Todo(2, 'Finish reading "The Great Gatsby"', false, new Date()),
  //   new Todo(3, 'Learn to play the guitar', false, new Date()),
  //   new Todo(4, 'Start a new hobby', false, new Date()),
  //   new Todo(5, 'Organize my closet', false, new Date()),
  //   new Todo(6, 'Learn a new language', false, new Date()),
  //   new Todo(7, 'Go on a hike', false, new Date()),
  //   new Todo(8, 'Try a new recipe', false, new Date()),
  //   new Todo(9, 'Visit a museum', false, new Date()),
  //   new Todo(10, 'Spend more time with family and friends', false, new Date())
  // ];


  constructor(private todoService :TodoDataService, private router : Router) {

  }

  ngOnInit() {
    this.refreshTodos()
  }

  refreshTodos(){
    this.todoService.retrieveAllTodos('in28Minutes').subscribe(
      response =>{
        console.log(response)
        this.todos = response
      },
      error => {
        console.error('Error retrieving todos', error);
      }
    )
  }

  deleteTodo(id : number) {
    console.log("delete todo", id)
    this.todoService.deleteTodo('in28minutes', id).subscribe(
      response => {
        console.log(response)
        this.message = `Todo ${id} has been successfully deleted`
        this.refreshTodos()
      }
    )
  }

  updateTodo(id : number){
    console.log("update ", id)
    this.router.navigate(['todos',id])
  }

  addTodo(){
    this.router.navigate(['todos',-1])
  }

}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  //set dynamic classes, is-completd is in quotes because of the dash
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }
    return classes;
  }
  //onToggle
  onToggle(todo: any) {
    //toggle in UI
    todo.completed = !todo.completed;
    //toggle in server
    this.todoService.toggleCompleted(todo).subscribe((todo: any) =>
      console.log(todo));
  }
  onDelete(todo: any) {
    this.deleteTodo.emit(todo);
  }
}

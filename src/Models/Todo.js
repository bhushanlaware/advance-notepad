export class TodoCard {
  constructor(title='',todos=[],completed=[]) {
    this.title = title;
    this.cardId = Date.now();
    this.todos=todos;
    this.completed=completed;
  }
}
export class Todo{
  constructor(text){
    this.text=text;
    this.todoId= Date.now();
  }
}
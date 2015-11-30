Todos = new Mongo.Collection('todos');

if (Meteor.isClient) {
  // code to run on client
  Template.todos.helpers({
      'todo': function(){
          return Todos.find({}, {sort: {createdAt: -1}});
      }
  });

  Template.addTodo.events({
      /// events go here
      'submit form': function(event){
          event.preventDefault();
          var todoName = $('[name="todoName"]').val();
          Todos.insert({
              name: todoName,
              completed: false,
              createdAt: new Date()
          });
          $('[name="todoName"]').val('');
      }
  });

  Template.todoItem.events({
      // events go here
      'click .delete-todo': function(event){
          event.preventDefault();
          var documentId = this._id;
          var confirm = window.confirm("Delete this task?");
          if(confirm){
              Todos.remove({ _id: documentId });
          }
      },
      'keyup [name=todoItem]': function(event){
          var documentId = this._id;
          var todoItem = $(event.target).val();
          Todos.update({ _id: documentId }, {$set: { name: todoItem }});
          console.log("Task changed to: " + todoItem);
      }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

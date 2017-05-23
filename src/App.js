import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// this is to import specific feature from a npm
// var express = require('express');


class TodoApp extends Component{
  constructor(props){
    super(props);
    this.state= {
      todos : [],
      text: ''
      // color: false
      //completed is only for 1 todo
      // completed: false
    }
  }


  componentDidMount() {
    axios.get('http://localhost:4000/todos')
      .then(res => {
        console.log(res.data.items)
        this.setState({
          //res.data = the object
          todos: res.data.items
        })
      })
    }

      //make another axios to delete



  //onclick -> delete both front and end
  //axios.post(/remove) to ... + todo.id
  //codeheaven.io
  //same thing with get, but do create/ get first



  handleChange(event){
    // alert('handleChange');
    // console.log(this);
    this.setState({
        text: event.target.value
      })
    }

  handleSubmit(event){
      event.preventDefault();
    this.setState({
      //todo is an object
      todos: [... this.state.todos, {text: this.state.text, completed: false}]
    })
  }
//need to get event
  toggle(todo){
    // alert('hey');
    console.log(todo);
    // console.log(todo)
    let idx = 0;
    this.state.todos.forEach((item,i) => {
      //_id to be in sinc with the backend
      if(item._id === todo._id) {
        idx = i;
      }
    })
    todo.completed = !todo.completed;
    //this below
    this.setState({
      //everything that comes before, to the todo item, and everything after it is included
      //todo is an object, so no need to include   todo.completed = !todo.completed here
      todos: [...this.state.todos.slice(0,idx), todo, ...this.state.todos.slice(idx + 1)]
    })
  }

  deleteToggle(todo){

    axios.post('http://localhost:4000/remove/' + todo._id)
      .then(res => {
        this.setState({
        //return everythin that doesnt have the _id
          todos: this.state.todos.filter(item => item._id !== todo._id)
        })
      })
  }

  render(){
    // console.log('yo')
    console.log(this.state.text)
    return(
      <div>
        <InputTodo handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)}/>
        <TodoList todos={this.state.todos} color={this.state.color} toggle={this.toggle.bind(this)} deleteToggle={this.deleteToggle.bind(this)}/>
      </div>
    )
  }
}
class InputTodo extends Component {
  constructor(props){
    super(props);
  };
  render() {
    return (
      <div>
        <h1> Welcome to your Todo app </h1>
        <form onSubmit={this.props.handleSubmit}>
          <label>
          <input type="text" name="text" placeholder="Clean the house" onChange={this.props.handleChange}/>
          </label>
          <input type="submit" value="Submit" ></input>
        </form>
      </div>
    );
  }
}
class TodoList extends Component{
  constructor(props) {
    super(props)
  }

//react checks for key as soon as we map data
  render(){
    return(
      <ul>
        {this.props.todos.map((todo)=> <TodoItem key={todo._id} text={todo.text} completed={todo.completed}
        toggle={this.props.toggle}
        todo={todo}
        deleteToggle={this.props.deleteToggle}
        />)}
      </ul>
    )
  }
}
class TodoItem extends Component{
  constructor(props){
    super(props);
  };
// props state
// props isnt changed
// method

// why no ul here?

// pass the whole object todo there
  render(){
    return(

        <li style={{color: this.props.completed ? "red" : "green"}}   onClick={() => this.props.toggle(this.props.todo)} onDoubleClick={()=> this.props.deleteToggle(this.props.todo)}>{this.props.text}</li>

    );
  }
}
ReactDOM.render(<TodoApp />, document.getElementById('root'));

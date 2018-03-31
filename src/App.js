import React, { Component } from 'react';
import $ from 'jquery';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
import Todos from './Components/Todos';
import './App.css';
import * as firebase from "firebase";

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCXdLc6FtkesCO1LV570paOYlVCtXXp258",
    authDomain: "project-organizer-infinite.firebaseapp.com",
    databaseURL: "https://project-organizer-infinite.firebaseio.com",
    projectId: "project-organizer-infinite",
    storageBucket: "project-organizer-infinite.appspot.com",
    messagingSenderId: "730458003442"
};
firebase.initializeApp(config);
// The root reference
let firebaseRef = firebase.database().ref();

class App extends Component {
  constructor(){
    super();
    this.state = {
      projects: [],
      todos:[]
    }
  }

  getTodos(){
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({todos: data}, function(){
          console.log(this.state);
        });
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
      }
    });
  }

  getProjects(){
    this.setState({projects: []});
  }

  componentWillMount() {
      this.getProjects();
      this.getTodos();
      let projectRef = firebaseRef.child("project");
      let projects = [];
      projectRef.on("child_added", snapshot => {
          //console.log(snapshot.val());
          let project = {
              id: snapshot.val().id,
              title: snapshot.val().title,
              category: snapshot.val().category
          };
          projects.push(project);
          this.setState({projects: projects});
      })
  }

  componentDidMount(){
    this.getTodos();
  }

  handleAddProject(project){
    let projectRef = firebaseRef.child("project");
    projectRef.push(project)
        .catch(error => {
            console.log(error.message);
        });
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects:projects});
  }

  handleDeleteProject(id){
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    let projectRef = firebaseRef.child("project");
    projectRef.on("child_added", snapshot => {
      if (snapshot.val().id == id) {
        snapshot.ref.remove();
      }
    })
    projects.splice(index, 1);
    this.setState({projects:projects});
  }

  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)} />
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
        <hr />
        <Todos todos={this.state.todos} />
      </div>
    );
  }
}

export default App;

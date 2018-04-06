import React, { Component } from 'react';
import uuid from 'uuid';
import { DropdownButton } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import { FormControl } from "react-bootstrap";
import { Button } from 'react-bootstrap';


class AddProject extends Component {
  constructor(){
    super();
    this.state = {
      newProject:{}
    }
  }

  static defaultProps = {
    categories: ['Web Design', 'Web Development', 'Mobile Development', 'Maintenance']
  }

  handleSubmit(e){
    if(this.refs.title.value === ''){ alert('Title is required'); return; } 
    if(this.refs.progress.value === ''){ alert('Progress is required'); return; } 
    if(isNaN(this.refs.progress.value)){ alert('Progress is required'); return; }
    if(this.refs.progress.value > 100 || this.refs.progress.value < 0 ){ alert('Progress is required'); return; }
    
    

      this.setState({newProject:{
        id: uuid.v4(),
        title: this.refs.title.value,
        category: this.refs.category.value,
        notes: this.refs.notes.value,
        progress: this.refs.progress.value
      }}, function(){
        //console.log(this.state);
        this.props.addProject(this.state.newProject);
      });
    e.preventDefault();
  }
  

  render() {
    let categoryOptions = this.props.categories.map(category => {
      return <option key={category} value={category}>{category}</option>
    });
    let categoryMenuItem = this.props.categories.map(category => {
      return <MenuItem key={category} value={category}>{category}</MenuItem>
    });
    return (
      <div>
        <h3>Add Project</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Title</label><br />
            <input type="text" ref="title" />
          </div>
          <br/>
          <div>
            <label>Notes</label><br />
            <input type="text" ref="notes" />
          </div>
          <br/>
          <div>
            <label>Percent Complete</label><br />
            <input type="text" ref="progress" />
          </div>
          <br/>
          <div>
            
            <label>Category</label><br />
            <select ref="category">
              {categoryOptions}
            </select>
            {/* <DropdownButton ref="category">
              {categoryOptions}
            </DropdownButton> */}
          </div>
          
          <br />
          <Button type="submit" value="Submit">Submit</Button>
          
          
          <br />
        </form>
      </div>
    );
  }
}

AddProject.propTypes = {
  categories: React.PropTypes.array,
  addProject: React.PropTypes.func
}

export default AddProject;

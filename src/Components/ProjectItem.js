import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap';
import {Panel} from 'react-bootstrap';
import ContentEditable from 'react-contenteditable';

class ProjectItem extends Component {
  deleteProject(id){
    this.props.onDelete(id);
  }

  handleChange = evt => {
    // Change the project's current notes state.
    this.setState({html: evt.target.value});
    //console.log(evt.target.value);
    //console.log(this.props.project.id);
    // Send the project's id and updated notes to firebase.
    this.props.onChange(this.props.project.id, evt.target.value);
  };

  render() {
    return (
      
        <Panel className="Project" bsStyle="success" >
          <Panel.Heading>
            <Panel.Title>{this.props.project.title}
              <a href="#" onClick={this.deleteProject.bind(this, this.props.project.id)}>
                <Glyphicon glyph="remove"></Glyphicon>
              </a>
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body>Category: {this.props.project.category}</Panel.Body>
          <Panel.Body>Notes: 
            <ContentEditable html={this.props.project.notes} onChange={this.handleChange}></ContentEditable>
          </Panel.Body>
        </Panel>
      
    );
  }
}

ProjectItem.propTypes = {
  project: React.PropTypes.object,
  onDelete: React.PropTypes.func,
  onChange: React.PropTypes.func
};

export default ProjectItem;

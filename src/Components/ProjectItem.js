import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Glyphicon} from 'react-bootstrap';
import {Panel} from 'react-bootstrap';
import {Label} from 'react-bootstrap';
import ContentEditable from 'react-contenteditable';
import {ProgressBar} from 'react-bootstrap';
//import Dialog from "react-bootstrap";


class ProjectItem extends Component {
  deleteProject(id){
    this.props.onDelete(id);
  }
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.dialog.showAlert('Hello Dialog!')
  }


  handleChange = evt => {
    // Change the project's current notes state.
    this.setState({html: evt.target.value});
    // Send the project's id and updated notes to firebase.
    this.props.onChange(this.props.project.id, evt.target.value);
  };



  render() {
    return (
      
        <Panel className="Project" bsStyle="primary" >
          <Panel.Heading>
            <Panel.Title>{this.props.project.title}
              <a href="#" onClick={this.deleteProject.bind(this, this.props.project.id)}>
                <Glyphicon glyph="remove"></Glyphicon>
              </a>
            </Panel.Title>
          </Panel.Heading>
          <br/>
          <ProgressBar bsStyle="success" now={this.props.project.progress} />
          <br/>
          <Panel.Body>Category: {this.props.project.category}</Panel.Body>
          <Panel.Body><Label>Notes:</Label> 
            <ContentEditable html={this.props.project.notes} onChange={this.handleChange}></ContentEditable>
          </Panel.Body>
        </Panel>
      
    );
  }
}

ProjectItem.propTypes = {
  project: PropTypes.object,
  onDelete: PropTypes.func,
  onChange: PropTypes.func
};

export default ProjectItem;

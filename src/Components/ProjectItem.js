import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap';
import {Panel} from 'react-bootstrap';

class ProjectItem extends Component {
  deleteProject(id){
    this.props.onDelete(id);
  }

  render() {
    return (
      //{/* <li className="Project"> */}
      //  {/* <strong>{this.props.project.title}</strong>: {this.props.project.category} <a href="#" onClick={this.deleteProject.bind(this, this.props.project.id)}>X</a> */}
      //  {/* <strong>{this.props.project.title}</strong>: {this.props.project.category} <a href="#" onClick={this.deleteProject.bind(this, this.props.project.id)}><Glyphicon glyph="remove"></Glyphicon></a> */}
      // </li>
      <Panel className="Project">
        <Panel.Heading>
          <Panel.Title>{this.props.project.title} <a href="#" onClick={this.deleteProject.bind(this, this.props.project.id)}><Glyphicon glyph="remove"></Glyphicon></a></Panel.Title>
          <Panel.Body>Category: {this.props.project.category}</Panel.Body>
        </Panel.Heading>
      </Panel>
    );
  }
}

ProjectItem.propTypes = {
  project: React.PropTypes.object,
  onDelete: React.PropTypes.func
};

export default ProjectItem;

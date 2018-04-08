import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectItem from './ProjectItem';
import { Panel } from 'react-bootstrap';
import { PanelGroup } from "react-bootstrap";

class Projects extends Component {
  deleteProject(id){
    this.props.onDelete(id);
  }

  editNotes(id, notes){
    this.props.onChange(id, notes);
  }

  render() {
    let projectItems;
    if(this.props.projects){
      projectItems = this.props.projects.map(project => {
        //console.log(project);
        return (
          <ProjectItem onChange={this.editNotes.bind(this)} onDelete={this.deleteProject.bind(this)} key={project.title} project={project} />
        );
      });
    }
    return (
      <div className="Projects">
          <PanelGroup id="projectsPanel">
              <Panel.Heading>
                <Panel.Title>Latest Projects</Panel.Title>
              </Panel.Heading>
            {projectItems}
          </PanelGroup>
      </div>
    );
  }
}

Projects.propTypes = {
  projects: PropTypes.array,
  onDelete: PropTypes.func,
  onChange: PropTypes.func
}

export default Projects;

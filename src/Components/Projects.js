import React, { Component } from 'react';
import ProjectItem from './ProjectItem';
import { Panel } from 'react-bootstrap';
import { PanelGroup } from "react-bootstrap";

class Projects extends Component {
  deleteProject(id){
    this.props.onDelete(id);
  }

  render() {
    let projectItems;
    if(this.props.projects){
      projectItems = this.props.projects.map(project => {
        //console.log(project);
        return (
          <ProjectItem onDelete={this.deleteProject.bind(this)} key={project.title} project={project} />
        );
      });
    }
    return (
      <div className="Projects"> 
        {/* <h3>Latest Projects</h3>
        {/* {projectItems} */}
        {/* <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title>Lastest Projects</Panel.Title>
          </Panel.Heading>
          <Panel.Body> */}
          <PanelGroup id="projectsPanel">
            {/* <Panel bsStyle="primary" > */}
              <Panel.Heading>
                <Panel.Title>Latest Projects</Panel.Title>
              </Panel.Heading>
            {/* </Panel> */}
            {projectItems}
          </PanelGroup>    
          {/* </Panel.Body>
        </Panel> */}
      </div>
    );
  }
}

Projects.propTypes = {
  projects: React.PropTypes.array,
  onDelete: React.PropTypes.func
}

export default Projects;

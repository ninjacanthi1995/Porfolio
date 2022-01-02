import React, { Component } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: {},
      detailsModalShow: false,
      filteredProjects: []
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({ filteredProjects: nextProps.resumeProjects })
  }

  render() {
    let detailsModalShow = (data) => {
      this.setState({ detailsModalShow: true, deps: data });
    };

    let detailsModalClose = () => this.setState({ detailsModalShow: false });
    if (this.props.resumeProjects && this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.projects;
      //var projects = this.props.resumeProjects.map(function (projects) {
      var projects = this.state.filteredProjects.map(function (projects) {
        return (
          <div
            className="col-sm-12 col-md-6 col-lg-4"
            key={projects.title}
            style={{ cursor: "pointer" }}
          >
            <span className="portfolio-item d-block">
              <div className="foto" onClick={() => detailsModalShow(projects)}>
                <div>
                  <img
                    src={projects.images[0]}
                    alt="projectImages"
                    height="230"
                    style={{marginBottom: 0, paddingBottom: 0, position: 'relative'}}
                  />
                  <span className="project-date">{projects.startDate}</span>
                  <br />
                  <p className="project-title-settings mt-3">
                    {projects.title}
                  </p>
                </div>
              </div>
            </span>
          </div>
        );
      });
    }

    let filter = (event) => {
      let techno = event.target.value.toLowerCase();

      this.setState({
        filteredProjects: this.props.resumeProjects.filter(project => {
          let result = false;
          project.technologies.forEach(tech => {
            if (tech.name.toLowerCase() === techno) {
              result = true;
            }
          })
          return result;
        })
      })
    }

    return (
      <section id="portfolio">
        <div className="col-md-12">
          <h1 className="section-title" style={{ color: "black" }}>
            <span>{sectionName}</span>

            <br/>

            <select onChange={filter} defaultValue={'default'} className="filter-select">
              <option disabled value='default'>Technologies</option>
              <option value="NodeJS">NodeJS</option>
              <option value="Bootstrap">Bootstrap</option>
              <option value="React">React</option>
              <option value="Flutter">Flutter</option>
              <option value="Sass">Sass</option>
              <option value="MongoDB">MongoDB</option>
            </select>
          </h1>

          <div className="col-md-12 mx-auto">
            <div className="row mx-auto">{projects}</div>
          </div>
          <ProjectDetailsModal
            show={this.state.detailsModalShow}
            onHide={detailsModalClose}
            data={this.state.deps}
          />
        </div>
      </section>
    );
  }
}

export default Projects;

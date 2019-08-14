import React from "react";
import { connect } from "react-redux";
import { setSetting, getSetting } from "../../actions/settings";
import { Header, Footer, SideBar } from "../../components";

class Settings extends React.Component {
  state = {
    lecturer: "",
    student: "",
    errors: {}
  };

  validate = data => {
    const errors = {};
    console.log(data);
    if (!data.student) errors.student = "Can't be blank";
    if (!data.lecturer) errors.lecturer = "Can't be blank";

    return errors;
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  componentDidMount() {
    this.props.getSetting();
    if (this.props.gotSetting && this.props.gotSetting.length) {
      this.setState({
        lecturer: this.props.gotSetting[0].numberOfLectures,
        student: this.props.gotSetting[0].numberOfStudents
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const errors = this.validate(this.state);
    this.setState({ errors });
    const data = {
      lecturer: this.state.lecturer,
      student: this.state.student
    };
    if (this.props.gotSetting.length) data.id = this.props.gotSetting[0]._id;
    if (Object.keys(errors).length === 0) {
      console.log(data);
      this.props.setSetting(data);
      console.log("Yeah");
    }
  };
  render() {
    return (
      <div>
        <div className="container-fluid display-table">
          <div className="row display-table-row">
            <SideBar page="settings" />
            <div className="col-md-10 col-sm-11 display-table-cell v-align">
              <Header />
              <div className="user-dashboard">
                <h1>Settings</h1>
                <div className="row">
                  <div className="col-md-3 col-sm-3 col-xs-12 gutter" />
                  <div className="col-md-6 col-sm-6 col-xs-12 gutter">
                    <h3 className="text-muted text-center">
                      Set Number of Students Per Lecturer for Invigilation
                    </h3>
                    <form onSubmit={this.onSubmit} className="form-group">
                      <div className="form-group">
                        <label htmlFor="lecturer">Number of Lecturers:</label>
                        <input
                          className="form-control"
                          type="number"
                          name="lecturer"
                          id="lecturer"
                          value={this.state.lecturer}
                          onChange={this.onChange}
                        />
                        {this.state.errors.lecturer && (
                          <span style={{ color: "red" }}>
                            {this.state.errors.lecturer}
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="student">Number of Students:</label>
                        <input
                          className="form-control"
                          type="number"
                          name="student"
                          id="student"
                          value={this.state.student}
                          onChange={this.onChange}
                        />
                        {this.state.errors.student && (
                          <span style={{ color: "red" }}>
                            {this.state.errors.student}
                          </span>
                        )}
                      </div>
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-secondary mr-auto"
                          onClick={this.onSubmit}
                        >
                          {this.props.gotSetting &&
                          this.props.gotSetting.length > 0
                            ? "Update"
                            : "Set"}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-12 gutter" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  settings: state.setting.settings,
  settingError: state.setting.settingError,
  gotSetting: state.setting.gotSetting
});

export default connect(
  mapStateToProps,
  { setSetting, getSetting }
)(Settings);

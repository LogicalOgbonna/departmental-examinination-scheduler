import React from "react";
import { connect } from "react-redux";

import { Header, Footer, SideBar } from "../../components";
import {
  postHalls,
  clear,
  viewHall,
  deleteHall,
  getHalls
} from "../../actions/halls";
import { HallTable } from "../../components/Table/Table";
import { HallModal } from "../../components/Modal/Modal";

class Hall extends React.Component {
  state = {
    title: "",
    name: "",
    number: "",
    errors: {},
    loading: false
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  validate = data => {
    const errors = {};
    if (!data.name) errors.name = "Can't be blank";
    if (!data.number) errors.number = "Can't be blank";

    return errors;
  };
  onSubmit = e => {
    const errors = this.validate(this.state);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.postHalls(this.state);
      this.setState({ loading: true });
    } else {
    }
    e.preventDefault();
  };

  componentDidMount() {
    this.props.getHalls();
  }
  componentWillReceiveProps(next) {
    // if()
    if (next.createdHall && Object.keys(next.createdHall).length > 0) {
      this.props.clear();
      this.props.getHalls();
    }
  }

  render() {
    return (
      <div>
        <div className="container-fluid display-table">
          <div className="row display-table-row">
            <SideBar page="halls" />
            <div className="col-md-10 col-sm-11 display-table-cell v-align">
              <Header />
              <div className="user-dashboard">
                <h1>Halls</h1>
                <div className="row">
                  <div className="col-md-5">
                    {this.props.createdHall &&
                      Object.keys(this.props.createdHall).length > 0 && (
                        <div className="form-group">
                          <h3 className="text-success text-center">
                            Hall Added Sucessfully
                          </h3>
                        </div>
                      )}
                    <form onSubmit={this.onSubmit} className="form-group">
                      <div className="form-group">
                        <label htmlFor="name">Hall name:</label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          id="name"
                          onChange={this.onChange}
                        />
                        {this.state.errors.name && (
                          <span style={{ color: "red" }}>
                            {this.state.errors.name}
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="number">Number of Students:</label>
                        <input
                          className="form-control"
                          type="number"
                          name="number"
                          id="number"
                          onChange={this.onChange}
                        />
                        {this.state.errors.number && (
                          <span style={{ color: "red" }}>
                            {this.state.errors.number}
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-secondary mr-auto"
                          onClick={this.onSubmit}
                        >
                          Add Hall
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-7">
                    <HallTable
                      halls={this.props.halls}
                      viewHall={this.props.viewHall}
                      deleteHall={this.props.deleteHall}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <HallModal hall={this.props.singleHall} />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  createdHall: state.hall.createdHall,
  halls: state.hall.halls,
  singleHall: state.hall.singleHall
});

export default connect(
  mapStateToProps,
  { postHalls, clear, viewHall, deleteHall, getHalls }
)(Hall);

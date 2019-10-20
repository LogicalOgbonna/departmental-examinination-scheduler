import React, { Component } from "react";
import { Header, Footer, SideBar } from "../../components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ScheduleTabel } from "../../components/Table/Table";
import { saveTable } from "../../actions/scheduler";

class DisplayTable extends Component {
  onSave = () => {
    this.props.saveTable(this.props.timeTable, this.props.session);
  };
  render() {
    // console.log(this.props.timeTable);
    return (
      <div>
        <div className="container-fluid display-table">
          <div className="row display-table-row">
            <SideBar page="scheduler" />
            <div className="col-md-10 col-sm-11 display-table-cell v-align">
              <Header />
              <div className="user-dashboard">
                <h1>Time Table</h1>
                <hr />
                <div className="row">
                  <div className="col-md-12">
                    <Link to="/scheduler" className="btn btn-primary">
                      Back
                    </Link>
                  </div>

                  <div className="col-md-1"></div>
                  <div className="col-md-10 mt-5">
                    <ScheduleTabel
                      onSave={this.onSave}
                      schedule={this.props.timeTable}
                    />
                  </div>
                  <div className="col-md-1"></div>
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
  timeTable: state.scheduler.timeTable,
  session: state.scheduler.session
});

export default connect(
  mapStateToProps,
  { saveTable }
)(DisplayTable);

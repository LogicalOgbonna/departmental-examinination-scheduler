import React from "react";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import Moment from 'react-moment';

import { Header, Footer, SideBar } from "../../components";
import {
  postComplaint,
  clear,
  deleteComplaint,
  getComplaints,
  replyComplaint
} from "../../actions/complaints";
import "./chat.css"

class Complaints extends React.Component {
  state = {
    reason: "",
    message: "",
    errors: {},
    loading: false,
    complaintLoading: false,
    response: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  validate = data => {
    const errors = {};
    if (!data.reason) errors.reason = "Can't be blank";
    if (!data.message) errors.message = "Can't be blank";

    return errors;
  };
  onSubmit = e => {
    const errors = this.validate(this.state);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.postComplaint(this.state);
      this.setState({ loading: true });
    } else {
    }
    e.preventDefault();
  };

  componentDidMount() {
    this.props.getComplaints();
  }
  componentWillReceiveProps(next) {
    // if()
    if (
      next.createdComplaint &&
      Object.keys(next.createdComplaint).length > 0
    ) {
      this.setState({ reason: "", message: "", loading: false });
      this.props.clear(this.props.getComplaints);
    }

    if(next.complaints.length){
      this.setState({complaintLoading: false, response: ""})
    }
  }

  replyComplaint = (id) => {
    this.setState({complaintLoading: true})
    this.props.replyComplaint(id, this.state.response)
  }

  render() {
    return (
      <div>
        <div className="container-fluid display-table">
          <div className="row display-table-row">
            <SideBar page="complaints" />
            <div className="col-md-10 col-sm-11 display-table-cell v-align">
              <Header />
              <div className="user-dashboard">
                <h1>Complaints</h1>
                {!this.props.user.admin && (
                  <div className="row mb-5">
                    <div className="col-md-5">
                      {this.props.createdComplaint &&
                        Object.keys(this.props.createdComplaint).length > 0 && (
                          <div className="form-group">
                            <h3 className="text-success text-center">
                              Complain Sent Sucessfully
                            </h3>
                          </div>
                        )}
                      <form onSubmit={this.onSubmit} className="form-group">
                        <div className="form-group">
                          <label htmlFor="reason">Subject of Complaint:</label>
                          <input
                            className="form-control"
                            type="text"
                            name="reason"
                            id="reason"
                            placeholder="Subject..."
                            onChange={this.onChange}
                            value={this.state.reason}
                          />
                          {this.state.errors.reason && (
                            <span style={{ color: "red" }}>
                              {this.state.errors.reason}
                            </span>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="message">Message:</label>
                          <textarea
                            className="form-control"
                            type="number"
                            name="message"
                            id="message"
                            rows="10"
                            cols="30"
                            value={this.state.message}
                            onChange={this.onChange}
                            placeholder=" What is the matter..."
                          ></textarea>
                          {this.state.errors.message && (
                            <span style={{ color: "red" }}>
                              {this.state.errors.message}
                            </span>
                          )}
                        </div>

                        <div className="form-group">
                          <button
                            type="button"
                            className="btn btn-secondary pull-right"
                            onClick={this.onSubmit}
                            disabled={this.state.loading}
                          >
                            {this.state.loading ? "Wait..." : " Talk to us"}
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-7">
                    <MaterialTable
                        columns={[
                          { title: "Subject", field: "reason" },
                          { title: "Message", field: "message" },
                          { title: "From", field: "user.name" },
                          { title: "Email", field: "user.email" }
                        ]}
                        data={this.props.complaints}
                        title="List of Complaints"
                        actions={[
                          {
                            icon: "delete",
                            tooltip: "Delete Complaint",
                            onClick: (event, rowData) =>
                              this.props.approvePOP(rowData._id)
                          }
                        ]}
                        detailPanel={[
                          {
                            tooltip: "Show More",
                            render: rowData => {
                              return (
                                <div style={{marginTop: 20}} className="container mt-5">
                                  <div className="row mt-5">
                                    {/* <div className="col-md-1"></div> */}
                                      <div className="ml-5 col-md-6">
                                          <div className="panel panel-primary">
                                              <div className="panel-heading">
                                                  <span className="glyphicon glyphicon-comment"></span> Chat
                                                  {/* <div className="btn-group pull-right">
                                                      <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                                          <span className="glyphicon glyphicon-chevron-down"></span>
                                                      </button>
                                                      <ul className="dropdown-menu slidedown">
                                                          <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-refresh">
                                                          </span>Refresh</a></li>
                                                          <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-ok-sign">
                                                          </span>Available</a></li>
                                                          <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-remove">
                                                          </span>Busy</a></li>
                                                          <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-time"></span>
                                                              Away</a></li>
                                                          <li className="divider"></li>
                                                          <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-off"></span>
                                                              Sign Out</a></li>
                                                      </ul>
                                                  </div>
                                               */}
                                               </div>
                                              <div className="panel-body">
                                                <ul className="chat">
                                                  {rowData.conversation.map(convo =>
                                                      <React.Fragment key={convo._id}>
                                                        {convo.admin && <li className=""><span className="chat-img pull-left">
                                                          <img src="http://placehold.it/50/55C1E7/fff&text=ADMIN" alt="User Avatar" className="img-circle" />
                                                      </span>
                                                          <div className="chat-body clearfix">
                                                              <div className="header">
                                                                  <strong className="primary-font">Admin</strong> 
                                                                  <small className="time pull-right text-muted">
                                                                      <span className="glyphicon glyphicon-time"></span>
                                                                      <Moment fromNow>{convo.time}</Moment></small>
                                                              </div>
                                                              <p className="pull-right">
                                                                  {convo.message}
                                                              </p>
                                                          </div>
                                                      </li>}
                                                      {!convo.admin && <li className="right clearfix"><span className="chat-img pull-right">
                                                          <img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" className="img-circle" />
                                                      </span>
                                                          <div className="chat-body clearfix">
                                                              <div className="header">
                                                                  <small className="time text-muted">
                                                                    <span className="glyphicon glyphicon-time"></span>
                                                                  <Moment fromNow>{convo.time}</Moment></small>
                                                                  <strong className="pull-right primary-font">{rowData.user.name}</strong>
                                                              </div>
                                                              <p>
                                                                  {convo.message}
                                                              </p>
                                                          </div>
                                                      </li>
                                                      }</React.Fragment>
                                                      )
                                                    }
                                                     </ul>
                                              </div>
                                              <div className="panel-footer">
                                                  <div className="input-group">
                                                      <input id="btn-input" onChange={this.onChange} 
                                                      value={this.state.response} type="text"
                                                      name="response" className="form-control input-sm" placeholder="Type your message here..." />
                                                      <span className="input-group-btn">
                                                          <button onClick={() => this.replyComplaint(rowData._id)} className="btn btn-warning btn-sm"
                                                          disabled={this.state.complaintLoading} 
                                                            id="btn-chat">
                                                              {this.state.complaintLoading ? 
                                                               <React.Fragment>
                                                              "Sending" <i className= "fa fa-spinner"></i> 
                                                               </React.Fragment>  : "Send"}
                                                              
                                                              </button>
                                                      </span>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                    <div className="col-md-6"></div>      
                                  </div>
                                </div>
                              );
                            }
                          }
                        ]}
                        onRowClick={(event, rowData, togglePanel) =>
                          togglePanel()
                        }
                        options={{
                          columnsButton: true,
                          exportButton: true
                          // actionsColumnIndex: -1
                        }}
                      />
                    </div>
                  </div>
                )}

                {this.props.user.admin && (
                  <div className="row mb-5">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                      <MaterialTable
                        columns={[
                          { title: "Subject", field: "reason" },
                          { title: "Message", field: "message" },
                          { title: "From", field: "user.name" },
                          { title: "Email", field: "user.email" }
                        ]}
                        data={this.props.complaints}
                        title="List of Complaints"
                        actions={[
                          {
                            icon: "delete",
                            tooltip: "Delete Complaint",
                            onClick: (event, rowData) =>
                              this.props.approvePOP(rowData._id)
                          }
                        ]}
                        detailPanel={[
                          {
                            tooltip: "Show More",
                            render: rowData => {
                              return (
                                <div style={{marginTop: 20}} className="container mt-5">
                                  <div className="row mt-5">
                                    <div className="col-md-1"></div>
                                      <div className="col-md-8">
                                          <div className="panel panel-primary">
                                              <div className="panel-heading">
                                                  <span className="glyphicon glyphicon-comment"></span> Chat
                                                  {/* <div className="btn-group pull-right">
                                                      <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                                          <span className="glyphicon glyphicon-chevron-down"></span>
                                                      </button>
                                                      <ul className="dropdown-menu slidedown">
                                                          <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-refresh">
                                                          </span>Refresh</a></li>
                                                          <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-ok-sign">
                                                          </span>Available</a></li>
                                                          <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-remove">
                                                          </span>Busy</a></li>
                                                          <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-time"></span>
                                                              Away</a></li>
                                                          <li className="divider"></li>
                                                          <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-off"></span>
                                                              Sign Out</a></li>
                                                      </ul>
                                                  </div>
                                               */}
                                               </div>
                                              <div className="panel-body">
                                                <ul className="chat">
                                                  {rowData.conversation.map(convo =>
                                                      <React.Fragment key={convo._id}>
                                                        {convo.admin && <li className=""><span className="chat-img pull-left">
                                                          <img src="http://placehold.it/50/55C1E7/fff&text=ADMIN" alt="User Avatar" className="img-circle" />
                                                      </span>
                                                          <div className="chat-body clearfix">
                                                              <div className="header">
                                                                  <strong className="primary-font">Admin</strong> 
                                                                  <small className="time pull-right text-muted">
                                                                      <span className="glyphicon glyphicon-time"></span>
                                                                      <Moment fromNow>{convo.time}</Moment></small>
                                                              </div>
                                                              <p className="pull-right">
                                                                  {convo.message}
                                                              </p>
                                                          </div>
                                                      </li>}
                                                      {!convo.admin && <li className="right clearfix"><span className="chat-img pull-right">
                                                          <img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" className="img-circle" />
                                                      </span>
                                                          <div className="chat-body clearfix">
                                                              <div className="header">
                                                                  <small className="time text-muted">
                                                                    <span className="glyphicon glyphicon-time"></span>
                                                                  <Moment fromNow>{convo.time}</Moment></small>
                                                                  <strong className="pull-right primary-font">{rowData.user.name}</strong>
                                                              </div>
                                                              <p>
                                                                  {convo.message}
                                                              </p>
                                                          </div>
                                                      </li>
                                                      }</React.Fragment>
                                                      )
                                                    }
                                                     </ul>
                                              </div>
                                              <div className="panel-footer">
                                                  <div className="input-group">
                                                      <input id="btn-input" onChange={this.onChange} 
                                                      value={this.state.response} type="text"
                                                      name="response" className="form-control input-sm" placeholder="Type your message here..." />
                                                      <span className="input-group-btn">
                                                          <button onClick={() => this.replyComplaint(rowData._id)} className="btn btn-warning btn-sm"
                                                          disabled={this.state.complaintLoading} 
                                                            id="btn-chat">
                                                              {this.state.complaintLoading ? 
                                                               <React.Fragment>
                                                              "Sending" <i className= "fa fa-spinner"></i> 
                                                               </React.Fragment>  : "Send"}
                                                              
                                                              </button>
                                                      </span>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                    <div className="col-md-2"></div>      
                                  </div>
                                </div>
                              );
                            }
                          }
                        ]}
                        onRowClick={(event, rowData, togglePanel) =>
                          togglePanel()
                        }
                        options={{
                          columnsButton: true,
                          exportButton: true
                          // actionsColumnIndex: -1
                        }}
                      />
                    </div>
                    <div className="col-md-1"></div>
                  </div>
                )}
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
  createdComplaint: state.complaint.createdComplaint,
  complaints: state.complaint.complaints,
  singleComplaint: state.complaint.singleComplaint,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  { postComplaint, clear, deleteComplaint, getComplaints, replyComplaint }
)(Complaints);

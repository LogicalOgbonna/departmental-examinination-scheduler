import React from "react";
// import logo from "../img/Primary 5.jpg";

export default function Header() {
  return (
                <div className="row">
                    <header>
                        <div className="col-md-7">
                            <nav className="navbar-default pull-left">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle collapsed" data-toggle="offcanvas" data-target="#side-menu" aria-expanded="false">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                </div>
                            </nav>
                            <div className="search hidden-xs hidden-sm">
                                <input type="text" placeholder="Search" id="search" />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="header-rightside">
                                <ul className="list-inline header-top pull-right">
                                    <li className="hidden-xs"><a href="#" className="add-project" data-toggle="modal" data-target="#add_project">Add Project</a></li>
                                    <li><a href="#"><i className="fa fa-envelope" aria-hidden="true"></i></a></li>
                                    <li>
                                        <a href="#" className="icon-info">
                                            <i className="fa fa-bell" aria-hidden="true"></i>
                                            <span className="label label-primary">3</span>
                                        </a>
                                    </li>
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown"><img src="http://jskrishna.com/work/merkury/images/user-pic.jpg" alt="user" />
                                            <b className="caret"></b></a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <div className="navbar-content">
                                                    <span>JS Krishna</span>
                                                    <p className="text-muted small">
                                                        me@jskrishna.com
                                                    </p>
                                                    <div className="divider">
                                                    </div>
                                                    <a href="#" className="view btn-sm active">View Profile</a>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </header>
                </div>
               
       
  );
}

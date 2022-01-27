import React, { Component } from "react";

class HeaderComponent extends Component {
  //   state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            CatLover
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/cats">
                  All Cats
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/breeds">
                  Cat Breeds
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/favorites">
                  Favorite Cats
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default HeaderComponent;

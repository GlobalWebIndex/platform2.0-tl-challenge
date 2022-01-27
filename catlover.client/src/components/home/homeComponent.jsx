import React, { Component } from "react";

class HomeComponent extends Component {
  state = {};
  render() {
    return (
      <div class="row row-cols-1 row-cols-md-3 g-4 m-2">
        <div class="col">
          <div class="card">
            <a href="/cats" class="stretched-link"></a>
            <div class="card-header">
              <h5 class="card-title">Cats List</h5>
            </div>
            <div class="card-body">
              <p class="card-text">Go to cats photos.</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <a href="/breeds" class="stretched-link"></a>
            <div class="card-header">
              <h5 class="card-title">Breeds List</h5>
            </div>
            <div class="card-body">
              <p class="card-text">Go to cats breeds.</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <a href="/breeds" class="stretched-link"></a>
            <div class="card-header">
              <h5 class="card-title">Cats Favorite List</h5>
            </div>
            <div class="card-body">
              <p class="card-text">Go to favorite cats.</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeComponent;

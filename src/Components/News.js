import React, { Component } from "react";
import NewItem from "./NewItem";

export class News extends Component {
  render() {
    return (
      <div className="container my-3">
        <h1>Reportify - News Headlines</h1>
        <div className="row">
          <div className="col-md-4">
            <NewItem title="Cricket" description="MyDescription"></NewItem>
          </div>
          <div className="col-md-4">
            <NewItem title="Cricket" description="MyDescription"></NewItem>
          </div>
          <div className="col-md-4">
            <NewItem title="Cricket" description="MyDescription"></NewItem>
          </div>
        </div>
      </div>
    );
  }
}

export default News;

import React, { Component } from "react";
import NewItem from "./NewItem";
import Spinner from "./Spinner";

export class News extends Component {
  constructor() {
    debugger;
    super();

    this.state = {
      articles: [],
      page: this.page,
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    debugger;
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=ae3203ae1eb144b39303cce96d81f047&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
    });
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=ae3203ae1eb144b39303cce96d81f047&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);

    let parsedata = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parsedata.articles,
      loading: false,
    });
  };

  handleNextClick = async () => {
    if (!Math.ceil(this.state.page + 1 > this.state.totalResults / 20)) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=ae3203ae1eb144b39303cce96d81f047&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;

      let data = await fetch(url);
      this.setState({ loading: true });
      let parsedata = await data.json();

      this.setState({
        page: this.state.page + 1,
        articles: parsedata.articles,
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1>Reportify - News Headlines</h1>
        {this.state.loading && <Spinner></Spinner>}
        <div className="row mx-3">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewItem
                  title={
                    element.title !== null ? element.title.slice(0, 45) : ""
                  }
                  description={
                    element.description !== null
                      ? element.description.slice(0, 90)
                      : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                ></NewItem>
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 20)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;

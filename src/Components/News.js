import React, { Component } from "react";
import NewItem from "./NewItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 9,
    Category: "general"
  };

  static protoTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    Category: PropTypes.string
  };

Capital_FirstLetter_title = (string) =>
{
  return string.charAt(0).toUpperCase() + string.slice(1)
}

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      page: this.page,
      loading: false,
      page: 1,
    };
    document.title = `${this.Capital_FirstLetter_title(this.props.Category)} - Reportify`;
  }

async Update (PageNo) {
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.Category}&apiKey=ae3203ae1eb144b39303cce96d81f047&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({ loading: true });
  let data = await fetch(url);
  let parsedata = await data.json();
  this.setState({
    articles: parsedata.articles,
    loading: false,
  });

}

  async componentDidMount() {
    this.Update();
  }

  handlePrevClick = async () => {
    this.setState({  page: this.state.page - 1})
    this.Update();
  };


  handleNextClick = async () => {
    this.setState({  page: this.state.page + 1})
  
    this.Update();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">Reportify - Top {this.Capital_FirstLetter_title(this.props.Category)} Headlines</h1>
        {this.state.loading && <Spinner></Spinner>}
        <div className="row mx-3">
          {!this.state.loading &&
            this.state.articles.map((element) => {
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
                    author = {element.author}
                    datePublished = {element.publishedAt}
                    source = {element.source.name}
                  ></NewItem>
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}>
           
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

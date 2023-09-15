import React, { Component } from "react";
import NewItem from "./NewItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 9,
    Category: "general",
  };

  static protoTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    Category: PropTypes.string,
  };

  Capital_FirstLetter_title = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      page: this.page,
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.Capital_FirstLetter_title(
      this.props.Category
    )} - Reportify`;
  }

  async Update(PageNo) {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.Category}&apiKey=d093053d72bc40248998159804e0e67d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedata = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedata.articles,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.Update();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.Update();
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });

    this.Update();
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.Category}&apiKey=d093053d72bc40248998159804e0e67d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
   
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedata.articles),
      totalResults: parsedata.totalResults,
      loading: false,
    });
    
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">
          Reportify - Top {this.Capital_FirstLetter_title(this.props.Category)}{" "}
          Headlines
        </h1>
        {/* {this.state.loading && <Spinner></Spinner>} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
        //   loader={
        //      <Spinner />
          
        // }
        >
          <div className="row mx-3">
            {this.state.articles.map((element,index) => {
              return (
                <div className="col-md-4" key={index}>
                  <NewItem title={element.title !== null ? element.title.slice(0, 45) : "" }
                  description={element.description !== null ? element.description.slice(0, 90) : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    datePublished={element.publishedAt}
                    source={element.source.name}
                  ></NewItem>
                </div>
              );
            })} 
          </div>
        </InfiniteScroll>
       
      </div>
    );
  }
}

export default News;

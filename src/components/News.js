import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  capitalizefirstLetter = (string) => {
    return string = string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    console.log('This is a constructor')
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    }
    let title = this.props.category;
    title = title.charAt(0).toUpperCase() + title.slice(1);
    document.title = "Newsapp | " + title;
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9281d29e9a5b4382a006f1c379a3bd8a&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })

  }
  handleNext = async () => {
    console.log("Next")
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)) {

    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9281d29e9a5b4382a006f1c379a3bd8a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true })
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      })
    }
    console.log(this.state.page)
    console.log(this.state.totalResults)

  }

  handlePrev = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9281d29e9a5b4382a006f1c379a3bd8a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
    console.log(this.state.page)
  }



  // fetchMoreData = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   console.log(this.state.poge);
  //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9281d29e9a5b4382a006f1c379a3bd8a&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json()
  //   this.setState({
  //     articles: this.state.articles.concat(parsedData.articles),
  //     totalResults: parsedData.totalResults,
  //     loading: false,
  //   })

  // };
  render() {
    return (
      <>
        <div className='container'>
          <h2 className='text-center my-3'>Today's Top Headlines on {this.capitalizefirstLetter(this.props.category)}</h2>
          {this.state.loading && <Spinner />}
            <div className="conatainer">
              <div className="row ">
                {this.state.articles.map((element) => {
                  return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
                })}
              </div>
            </div>
        </div>
        <div className="container d-flex justify-content-around my-3">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrev}>&laquo; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &raquo;</button>
        </div>
      </>
    )
  }
}

export default News;
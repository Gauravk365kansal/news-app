import React, {useEffect, useState} from 'react'

import NewsItem from './NewItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
    const [results, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [Nextpage,setNextPage] = useState(1)
    // document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updateNews = async ()=> {
        props.setProgress(10);
      //  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page }&pageSize=${props.pageSize}`; 
      const url = `https://newsdata.io/api/1/news?apiKey=${props.apiKey}&country=${props.country}&category=${props.category}&language=en&image=1&prioritydomain=top`; 
      console.log(url);
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        console.log(parsedData);
        props.setProgress(70);
        setArticles(parsedData.results)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
      
        setNextPage(parsedData.nextPage )
        props.setProgress(100);
        debugger;
       
    }

    useEffect(() => {
        updateNews(); 
    }, [])
 

    const handlePrevClick = async () => {
        setPage(page-1)
        updateNews();
    }

    const handleNextClick = async () => { 
        setPage(page+1)
        updateNews()
    }

    const fetchMoreData = async () => {   
        
     //   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        const url = `https://newsdata.io/api/1/news?apiKey=${props.apiKey}&country=${props.country}&category=${props.category}&language=en&image=1&prioritydomain=top&page=${Nextpage}`; 
        let data = await fetch(url);
        let parsedData = await data.json()
       
        setArticles(results.concat(parsedData.results))
        setTotalResults(parsedData.totalResults)
        setNextPage(parsedData.nextPage )
      };
 
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px' }}>Reportify - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={results.length}
                    next={fetchMoreData}
                    hasMore={results.length !== totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {results.map((element,index) => {
                            return <div className="col-md-4" key={index}>
                                <NewsItem title={element.title ? element.title.split(' ').slice(0, 40).join(' ') : ""} description={element.description ? element.description.split(' ').slice(0, 90).join(' ') : ""} imageUrl={element.image_url} newsUrl={element.link} author={element.creator} pubDate={element.pubDate} source={element.source_id} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>

            </>
        )
    
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
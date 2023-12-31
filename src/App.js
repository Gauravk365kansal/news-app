import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
  pageSize = 9;
  //apiKey = "ae3203ae1eb144b39303cce96d81f047";
  apiKey = process.env.REACT_APP_NEWS_API;


  state = {
  progress: 0
}

setProgress = (progress) => {
  this.setState({progress:progress})
}

  render() {
    return (
      <div>
        <Router>
        <Navbar></Navbar>    
        <LoadingBar height={3} color='#f11946' progress={this.state.progress} 
        /> 
        <Routes>
        <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="world" pageSize = {this.pageSize} country = "in,us,gb,au,ca" category = "world"></News>}/>
        <Route exact path="/home" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="world" pageSize = {this.pageSize} country = "in,us,gb,au,ca" category = "world"></News>}/>
        <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize = {this.pageSize} country = "in" category = "business"></News>}/>
        <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize = {this.pageSize} country = "in" category = "entertainment"></News>}/>
        <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize = {this.pageSize} country = "in" category = "health"></News>}/>
        <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize = {this.pageSize} country = "in" category = "science"></News>}/>
        <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize = {this.pageSize} country = "in" category = "technology"></News>}/>
        <Route exact path="/sports" element={<News setProgress={this.setProgress}apiKey={this.apiKey} key="sports" pageSize = {this.pageSize} country = "in" category = "sports"></News>}/>
        <Route exact path="/tourism" element={<News setProgress={this.setProgress}apiKey={this.apiKey} key="tourism" pageSize = {this.pageSize} country = "in" category = "tourism"></News>}/> 
        {/* <Route exact path="/Videos" element={<News setProgress={this.setProgress}apiKey={this.apiKey} key="Videos" pageSize = {this.pageSize} country = "in" category = "world,business,entertainment.sports,health"></News>}/>  */}
        </Routes>
        </Router>
      </div>
   
    )
  }
}

import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom'

export default class App extends Component {
  pageSize = 9;
  render() {
    return (
      <div>
        <Router>
        <Navbar></Navbar>       
        <Routes>
        <Route exact path="/home" element={<News key="general" pageSize = {this.pageSize} country = "in" Category = "general"></News>}/>
        <Route exact path="/business" element={<News key="business" pageSize = {this.pageSize} country = "in" Category = "business"></News>}/>
        <Route exact path="/entertainment" element={<News key="entertainment" pageSize = {this.pageSize} country = "in" Category = "entertainment"></News>}/>
        <Route exact path="/health" element={<News key="health" pageSize = {this.pageSize} country = "in" Category = "health"></News>}/>
        <Route exact path="/science" element={<News key="science" pageSize = {this.pageSize} country = "in" Category = "science"></News>}/>
        <Route exact path="/technology" element={<News key="technology" pageSize = {this.pageSize} country = "in" Category = "technology"></News>}/>
        <Route exact path="/sports" element={<News key="sports" pageSize = {this.pageSize} country = "in" Category = "sports"></News>}/>
        </Routes>
        </Router>
      </div>
   
    )
  }
}

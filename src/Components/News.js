import React, { Component } from 'react'
import NewItem from './NewItem'

export class News extends Component {
  render() {
    return (
      <div>
        <h1>This is New Component</h1>
        <NewItem></NewItem>
      </div>
    )
  }
}

export default News

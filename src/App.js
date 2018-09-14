import React from 'react'
import './App.css'
import BookSearch from './BookSearch';
import BookShelf from './BookShelf';

class BooksApp extends React.Component {
  state = {
    booksReading:[],
    booksWantToRead:[],
    booksRead:[],
    showSearchPage: false
  }

  backToHome =() =>{
    this.setState({ showSearchPage: false });
  }
  render() {

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookSearch onBack = { this.backToHome }/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf shelfTitle='Currently Reading' books={this.state.booksReading}/>
                <BookShelf shelfTitle='Want to Read' books={this.state.booksWantToRead}/>
                <BookShelf shelfTitle='Read' books={this.state.booksRead}/>                
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp

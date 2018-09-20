import React from 'react'
import './App.css'
import { Route, Link } from 'react-router-dom';
import BookSearch from './BookSearch';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books : [],
    booksReading:[],
    booksWantToRead:[],
    booksRead:[],
    hasBookMoved: false
  }  

  componentWillMount(){
    BooksAPI.getAll().then(books =>{
      this.setState({books : books})
    });
  }

  onBookMove = (book,shelf) =>{
    BooksAPI.update(book,shelf);
    BooksAPI.getAll().then(books =>{
      this.setState({books : books})
    });
  }

  render() {

    const booksToReading = this.state.books.filter(book => book.shelf === 'currentlyReading');
    const booksWantToRead = this.state.books.filter(book => book.shelf === 'wantToRead');
    const booksRead = this.state.books.filter(book => book.shelf === 'read');
    const myAllBooks = this.state.books;

    return (
      <div className="app">
      <Route exact path='/' render={() =>(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf shelfTitle='Currently Reading'books={booksToReading} onBookMove={this.onBookMove} shelf='currentlyReading'/>
                <BookShelf shelfTitle='Want to Read' books={booksWantToRead} onBookMove={this.onBookMove} shelf='wantToRead'/>
                <BookShelf shelfTitle='Read' books={booksRead} onBookMove={this.onBookMove} shelf='read'/>                
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>              
            </div>
          </div>
          )}/>
          <Route path='/search' render={() =>(
            <BookSearch onBookMove={this.onBookMove} myAllBooks={myAllBooks}/>
          )}/>        
      </div>
    )
  }
}

export default BooksApp

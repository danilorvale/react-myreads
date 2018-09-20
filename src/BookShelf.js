import React, { Component } from 'react'
import './App.css'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component{

    static propTypes = {
        shelfTitle: PropTypes.string.isRequired,
        books : PropTypes.array.isRequired,
        onBookMove : PropTypes.func.isRequired,
        shelf : PropTypes.string.isRequired
    };

    onBookMove = (book,shelf) =>{
        this.props.onBookMove(book,shelf);
    }

    render(){
        const { shelfTitle, books,shelf } = this.props

        return (
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{shelfTitle}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((bookObject) =>(
                            <li key={bookObject.id}>
                                <Book book={bookObject} onBookMove={this.onBookMove} shelf={shelf}/>
                            </li>
                        ))}
                    </ol>
                  </div>
                </div>
        )
    };
}

export default BookShelf;

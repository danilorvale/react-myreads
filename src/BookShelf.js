import React, { Component } from 'react'
import './App.css'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component{

    static propTypes = {
        shelfTitle: PropTypes.string.isRequired,
        books : PropTypes.array.isRequired,
        onBookMove : PropTypes.func.isRequired
    };

    onBookMove = (book,shelf) =>{
        this.props.onBookMove(book,shelf);
    }

    render(){
        const { shelfTitle, books } = this.props

        return (
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{shelfTitle}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((bookObject) =>(
                            <li>
                                <Book book={bookObject} onBookMove={this.onBookMove}/>
                            </li>
                        ))}
                    </ol>
                  </div>
                </div>
        )
    };
}

export default BookShelf;

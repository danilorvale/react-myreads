import React from 'react'
import './App.css'
import Book from './Book'
import PropTypes from 'prop-types';

const BookShelf = ({shelfTitle,books,onBookMove,shelf}) =>{
    return(
        <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((bookObject) =>(
                        <li key={bookObject.id}>
                            <Book book={bookObject} onBookMove={onBookMove} shelf={shelf}/>
                        </li>
                    ))}
                </ol>
                </div>
            </div>
        
    );
};

BookShelf.propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    books : PropTypes.array.isRequired,
    onBookMove : PropTypes.func.isRequired,
    shelf : PropTypes.string.isRequired
};


export default BookShelf;

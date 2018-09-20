import React, { Component } from 'react'
import './App.css'
import PropTypes from 'prop-types'
import BookMove from './BookMove.js';

class Book extends Component{

 
    static propTypes = {
        book: PropTypes.object.isRequired,
        onBookMove : PropTypes.func.isRequired
    };

    state = {
        shelf: 'none'
    };    

    onBookMove = (book,shelf) =>{
        this.props.onBookMove(book,shelf);
    }

    render(){
        const { book } = this.props

        var styleParameters = {
            width: 128, 
            height: 193, 
            backgroundImage: 'url(' + book.imageLinks.thumbnail + ')'
        };

        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={styleParameters}></div>
                <BookMove book={book} onBookMove={this.onBookMove}/>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        );
    }
}

export default Book;
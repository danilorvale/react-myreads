import React, { Component } from 'react'
import './App.css'
import PropTypes from 'prop-types'

class Book extends Component{

    // constructor(props){
    //     super(props);
    //     this.onChangeShelf = this.onChangeShelf.bind(this);
    // }
    static propTypes = {
        book: PropTypes.object.isRequired,
        onAddBookToRead: PropTypes.func.isRequired, 
        onAddBookToWantRead: PropTypes.func.isRequired, 
        onAddBookToReading : PropTypes.func.isRequired
    };

    state = {
        shelf: 'none'
    };

    onAddBookToRead = (bookObject) =>{
        this.props.onAddBookToRead(bookObject);
    };
    
    onAddBookToWantRead =(bookObject) =>{
        this.props.onAddBookToWantRead(bookObject);
    };
    
    onAddBookToReading = (bookObject) =>{
        this.props.onAddBookToReading(bookObject);
    };

    onChangeShelf = (event) =>{
        this.setState({ shelf : event.target.value});

        if(event.target.value === 'currentlyReading'){
            this.onAddBookToReading(this.props.book);
        }else if(event.target.value === 'wantToRead'){
            this.onAddBookToWantRead(this.props.book);
        }else if(event.target.value === 'read'){
            this.onAddBookToRead(this.props.book);
        }
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
                <div className="book-shelf-changer">
                    <select value={this.state.shelf} onChange={this.onChangeShelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        );
    }
}

export default Book;
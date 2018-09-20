import React, { Component } from 'react'
import './App.css'
import PropTypes from 'prop-types'

class BookMove extends Component{
 
    static propTypes = {
        book: PropTypes.object.isRequired,
        onBookMove : PropTypes.func.isRequired,
        shelf : PropTypes.string.isRequired
    };

    state ={
        shelf : this.props.shelf
    };

    onBookMove = (book,shelf) =>{
        this.props.onBookMove(book,shelf);
    }

    onChangeShelf = (event) =>{
        this.setState({ shelf : event.target.value});
        this.props.onBookMove(this.props.book,event.target.value);
    }

    render(){

        return (
                <div className="book-shelf-changer">
                    <select value={this.state.shelf} onChange={this.onChangeShelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
        );
    }
}

export default BookMove;
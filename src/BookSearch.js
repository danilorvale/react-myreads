import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

class BookSearch extends Component{

    static propTypes = {
        onBookMove : PropTypes.func.isRequired,
        myAllBooks : PropTypes.array.isRequired
    };

    state = {
        query: '',
        bookList : [],
        hasItem : false
    };

    onChange = (query)=>{
        if(query === undefined || query === ''){
            this.setState({hasItem : false, query: ''});            
        }else{
            this.setState({ query: query.trim() });
            BooksAPI.search(query)
                    .then(result => {
                            if(result !== undefined && result.length > 0){
                                this.setState({hasItem : true});
                                this.setState({bookList: this.checkShelfState(result)});
                            }else{
                                this.setState({hasItem : false});
                                this.setState({bookList: []});
                            }
                        });
        }
    };

    checkShelfState = (books)=>{
        //var listBooks = [];

        books.map((bookObject) =>{
            var bookFind = this.props.myAllBooks.filter(book => book.id === bookObject.id);

            if(bookFind !== undefined && bookFind.length > 0){
                bookObject.shelf = bookFind[0].shelf;
            }else{
                bookObject.shelf = 'none';
            }

            return bookObject;
        });

        return books;
    }

    onBookMove = (book,shelf) =>{
        this.props.onBookMove(book,shelf);
    }

    render(){        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">                    
                    <input type="text" value={this.state.query} onChange={(event) => this.onChange(event.target.value) } placeholder="Search by title or author"/>
                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                {this.state.hasItem && (
                    this.state.bookList.map((bookObject)=>(
                        <li key={bookObject.id}>
                            <Book book= {bookObject} onBookMove={this.onBookMove} shelf={bookObject.shelf}/>
                        </li>
                    ))
                 )}
                </ol>

                </div>
            </div>
        )
    };
}

export default BookSearch;
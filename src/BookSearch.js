import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { debounce } from 'throttle-debounce';

class BookSearch extends Component{
    constructor(props){
        super(props);
        this.state = {
            query: '',
            bookList : [],
            hasItem : false
        };
        this.autoCompleteSearchDebounce = debounce(500,this.autoCompleteSearh);
    }

    static propTypes = {
        onBookMove : PropTypes.func.isRequired,
        myAllBooks : PropTypes.array.isRequired
    };
    
    autoCompleteSearh = query =>{
        this.searchBook(query);
    };

    searchBook = query =>{
        if(query !== undefined && query !== ''){
            BooksAPI.search(query)
                        .then(result => {
                                if(result !== undefined && result.length > 0){
                                    this.setState({
                                                    bookList: this.checkShelfState(result),
                                                    hasItem : true
                                                });
                                }else{
                                    this.setState({
                                                    bookList: [],
                                                    hasItem : false
                                                });
                                }
                            });
        }else{
            this.setState({hasItem : false, query: ''});
        }
    };



    onChange = (query)=>{
        this.setState({ query : query.target.value}, () =>{
                this.autoCompleteSearchDebounce(this.state.query);
        });
    };

    checkShelfState = (books)=>{
        books.map((bookObject) =>{
            var bookFind = this.props.myAllBooks.find(book => book.id === bookObject.id);

            if(bookFind !== undefined){
                bookObject.shelf = bookFind.shelf;
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
                    <input type="text" value={this.state.query} onChange={this.onChange } placeholder="Search by title or author"/>
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
import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import PropTypes from 'prop-types'
import Book from './Book'

class BookSearch extends Component{

    static propTypes = {
        onBack: PropTypes.func.isRequired,
        onAddBookToRead: PropTypes.func.isRequired, 
        onAddBookToWantRead: PropTypes.func.isRequired, 
        onAddBookToReading : PropTypes.func.isRequired
    };

    state = {
        query: '',
        bookList : [],
        hasItem : false
    };

    onBack = () =>{
        this.props.onBack();
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
                                this.setState({bookList: result});
                            }else{
                                this.setState({hasItem : false});
                                this.setState({bookList: []});
                            }
                        });
        }
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

    render(){        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <a className="close-search" onClick={() => this.onBack()}>Close</a>
                <div className="search-books-input-wrapper">                    
                    <input type="text" value={this.state.query} onChange={(event) => this.onChange(event.target.value) } placeholder="Search by title or author"/>
                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                {this.state.hasItem && (
                    this.state.bookList.map((bookObject)=>(
                        <li>
                            <Book book= {bookObject} 
                                onAddBookToRead={() => this.onAddBookToRead(bookObject)} 
                                onAddBookToWantRead ={() => this.onAddBookToWantRead(bookObject)} 
                                onAddBookToReading ={() =>this.onAddBookToReading(bookObject)} />
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
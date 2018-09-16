import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import PropTypes from 'prop-types'
import Book from './Book'

class BookSearch extends Component{

    static propTypes = {
        onBack: PropTypes.func.isRequired
    };

    state = {
        query: '',
        bookList : [],
        hasItem : false
    };

    onChange = (query)=>{
        this.setState({ query: query.trim() });
        BooksAPI.search(query)
                .then(result => {
                        this.setState({bookList: result});
                        
                        if(this.state.bookList && this.state.bookList.length > 0){
                            this.setState({hasItem : true});
                        }else{
                            this.setState({hasItem : false});
                        }
                    });
    };

    render(){
        const { onBack } = this.props;
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <a className="close-search" onClick={() => onBack()}>Close</a>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" value={this.state.query} onChange={(event) => this.onChange(event.target.value) } placeholder="Search by title or author"/>

                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                {this.state.hasItem && (
                    this.state.bookList.map((bookObject)=>(
                        <li>
                            <Book book= {bookObject}/>
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
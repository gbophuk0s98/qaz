import React, { Component } from 'react'

import './search-panel.css'

export class SearchPanel extends Component {

    state = {
        placeHolderText: 'Type here to search',
        term: '',
    }

    onSearchChange = event => {
        const term = event.target.value
        this.setState({term})
        this.props.onSearchChange(term)
    }

    render() {
        return <input 
                className="search-input" 
                placeholder={this.state.placeHolderText}
                value={this.state.term}
                onChange={this.onSearchChange}
            />
    }
}
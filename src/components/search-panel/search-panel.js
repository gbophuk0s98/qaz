import React from 'react'

import './search-panel.css'

export const SearchPanel = () => {
    const searchText = 'Type here to search'

    return <input className="search-input" placeholder={searchText}/>
}
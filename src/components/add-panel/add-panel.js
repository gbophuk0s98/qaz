import React, { Component } from 'react'
import '../search-panel/search-panel.css'

export class AddPanel extends Component {

    state = {
        label: '',
        id: 0,
    }

    onChangeToDo = (event, count) => {
        const value = event.target.value
        this.setState({ label: value, id: count, important: false, done: false})
    }

    clearInput = () => {
        document.getElementById("textInput").value = ''
    }

    render(){

        const { count, onAdded } = this.props

        return(
            <div className="top-panel d-flex">
                <input 
                    className="search-input" 
                    placeholder="add todo..."
                    id="textInput"
                    value={this.state.value}
                    onChange={(e) => {this.onChangeToDo(e, count)}}
                />
                <button 
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        this.clearInput()
                        onAdded(this.state)
                    }}
                >
                    Add todo
                </button>
            </div>
        )
    }

}
import React, {Component} from 'react'

import './todo-list-item.css'

export class TodoListItem extends Component{

    onLabelClick = () => {
        this.props.onToggleDone()
    }

    onExclamationClick = () => {
        this.props.onToggleImportant()
    }


    render(){
        
        const { label, onDeleted, done, important } = this.props

        let classes = 'todo-list-item'
        if (done) classes += ' done'
        if (important) classes += ' important'

        return (
            <span className={classes}>

                <span
                    className="todo-list-item-label"
                    onClick={this.onLabelClick}
                >
                    {label}
                </span>

                <button 
                    type="button"
                    className="btn btn-outline-success btn-sm"
                    onClick={this.onExclamationClick}
                >
                    <i className="fa fa-exclamation" />
                </button>

                <button 
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={onDeleted}
                >
                    <i className="fa fa-trash-o" />
                </button>

            </span>
            )
        }

}
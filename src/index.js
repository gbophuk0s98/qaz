import React, {Component} from 'react'
import ReactDom from 'react-dom'
import {AppHeader} from './components/app-header/app-header'
import {SearchPanel} from './components/search-panel/search-panel'
import {ToDoList} from './components/todo-list/todo-list'
import {ItemStatusFilter} from './components/item-status-filter/item-status-filter'
import { AddPanel } from './components/add-panel/add-panel'
 
export class App extends Component {

    constructor() {
        super()
        this.state = {
            todoData: [
                {label: 'Drink Coffee', id: 0, important: false, done: false},
                {label: 'Make Awesome App', id: 1, important: false, done: false},
                {label: 'Have a lunch', id: 2, important: false, done: false},
            ],
            term: '',
            filter: 'all',
        }
        this.countToDo = this.state.todoData.length
        this.countDone = 0
    }

    onToggleDone = (id) => {

        const todoDataUpdated = this.state.todoData.filter((item) => {
            this.countDone = 0
            if (item.id === id) {
                item.done = !item.done
                return item
            }
            return item
        })

        this.countToDo = this.state.todoData.length
        todoDataUpdated.filter(item => {
            if (item.done) {
                this.countDone++
                this.countToDo--
            }
        })

        this.setState({
            todoData: todoDataUpdated
        })
    }

    onToggleImportant = (id) => {

        const todoDataUpdated = this.state.todoData.filter((item) => {
            if (item.id === id) {
                item.important = !item.important
                return item
            }
            return item
        })
        this.setState({
            todoData: todoDataUpdated
        })
    }

    deleteItem = (id) => {
        if (this.state.todoData.length > 0){
            this.countToDo--
        }
        this.setState(({todoData}) => {
            const newArray = todoData
            newArray.splice(todoData.findIndex((el) => el.id === id), 1)

            return {
                todoData: newArray
            }
        })
    }

    addItem = (item) => {
        this.countToDo++
        this.setState(({todoData}) => {
            const newArray = todoData
            newArray.push(item)
            return {todoData: newArray}
        })
    }

    search(items, term){
        if (term.length === 0){
            return items
        }
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }

    onSearchChange = (term) => {
        this.setState({ term })
    }

    onFilterChange = (filter) => {
        this.setState({ filter })
    }

    filter(items, filter){
        switch (filter) {
            case 'all': return items
            case 'active': return items.filter(item => !item.done)
            case 'done': return items.filter(item => item.done)
            default: return items
        }
    }

    render(){

        const { todoData, term, filter} = this.state
        const visibleItems = this.filter(this.search(todoData, term), filter)

        return(
            <div className="container m-auto">
                <div className="mw-500">
                    <AppHeader 
                        toDo={this.countToDo} 
                        done={this.countDone}
                    />
                    <div className="top-panel d-flex">
                        <SearchPanel 
                            onSearchChange={this.onSearchChange}
                        />
                        <ItemStatusFilter 
                            filter={filter}
                            onFilterChange={this.onFilterChange}
                        />
                    </div>
                    <ToDoList 
                        todos={visibleItems}
                        onDeleted={this.deleteItem}
                        onToggleDone= {this.onToggleDone}
                        onToggleImportant= {this.onToggleImportant}
                    />
                    <AddPanel
                        count={todoData.length}
                        onAdded={this.addItem}
                    />
                </div>
            </div>
        )   
    }
}

ReactDom.render(<App/>, document.getElementById('root'))

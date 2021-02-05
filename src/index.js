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

    changeToDoDataId(){
        const newArray = this.state.todoData.map((item, index) => {
            item.id = index
            return item
        })
        this.setState({ todoData: newArray })
    }

    getCountDone(){
        let count = 0
        this.state.todoData.forEach(item => {
            if (item.done) count++
        })
        return count
    }

    getCountToDo(){
        return this.state.todoData.length
    }

    getToDoData(){
        return this.state.todoData
    }

    onToggleDone = (id) => {

        let todoDataUpdated = this.getToDoData()

        todoDataUpdated = todoDataUpdated.filter(item => {
            if (item.id === id){
                item.done = !item.done
            }
            return true
        })
        
        this.setState(({todoData}) => {
            return {todoData: todoDataUpdated}
        })

        this.countDone = this.getCountDone()
        this.countToDo = this.getCountToDo() - this.countDone

    }

    onToggleImportant = (id) => {

        let todoDataUpdated = this.getToDoData()

        todoDataUpdated = todoDataUpdated.filter((item) => {
            if (item.id === id) item.important = !item.important
            return true
        })
        this.setState({
            todoData: todoDataUpdated
        })
    }

    deleteItem = (id) => {

        this.state.todoData.forEach(item => {
            if (item.id === id && item.done) this.countDone--
            else if(item.id === id && this.countToDo > 0) this.countToDo--
        })

        this.setState(({todoData}) => {

            const newArray = todoData
            newArray.splice(todoData.findIndex((el) => el.id === id), 1)

            return {
                todoData: newArray
            }
        })
    }

    addItem = (item) => {
        this.setState(({ todoData }) => {

            let newArray = todoData.map((item, index) => {
                item.id = index
                // console.log(`Items Array: {label: ${item.label}, id: ${item.id}}`)
                return item
            })

            // console.log(`Item: {label: ${item.label}, id: ${item.id}}`)
            newArray.push(item)
            return { todoData: newArray }
        })

        this.countToDo = this.getCountToDo() + 1 - this.getCountDone()
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

import React, {Component} from 'react'
import ReactDom from 'react-dom'
import {AppHeader} from './components/app-header/app-header'
import {SearchPanel} from './components/search-panel/search-panel'
import {ToDoList} from './components/todo-list/todo-list'
import {ItemStatusFilter} from './components/item-status-filter/item-status-filter'
 
export class App extends Component {

    state = {
        todoData: [
            {label: 'Drink Cofee', important: false, id: 1},
            {label: 'Make Awesome App', important: true, id: 2},
            {label: 'Have a lunch', important: false, id: 3},
        ]
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const newArray = todoData
            newArray.splice(todoData.findIndex((el) => el.id === id), 1)

            return {
                todoData: newArray
            }
        })
    }
    
    render(){
        return(
            <div className="container m-auto">
                <div className="mw-500">
                    <AppHeader />
                    <div className="top-panel d-flex">
                        <SearchPanel />
                        <ItemStatusFilter />
                    </div>
                    <ToDoList 
                        todos={this.state.todoData}
                        onDeleted={this.deleteItem}
                    />
                </div>
            </div>
        )   
    }
}

ReactDom.render(<App/>, document.getElementById('root'))

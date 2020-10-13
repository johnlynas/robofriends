import React from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox'
import './App.css'


class App extends React.Component {

    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        //  Make requests using fetch method
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }))
    }

    // Any time you are using React components  and you are defining you own functions, you  need to declare 
    // using => format , rather than function name. This makes sure that 'this' points to app 
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        });

        if (this.state.robots.length === 0) {
            return (<h1>Loading...</h1>)
        } else {
            return (
                <div className='tc'>
                    <h1 className="f2">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <CardList robots={filteredRobots} />
                </div>
            )
        }

    }
}

export default App;
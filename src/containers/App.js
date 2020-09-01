import React, {Component} from "react";
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import '../containers/App.css';
import ErrorBoundary from "../components/ErrorBoundary";
// import {robots} from "./robots"; <- og data from robots.js file

class App extends Component {
    //constructor
    constructor() {
        super();
        this.state = {
            //robots: robots intially
            robots: [],
            searchfield: ''
        }
    }

    //static getDerivedStateFromProps()
    //empty

    onSearchChange = (event) => {
        //setters
        this.setState({searchfield: event.target.value})
    }

    //render()
    render() {
        const { robots, searchfield } = this.state;

        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        return (
            <div className='tc'>
                <h1 className='f2'>Robofriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                <CardList robots={filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
        )}

    //componentDidMount()
    componentDidMount() {
        //fetching api
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }))
    }

//closing braces
}

export default App;

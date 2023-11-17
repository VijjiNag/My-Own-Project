import {Component} from 'react'
import './App.css';

class App extends Component {
  state = {
    userData : []
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const url = "http://localhost:3009/admins/"
    const options = {
      method : 'GET'
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
  }

  render() {
    const {userData} = this.state
    return (
      <h1> Hello World </h1>
    )
  }
}

export default App;

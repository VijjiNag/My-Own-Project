import React, { Component }  from 'react';
import Header from '../Header'
import './index.css'

class Home extends Component {
    componentDidMount() {
        document.title = "EduTech"
    }
    render() {
        return (
            <div>
                <Header/>
            </div>
        )
    }
}

export default Home
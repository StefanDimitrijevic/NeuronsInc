import React from 'react';
import './App.scss';

import Navigation from './components/Navigation/Navigation';
import Sidesignup from './components/Sidesignup/Sidesignup';
import Signup from './components/Signup/Signup';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Navigation />
                <div className="content-wrap">
                    <Sidesignup />
                    <Signup />
                </div>
            </div>
        );
    }
}

export default App;


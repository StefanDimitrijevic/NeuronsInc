import React from 'react';

import icon from '../../door-person.svg';
import './Sidesignup.scss';

class Sidesignup extends React.Component {
    render() {
        return (
            <div className="Sidesignup">
                <div className="header">
                    <p>Welcome back! <br/> Nice to see you again, we hope you are doing great</p>
                </div>
                <img src={icon} alt="Person opening door"/>
            </div>
        )
    }
}

export default Sidesignup;
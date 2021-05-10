import React from 'react';

import logo from '../../logo.svg';
import hub from '../../HUB.svg';
import './Navigation.scss';

class Navigation extends React.Component {
    render() {
        return (
            <div className="Navigation">
                <div className="logo-wrapper">
                    <img className="logo" src={logo} alt="Neurons Logo" />
                    <img src={hub} alt="Neurons Logo" />
                </div>
            </div>
        );
    }
}

export default Navigation;
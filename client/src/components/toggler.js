import React, {Component} from 'react';

class Toggler extends Component {
    render() {
        return (
            <div>
                <label className="toggle-label">
                    <input
                        type="checkbox"
                        name="isToggled"
                        onChange={this.props.setToggled}
                        checked={this.props.isToggled}/>
                    <span className="toggle-box">
                        <div className="toggle-box-line"></div>

                        <div className="toggle-box-circle"></div>
                    </span>
                    <span className="toggle-text">{this.props.isToggled ? "Free Shipping" : "Not Free Shippin (+ 25 RUB)" }</span>
                </label>
            </div>
        )
    }
}

export default Toggler
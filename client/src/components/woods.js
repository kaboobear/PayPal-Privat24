import React, {Component} from 'react';

class Woods extends Component {
    render() {
        return (
            <div className="radio-buttons woods">
                <div className="check-label-wrap">
                    <label className="check-label">
                        <input
                            type="radio"
                            name="woodRadioValue"
                            value="1"
                            checked={this.props.radioValue === '1'}
                            onChange={this.props.setRadioValue}/>
                        <span className="check-box" style={{'background':'url(img/img1.png) no-repeat center','backgroundSize':'85%'}}></span>
                    </label>
                </div>

                <div className="check-label-wrap">
                    <label className="check-label">
                        <input
                            type="radio"
                            name="woodRadioValue"
                            value="2"
                            checked={this.props.radioValue === '2'}
                            onChange={this.props.setRadioValue}/>
                        <span className="check-box" style={{'background':'url(img/img2.png) no-repeat center','backgroundSize':'85%'}}></span>
                    </label>
                </div>

                <div className="check-label-wrap">
                    <label className="check-label">
                        <input
                            type="radio"
                            name="woodRadioValue"
                            value="3"
                            checked={this.props.radioValue === '3'}
                            onChange={this.props.setRadioValue}/>
                        <span className="check-box" style={{'background':'url(img/img3.png) no-repeat center','backgroundSize':'85%'}}></span>
                    </label>
                </div>

                <div className="check-label-wrap">
                    <label className="check-label">
                        <input
                            type="radio"
                            name="woodRadioValue"
                            value="4"
                            checked={this.props.radioValue === '4'}
                            onChange={this.props.setRadioValue}/>
                        <span className="check-box" style={{'background':'url(img/img4.png) no-repeat center','backgroundSize':'85%'}}></span>
                    </label>
                </div>

                <div className="check-label-wrap">
                    <label className="check-label">
                        <input
                            type="radio"
                            name="woodRadioValue"
                            value="5"
                            checked={this.props.radioValue === '5'}
                            onChange={this.props.setRadioValue}/>
                        <span className="check-box" style={{'background':'url(img/img5.png) no-repeat center','backgroundSize':'85%'}}></span>
                    </label>
                </div>

                <div className="check-label-wrap">
                    <label className="check-label">
                        <input
                            type="radio"
                            name="woodRadioValue"
                            value="6"
                            checked={this.props.radioValue === '6'}
                            onChange={this.props.setRadioValue}/>
                        <span className="check-box" style={{'background':'url(img/img6.png) no-repeat center','backgroundSize':'85%'}}></span>
                    </label>
                </div>
            </div>
        )
    }
}

export default Woods
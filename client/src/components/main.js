import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import {LiqPayPay, LiqPaySubscribe} from "react-liqpay";

import Toggler from './toggler';
import Radios from './radios';
import Woods from './woods';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isToggled: true,
            radioValue: '1',
            woodRadioValue: '1',
            plusPriceArr: [
                1, 1.1, 1.25
            ],
            priceArr: [
                100,
                120,
                175,
                75,
                100,
                200
            ]
            // priceArr: [
            //     1,
            //     1,
            //     1,
            //     1,
            //     1,
            //     1
            // ]
        }

        this.onChange = this
            .onChange
            .bind(this);
        this.onSubmit = this
            .onSubmit
            .bind(this);
    }

    onChange(e) {
        const {value, name, type, checked} = e.target;

        this.setState({
            [name]: (type === 'checkbox')
                ? checked
                : value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const {radioValue, woodRadioValue, isToggled, plusPriceArr, priceArr} = this.state;
        const sum = priceArr[woodRadioValue - 1] * plusPriceArr[radioValue - 1] + (isToggled
            ? 25
            : 0);
        const data = {
            summary: sum
        }

        axios
            .post('/pay', data)
            .then((data) => {
                window.location = data.data.href;
            })
            .catch((err) => {})

    }


    

    render() {
        const {isAuth, isLoading, items} = this.props;
        const {radioValue, woodRadioValue, isToggled, plusPriceArr, priceArr} = this.state;
        const sum = priceArr[woodRadioValue - 1] * plusPriceArr[radioValue - 1] + (isToggled
            ? 25
            : 0);



            const ButtonComponent = () => (
                <button style={{
                  backgroundColor: '#337ab7',
                  color: '#fff',
                  borderColor: '#2e6da4',
                  border: '1px solid transparent',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  cursor: 'pointer'
                }}>
                  Order2
                </button>
              )


        return (
            <div className="main-section">
                <div className="payment-form-wrap">
                    <form className="payment-form">

                        <div className="items">
                            <Woods radioValue={this.state.woodRadioValue} setRadioValue={this.onChange}/>
                        </div>

                        <div className="filters">
                            <Toggler isToggled={this.state.isToggled} setToggled={this.onChange}/>
                            <Radios radioValue={this.state.radioValue} setRadioValue={this.onChange}/>
                        </div>

                        <input type="hidden" name="summary" value={sum}/>

                        <div className="total">
                            <div className="total-word">
                                Total
                            </div>

                            <div className="total-value">
                                {sum}
                                <span className="cur">UAH</span>
                            </div>
                        </div>

                        <div className="buttons">
                            <div onClick={this.onSubmit} className="pay-btn btn">
                                PayPal
                            </div>

                            <LiqPayPay
                                publicKey={'sandbox_i32483861461'}
                                privateKey={'sandbox_V6hDFhKEY2K1TxLqTGk7g469cuNTHC2LNQ1yMh74'}
                                amount={sum}
                                description="Payment for Kaboo's Woods"
                                currency="UAH"
                                // orderId={Math.floor(1 + Math.random() * 900000000)}
                                result_url="http://localhost:3000/"
                                server_url="http://localhost:5000/liq"
                                extra={[<button className="btn liq-btn">Privat24</button>]}/>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({isAuth: state.auth.isAuthenticated, isLoading: state.auth.isLoading})
export default connect(mapStateToProps, {})(Main);
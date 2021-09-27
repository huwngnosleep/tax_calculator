import React, { Component, useState } from 'react'

import { signInWithGoogle } from '../firebase/firebase.utils'
import {
    Table
} from 'reactstrap'
import classnames from 'classnames';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import NumberFormat from 'react-number-format';

export default class History extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    countTotal() {
        let totalSalary = 0, totalTax = 0

        for (const item of this.state.data) {
            totalSalary += item.salary
            totalTax += item.tax
        }

        return [totalSalary, totalTax]
    }

    fetchData = async () => {
        const { currentUser } = this.props

        try {
            const response = await fetch(`https://huwngnosleeppp-default-rtdb.firebaseio.com/users/${currentUser.uid}/history.json`)

            const resData = await response.json()

            const loadedData = []
            for (const key in resData) {
                loadedData.push(resData[key])
            }
            this.setState({
                data: loadedData
            })

        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Salary</th>
                        <th>Tax</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map((item, index) =>
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>
                                <NumberFormat
                                    value={item.salary}
                                    className="foo"
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={' VND'}
                                    renderText={(value, props) => <p {...props}>{`${value}`}</p>}
                                /></td>
                            <td>
                                <NumberFormat
                                    value={item.tax}
                                    className="foo"
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={' VND'}
                                    renderText={(value, props) => <p {...props}>{`${value}`}</p>}
                                /></td>
                            <td>{item.date}</td>
                        </tr>
                    )}
                    <tr>
                        <th scope="row">Tổng</th>
                        <td>
                            <NumberFormat
                                value={this.countTotal.bind(this)()[0]}
                                className="foo"
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' VND'}
                                renderText={(value, props) => <p {...props}>{`${value}`}</p>}
                            /></td>
                        <td>
                            <NumberFormat
                                value={this.countTotal.bind(this)()[1]}
                                className="foo"
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' VND'}
                                renderText={(value, props) => <p {...props}>{`${value}`}</p>}
                            /></td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>

        )

    }
}
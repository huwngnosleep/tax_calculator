import React, { Component, useState } from 'react'

import { signInWithGoogle } from '../firebase/firebase.utils'
import {
    Form, Input, Button, Container, Label, Row, Col,
    FormGroup, FormText,
    TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText,
} from 'reactstrap'
import classnames from 'classnames';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import NumberFormat from 'react-number-format';
import History from './History';
import { auth } from '../firebase/firebase.utils';

export default function Main({ currentUser }) {
    const [startDate, setStartDate] = useState(new Date());
    const [activeTab, setActiveTab] = useState('1');
    const [salary, setSalary] = useState("0")
    const [result, setResult] = useState(null)
    const [showError, setShowError] = useState(false)
    const [numOfDependent, setNumOfDependent] = useState(0)

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const handleSummit = async (tax) => {
        setResult(tax)
        try {
            const response = await fetch(`https://huwngnosleeppp-default-rtdb.firebaseio.com//users/${currentUser.uid}/history.json`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tax: Number(tax),
                    salary: Number(salary),
                    date: startDate.toDateString(),
                })
            })

            const resData = await response.json()
            console.log(resData)

        } catch (error) {
            console.log(error)
        }

    }

    const onSubmit = () => {
        // validate if input is number to calculate
        var reg = new RegExp('^[0-9]+$');
        if (reg.test(salary)) {
            // counted salary = monthly salary - numOfDependence * 4,4 - 11
            const countedSalary = salary - numOfDependent * 4400000 - 11000000
            let tax = 0

            if (countedSalary < 0) {
                return handleSummit(0)
            }

            if (countedSalary <= 5000000) {
                tax = countedSalary * 0.05
            } else if (countedSalary <= 10000000) {
                tax = countedSalary * 0.1 - 250000
            } else if (countedSalary <= 18000000) {
                tax = countedSalary * 0.15 - 750000
            } else if (countedSalary <= 32000000) {
                tax = countedSalary * 0.2 - 1650000
            } else if (countedSalary <= 52000000) {
                tax = countedSalary * 0.25 - 3250000
            } else if (countedSalary <= 80000000) {
                tax = countedSalary * 0.3 - 5850000
            } else if (countedSalary > 80000000) {
                tax = countedSalary * 0.35 - 9850000
            }

            return handleSummit(tax.toFixed(0))
        }

    }

    return (
        <Container style={{
            display: 'flex', flexDirection: 'column',
            height: 600, maxWidth: 600,
            marginTop: 30

        }}>

            <p>{`Hi there, ${currentUser.displayName}!`}</p>
            <p>{`Email: ${currentUser.email}`}</p>
            <b onClick={() => auth.signOut()}>Sign out</b>

            <div style={{ width: '100%', flex: 1, marginTop: 30 }}>
                <Nav tabs>
                    <NavItem style={{ flex: 1, }}>
                        <NavLink
                            style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', display: 'flex' }}
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Monthly Income Tax
                        </NavLink>
                    </NavItem>
                    <NavItem style={{ flex: 1, }}>
                        <NavLink
                            style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', display: 'flex' }}
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            History
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1" style={{ flex: 1, height: '100%' }}>
                        <Form style={{ margin: 20 }}>
                            <FormGroup>
                                <Row>
                                    <Col >
                                        <Label>Date: </Label>
                                    </Col>

                                    <Col>
                                        <DatePicker
                                            selected={startDate} onChange={(date) => setStartDate(date)} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col >
                                        <Label >Salary</Label>
                                    </Col>

                                    <Col>
                                        <Input
                                            value={salary}
                                            onChange={(e) => setSalary(e.target.value)}
                                            style={{ width: '70%', height: 30, borderWidth: 1, borderColor: '#333', borderRadius: 0 }}
                                            placeholder="Your salary, VND" />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col >
                                        <Label >Dependent People</Label>
                                    </Col>

                                    <Col>
                                        <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple
                                            style={{ width: '70%', height: 60, borderWidth: 1, borderColor: '#333', borderRadius: 0 }}
                                        >

                                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) =>
                                                <option
                                                    style={{ color: item == numOfDependent ? 'red' : 'black' }}
                                                    onClick={() => setNumOfDependent(item)}
                                                >{item}</option>
                                            )}
                                        </Input>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <Button
                                onClick={onSubmit}
                            >Submit</Button>

                            {result != null &&
                                <FormGroup>
                                    <Row style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 30,
                                    }}>
                                        <h3>Your income tax is:</h3>
                                        <NumberFormat
                                            value={result}
                                            className="foo"
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' VND'}
                                            renderText={(value, props) => <h2 {...props} style={{ marginLeft: 10 }}>{`${value}`}</h2>}
                                        />
                                    </Row>

                                </FormGroup>
                            }
                        </Form>

                    </TabPane>
                    <TabPane tabId="2">
                        <History currentUser={currentUser} />
                    </TabPane>
                </TabContent>
            </div>
        </Container>

    )
}

const styles = {
    text: {
        fontWeight: 'bold',
        margin: '0 5px',
    },
    icon: {
        height: '1.5rem',
        width: '1.2rem',
        margin: '0 5px',
    }
}
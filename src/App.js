import React from 'react';
import logo from './logo.svg';
import './App.css';

import Step1 from './steps/Step1.js';
import Step2 from './steps/Step2.js';
import Step3 from './steps/Step3.js';

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 1,
            currentMessage: "Please select your service. If not available, select \'custom\'",
            service:  '',
            totalBill: 0,
            deliveryFee: 0,
            serviceFee: 0,
            taxFee: 0,
            inputs: null
        }
    }

    /*Handling input of deliveryFee, serviceFee, and totalBill*/
    handleInsert = (total, delivery, service, tax, items) => {
        let currStep = this.state.currentStep
        currStep = currStep + 1

        this.setState({
            currentStep: currStep,
            totalBill: total,
            deliveryFee: delivery,
            serviceFee: service,
            taxFee: tax,
            inputs: items
        })
    }

    /*Handles the starting of the program*/
    handleStart = event =>  {
        const name = event.target.id
        this.setState({
            service: name
        })

        this._next()
    }

    handleChange = event => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSelection = event =>  {
        const {name} = event.target
        switch (name)   {
            case "ubereats.png":
                this.setState({
                    service: "Uber Eats"
                })
                break;
            case "skipthedishes.png":
                this.setState({
                    service: "Skip The Dishes"
                })
                break;
            case "foodora.png":
                this.setState({
                    service: "Foodora"
                })
                break;
            case "doordash.png":
                this.setState({
                    service: "Doordash"
                })
                break;
            default:
                this.setState({
                    service: "Custom"
                })
        }
    }

    //Sets the message to be printed at the top of the screen everytime
    _getMessage = (currStep) => {
        let currentStep = currStep
        switch (currStep)   {
            case 1:
                this.setState({
                    currentMessage: "Please select your service. If not available, select \'custom\'"
                })
                break;
            case 2:
                this.setState({
                    currentMessage: "Enter in your bill amounts"
                })
                break;
            case 3:
                this.setState({
                    currentMessage: "Allocate the orders per person"
                    })
                break;
        }
    }

    //Gets the next step
    _next = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 2? 3: currentStep + 1
        this._getMessage(currentStep)
        this.setState({
            currentStep: currentStep
        })
    }

    //Gets the previous step
    _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1? 1: currentStep - 1
        this._getMessage(currentStep)
        this.setState({
            currentStep: currentStep
        })
    }

    previousButton() {
        let currentStep = this.state.currentStep;
        if(currentStep !==1){
            return (
                <button
                    className="btn btn-secondary"
                    type="button" onClick={this._prev}>
                    Previous
                </button>
            )
        }
        return null;
    }

    nextButton(){
        let currentStep = this.state.currentStep;
        if(currentStep <3){
            return (
                <button
                    className="btn btn-primary float-right"
                    type="button" onClick={this._next}>
                    Next
                </button>
            )
        }
        return null;
    }

    render()  {
      return (
        <div className="App">
            <div className="centerR">
                <div className="header">
                    <h>Delivery Bill Splitter</h>
                    <p>{this.state.currentMessage}</p>
                </div>

                <form onSubmit={this.handleSubmit} class="mainForm">
                    <Step1
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        service={this.state.service}
                        clickAction={this.handleStart}
                    />

                    <Step2
                        currentStep={this.state.currentStep}
                        handleInsert={this.handleInsert}
                        service={this.state.service}
                        clickAction={this.handleStart}
                        addItem={this.handleAddItem}
                        removeItem={this.handleRemoveItem}
                        items={this.state.items}
                    />

                    <Step3
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        password={this.state.password}
                    />

                </form>

                <div className="footer">
                    <p>Made by Justin Zhang</p>
                </div>

                {/*
                <br/>
                <div className="DEBUGGING">
                    <pre>
                         {JSON.stringify(this.state.inputs)}
                         {JSON.stringify(this.state.taxFee)}
                         {JSON.stringify(this.state.serviceFee)}
                         {JSON.stringify(this.state.deliveryFee)}
                         {JSON.stringify(this.state.totalBill)}
                    </pre>
                </div>
                */}

            </div>
        </div>
      );
  }
}

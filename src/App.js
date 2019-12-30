import React from 'react';
import './App.css';

import Step1 from './steps/Step1.js';
import Step2 from './steps/Step2.js';
import Step3a from './steps/Step3a.js';
import Step3b from './steps/Step3b.js';
import Step4 from './steps/Step4.js';

import { BrowserRouter as Router} from 'react-router-dom';

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 1,
            currentMessage: "Please select your service. If not available, select 'custom'",
            service:  '',
            totalBill: 0,
            deliveryFee: 0,
            serviceFee: 0,
            taxFee: 0,
            count: 0,
            inputs: null,

            /*used for final item assignments*/
            currName: '',
            colStep: true,
            numPeople: 0,
            assignCount: 0,
            full: false,

            /*
                Used to store final assigned orders by person
            */
            names: [],
            assignedOrders: []
        }
    }

    handleFinalCalculations = () => {
        let values = {...this.state.inputs}
        let names  = {...this.state.names}

        var tempItems = []
        var assignedItems = []

        for (let i = 0; i < this.state.numPeople; ++i) {
            tempItems = []
            for (let j = 0; j < this.state.count; ++j) {
                if (values[j].assign === names[i])    {
                    tempItems.push({
                        itemName: values[j].itemName,
                        itemPrice: values[j].itemPrice
                    })
                }
            }

            assignedItems.push({
                name: names[i],
                items: tempItems,
                total: 0
            })
        }

        let finalValues = {...assignedItems}
        var priceAmount = 0

        for (let i = 0; i < this.state.numPeople; ++i)  {
            priceAmount = 0
            for (let j = 0; j < finalValues[i].items.length; ++j) {
                priceAmount = priceAmount + Number(finalValues[i].items[j].itemPrice)
            }
            priceAmount = Number(priceAmount) +  Number(this.state.deliveryFee / this.state.numPeople)
            priceAmount = Number(priceAmount) + Number(this.state.serviceFee / this.state.numPeople)
            priceAmount = Number(priceAmount) + Number(this.state.taxFee / this.state.numPeople)

            assignedItems[i].total = Number(priceAmount.toFixed(2))
        }

        this.setState({
            assignedOrders: assignedItems
        }, () => {console.log(this.state.assignedOrders)} )

        this._next();
    }

    handleCurrName = (name) => {
        this.updateColStep()
        this.setState({
            currName: name,
            numPeople: this.state.numPeople + 1,
            names: this.state.names.concat(name)
        })
    }

    updateColStep = () =>   {
        if (this.state.colStep)
            this.setState({ colStep: false })
        else
            this.setState({ colStep: true })
    }

    handleContinue = () => {
        this.updateColStep()

        if (this.state.count === this.state.assignCount)
            this.setState({
                full: true
            })
    }

    /*Handles each time Step3 updates the assign of a variable*/
    handleNameAssign = (index) =>  {
        let values = {...this.state.inputs}
        let aCount = this.state.assignCount
        let isFull = false

        if (values[index].assign === 'unassigned')
            aCount = aCount + 1
        if (aCount === this.state.count)
            isFull = true

        values[index].assign = this.state.currName
        this.setState({
            assignCount: aCount,
            full: isFull
        })
    }

    /*Handling input of deliveryFee, serviceFee, and totalBill*/
    handleInsert = (total, delivery, service, tax, count, items) => {
        let currStep = this.state.currentStep
        this.setState({
            currentStep: currStep,
            totalBill: total,
            deliveryFee: delivery,
            serviceFee: service,
            taxFee: tax,
            count: count,
            inputs: items
        })
        this._next()
    }

    /*Handles the starting of the program*/
    handleStart = (name) =>  {
        this.handleSelection(name)
        this._next()
    }

    handleSelection = (name) =>  {
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

    _resetApp = () =>   {
        //Resetting the app
        this.setState({
            currentStep: 1,
            currentMessage: "Please select your service. If not available, select 'custom'",
            service:  '',
            totalBill: 0,
            deliveryFee: 0,
            serviceFee: 0,
            taxFee: 0,
            count: 0,
            inputs: null,

            currName: '',
            colStep: true,
            numPeople: 0,
            assignCount: 0,
            full: false,

            names: [],
            assignedOrders: []
        })
    }

    //Sets the message to be printed at the top of the screen everytime
    _getMessage = (currStep) => {
        switch (currStep)   {
            case 1:
                this.setState({
                    currentMessage: "Please select your service. If not available, select 'custom'"
                })
                break;
            case 2:
                this.setState({
                    currentMessage: "Enter in the items that you've ordered"
                })
                break;
            case 3:
                this.setState({
                    currentMessage: "Enter each person's name and select which items they ordered"
                })
                break;
            default:
                this.setState({
                    currentMessage: "Here is your split bill"
                })
        }
    }

    //Gets the next step
    _next = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 3? 4: currentStep + 1
        this._getMessage(currentStep)
        this.setState({
            currentStep: currentStep
        })
    }

    render()  {
      return (
        <div className="App">
            <div className="centerR">
                <div className="header">
                    <h>Delivery Bill Splitter</h>
                    <p>{this.state.currentMessage}</p>
                </div>

                <div className="mainForm">
                    <Step1
                        currentStep={this.state.currentStep}
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

                    <Step3a
                        currentStep={this.state.currentStep}
                        totalBill={this.state.totalBill}
                        deliveryFee={this.state.deliveryFee}
                        serviceFee={this.state.serviceFee}
                        taxFee={this.state.taxFee}
                        inputs={this.state.inputs}
                        count={this.state.count}

                        handleCurrName={this.handleCurrName}
                        colStep={this.state.colStep}
                    />

                    <Step3b
                        currentStep={this.state.currentStep}
                        totalBill={this.state.totalBill}
                        deliveryFee={this.state.deliveryFee}
                        serviceFee={this.state.serviceFee}
                        taxFee={this.state.taxFee}
                        inputs={this.state.inputs}
                        count={this.state.count}
                        currName={this.state.currName}
                        handleContinue={this.handleContinue}

                        handleNameAssign={this.handleNameAssign}
                        colStep={this.state.colStep}
                        finalStep={this.handleFinalCalculations}
                        full={this.state.full}
                    />

                    <Step4
                        currentStep={this.state.currentStep}
                        assignedOrders={this.state.assignedOrders}
                        resetApp={this._resetApp}
                    />

                </div>

                <div className="footer">
                    <p>Made by Justin Zhang</p>
                </div>

            </div>
        </div>
      );
  }
}

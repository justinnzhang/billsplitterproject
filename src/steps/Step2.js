import React, { useState, Fragment } from 'react';
import './StepCSS.css';

const Step2 = (props) => {
    const [inputFields, setInputFields] = useState([
        { itemName: '', itemPrice: '', assign: 'unassigned', index: -1}
    ]);

    //Variables to store all the single inputs
    const [ delivery, setDelivery ] = useState();
    const [ service, setService ] = useState();
    const [ total, setTotal ] = useState();
    const [ taxes, setTaxes ] = useState();

    const [ count, setCount ] = useState(1);

    const handleSubmit = e => {
        e.preventDefault();
        var i = 0;
        const values = [...inputFields];

        while (i < count)  {
            values[i].index = i;
            i++;
        }
        props.handleInsert(total, delivery, service, taxes, count, values)
    };

    /*Handles the input for all fixed values*/
    const handleInputChange2 = (event) => {
        switch (event.target.id)    {
            case "delivery":
                setDelivery(event.target.value)
                break;
            case "taxes":
                setTaxes(event.target.value)
                break;
            case "service":
                setService(event.target.value)
                break;
            default:
                setTotal(event.target.value)
        }
    }

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        if (event.target.name === "itemName") {
            values[index].itemName = event.target.value;
        } else {
            values[index].itemPrice = event.target.value;
        }

        setInputFields(values);
    };

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ itemName: '', itemPrice: '', assign: 'unassigned' });
        setCount(count + 1);
        setInputFields(values);
    };

    const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setCount(count - 1);
        setInputFields(values);
    };

    if (props.currentStep !== 2)    {
        return null
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="main">
                <p>Total Items: {count}</p>
                {inputFields.map((inputField, index) => (
                <Fragment key={`${inputField}~${index}`}>
                    <div className="fields">
                        <div className="removeButton" onClick={() => handleRemoveFields(index)}>
                            <h5>REMOVE</h5>
                        </div>
                        <div className="itemForm">
                            <span className="label">Item</span>
                            <input
                                placeholder="Enter Item Name Here"
                                type="text"

                                className="form"
                                id={inputField.intemName}
                                name="itemName"
                                value={inputField.itemName}
                                onChange={event => handleInputChange(index, event)}
                                />
                        </div>
                        <div className="priceForm">
                            <span className="label">Price</span>
                            <input
                                placeholder="Enter Item Price Here"
                                type="number"
                                step="0.01"
                                min="0.00"

                                className="form"
                                id={inputField.itemPrice}
                                name="itemPrice"
                                value={inputField.itemPrice}
                                onChange={event => handleInputChange(index, event)}
                            />
                        </div>
                    </div>
                </Fragment>
                ))}
            </div>
            <div className="fields fees">
                <div className="fees">
                    <span className="label">Taxes</span>
                    <input
                        type="number"

                        step="0.01"
                        min="0.00"
                        className="form"
                        id="taxes"
                        name="taxes"
                        value={taxes}
                        onChange={e => handleInputChange2(e)}
                    />
                </div>
                <div className="fees">
                    <span className="label">Delivery Fee</span>
                    <input
                        type="number"

                        step="0.01"
                        min="0.00"
                        className="form"
                        id="delivery"
                        name="delivery"
                        value={delivery}
                        onChange={e => handleInputChange2(e)}
                    />
                </div>

                <div className="fees">
                    <span className="label">Service Fee</span>
                    <input
                        type="number"
                        defaultValue=""
                        step="0.01"
                        min="0.00"
                        className="form"
                        id="service"
                        name="service"
                        value={service}
                        onChange={e => handleInputChange2(e)}
                    />
                </div>
            </div>

            <div className="fields total">
                <div className="">
                    <span className="label">Order Total</span>
                    <input
                        type="number"
                        defaultValue=""
                        step="0.01"
                        min="0.00"
                        className="form"
                        id="total"
                        name="total"
                        value={total}
                        onChange={e => handleInputChange2(e)}
                    />
                </div>
            </div>

            <button
                className="submitButton"
                type="submit"
                onSubmit={handleSubmit}
            >Next</button>

            <div className="addbutton" onClick={() => handleAddFields()}>
                <h6>+</h6>
            </div>
        </form>
  )
}

export default Step2;

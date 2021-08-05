import './styles.css'
import Logo from './components/Logo';
import { useState } from 'react';

function App() {

  const [bill, setBill] = useState("")
  const [tipPercentage, setTipPercentage] = useState("")
  const [numberOfPeople, setNumberOfPeople] = useState("")

  const [button_selected_5, set_button_selected_5] = useState(false)
  const [button_selected_10, set_button_selected_10] = useState(false)
  const [button_selected_15, set_button_selected_15] = useState(false)
  const [button_selected_25, set_button_selected_25] = useState(false)
  const [button_selected_50, set_button_selected_50] = useState(false)
  const [customTip, setCustomTip] = useState("")

  const [tipAmount, setTipAmount] = useState("$0.00")
  const [totalAmount, setTotalAmount] = useState("$0.00")

  const handleBillInput = (e) => {
    let verifyLetter = /[a-zA-Z]/
    let price = e.target.value

    if(!verifyLetter.test(price)){
      setBill(price)
      //console.log(bill)
      CalculateTip(price, tipPercentage, numberOfPeople)
    }
  }

  const handleTipButton = (e) => {
    //console.log(e.target.value)
    let value = e.target.value

    if(value == 5){
      setTipPercentage(value)
      setCustomTip("")
      CalculateTip(bill, value, numberOfPeople)

      set_button_selected_5(true)
      set_button_selected_10(false)
      set_button_selected_15(false)
      set_button_selected_25(false)
      set_button_selected_50(false)
    }
    else if(value == 10){
      setTipPercentage(value)
      setCustomTip("")
      CalculateTip(bill, value, numberOfPeople)

      set_button_selected_5(false)
      set_button_selected_10(true)
      set_button_selected_15(false)
      set_button_selected_25(false)
      set_button_selected_50(false)
    }
    else if(value == 15){
      setTipPercentage(value)
      setCustomTip("")
      CalculateTip(bill, value, numberOfPeople)

      set_button_selected_5(false)
      set_button_selected_10(false)
      set_button_selected_15(true)
      set_button_selected_25(false)
      set_button_selected_50(false)
    }
    else if(value == 25){
      setTipPercentage(value)
      setCustomTip("")
      CalculateTip(bill, value, numberOfPeople)

      set_button_selected_5(false)
      set_button_selected_10(false)
      set_button_selected_15(false)
      set_button_selected_25(true)
      set_button_selected_50(false)
    }
    else if(value == 50){
      setTipPercentage(value)
      setCustomTip("")
      CalculateTip(bill, value, numberOfPeople)

      set_button_selected_5(false)
      set_button_selected_10(false)
      set_button_selected_15(false)
      set_button_selected_25(false)
      set_button_selected_50(true)
    }
  }

  const handleCustomTipButton = (e) => {
    let verifyPrice = /^\d+(,\d{3})*(\.\d{1,2})?$/
    let price = e.target.value

    if(price.match(verifyPrice)){
      setCustomTip(price)
      setTipPercentage(price)
      CalculateTip(bill, price, numberOfPeople)

      set_button_selected_5(false)
      set_button_selected_10(false)
      set_button_selected_15(false)
      set_button_selected_25(false)
      set_button_selected_50(false)
    }

    
  }

  const handleNumberOfPeople = (e) => {
    let verifyLetter = /[a-zA-Z]/
    let people = e.target.value

    if(!verifyLetter.test(people)){
      setNumberOfPeople(people)
      CalculateTip(bill, tipPercentage, people)
    }
  }

  const CalculateTip  = (billNum, tipNum, peopleNum) => {
    console.log("calculating tip...")

    console.log(`Bill: ${billNum}, Tip: ${tipNum}, Nº People ${peopleNum}`)
    if(billNum && tipNum && peopleNum){
      //console.log(`Bill: ${bill}, Tip: ${tipPercentage}, Nº People ${numberOfPeople}`)
      let Localbill = parseFloat(billNum)
      let LocalTip = parseFloat(tipNum)
      let LocalPeople = parseInt(peopleNum)

      let tipAmountPerPerson = (Localbill * (LocalTip / 100) ) / LocalPeople
      setTipAmount(`$${tipAmountPerPerson.toFixed(2)}`);

      let totalPerPerson = (Localbill + (Localbill * (LocalTip / 100) ) ) / LocalPeople
      setTotalAmount(`$${totalPerPerson.toFixed(2)}`)
    }
    else{
      setTipAmount("$0.00")
      setTotalAmount("$0.00")
    }
  }

  return (
    <div className="App">
        <div className = 'main'>
          
          <Logo /> 
          
          <div className="container">
            <div className='column calculation'>
                
                <div className="field-container">
                    <label className="field-label" for="total_amount">Bill</label>
                    <div className="input-with-logo">
                      
                      <input className="field-input" 
                        id="total_amount" 
                        type="text" 
                        placeholder="0" 
                        value={bill} 
                        onChange={e => handleBillInput(e)} />

                      <img className="input_logo" src="./images/icon-dollar.svg" alt="" />

                    </div>
                </div>
                
                <div className="field-container">
                    <label className="field-label">Select Tip %</label>
                    <div className="tips-options">

                      <button className={button_selected_5 ? "tip-button tip-button-selected" : "tip-button"}
                        onClick={(e) => handleTipButton(e) } 
                        value={5} >5%</button>

                      <button className={button_selected_10 ? "tip-button tip-button-selected" : "tip-button"}
                        onClick={(e) => handleTipButton(e) } 
                        value={10}>10%</button>

                      <button className={button_selected_15 ? "tip-button tip-button-selected" : "tip-button"}
                        onClick={(e) => handleTipButton(e) } 
                        value={15}>15%</button>

                      <button className={button_selected_25 ? "tip-button tip-button-selected" : "tip-button"}
                        onClick={(e) => handleTipButton(e) } 
                        value={25}>25%</button>

                      <button className={button_selected_50 ? "tip-button tip-button-selected" : "tip-button"}
                        onClick={(e) => handleTipButton(e) } 
                        value={50}>50%</button>

                      <input className="tip-option field-input"
                        value={customTip} 
                        onChange={(e) => handleCustomTipButton(e)}
                        placeholder="Custom"/>

                    </div>
                </div>
                
                <div className="field-container">
                    <label className="field-label" for="number_of_people">Number of People</label>
                    <div className="input-with-logo">
                      <input className="field-input" 
                        id="number_of_people" 
                        value = {numberOfPeople}
                        onChange = {(e) => handleNumberOfPeople(e)}
                        type="text" 
                        placeholder="0"/>
                      <img className="input_logo" src="./images/icon-person.svg" alt="" />
                    </div>
                    
                </div>

            </div>
            <div className="flex-col column result">
                <div>
                  <div className="flex-row space-between">
                    <div className="flex-col result-field">
                      <p className="result-title">Tip Amount</p>
                      <p className="result-subtitle">/ person</p>
                    </div>
                    <p className="result-value">{tipAmount}</p>
                  </div>

                  <div className="flex-row space-between">
                    <div className="flex-col result-field">
                      <p className="result-title">Total</p>
                      <p className="result-subtitle">/ person</p>
                    </div>
                    <p className="result-value" >{totalAmount}</p>
                  </div>
                </div>

              
                <button className="reset-btn not-interactable" >RESET</button>
          
            
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;

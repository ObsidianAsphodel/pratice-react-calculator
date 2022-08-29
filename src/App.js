import React, {useReducer} from 'react'
import './App.css';
import './Components/styles.css'
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

//All the actions the user can do
export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate'
}
//takes in our state - different types of actions and the parameters that they take in
function reducer(state, {type, payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      //prevents adding an infiinte amount of 0s
      if(payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      //prevents adding a decimal if theres already one
      if(payload.digit === "." && state.currentOperand.includes(".")){
        return state
      }

      //add digit operation
      return {
        // spread syntax - takes in an iterable(usually an arrary),
        //  and expands it into individual elements.
        // commonly create copies of JS Objects
        ...state,
        currentOperand: `${state.currentOperand}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null)
      {
        return state
      }

      if(state.previousOperand == null){
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }

      return{
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.CLEAR:
      return {}
  }
}
function evaluate({currentOperand, previousOperand,operation}){
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = "" 
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "/":
        computation = prev / current
        break
  }

  return computation.toString()
}

function App(){
  //reducer
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
        <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
        <button>DEL</button>
        <OperationButton digit="/" dispatch={dispatch}/>
        <DigitButton digit="1" dispatch={dispatch}/>
        <DigitButton digit="2" dispatch={dispatch}/>
        <DigitButton digit="3" dispatch={dispatch}/>
        <OperationButton digit="*" dispatch={dispatch}/>
        <DigitButton digit="4" dispatch={dispatch}/>
        <DigitButton digit="5" dispatch={dispatch}/>
        <DigitButton digit="6" dispatch={dispatch}/> 
        <OperationButton digit="+" dispatch={dispatch}/>
        <DigitButton digit="7" dispatch={dispatch}/>
        <DigitButton digit="8" dispatch={dispatch}/>
        <DigitButton digit="9" dispatch={dispatch}/>
        <OperationButton digit="-" dispatch={dispatch}/>
        <DigitButton digit="." dispatch={dispatch}/>
        <DigitButton digit="0" dispatch={dispatch}/>
        <button className="span-two">=</button>
    </div>
  )
}
export default App;

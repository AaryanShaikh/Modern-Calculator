class Calculator{
	constructor(prevText,currText){/* taking values of the output*/
		this.prevText = prevText
		this.currText = currText
		this.clear()/*to clear all screen before starting*/
	}

	clear(){/* all clear logic*/
		this.currOperand = '';
		this.prevOperand = '';
		this.operation = undefined;
	}

	delete(){ /*delete 1 number*/
		this.currOperand = this.currOperand.toString().slice(0, -1)/* select the whole string from 0 - (n-1)*/
	}

	appendNum(number){ /*adding numbers one after another*/
		if (number == '.' && this.currOperand.includes('.')) {
			return /*if we type . and thers already . in string we return back*/
		}
		this.currOperand = this.currOperand.toString() + number.toString(); /* convert to string 2 concatinate*/
	}

	chooseOper(operation){ /* choose operation*/
		if (this.currOperand === '') {/*if curr ooperd is empty then return*/
			return
		}
		if (this.prevOperand != '') {
			this.compute()
		}
		this.operation = operation /*saving the operatnts*/
		this.prevOperand = this.currOperand
		this.currOperand = ''
	}

	compute(){/* compute results*/
		let res
		const prev = parseFloat(this.prevOperand)/*converting from string to float*/
		const curr = parseFloat(this.currOperand)
		if (isNaN(prev)||isNaN(curr)) { /*if prev operand and curr operdn is NaN*/
			return
		}
		switch (this.operation) {
			case '+': res = prev + curr
				break
			case '-': res = prev - curr
				break
			case '*': res = prev * curr
				break
			case '%': res = prev / curr
				break
			default: return
				break;
		}
		this.currOperand = res /* simple logic */
		this.operation = undefined;
		this.prevOperand = ''
	}

	getDisplayNum(number){ /*additional method to add commas*/
		const stringnum = number.toString()/*to split the integer and decimal part*/
		const integerdig = parseFloat(stringnum.split('.')[0])/*take string and split 2, 2parts 1 integer other with decimal */
		const decimaldig = stringnum.split('.')[1]/* the nums after the decimal part*/
		let integerdisplay
		if (isNaN(integerdig)) { /*if someone input nothing on the screen or inputs just a decimal place*/
			integerdisplay = ''
		}
		else{
			integerdisplay = integerdig.toLocaleString('en',{maximumFractionDigits:0})/*to make sure we dont have any decimal places after this*/
		}
		if (decimaldig != null) { /*the user entered . and has some numbers after it*/
			return `${integerdisplay}.${decimaldig}` 
		} else{
			return integerdisplay /*if they dont have any decimal digits*/
		}
	}

	updateRes(){/* update the res in the output*/
		this.currText.innerText = this.getDisplayNum(this.currOperand)
		this.prevText.innerText = this.getDisplayNum(this.prevOperand)
		if (this.operation != null) { /* if operation is selected concatinate operation to prev.innerText*/
		 	this.prevText.innerText = `${this.getDisplayNum(this.prevOperand)}${this.operation}`
		 } 
	}
}
const numberBtn = document.querySelectorAll('[data-num')/*select all the number btns*/
const operationBtn = document.querySelectorAll('[data-operation')
const equalsBtn = document.querySelector('[data-equals]')
const deleteBtn = document.querySelector('[data-del]')
const acBtn = document.querySelector('[data-ac]')
const prevText = document.querySelector('[data-prev]')
const currText = document.querySelector('[data-curr]')

const calculator = new Calculator(prevText,currText)

//number functions
numberBtn.forEach(button => {/*loop through all the num btns*/
	button.addEventListener('click',()=>{/*whenver we clik on the btn we want to do something*/
		calculator.appendNum(button.innerText)/*add number inside the btn*/
		calculator.updateRes()
	})
})

//operators functions
operationBtn.forEach(button => {/*loop through all the num btns*/
	button.addEventListener('click',()=>{/*whenver we clik on the btn we want to do something*/
		calculator.chooseOper(button.innerText)/*choose the operator inside the btn*/
		calculator.updateRes()
	})
})

//computation
equalsBtn.addEventListener('click',button =>{ /*on click the btn*/
	calculator.compute() /* do compute*/
	calculator.updateRes()/* then update*/
})

//All Clear
acBtn.addEventListener('click',button =>{ /*on click the btn*/
	calculator.clear() /* do clear*/
	calculator.updateRes()/* then update*/
})

//Delete
deleteBtn.addEventListener('click',button =>{ /*on click the btn*/
	calculator.delete() /* do delete*/
	calculator.updateRes()/* then update*/
})
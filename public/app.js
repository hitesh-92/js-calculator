class Calculator {
  constructor() {
    this.total = 0,       //keep track of result
    this.info = '',       //string showing the calculation until 'enter' clicked
    this.current = '',    //hold number string entered by user
    this.fn = '',         //store operator function (+=*/)
    this.session = false  //session active once inital calcution made (user clicks '=') and not cleared
  }

  infoString(){
    //return a string to display calculation information
    return this.info + this.current + ' ' + this.fn
  }

  calculate(self){
    //perform operation specified on numbers selected by user

    // quicker operation. 2+= || 2*= == 4.
    if (self) this.total = eval(`${this.current} ${this.fn} ${this.current}`)
    //  normal calculation
    else this.total = eval(`${this.total} ${this.fn} ${this.current}`)

    //  append to data to update infoString
    this.info += ` ${this.fn} ${this.current}`
  }

  reset(current, info, fn){
    //  function to allow reset for certain criteria

    if (current) this.current = ''
    if (info) this.info = ''
    if (fn) this.fn = ''
  }

  buttonNums(btn){
    //  main switch function to allow user to enter data to be calculated

    //  allow user to make a new calculation. if inSession and no operator selected, switch session to false
    if(this.session && this.fn.length == 0) this.session = !this.session

    //once calculation made and not cleared: allow click for an operator for next calculation || C/CE to be clicked

    //if in session and operator not selected. reset all including this.session
    //if operator selected continue to use total for next calculation

    //init calculation: once selected current and fn => calculate, reset, update display
    var initalCalculation = this.fn.length == 1 && this.info.length == 0 && !this.session

    if (initalCalculation) {
      //add to total - do not calculate as setting inital value
      this.total = parseFloat(this.current);
      //place in info (increased info.length)
      this.info += `${this.current}`
      //reset current
      this.reset(true,false,false)
      //update display, current will we selected and display updated below
      $("#total").text(this.total)
      $("#info").text(this.infoString())
    }

    switch (btn) {
      case 'one':
        this.current += '1'
        break;
      case 'two':
        this.current += '2'
        break;
      case 'three':
        this.current += '3'
        break;
      case 'four':
        this.current += '4'
        break;
      case 'five':
        this.current += '5'
        break;
      case 'six':
        this.current += '6'
        break;
      case 'seven':
        this.current += '7'
        break;
      case 'eight':
        this.current += '8'
        break;
      case 'nine':
        this.current += '9'
        break;
      case 'zero':
        //  do not allow mulitple '0' entries to this.current if start of number
        if (this.current.split("")[0] == '0') break;
        else this.current += '0'
        break;

      case 'decimal':
        //  check to see if a decimal has already been added
        var checkCurrent = this.current.split("").filter(function(each){
          return each == '.'
        });
        //  only add decimal if not one already in use and if negative not selected
        if (checkCurrent.length == 0 /*&& this.current != '-'*/) this.current += '.'
        break;

      case 'negative':
        //add in check to see if current == '0' ? true, break : false, do below

        //switch number from positive to negative and vice versa
        var isNegative = this.current.split("")[0] == '-';
        if(!isNegative) this.current = '-' + this.current
        else this.current = this.current.split("").splice(1,this.current.length).join("")
        break;

      default:
        console.log('\n\n\n\n\n\nButtonNums Error!\n\n\n\n\n\n');

    }//switch

    $("#current").text(this.current);
  }//buttonNums


  buttonFns(btn){

    var _info = this.info.length
    var _current = this.current.length
    var inSession = this.session

    if (inSession){

      console.log('IN SESSION')

    } else {

      console.log('OUT SESSION')

      var setOperator = _current >= 1 || _current == 0 && _info >= 1;
      var chainOperation = _current >= 1 && _info >= 1;
      
    }

    switch (btn) {
      //if calculation made (enter been pressed). if more calculations made on total(NOT cleanred before next calculation), do calculate() on each time another operator selected

      case 'add':

        if (inSession){

          this.fn = '+'


        } else {  // not inSession



          //  allow user to chain together operations
          if (_current >= 1 && _info >= 1){
            this.calculate()
            this.reset(true,false,true)
            this.fn = '+'
          }

          //  allow user to set operator
          else if (_current >= 1 || _current == 0 && _info >= 1) this.fn = '+'

        }

        break;


      case 'minus':

      //  allow user to chain together operations
      if (chainOperation){
        this.calculate()
        this.reset(true,false,true)
        this.fn = '-'
      }

      //  allow user to set operator
      else if (setOperator) this.fn = '-'

        break;



/*
      case 'minus':
        if (_info == 0){
          //only allow if number selected
          // if(_current == 0) break;
          //if number selected change operator to '-'
          // else if (_current >= 1) this.fn = '-'

          if (_current >= 1) this.fn = '-'
          else if (this.session && _current == 0) this.fn = '-'
          else if (this.session){
            this.calculate()
            this.reset(true,false,true)
            this.fn = '-'
          }
          else break;

        }

        //if this.info exists. (1st number or more added to this.info)
        else if (_info >= 1){
          //if number selected. calculate(), update display
          if (_current >= 1){
            this.calculate()
            this.reset(true,false,true)
            this.fn  = '-'
          }
          else this.fn = '-'
        }
        break;


      case 'multiply':
        //inital calculation
        if (_info == 0){
          //only allow if number selected
          // if (_current == 0) break;
          // else this.fn = '*'

          if (_current >= 1) this.fn = '*'
          else if (this.session && _current == 0) this.fn = '*'
          else if (this.session){
            this.calculate()
            this.reset(true,false,true)
            this.fn = '*'
          }
          else break;

        } else {
          if (_current >= 1){
            this.calculate();
            this.reset(true,false,true)
            this.fn = '*'
          }
          else this.fn = '*'
        }
        break;

      case 'divide':
        //inital calculation
        if (_info == 0){
          //only allow if number selected
          if (_current >= 1) this.fn = '/'
          else if (this.session && _current == 0) this.fn = '/'
          else if (this.session){
            this.calculate()
            this.reset(true,false,true)
            this.fn = '/'
          }
        } else {
          if (_current >= 1){
            this.calculate();
            this.reset(true,false,true)
            this.fn = '/'
          }
          else this.fn = '/'
        }
        break;
*/


      case 'enter':
        //if info exists: clear. reset current,info,fn
        //if no info: is current: current calc with total, no current: break
        if (_info == 0){
          if (_current == 0) break;
          else if(this.session){
            this.calculate()
            this.reset(true,true,true)
            //  set session to allow user to continue operating on total
            this.session = true;console.log('IN SESSION 1')
          }
          else {
            //pass true to calculate to use operator on same number
            this.calculate(true)
            this.reset(true,true,true)
            this.session = true; console.log('IN SESSION 2')
          }
        } else {
          //calculate and reset all
          this.calculate()
          this.reset(true,true,true)
          this.session = true; console.log('IN SESSION 3')
        }
        break;

      case 'CE':
        // reset this.current
        this.reset(true,false,false)
        //this.current = ''
        break;

      case 'C':
        //reset everything
        this.reset(true,true,true)
        this.total = 0;
        this.session = false
        break;

      default:
        console.log('\n\n\n\n\n\nButtonFn Error!\n\n\n\n\n\n');
    }

    $("#info").text(this.infoString());
    $("#total").text(this.total);
    $("#current").text(this.current);

  }//buttonFns

}//class

var calc = new Calculator();
// calc.session = true;
// $("#calculated").text(calc.calculated);

var buttonNumbers = [ 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'decimal', 'negative' ]
var buttonFunctions = [ 'C', 'CE', 'divide', 'multiply', 'minus', 'add', 'enter' ]

buttonNumbers.forEach(function(id){
  $(`#${id}`).click(function(e){
    calc.buttonNums(e.currentTarget.id)
  })
})

buttonFunctions.forEach(function(id){
  $(`#${id}`).click(function(e){
    calc.buttonFns(e.currentTarget.id)

  })
})

var c = () => console.log(calc)

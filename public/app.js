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
    //  perform operation specified on numbers selected by user

    //  quick calculation. e.g. users clicks '2','+','=' answer = 4.
    if (self) this.total = eval(`${this.current} ${this.fn} ${this.current}`)
    //  normal calculation
    else this.total = eval(`${this.total} ${this.fn} ${this.current}`)

    //  append to data to update infoString
    this.info += ` ${this.fn} ${this.current}`
  }

  reset(current, info, fn){
    //  function to allow for quick reset

    if (current) this.current = ''
    if (info) this.info = ''
    if (fn) this.fn = ''
  }

  buttonNums(btn){
    //  main switch function to allow user to enter data to be calculated

    //  allow user to make a new calculation, will be in session and no operator selected
    if(this.session && this.fn.length == 0) {
      this.session = !this.session;
      this.reset(true,true,true)
      $("#info").text(this.infoString());
      $("#total").text(this.total);
    }

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
        //  only add decimal if not one already in use

        //  check to see if a decimal has already been added
        var checkCurrent = this.current.split("").filter(function(each){
          return each == '.'
        });

        var isEmpty = checkCurrent.length == 0 && this.current.length == 0;
        var notEmpty = checkCurrent.length == 0;

        //  add decimal depending on condition
        if (isEmpty) this.current += '0.'
        else if (notEmpty) this.current += '.'

        break;

      case 'negative':
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

    //  set variables used to make conditional checks
    if (inSession){
      var setOperator = _current == 0;
      var chainOperation = this.fn.length != 0 && _current >= 1;
    } else {
      var setOperator = _current >= 1 || _current == 0 && _info >= 1;
      var chainOperation = _current >= 1 && _info >= 1;
    }


    switch (btn) {

      case 'add':

        if (inSession){

          //  allow user to chain together operations
          if (chainOperation){

            //  show user the total from first calculation at start of infoString
            if (_info == 0) this.info += this.total

            this.calculate()
            this.reset(true,false,true)
            this.fn = '+'
          }

          //  allow user to set/switch operator
          else if (setOperator) this.fn = '+'

        } else {  // not inSession

          //  allow user to chain together operations
          if (chainOperation){
            this.calculate()
            this.reset(true,false,true)
            this.fn = '+'
          }

          //  allow user to set/switch operator
          else if (setOperator) this.fn = '+'
        }
        break;


      case 'minus':
        if (inSession){
          if (chainOperation){
            if (_info == 0) this.info += this.total
            this.calculate()
            this.reset(true,false,true)
            this.fn = '-'
          }
          else if (setOperator) this.fn = '-'
        } else {
          if (chainOperation){
            this.calculate()
            this.reset(true,false,true)
            this.fn = '-'
          }
          else if (setOperator) this.fn = '-'
        }
      break;


      case 'multiply':
        if (inSession){
          if (chainOperation){
            if (_info == 0) this.info += this.total
            this.calculate()
            this.reset(true,false,true)
            this.fn = '*'
          }
          else if (setOperator) this.fn = '*'
        } else {
          if (chainOperation){
            this.calculate()
            this.reset(true,false,true)
            this.fn = '*'
          }
          else if (setOperator) this.fn = '*'
        }
      break;


      case 'divide':
        if (inSession){
          if (chainOperation){
            if (_info == 0) this.info += this.total
            this.calculate()
            this.reset(true,false,true)
            this.fn = '/'
          }
          else if (setOperator) this.fn = '/'
        } else {
          if (chainOperation){
            this.calculate()
            this.reset(true,false,true)
            this.fn = '/'
          }
          else if (setOperator) this.fn = '/'
        }
      break;


      case 'enter':
        //  check conditionals

        //  no entry made, do nothing
        var pass = _current == 0 || _info == 0 && this.fn == ''
        //  user quick calculation.   e.g   2+=   answer: 4
        var calculateSelf = !inSession && _current >= 1 && _info == 0 && this.fn != ''

        if (pass){
          console.log('pass');
          break;
        }
        else if (calculateSelf){
          this.calculate(true)
          this.reset(true,true,true)
          this.session = true
        } else {
          this.calculate()
          this.reset(true,true,true)
          this.session = true
        }

        break;

      case 'CE':
        //  allow user to erase currently selected number
        this.reset(true,false,false)    //this.current = ''
        break;

      case 'C':
        //  allow user to clear reset Calculator
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

class Calculator {
  constructor() {
    this.total = 0,
    this.info = '',
    this.current = '',
    this.fn = ''
  }

  infoString(){
    return this.info + this.current + ' ' + this.fn
  }

  calculate(self){
    var current = parseFloat(this.current)

    //if self: calculate using same current (1 number selected, fn selected and clicked '=', 3+= 6)
    //else: calculate to using fn and current (normal calculate function)

    // if(this.fn == '+') this.total += current

    if (this.fn == '+'){
      if (self) this.total = current + current;
      else this.total += current
    }

    // else if(this.fn == '-') this.total -= current

    else if (this.fn == '-'){
      if (self) this.total = current - current;
      else this.total -= current
    }

    // else if(this.fn == '*') this.total *= current

    else if (this.fn == '*'){
      if (self) this.total = current * current;
      else this.total *= current
    }

    // else if(this.fn == '/') this.total /= current

    else if (this.fn == '/'){
      if (self) this.total = current / current;
      else this.total /= current
    }

    this.info += ` ${this.fn} ${this.current}`
  }

  reset(current, info, fn){
    if (current) this.current = ''
    if (info) this.info = ''
    if (fn) this.fn = ''
  }

  buttonNums(btn){

    //init calculation: once selected current and fn =>
    //  add current to total and reset current
    //  update display
    if (this.fn.length == 1 && this.info.length == 0){
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
        //not allow mulitple '0' entries to this.current if start of number
        if (this.current.split("")[0] == '0') break;
        else this.current += '0'
        break;

      case 'decimal':
        //check to see if a decimal has already been added
        var checkCurrent = this.current.split("").filter(function(each){
          return each == '.'
        });
        //only add decimal if not one already in use and if negative not selected
        if (checkCurrent.length == 0 && this.current != '-') this.current += '.'
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

    // var negative = this.current.split("")[0] == '-'
    var _current = this.current.length
    var _info =  this.info.length

    switch (btn) {

      case 'add':
        //inital calculation
        if (_info == 0){
          // only allow click if number has been selected
          if (_current == 0) break;
          // set this.fn for inital calculation
          else if (_current >= 1) this.fn = '+'
        }

        //if this.info exists. (1st number or more added to this.info)
        else if (_info >= 1){
          //  if current exists: calculate(), update display/add to info, reset, set fn to +
          if (_current >= 1){
            this.calculate();
            this.reset(true,false,true)
            this. fn = '+'
          }
          //  if no current: allow to select '+' for next pick
          else if (_current == 0) this.fn = '+'
        }

        break;


      case 'minus':
        //test: -100 - -1 = -99
        //inital calculation
        if (_info == 0){
          //only allow if number selected
          if(_current == 0) break;
          //if number selected change operator to '-'
          else if (_current >= 1) this.fn = '-'
        }

        //if this.info exists. (1st number or more added to this.info)
        else if (_info >= 1){
          //if number selected. calculate(), update display
          if (_current >= 1){
            this.calculate()
            this.reset(true,false,true)
            this.fn  = '-'
          }
          else /*if (_current == 0)*/ this.fn = '-'
        }
        break;

      case 'multiply':
        //inital calculation
        if (_info == 0){
          //only allow if number selected
          if (_current == 0) break;
          else this.fn = '*'
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
          if (_current == 0) break;
          else this.fn = '/'
        } else {
          if (_current >= 1){
            this.calculate();
            this.reset(true,false,true)
            this.fn = '/'
          }
          else this.fn = '/'
        }
        break;

  //run function and clear all
      case 'enter':
        //if info exists clear. reset current,info,fn
        //if no info: is current: current calc with total, no current: break
        if (_info == 0){
          if (_current == 0) break;
          else {
            //pass true to calculate to use operator on same number
            this.calculate(true)
            this.reset(true,true,true)
          }
        }

        break;

      case 'CE':
        break;

      case 'C':
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
$("#calculated").text(calc.calculated);

var buttonNumbers = [ 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'decimal', 'negative' ]
var buttonFunctions = [ 'C', 'CE', 'divide', 'multiply', 'minus', 'add', 'enter' ]

buttonNumbers.forEach(function(id){
  $(`#${id}`).click(function(e){
    calc.buttonNums(e.currentTarget.id)
  })
});

buttonFunctions.forEach(function(id){
  $(`#${id}`).click(function(e){
    calc.buttonFns(e.currentTarget.id)
  })
})

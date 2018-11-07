class Calculator {
  constructor() {
    this.total = 0,
    this.info = '',
    this.current = '',
    this.fn = ''
  }

  infoString(){
    return this.info + this.current + this.fn
  }

  calculate(){
    if(this.fn == '+') this.total += parseFloat(this.current)
    else if(this.fn == '-') this.total -= parseFloat(this.current)
    else if(this.fn == '*') this.total *= parseFloat(this.current)
    else if(this.fn == '/') this.total /= parseFloat(this.current)
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
        //switch number from positive to negative and vice versa
        var isNegative = this.current.split("")[0] == '-';
        if(!isNegative) this.current = '-'+this.current
        else this.current = this.current.split("").splice(1,this.current.length).join("")
        break;

      default:
        console.log('\n\n\n\n\n\nButtonNums Error!\n\n\n\n\n\n');

    }//switch

    $("#current").text(this.current);
  }//buttonNums


  buttonFns(btn){

    var negative = this.current.split("")[0] == '-'
    switch (btn) {

      case 'add':
        //inital calculation
        if (this.info.length == 0){
          // only allow click if number has been selected
          if (this.current.length == 0 || negative && this.current.length == 1) break;
          //set this.fn for inital calculation
          if( negative && this.current.length >= 2 || this.current.length >= 1 ) this.fn = '+'
        }

        //if inital calculation made, info exists.
        if(this.info.length >= 1){
          //  if current exists: calculate(), update display/add to info, reset, set fn to +
          if(this.current != '-' && this.current.length >= 1){
            this.calculate();
            this.info += ` ${this.fn} ${this.current}`
            this.reset(true,false,true)
            this. fn = '+'
          }

          //  if no current: allow to select '+' for next pick
          if(this.current.length == 0) this.fn = '+'
        }

        //if current=='-' reset current and change fn to '+'


        break;


      case 'minus':
        //test: -100 - -1 = -99

        //if info.length > 1: run calculate


        //****allow 1 minus sign at beginning of number to select negative number and if info is empty
        //only run when this.current is empty
        if (this.current.length == 0) {
          this.current = '-';
          break;
        } else if (this.current == '-') {
          break;
        }

        if( this.current != '-' && this.current.length >= 1 ) this.fn = '-'

        /*
        //only allow click if number has been selected
        // if (this.current.length == 0 || negative) break;

        // //convert selected number to integer and minus from total
        // this.total -= parseFloat(this.current)
        // //add to this.info string
        // this.info += `${this.current} -`
        // //reset this.current
        // this.reset(true, false)
*/

        break;

/* *
      case 'multiply':
        console.log('multiply');
        break;



      case 'divide':
        console.log('divide');
        break;
*/

/* /
*/

/* enter
  //run function and clear all

      case 'enter':
        break;
*/



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

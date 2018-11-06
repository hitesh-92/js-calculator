class Calculator {
  constructor() {
    this.total = 0,
    this.info = '',
    this.current = '',
    this.fn = '',
    this.holding = 0
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

    //init calculation: once selected current and fn => add current to total and reset current. update display
    if (this.fn.length == 1 && this.info.length == 0){
      this.total = parseFloat(this.current);
      this.info += `${this.current} ${this.fn}`
      this.reset(true,false,true)
      $("#total").text(this.total)
      $("#info").text(this.info)
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

      default:
        console.log('\n\n\n\n\n\nButtonNums Error!\n\n\n\n\n\n');

    }//switch

    $("#current").text(this.current);
  }//buttonNums


  buttonFns(btn){
    //on init number enrtry
    //--  let user pick a function without any calculation running
    //--  allow user to change function without any calculation running
    //--  dont allow multiple click on fn button
    //--  dont allow multiple '0000' entries
    //--  allow a mius sign at start (if current is empty)

    //after fn selected and on to next number
    //  if this.function selected, current.length>2 OR negative AND current.length>2
    //  save and clear current
    //  if this is only the second number: dont add to
    //  once current number selected and fn button pressed again

    var negative = this.current.split("")[0] == '-'

    switch (btn) {

      case 'add':

        //if inital number selected, function selected, 2nd number selected AND add clicked again: run calculate(), add to info, display
        if(this.fn.length == 1){
          this.info += `${}`
          this.calculate();
          // this.info += `${}`
          this.reset(true, false, true);
        }

        // only allow click if number has been selected
        if (this.current.length == 0 || this.current.length == 1 && negative) break;

        //set this.function
        // if( this.current.length >= 1 )
        if( negative && this.current.length >= 2 || this.current.length >= 1 ) this.fn = '+'

        // //convert selected number to integer and add to total
        // this.total += parseFloat(this.current)
        // //add to this.info string
        // this.info += `${this.current} +`
        // //reset this.current
        // this.reset(true, false)
        break;


      case 'minus':
        //test: -100 - -1 = -99

        //if info.length > 1: run calculate
        console.log(`\n\n\n\n\n${negative}\n---------\n\n\n\n\n`);


        //allow 1 minus sign at beginning of number to select negative number
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
        //do final calculation, remove this.info content, this.reset current

        // do nothing if nothing entered
        if (this.info.length == 0 || this.current.length == 0) break;
        //
        // //split this.info. split/splice out the last 2 e.g ( [' - ', '1'] )
        // //used spliced to make the final calculation
        //
        var arr = this.info.split(" ");
        var arrLength = arr.length
        var spliced = arr.splice(arrLength-2, arrLength)
        if (spliced[0] == '+') this.calculated += parseFloat(spliced[1])
        else if (spliced[0] == '-') this.calculated -= parseFloat(spliced[1])
        else if (spliced[0] == '*') this.calculated *= parseFloat(spliced[1])
        else if (spliced[0] == '/') this.calculated /= parseFloat(spliced[1])
        this.current = ''
        this.info = ''
        clicked = false
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


// var buttonIDs = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'decimal', 'add', 'minus', 'divide', 'multiply'];
// var buttonIDs = [ 'clear', 'divide', 'multiply', 'minus', 'seven', 'eight', 'nine', 'add', 'four', 'five', 'six', 'one', 'two', 'three', 'enter', 'zero', 'decimal' ]
var buttonNumbers = [ 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'decimal' ]
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

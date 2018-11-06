class Calculator {
  constructor() {
    this.calculated = 0,
    this.info = '',
    this.current = ''
  }

  reset(current, info){
    if (info) this.info = ''
    if (current) this.current = ''
    // console.log('\n\n\n\n\n\n RESET! \n\n\n\n\n\n');
  }

  buttonNums(btn){

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
        this.current += '0'
        break;

      case 'decimal':
        //check to see if a decimal has already been added
        var checkCurrent = this.current.split("").filter(function(each){
          return each == '.'
        });
        //only add decimal if not one already in use
        if (checkCurrent.length == 0) this.current += '.'
        break;

      default:
        console.log('\n\n\n\n\n\nButtonNums Error!\n\n\n\n\n\n');

    }//switch

    // //if enter selected, var clicked = false, dont change to info or selected
    // if (clicked === false){
    //   return;
    // }

    // this.selected += clicked

    // $("#info").text(this.info);
    // $("#calculated").text(this.calculated);
    $("#current").text(this.current);

  }//buttonNums



  buttonFns(btn){

    switch (btn) {

      case 'add':
        //only allow click if number has been selected
        if (this.current.length == 0) break;
        //convert selected number to integer and add to total
        this.calculated += parseFloat(this.current)
        //add to this.info string
        this.info += `${this.current} +`
        //reset this.current
        this.reset(true, false)
        break;


      case 'minus':
        //test: -100 - -1 = -99

        //allow 1 minus sign at beginning of number to select negative number
        //only run when this.current is empty
        if ( this.current.length == 0 ) {
          var negative = this.current.split("")[0] == '-'
          if ( negative ) break;
          else this.current += '-'
        }

        //only allow click if number has been selected
        if (this.current.length == 0) break;

        //convert selected number to integer and minus from total
        // var selectedNumber = parseFloat(this.current)

        // minus from total
        //dont minus from total if info is empty

        // if (this.calculated == 0) break;

        //subtract from total
        // this.calculated -= selectedNumber
        //reset to select new number
        // this.current = ''
        //add sign to info
        // this.info += ' - '

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

    $("#info").text(this.info);
    $("#calculated").text(this.calculated);
    $("#current").text(this.current);


  }//buttonFns

}//class


var calc = new Calculator();
$("#calculated").text(calc.calculated);


// var buttonIDs = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'decimal', 'add', 'minus', 'divide', 'multiply'];
// var buttonIDs = [ 'clear', 'divide', 'multiply', 'minus', 'seven', 'eight', 'nine', 'add', 'four', 'five', 'six', 'one', 'two', 'three', 'enter', 'zero', 'decimal' ]
var buttonNumbers = [ 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'decimal' ]
var buttonFunctions = [ 'clear', 'divide', 'multiply', 'minus', 'add', 'enter' ]

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

const readline = require('readline-sync');
const Map = require('./components/board/map1');
const fs = require('fs');
const {dToStr} = require('./components/essentials/conv')
let demo = fs.readFileSync('json/map1.json');
const {play} = require('./playing');
demo = JSON.parse(demo), demo = demo.map;

function game(){
  function menu(){
    let index = 0;
    while(true){
      console.clear();
      // Checking where player is in menu
      let options = [`${(index===0)?'[play]':'play'}`,`${(index===1)?'[store]':'store'}`,`${(index===2)?'[inventory]':'inventory'}`,`${(index===3)?'[exit]':'exit'}`];
      let output = dToStr(options);

      console.log(output);

      let read = readline.keyIn('', {hideEchoBack: true, mask: "", limit: 'wsc '});
      // Navigating the menu and seeing if you are able to navigate said menu :)
      switch(read){
        case 'w':
          if(index > 0){
            index--;
          }
          break;
        case 's':
          if(index < 3){
            index++;
          }
          break;
        case ' ':
          switch(index){
            case 0:
              play();
              break;
            case 1:
              //store();
              break;
            case 2:
              //inventory();
              break;
            case 3:
              process.exit();
              break;
          }
        case 'c':
          process.exit();
          break;
      }
    }
  }

  menu();
}

game()

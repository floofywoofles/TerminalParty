const fs = require('fs');
const {apply, checkAttr} = require('./components/essentials/attr');
const readline = require('readline-sync');
const {dToStr} = require('./components/essentials/conv')
const {sleep} = require('./components/essentials/wait');
let mapOne = fs.readFileSync('./json/map1.json'); mapOne = JSON.parse(mapOne);
let mapTwo = fs.readFileSync('./json/map2.json'); mapTwo = JSON.parse(mapTwo);
let mapThree = fs.readFileSync('./json/map3.json'); mapThree = JSON.parse(mapThree);

exports.play = async function(){
  let chosen;

  function startGame(m){

  }

  function init(){
    console.clear();
    mapOne.blueTiles = 0;
    mapOne.redTiles = 0;

    mapTwo.blueTiles = 0;
    mapTwo.redTiles = 0;

    mapThree.blueTiles = 0;
    mapThree.redTiles = 0;

    console.log("Processing maps and their attributes...");

    console.log("Applying map one");
    mapOne = apply(mapOne);
    fs.writeFileSync('./json/map1.json', JSON.stringify(mapOne, null, 2));

    console.log("Applying map two");
    mapTwo = apply(mapTwo);
    fs.writeFileSync('./json/map2.json', JSON.stringify(mapTwo, null, 2));

    console.log("Applying map three");
    mapThree = apply(mapThree);
    fs.writeFileSync('./json/map3.json', JSON.stringify(mapThree, null, 2));

    console.log("Checking attributes");
    if(checkAttr(mapOne.map) && checkAttr(mapTwo.map) && checkAttr(mapThree.map)){
      console.log("Attributes applied properly");
    } else {
      console.log("Attributes failed to apply properly");
      process.exit();
    }
  }
  function chooseMap(){
    let index = 0;
    let yindex = 0;
    console.clear();
    while(true){
      console.clear();
      let options = [
        {name: 'Test Map', description: 'A neat little map!', blueTiles: mapOne.blueTiles, redTiles: mapOne.redTiles},
        {name: 'Test Map2', description: 'A neat little map two!', blueTiles: mapTwo.blueTiles, redTiles: mapTwo.redTiles},
        {name: 'Test Map3', description: 'A neat little map three!', blueTiles: mapThree.blueTiles, redTiles: mapThree.redTiles}
      ]

      console.log('################################################');
      console.log(`Map: ${options[yindex].name}`);
      console.log(`Blue Tiles: ${options[yindex].blueTiles}`);
      console.log(`Red Tiles: ${options[yindex].redTiles}`);
      console.log(`All Tiles: ${options[yindex].blueTiles + options[yindex].redTiles}`);
      console.log('\n\n');
      console.log('################################################');
      console.log(`${(index===0)?'[Select]':'Select'}   |   ${(index===1)?'[Next]':'Next'}`);
      console.log(`${(yindex===0)?'[1]':'1'}|${(yindex===1)?'[2]':'2'}|${(yindex===2)?'[3]':'3'}`);

      let read = readline.keyIn('', {hideEchoBack: true, mask: "", limit: 'adc '});

      switch(read){
        case 'a':
          if(index === 1){
            index = 0;
          }
          break;
        case 'd':
          if(index === 0){
            index = 1;
          }
          break;
        case ' ':
          switch(index){
            case 0:
              process.exit();
              break;
            case 1:
              if(yindex === 2){
                yindex = 0;
              } else {
                yindex++;
              }
              break;
          }
          break;
        case 'c':
          process.exit();
      }
    }
  }
  init();
  chooseMap();
  startGame(chosen);
}

console.log(dToStr(mapOne.map));

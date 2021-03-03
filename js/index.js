const inventoryElement = document.getElementById("inventory");
const canvas = document.getElementById('gameWindow');

const ctx = canvas.getContext('2d');

storage.ensure("inventory", {});

const player = {
  block: 0,
  inventory: storage.get("inventory")
}

var popEffect = new Audio('assets/pop.mp3');
var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET",`assets/blocks.json`, false);
xmlHttp.send(null);

const blocks = JSON.parse(xmlHttp.responseText);
const blockArray = Object.entries(blocks);
const map = [];

for (let i = 0; i < 100; i++) {
    const random = Math.floor(Math.random() * 4);
    let blockExists;

    const onlySeeds = blockArray.map(e=>e[1].type == "seed");
    for(let m = 0; m<onlySeeds.length; m++) {
      if(Math.floor(Math.random() * blockArray[m][1].chance) == 1) {
        blockExists = blockArray[m][0]
        drawSeed(i*10, random, 10, blockExists)
      }
    }
  
    map.push([i*10, 90-random, blockExists])
    ctx.fillStyle = blocks.grass.color;
    ctx.fillRect(i*10, 90-random, 10, 10);
}

ctx.fillStyle = "black";
ctx.fillRect(0, map[0][1]-10, 10, 10)

function drawSeed(x, y, scale, seed) {
      ctx.fillStyle = blocks[blocks[seed].base].color;
      ctx.fillRect(x, 80-y, scale, scale);
      ctx.fillStyle = blocks[seed].color
      ctx.fillRect(x, 70-y, scale, scale);
      
      return seed;
}

function update() {
  let block;

  window.onkeydown = e => {
    switch(e.key) {
      case "ArrowRight":
      case "d":
        player.block += 1;
        block = blocks[map[player.block-1][2]];
        
        if(block) {
          ctx.fillStyle = blocks[block.base].color;
          ctx.fillRect((player.block-1)*10, map[player.block-1][1]-10, 10, 10)
        } else
          ctx.clearRect((player.block-1)*10, map[player.block-1][1]-10, 10, 10)
        
        ctx.fillStyle = "black";
        ctx.fillRect(player.block*10, map[player.block][1]-10, 10, 10)
        break;
      case "ArrowLeft":
      case "a":
        player.block -= 1;
        block = blocks[map[player.block+1][2]];
        
        if(block) {
          ctx.fillStyle = blocks[block.base].color;
          ctx.fillRect((player.block+1)*10, map[player.block+1][1]-10, 10, 10)
        } else
          ctx.clearRect((player.block+1)*10, map[player.block+1][1]-10, 10, 10)
        
        ctx.fillStyle = "black";
        ctx.fillRect(player.block*10, map[player.block][1]-10, 10, 10)
        break;
      case "ArrowUp":
      case "e":
        const blockname = map[player.block][2];
        block = blocks[blockname];
        if(block) {
          if(!map[player.block][3]) {
            if(!player.inventory[blockname]) {
              player.inventory[blockname] = {
                name: blockname,
                amount: 1,
                type: "seed"
              }
            } else
              player.inventory[blockname].amount += 1;
            popEffect.play();            
            storage.set("inventory", player.inventory);
            
            ctx.clearRect(player.block*10, map[player.block][1]-20, 10, 10)
            map[player.block][3] = true;
          }
        }
        break;
    }
  }

  let string = ""
  
  for (const [key, value] of Object.entries(storage.get("inventory"))) {
    string += `<br>${key.charAt(0).toUpperCase() + key.slice(1)} x${value.amount}`;
  }
  
  inventoryElement.innerHTML = string;
  requestAnimationFrame(update);
}
requestAnimationFrame(update);

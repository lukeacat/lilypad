/*⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⠞⠀⠀⠀⠀⠀⠀⠀⠀⠀⢤⣄⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠠⠄⠤⠐⠚⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠓⠢⠤⣀⠀⠀⠀
⠀⠀⠀⠀⢀⠤⣖⣶⣭⣷⣼⣄⠁⠀⠀⠀⠀⠀⠀⢐⣫⣭⣴⣶⣦⢄⠀⠀⠀⠀
⠀⠀⠀⣪⣿⣿⣿⠿⢿⣿⣿⠻⣄⠀⠀⠀⠀⠀⢀⣼⠿⠿⢿⣿⣿⣿⣧⡀⠀⠀
⠀⠀⣩⣿⣿⡟⣿⣠⣼⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠁⢸⣤⣼⣿⣿⠻⣿⣿⠀⠀
⠀⢀⣿⣿⡟⠀⠹⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣿⠏⠀⢹⣿⡄⠀
⠀⠈⢿⣿⡃⠀⠀⠀⠉⢁⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣀⠈⠀⠀⠀⢰⠟⡇⠀
⠀⠀⠀⠉⠗⠖⠀⠊⠉⠉⠁⠀⠀⠀⠀⠀⠀⠰⠀⠀⠈⠙⠛⠒⠀⠐⠆⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣒⣢⣤⣤⣤⣤⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣝⠿⣿⣿⣿⣿⣿⠿⣻⠎⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠳⣈⡭⠭⣭⠴⠚⠁⠀⠀⠀⠀⠀⠀⠀*/
const inventoryElement = document.getElementById("inventory");
const canvas = document.getElementById('gameWindow');

const ctx = canvas.getContext('2d');

if(!localStorage.getItem('inventory'))
  localStorage.setItem('inventory', "{}");

const player = {
  block: 0,
  inventory: JSON.parse(localStorage.getItem('inventory'))
}

var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET","${location.href}/js/blocks.json", false);
xmlHttp.send(null);

const blocks = JSON.parse(xmlHttp.responseText);

const map = [];

for (let i = 0; i < 40; i++) {
    const random = Math.floor(Math.random() * 4);
    let block;
    if(Math.floor(Math.random() * 5) == 1) {
      block = drawSeed(i*10, random, 10, "sunflower")
    } else if(Math.floor(Math.random() * 10) == 1) {
      block = drawSeed(i*10, random, 10, "sakura")
    } else if(Math.floor(Math.random() * 15) == 1) {
      block = drawSeed(i*10, random, 10, "rose")
    } else if(Math.floor(Math.random() * 20) == 1) {
      block = drawSeed(i*10, random, 10, "iris")
    } else if(Math.floor(Math.random() * 25) == 1) {
      block = drawSeed(i*10, random, 10, "lilac")
    } else if(Math.floor(Math.random() * 30) == 1) {
      block = drawSeed(i*10, random, 10, "tulip")
    } else if(Math.floor(Math.random() * 35) == 1) {
      block = drawSeed(i*10, random, 10, "narcissus")
    } else if(Math.floor(Math.random() * 40) == 1) {
      block = drawSeed(i*10, random, 10, "potato")
    } else if(Math.floor(Math.random() * 45) == 1) {
      block = drawSeed(i*10, random, 10, "carrot")
    } else if(Math.floor(Math.random() * 50) == 1) {
      block = drawSeed(i*10, random, 10, "peony")
    }

    map.push([i*10, 90-random, block])
    ctx.fillStyle = blocks.grass.color;
    ctx.fillRect(i*10, 90-random, 10, 10);
}

ctx.fillStyle = "black";
ctx.fillRect(0, map[0][1]-10, 10, 10)

function drawSeed(x, y, scale, seed) {
      ctx.fillStyle = blocks.grass.color;
      ctx.fillRect(x, 80-y, scale, scale);
      ctx.fillStyle = blocks[seed].color
      ctx.fillRect(x, 70-y, scale, scale);
      
      return seed;
}

function update() {
  let block;
  window.onkeydown = e => {
    switch(e.key) {
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
      case "e":
        const blockname = map[player.block][2];
        block = blocks[blockname];
        if(block) {
          if(!map[player.block][3]) {
            if(!player.inventory[blockname]) {
              player.inventory[blockname] = {
                name: blockname,
                amount: 1
              }
            } else
              player.inventory[blockname].amount += 1;
            
            localStorage.setItem('inventory', JSON.stringify(player.inventory));
            
            ctx.clearRect(player.block*10, map[player.block][1]-20, 10, 10)
            map[player.block][3] = true;
          }
        }
        break;
    }
  }

  let string = ""
  
  for (const [key, value] of Object.entries(JSON.parse(localStorage.getItem('inventory')))) {
    string += `<br>${key.charAt(0).toUpperCase() + key.slice(1)} x${value.amount}`;
  }
  
  inventoryElement.innerHTML = string;
  requestAnimationFrame(update);
}
requestAnimationFrame(update);

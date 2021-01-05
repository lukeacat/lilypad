const sellElement = document.getElementById("sell");
const moneyElement = document.getElementById("money");
storage.ensure("inventory", {});

const player = {
  block: 0,
  inventory: storage.get("inventory")
}

if(!player.inventory.cash) 
	player.inventory.cash = {
    name: "Money",
    amount: 0,
    type: "item"
  };

var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET",`/assets/blocks.json`, false);
xmlHttp.send(null);

const blocks = JSON.parse(xmlHttp.responseText);
const blockArray = Object.entries(blocks);

function renderSell(inventory) {
  sellElement.innerHTML = "";
  Object.entries(inventory).forEach(e=>{
    if(e[1].type=="seed")
      sellElement.innerHTML += `${e[0]} x${e[1].amount} <button onClick='sell(${JSON.stringify(e)})'>Sell</button><br>`
  })
  
  moneyElement.innerHTML = player.inventory.cash.amount;
}

renderSell(player.inventory)
const sell = e => {
  const question = confirm(`Do you really wanna sell ${e[0]}?`)
  if(question) {
    player.inventory.cash.amount += (blocks[e[0]].chance/2)*e[1].amount;
    delete player.inventory[e[0]];
    renderSell(player.inventory)
    
    storage.set("inventory", player.inventory)
  }
}
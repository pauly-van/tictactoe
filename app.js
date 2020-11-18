const resetBtn = document.getElementById('reset');
const squares = document.getElementsByClassName('squares');
const winner = document.getElementById('winPrompt');
var turnCount = 0;

const determinePlayer = function(count){
  return count%2===0?'X':'O';
};

const checkForThrees = function(playerObj){
  for(let row in playerObj){
    if(playerObj[row]===3){
      return true;
    }
  }
};

const checkDiag = function(){
  let xDcount = 0;
  let oDcount = 0; 

  for(let i = 0;i<squares.length;i++){
    let mark = squares[i].getElementsByClassName('marker');
    if(mark[0].innerText === 'X'){
      if(i%2===0){
        xDcount++;
      }
    }else if(mark[0].innerText === 'O'){
      if(i%2===0){
        oDcount++;
      }
    }
  }
  if(xDcount === 3 || oDcount === 3){
    return true;
  }
  return false;
};

const checkHori = function(){
  let xH = {top: 0, center: 0, bottom: 0};
  let oH = {top: 0, center: 0, bottom: 0};

  for(let i=0;i<squares.length;i++){
    let mark = squares[i].getElementsByClassName('marker');
    if(mark[0].innerText === 'X'){
      if(i<3){
          xH.top++;
      }else if(i>=3&&i<6){
          xH.center++;
      }else{
          xH.bottom++;
      }
    }else if(mark[0].innerText === 'O'){
      if(i<3){
          oH.top++;
      }else if(i>=3&&i<6){
          oH.center++;
      }else{
          oH.bottom++;
      }
    }
  }

  if(checkForThrees(xH)||checkForThrees(oH)){
      return true;
  }
  return false;
};

checkVert = function(){
  xV = {left: 0, mid: 0, right: 0};
  oV = {left: 0, mid: 0, right: 0};
  
  for(let i=0;i<squares.length;i++){
    let mark = squares[i].getElementsByClassName('marker');
    if(mark[0].innerText === 'X'){
      if(i===0||i%3===0){
        xV.left++;
      }else if(i===1||i===4||i===7){
        xV.mid++;
      }else{
        xV.right++;
      }
    }else if(mark[0].innerText === 'O'){
      if(i===0||i%3===0){
        oV.left++;
      }else if(i===1||i===4||i===7){
        oV.mid++;
      }else{
        oV.right++;
      }
    }
  }

  if(checkForThrees(xV) || checkForThrees(oV)){
    return true;
  }
  return false;
};

const checkWin = function(){
  if(checkHori()===true||checkVert()===true||checkDiag()===true){
    winner.innerHTML = `Winner Winner Chicken dinner! Player ${determinePlayer(turnCount)}!\nGame Reset in 3 seconds`;
    setTimeout(()=>resetBtn.click(), 3000);
    setTimeout(()=>winner.innerHTML = '', 3000);
  }
};

const initialize = ()=>{
  for(let i = 0; i<squares.length;i++){
    squares[i].addEventListener('click', ()=>{
      let mark = squares[i].getElementsByClassName('marker');
      mark[0].innerHTML = determinePlayer(turnCount);
      checkWin();
      turnCount++;
    });
};

  resetBtn.addEventListener('click', ()=>{
    for(let i = 0; i <squares.length;i++){
      let mark = squares[i].getElementsByClassName('marker');
      mark[0].innerHTML = '';
    }
    turnCount = 0;
  });
};

window.onload = initialize();


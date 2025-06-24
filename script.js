let a = localStorage.getItem("player1") || "Player 1";
let b = localStorage.getItem("player2") || "Player 2";
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGAmeBtn= document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg= document.querySelector("#msg");
let turn0 = true;
let moveCount=0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame= () =>{
    turn0=true;
    moveCount=0;
    enableBoxes();
    msgContainer.classList.add("hide");


};

boxes.forEach((box) =>{
    box.addEventListener("click", () => {
        console.log("Box was clicked");
        if (turn0){
            box.innerText ="0";
            turn0= false;
        }
        else{
            box.innerText= "X";
            turn0= true;

        }
        box.disabled = true;
        moveCount++;
        checkWinner();
    });
});

const enableBoxes=() =>{
    for(let box of boxes){
     box.disabled=false;
     box.innerText="";
    }
 };
 

const disableBoxes=() =>{
   for(let box of boxes){
    box.disabled=true;
   }
};

const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is:- ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const drawMatch = () =>{
    msg.innerText="The match is Draw...  Play again-";
    msgContainer.classList.remove("hide");
    disableBoxes();
    
};


const checkWinner = ()=>{
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != ""&& pos2Val != "" & pos3Val != ""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){

                if(pos1Val=="0"){
                    pos1Val=a;
                }
                else{
                    pos1Val=b;
                }
                console.log("Winner");
                showWinner(pos1Val);
               return;
            }

        }


    }
    if(moveCount==9){
        drawMatch();
    }
    
};

newGAmeBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click",resetGame);

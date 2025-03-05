let boardSize = [0, 4, 8, 16, 32];
let populationSize = 10;
let mutationRate = 0;
let maxGenerations = 100;
let boardIndex = 0;

const boardCounter = document.getElementById('counter_board');
const populationCounter = document.getElementById('counter-population');
const mutationCounter = document.getElementById('counter-mutation');
const generationCounter = document.getElementById('counter-max-generations');
const board1 = document.getElementById("board1");
const board2 = document.getElementById("board2");
const chessboard = document.getElementById("chessboard");
const gen_label = document.getElementById("generation_number");
const resultText = document.getElementById("result-text");
const solutionButton = document.getElementById("solution-button");
const rerunButton = document.getElementById("rerun-btn");
const rerunButton2 = document.getElementById("rerun-btn2")


function decreaseBoardSize() {
    if (boardIndex > 0) {
        boardIndex -= 1;
        boardCounter.textContent = boardSize[boardIndex];
        // addBorder(count, counterContainer);
    }   
}

function increaseBoardSize() {
    if (boardIndex < 4) {
        boardIndex += 1;
        boardCounter.textContent = boardSize[boardIndex];
        // addBorder(count, counterContainer)
    }

}

function decreasePopulationSize() {
    if (populationSize >= 20) {
        populationSize -= 10;
        populationCounter.textContent = populationSize;
    }
}


function increasePopulationSize() {
    if (populationSize < 500) {
        populationSize += 10;
        populationCounter.textContent = populationSize;

    }
}

function decreaseMutationRate() {
    if (mutationRate > 0) {
        mutationRate = Number((mutationRate - 0.01).toFixed(2));
        mutationCounter.textContent = mutationRate;
    }
}

function increaseMutationRate() {
    if (mutationRate < 0.5) {
        mutationRate = Number((mutationRate + 0.01).toFixed(2));
        mutationCounter.textContent = mutationRate;
    }
}

function decreaseMaxGenerations() {
    if (maxGenerations > 100) {
        maxGenerations -= 100;
        generationCounter.textContent = maxGenerations;
    }
}

function increaseMaxGenerations() {
    if (maxGenerations < 9999) {
        maxGenerations += 100;
        generationCounter.textContent = maxGenerations;
    }
}

function makeBoard(rows, cols) {
    chessboard.style.setProperty('--grid-rows', rows);
    chessboard.style.setProperty('--grid-cols', cols);

    chessboard.replaceChildren();

    for (c = 1; c < cols+1; c++) {
        for (r = 1; r < rows+1; r++) {
            let cell = document.createElement("div");
            if (c % 2 == r % 2) {
                const boxClass = "box" + c + r;
                cell.classList.add("grid-item", "white", boxClass);
            } else {
                const boxClass = "box" + c + r;
                cell.classList.add("grid-item", "black", boxClass);
            }
            chessboard.appendChild(cell);

        }

    };
}


setInterval(()=> {
    const boardSizeValue = Number(boardCounter.textContent);
    const mutationRateValue = Number(mutationCounter.textContent);

    if (boardSizeValue != 0 && mutationRateValue != 0) {
        solutionButton.classList.add("border-green-500", "cursor-pointer");
        solutionButton.removeAttribute('disabled');
        rerunButton.classList.add("cursor-pointer", "hover:bg-button-hover-green");
        rerunButton.removeAttribute("disabled");
        rerunButton2.classList.add("cursor-pointer", "hover:bg-button-hover-green");
        rerunButton2.removeAttribute("disabled");
        
    } else {
        solutionButton.classList.remove("border-green-500", "cursor-pointer");
        solutionButton.disabled = true;
        rerunButton.classList.remove("cursor-pointer", "hover:bg-button-hover-green" );
        rerunButton.disabled = true;
        rerunButton2.classList.remove("cursor-pointer", "hover:bg-button-hover-green" );
        rerunButton2.disabled = true;
    }
}, 500)

function generatePopulation(populations, POPULATION_NO, N_QUEENS) {
    for (let i = 0; i < POPULATION_NO; i++) {
        let singlePop = [];
        for (let j = 0; j < N_QUEENS; j++) {
            let element = Math.floor(Math.random() * N_QUEENS);
            singlePop.push(element);
        }
        populations.push(singlePop);
    }
    return populations;
}

function showQueens(boardArray) {
    const board = boardArray;
    let removedQueensClasses = []
    for (let i = 0; i < board.length; i++) {
        const itemClass = "box" + (board[i]+1) + (i+1);
        const gridItem = document.querySelector("." + itemClass);
        if (gridItem.classList.value.search("white") > -1) {
            gridItem.innerHTML = '<svg class="p-[0.3rem] transition-all" id="queen" width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50.0001 18.75C52.4865 18.75 54.8711 17.7623 56.6292 16.0041C58.3874 14.246 59.3751 11.8614 59.3751 9.375C59.3751 6.8886 58.3874 4.50403 56.6292 2.74587C54.8711 0.98772 52.4865 0 50.0001 0C47.5137 0 45.1291 0.98772 43.371 2.74587C41.6128 4.50403 40.6251 6.8886 40.6251 9.375C40.6251 11.8614 41.6128 14.246 43.371 16.0041C45.1291 17.7623 47.5137 18.75 50.0001 18.75ZM31.4064 17.1875C27.8712 17.1875 25.2931 19.6875 24.4532 22.4414C22.8907 27.5586 18.1251 31.2695 12.5001 31.2695C10.547 31.2695 8.71104 30.8203 7.08995 30.0391C5.60557 29.3164 3.82823 29.3945 2.40245 30.2734C0.136821 31.6602 -0.605367 34.5898 0.722759 36.8945L19.0626 68.75H29.8829L13.672 40.6055C21.5821 40.1758 28.379 35.5469 31.8556 28.9258C36.1524 34.1602 42.6759 37.5 49.9806 37.5C57.2853 37.5 63.8087 34.1602 68.1056 28.9258C71.5821 35.5664 78.379 40.1953 86.2892 40.6055L70.1173 68.75H80.9376L99.2774 36.8945C100.606 34.6094 99.8634 31.6797 97.5978 30.293C96.172 29.4141 94.3946 29.3359 92.9103 30.0586C91.2696 30.8398 89.4532 31.2891 87.5001 31.2891C81.8751 31.2891 77.1095 27.5781 75.547 22.4609C74.7071 19.6875 72.129 17.1875 68.5939 17.1875C65.7618 17.1875 63.4571 18.8477 62.2657 20.957C59.8439 25.2539 55.254 28.125 50.0001 28.125C44.7462 28.125 40.1564 25.2344 37.7345 20.957C36.5431 18.8477 34.2579 17.1875 31.4064 17.1875ZM26.0157 84.375H73.9845L77.2267 90.625H22.7931L26.0353 84.375H26.0157ZM81.4259 78.3789C80.3517 76.3086 78.2032 75 75.879 75H24.1212C21.7774 75 19.6485 76.3086 18.5743 78.3789L13.3985 88.3789C12.8126 89.5117 12.5001 90.7617 12.5001 92.0313C12.5001 96.4258 16.0548 100 20.4689 100H79.5509C83.9454 100 87.5196 96.4453 87.5196 92.0313C87.5196 90.7617 87.2071 89.5117 86.6212 88.3789L81.4454 78.3789H81.4259Z" fill="black"/> </svg>'

        } else {
            gridItem.innerHTML = '<svg class="p-[0.3rem] transition-all" id="queen" width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50.0001 18.75C52.4865 18.75 54.8711 17.7623 56.6292 16.0041C58.3874 14.246 59.3751 11.8614 59.3751 9.375C59.3751 6.8886 58.3874 4.50403 56.6292 2.74587C54.8711 0.98772 52.4865 0 50.0001 0C47.5137 0 45.1291 0.98772 43.371 2.74587C41.6128 4.50403 40.6251 6.8886 40.6251 9.375C40.6251 11.8614 41.6128 14.246 43.371 16.0041C45.1291 17.7623 47.5137 18.75 50.0001 18.75ZM31.4064 17.1875C27.8712 17.1875 25.2931 19.6875 24.4532 22.4414C22.8907 27.5586 18.1251 31.2695 12.5001 31.2695C10.547 31.2695 8.71104 30.8203 7.08995 30.0391C5.60557 29.3164 3.82823 29.3945 2.40245 30.2734C0.136821 31.6602 -0.605367 34.5898 0.722759 36.8945L19.0626 68.75H29.8829L13.672 40.6055C21.5821 40.1758 28.379 35.5469 31.8556 28.9258C36.1524 34.1602 42.6759 37.5 49.9806 37.5C57.2853 37.5 63.8087 34.1602 68.1056 28.9258C71.5821 35.5664 78.379 40.1953 86.2892 40.6055L70.1173 68.75H80.9376L99.2774 36.8945C100.606 34.6094 99.8634 31.6797 97.5978 30.293C96.172 29.4141 94.3946 29.3359 92.9103 30.0586C91.2696 30.8398 89.4532 31.2891 87.5001 31.2891C81.8751 31.2891 77.1095 27.5781 75.547 22.4609C74.7071 19.6875 72.129 17.1875 68.5939 17.1875C65.7618 17.1875 63.4571 18.8477 62.2657 20.957C59.8439 25.2539 55.254 28.125 50.0001 28.125C44.7462 28.125 40.1564 25.2344 37.7345 20.957C36.5431 18.8477 34.2579 17.1875 31.4064 17.1875ZM26.0157 84.375H73.9845L77.2267 90.625H22.7931L26.0353 84.375H26.0157ZM81.4259 78.3789C80.3517 76.3086 78.2032 75 75.879 75H24.1212C21.7774 75 19.6485 76.3086 18.5743 78.3789L13.3985 88.3789C12.8126 89.5117 12.5001 90.7617 12.5001 92.0313C12.5001 96.4258 16.0548 100 20.4689 100H79.5509C83.9454 100 87.5196 96.4453 87.5196 92.0313C87.5196 90.7617 87.2071 89.5117 86.6212 88.3789L81.4454 78.3789H81.4259Z" fill="white"/> </svg>'
        }
        removedQueensClasses.push(itemClass);
    }
    return removedQueensClasses;  // Like box21 box22 box23 box34
}

function removeQueens(new_board){
    new_board.forEach((element)=> {
        const gridItem = document.querySelector("." + element);
        gridItem.replaceChildren();
    })
}
   
async function findSolution() {

    solutionButton.removeAttribute("onclick");
    rerunButton.disabled = true;
    rerunButton2.disabled = true;

    document.getElementById("chessboard").scrollIntoView()

    const boardSizeValue = Number(boardCounter.textContent);
    const popSizeValue = Number(populationCounter.textContent);
    const mutationRateValue = Number(mutationCounter.textContent);
    const maxGenerationsValue = Number(generationCounter.textContent);

    const rows = boardSizeValue;
    const cols = boardSizeValue;
    const DELAY = 15;


    makeBoard(rows, cols); 

    let populations = generatePopulation([], popSizeValue, boardSizeValue); // Generating an initial number of populations
    let resultFlag = true;
    let finalBoard = [];

    try {
        for (let i = 1; i < maxGenerationsValue + 1; i++ ) {
            const response = await fetch("http://127.0.0.1:5000/solution", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "MAX_GENERATIONS": 1,
                    "POPULATION_NO": popSizeValue,
                    "N_QUEENS": boardSizeValue,
                    "MUTATION_RATE": mutationRateValue,
                    "POPULATIONS": populations
                })
            })

            if (!response.ok) {
                throw new Error("I don't know what I am doing lmao...")
            }

            const data = await response.json()

            new_board = showQueens(data.Board);
            gen_label.textContent = i;

                if (data.SolutionFound) {
                    resultText.innerHTML = "Solution Found!"
                    resultText.classList.add("green");
                    resultText.classList.remove("red");
                    resultText.classList.remove("blink");
                    break
                } else {
                    resultText.innerHTML = "Searching..."
                    resultText.classList.add("blink")
                    resultText.classList.remove("green");
                    resultText.classList.remove("red");
                   
                    if (i == maxGenerationsValue) {
                        resultFlag = false;
                        finalBoard = data.Board;
                    }
                }
            
            populations = data.Populations;
            await new Promise((resolve) => {
                setTimeout(resolve, DELAY);
            })
            removeQueens(new_board);
           
        } 
       
    }
    catch(error) {
        console.error(error);
    } finally {

        if (!resultFlag) {
            resultText.innerHTML = "Solution Not Found!"
            resultText.classList.remove("green");
            resultText.classList.add("red")
            resultText.classList.remove("blink");
        }

        showQueens(finalBoard);
        solutionButton.setAttribute("onclick", "findSolution()");
        rerunButton.removeAttribute('disabled');
        rerunButton.removeAttribute('disabled');
    }
    
}



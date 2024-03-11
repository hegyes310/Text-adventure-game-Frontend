<script setup>
import { ref, onBeforeMount } from 'vue';

import svgStore from '../../stores/svgStore';

const svg = svgStore();

const definedSize = {
    width: window.innerWidth,
    height: window.innerHeight
}

const configKonva = {
    width: definedSize.width,
    height: definedSize.height
};

const fieldList = ref([]);
const fieldTitleList = ref([]);
const player = ref([]);

const rectWidth = 50;
const rectHeight = 50;

const getCurrentX = (number) => {
    return rectWidth * number+2;
};

const getCurrentY = (number) => {
    return rectHeight * number+2;
};

const getRowsNumberBasedOnWindowWidth = () => {
    const rowNumber = Math.floor(configKonva.width / rectWidth);
    return rowNumber;
};

const getColumnNumberBasedOnWindowHeight = () => {
    const columnNumber = Math.floor((configKonva.height -100) / rectHeight);
    return columnNumber;
};

const fieldMaker = (maze) => {
    //ezek fel vannak cserélve
    const howManyRectInColumn = getColumnNumberBasedOnWindowHeight();
    const howManyRectInRow = getRowsNumberBasedOnWindowWidth();
    console.log("howManyRectInRow",howManyRectInRow);
    console.log("howManyRectInColumn",howManyRectInColumn);
    for (let index = 0; index < howManyRectInColumn; index++) {
        for (let index2 = 0; index2 < howManyRectInRow; index2++) {
            let tempRect = {
                x: getCurrentX(index2),
                y: getCurrentY(index),
                width: rectWidth,
                height: rectHeight,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 4,
                id: String(index) + String(index2),
                valami: "asd",
                row: index,
                column: index2
            };

            const cellValue = getInfoAboutTheGivenCell(maze, index, index2);

            if (cellValue === 'X' || cellValue === 'T' || cellValue === 'P') {
                let tempText = {
                    x: getCurrentX(index2) + 20,
                    y: getCurrentY(index) + 15,
                    text: (cellValue === 'X' ? 'X' : '?'),
                    fontSize: 30,
                    fontFamily: 'Calibri',
                    fill: 'black',
                    id: String(index) + String(index2),
                    row: index,
                    column: index2
                };
                fieldTitleList.value.push(tempText);
                fieldList.value.push(tempRect);
            } else if (cellValue === 'W') {
                playerIconMaker(getCurrentX(index2) + 3, getCurrentY(index) + 3, index, index2);
            } else {
                let tempText = {
                    x: getCurrentX(index2) + 20,
                    y: getCurrentY(index) + 15,
                    text: cellValue,
                    fontSize: 30,
                    fontFamily: 'Calibri',
                    fill: 'black',
                    id: String(index) + String(index2),
                    row: index,
                    column: index2
                };
                fieldTitleList.value.push(tempText);
                fieldList.value.push(tempRect);
            }

            /*
            if (getInfoAboutTheGivenCell(maze, index,index2) === 'X') {
                let tempText = {
                    x: getCurrentX(index2) + 20,
                    y: getCurrentY(index) + 15,
                    text: 'X',
                    fontSize: 30,
                    fontFamily: 'Calibri',
                    fill: 'green',
                    id: String(index) + String(index2)
                }
                fieldTitleList.value.push(tempText);
                fieldList.value.push(tempRect);
            } 
            if (getInfoAboutTheGivenCell(maze, index,index2) === 'W') {
                playerIconMaker(getCurrentX(index2)+3, getCurrentY(index)+3)
                
            } 
            if (getInfoAboutTheGivenCell(maze, index,index2) === 'T') {
                let tempText = {
                    x: getCurrentX(index2) + 20,
                    y: getCurrentY(index) + 15,
                    text: '?',
                    fontSize: 30,
                    fontFamily: 'Calibri',
                    fill: 'green',
                    id: String(index) + String(index2)
                }
                fieldTitleList.value.push(tempText);
                fieldList.value.push(tempRect);
            } 
            if (getInfoAboutTheGivenCell(maze, index,index2) === 'P') {
                let tempText = {
                    x: getCurrentX(index2) + 20,
                    y: getCurrentY(index) + 15,
                    text: '?',
                    fontSize: 30,
                    fontFamily: 'Calibri',
                    fill: 'green',
                    id: String(index) + String(index2)
                }
                fieldTitleList.value.push(tempText);
                fieldList.value.push(tempRect);
            } 
            else {
                let tempText = {
                    x: getCurrentX(index2) + 20,
                    y: getCurrentY(index) + 15,
                    text: getInfoAboutTheGivenCell(maze, index,index2),
                    fontSize: 30,
                    fontFamily: 'Calibri',
                    fill: 'green',
                    id: String(index) + String(index2)
                }
                fieldTitleList.value.push(tempText);
                fieldList.value.push(tempRect);
            }
            */

        }
        
    }
};

const getInfoAboutTheGivenCell = (maze, row, col) => {
    const tempCell = maze[row][col];
    return String(tempCell);
};

function getObjectsAroundPlayer(playerRowIndex, playerColIndex) {
    /*
    fieldList.value.forEach(obj => {
        console.log("objrow: ", obj.row , ", objcol: ", obj.column);
    });
    console.log("fieldList.value: ", fieldList.value);
    const surroundingObjects = [];
    for (let index = 0; index < fieldList.value.length; index++) {
        if (fieldList.value[index].column === playerColIndex) {
            surroundingObjects.push(fieldList.value[index]);
        }
    }
    */
    /*
    let counter = 0;
    while (counter !== fieldList.value.length) {
        if (((Math.abs(fieldList.value[counter].column - playerColIndex) <= 1) && (Math.abs(fieldList.value[counter].row - playerRowIndex) <=1))) {
            console.log("obj jó: ", fieldList.value[counter]);
        }
        counter += 1;
    }
    const surroundingObjects = fieldList.value.filter(obj => {
        return ((Math.abs(obj.column - playerColIndex) <= 1) && (Math.abs(obj.row - playerRowIndex) <=1))
    });
    */
    
    const surroundingObjects = fieldList.value.filter(obj => {
        const rowDifference = Math.abs(obj.column - playerColIndex);
        const colDifference = Math.abs(obj.row - playerRowIndex);
        //console.log("obj.row: " + obj.row + ", obj.column: " + obj.column);

        // Ellenőrizze, hogy az objektum a játékos körül van-e (pl. egy egységnyi távolságban)
        if (rowDifference <= 1 && colDifference <= 1) {
            
            const tempRect = fieldList.value.find(x => x.id === obj.id);
            fieldList.value = fieldList.value.filter(x => x.id !== obj.id);
            tempRect.fill = 'gray';
            fieldList.value.push(tempRect);
            
        }
        
        return (rowDifference <= 1 && colDifference <= 1);
    });
    /*
    console.log("fieldList.value: ", fieldList.value);
    return surroundingObjects;
    */
    console.log("surroundingObjects: ", surroundingObjects);
    return surroundingObjects;
}
let playerRow;
let playerColumn;
const playerIconMaker = (xCord, yCord, row, col ) => {
    let tempCircle = {
            x: xCord,
            y: yCord,
            scaleX: 1.4,
            scaleY: 1.4,
            fill: "black",
            stroke: "black",
            strokeWidth: 4,
            id: "player",
            data: svg.stalkerIcon,
            row: row,
            col: col
        };
        playerRow = tempCircle.row;
        playerColumn = tempCircle.col;
    player.value.push(tempCircle);
}

let maze;

onBeforeMount(() => {
    maze = createMazeWithTraps(getColumnNumberBasedOnWindowHeight(), getRowsNumberBasedOnWindowWidth());

});

const createMazeWithTraps = (rows, cols) => {
    const createdMaze = createMaze(rows, cols);
    let maze = createdMaze.mazeArray;

    const endRow = createdMaze.endRow;
    const endCol = createdMaze.endCol;
    const startCoordinates = createPath(maze);
    let startCol = startCoordinates.col;
    let startRow = startCoordinates.row;
    const visited = new Array(rows).fill(false).map(() => new Array(cols).fill(false));
    const path = [];


    const pathFound = findPath(maze, startRow, startCol, endRow, endCol, rows, cols, visited, path);

    if (pathFound) {
        fieldMaker(maze);
        console.log("Found path:");
        path.forEach(({ row, col }) => 
        console.log(`(${row}, ${col})`)
        );
        
    } else {
        console.log("No path found.");
        createMazeWithTraps(getColumnNumberBasedOnWindowHeight(), getRowsNumberBasedOnWindowWidth());
    }

    getObjectsAroundPlayer(playerRow, playerColumn);
    rerender.value = rerender.value + 1;
    return maze;
};

function createMaze(rows, cols) {
    // Létrehoz egy üres táblát 'V' értékekkel
    let maze = new Array(rows).fill('?').map(() => new Array(cols).fill('?'));

    // Véletlenszerűen elhelyez egy 'X'-et a táblán
    let xRow, xCol;
    do {
        xRow = Math.floor(Math.random() * (rows - 2) + 1);
        xCol = Math.floor(Math.random() * (cols - 2) + 1);
    } while (maze[xRow][xCol] === 'X');
    maze[xRow][xCol] = 'X';
    //console.log("X helye: " + "(" + xRow +", " + xCol+")");
    makeAnomalyTrap(maze, rows, cols);
    
    return {mazeArray: maze, endRow: xRow, endCol: xCol};
}

const makeAnomalyTrap = (maze, rows, cols) => {
    const CountOfAnomalyTrap = (rows + cols) * 2;
    let counter = 0;
    while (CountOfAnomalyTrap != counter) {
        let xRow = Math.floor(Math.random() * (rows - 2) + 1);
        let xCol = Math.floor(Math.random() * (cols - 2) + 1);
        if (maze[xRow][xCol] !== 'X') {
            maze[xRow][xCol] = 'T';
            counter += 1;
        }
    }
};

const createPath = (maze) => {
    const pathStartRow = getRandomNumber(maze.length-1);
    const pathStartColumn = getRandomNumberOrZero(maze[0].length-1);
    maze[pathStartRow][pathStartColumn] = 'W';
    return { col: pathStartColumn, row: pathStartRow};
};

function getRandomNumber(max) {
    return Math.floor(Math.random() * (max + 1));
};

function getRandomNumberOrZero(max) {
    const randomValue = Math.random() < 0.5 ? 0 : max;
    return randomValue;
}


const findPath = (maze, startRow, startCol, endRow, endCol, rows, cols, visited, path) => {
    // Base cases
    if (startRow === endRow && startCol === endCol ) {
        //path.forEach(({ row, col }) => maze[row][col] = 'P');
        //rerender.value = rerender.value + 1;
        return true;  // Reached the destination
    }

    if (startRow < 0 || startRow >= rows || startCol < 0 || startCol >= cols || maze[startRow][startCol] === 'T' || visited[startRow][startCol]) {
        return false;  // Out of bounds or hit a trap
    }

    // Mark the current cell as visited
    visited[startRow][startCol] = true;
    path.push({ row: startRow, col: startCol });

    // Explore in all directions (up, down, left, right)
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    for (const [dr, dc] of directions) {
        const newRow = startRow + dr;
        const newCol = startCol + dc;

        if (findPath(maze, newRow, newCol, endRow, endCol, rows, cols, visited, path)) {
            return true;
        }
    }

    // If no valid path found, backtrack
    visited[startRow][startCol] = false;
    path.pop();
    return false;
};

const rerender = ref(0);

const countAdjacentTrapsAtPosition = (maze, row, col) => {
    const directions = [
        [-1, 0], [0, 1], [1, 0], [0, -1],   // Fő irányok (fel, jobbra, le, balra)
        [-1, -1], [-1, 1], [1, -1], [1, 1]   // Átlós irányok
    ];
    let trapCount = 0;

    for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (newRow >= 0 && newRow < maze.length && newCol >= 0 && newCol < maze[0].length && maze[newRow][newCol] === 'T') {
            trapCount++;
        }
    }

    return trapCount;
}

const revealField = (field) => {
    const fieldWithText = fieldTitleList.value.find(x => x.id === field.id);
    if (isCellNeighborWithPlayer(fieldWithText.row, fieldWithText.column, playerRow, playerColumn)) {
        const getFieldText = getInfoAboutTheGivenCell(maze, fieldWithText.row, fieldWithText.column);
        if (getFieldText === "?") {
            const trapCounter = countAdjacentTrapsAtPosition(maze, fieldWithText.row, fieldWithText.column);
            fieldWithText.text = trapCounter;
            fieldWithText.fill = getColorBasedOnTrapCount(trapCounter);
        } else {
            fieldWithText.text = getFieldText;
        }
     
        fieldTitleList.value = fieldTitleList.value.filter(x => x.id !== field.id)
        
        fieldTitleList.value.push(fieldWithText);
        
        rerender.value += 1;
    }
    
};

const isCellNeighborWithPlayer = (row, col, playerRow, playerCol) => {
    const isAdjacentRow = Math.abs(row - playerRow) <= 1;
    const isAdjacentCol = Math.abs(col - playerCol) <= 1;

    return isAdjacentRow && isAdjacentCol;
};

const getColorBasedOnTrapCount = (trapCounter) => {
    switch (trapCounter) {
        case 0:
            return "blue"
        case 1:
            return "green"
        case 2:
            return "orange"
        default:
            return "red"
    };
};

</script>

<template>
    <div class="popup">
        <div class="popup-inner">
            <div :key="rerender">
                <v-stage :config="configKonva">
                    <v-layer>
                        <v-rect 
                            v-for="rect in fieldList"
                            :key="rect.id"
                            :config="rect">
                        </v-rect>
                        <v-text
                            v-for="text in fieldTitleList"
                            :key="text.id"
                            :config="text"
                            @click="revealField(text)">

                        </v-text>
                        <v-path
                            v-for="stalker in player"
                                :key="stalker.id"
                                :config="stalker">
                        </v-path>
                    </v-layer>
                </v-stage>
            </div>
            
        </div>
    </div>
</template>

<style>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;
}
.popup-inner {
        background: #fff;
        padding: 32px;
}
</style>../../stores/svgStore
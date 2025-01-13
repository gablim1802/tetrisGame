import {updated2DArrayInfo,Block,fourBlockType} from './types'
import{blockArray}from './state'
export{updateTwoDArray,addBlock,checkCollision,modifyBlocksPosition,checkClearBlock,addRemainingEmptyRow,matrixMuLtiplication,blocksRotation,RNG,spawnRandomNewBlocks,centrePreview,returnCurrentLevel,isNotNullOrUndefined}












/**
 * Updates a two-dimensional array by replacing a specific element at the given row and column indices with a new value.
 *
 * @param arr - The input two-dimensional array to be updated.
 * @param rowIndex - The index of the row where the update will occur.
 * @param colIndex - The index of the column where the update will occur.
 * @param value - The new value to replace the existing element at the specified indices.
 * @returns A new two-dimensional array with the updated element at the specified indices.
 */
function updateTwoDArray(arr: ReadonlyArray<ReadonlyArray<Block|false>>, rowIndex: number, colIndex: number, value:Block): ReadonlyArray<ReadonlyArray<Block|false>> {
  
  return arr.map((rowArr, r) =>
    r === rowIndex ? rowArr.map((item, c) => (c === colIndex ? value : item)) : rowArr
  );
  }
  
  /**
 * Adds a four-block shape to a copy of a two-dimensional game grid array.
 *
 * @param fourBlock - The array of four blocks representing the shape to be added.
 * @param copyArray - The current state of the game grid as a two-dimensional array.
 * @returns A new two-dimensional array with the four-block shape added to it.
 */
  //Add 2block to the 2dArray
  function addBlock(fourBlock:ReadonlyArray<Block>,copyArray:ReadonlyArray<ReadonlyArray<Block|false>>):ReadonlyArray<ReadonlyArray<Block|false>>{
    //Update the 2d array by updating a block per time
    return fourBlock.reduce((updatedCopyArray, block) => {
      const rowBlock = Math.floor(block.y / 20);
      const columnBlock = Math.floor(block.x / 20);
  
      return updateTwoDArray(updatedCopyArray, rowBlock, columnBlock, block);
    }, copyArray);
  
  }
  
  
  /**
 * Checks if a given four-block shape collides with existing blocks in the game grid.
 *
 * @param fourBlock - The array of four blocks representing the shape to be checked for collision.
 * @param copyArray - The current state of the game grid as a two-dimensional array.
 * @returns `true` if the shape collides with existing blocks, `false` otherwise.
 */
  function checkCollision(fourBlock:ReadonlyArray<Block>,copyArray:ReadonlyArray<ReadonlyArray<Block|false>>):boolean{
  
    return fourBlock.some(block => {
      const row = Math.floor(block.y / 20);
      const column = Math.floor(block.x / 20);
  
      // Check if row and column are within bounds
    if (row >= 0 && row < copyArray.length && column >= 0 && column < copyArray[0].length) {
       // return true if arr[row][column] value is not false means got block and collide
      return copyArray[row][column] !== false;
    }
    // Out of bounds, so consider it as collision
    return true;
      
     
    });
  }
  
  
  /**
 * Modifies the position of blocks in a row of a 2D block array.
 *
 * @param row - The input row containing blocks and boolean values.
 * @param rowIndex - The index of the current row within the 2D array.
 *
 * @returns A new row with block positions updated based on columnIndex, while preserving boolean values.
 */
  function modifyBlocksPosition(
    row: ReadonlyArray<Block | false>,
    rowIndex: number
  ): ReadonlyArray<Block | false> {
    return row.map((cell, columnIndex) =>
    //If cell is block updated the x,y position else remain as it is
      cell !== false
        ? { ...cell, x: columnIndex * 20, y: rowIndex * 20 } as Block
        : cell
    );
  }
  
  
/**
 * Checks and clears full rows in a 2D block array, returning updated information.
 *
 * @param copy2DArray - The input 2D block array to check for full rows.
 * @returns An object containing updated information:
 *   - `updated2DArray`: The 2D block array with full rows removed and empty rows added at the top.
 *   - `updatedArrayBoolean`: A boolean indicating if the resulting array has less than 20 rows.
 *   - `clearLineTotal`: The total number of full rows cleared from the original array.
 */
  function  checkClearBlock(copy2DArray: ReadonlyArray<ReadonlyArray<Block | false>>): updated2DArrayInfo {
    const updatedArray = copy2DArray.reduceRight((accumulator, row) => (
        // if got row with full blocks, skip dont update, else update the accumulator with the row.
        row.every(cell => cell !== false) ? accumulator : [row, ...accumulator] as ReadonlyArray<ReadonlyArray<Block | false>>), []as ReadonlyArray<ReadonlyArray<Block | false>>);
      // Add the row to the accumulator as ReadonlyArray<ReadonlyArray<Block | false>
    return {updated2DArray:addRemainingEmptyRow(updatedArray),updatedArrayBoolean:updatedArray.length<20,clearLineTotal:20-updatedArray.length} as updated2DArrayInfo ;
  }
  

  /**
     * Adds remaining empty rows to a 2D block array to ensure it has a total of 20 rows.
     *
     * @param copy2DArray - The input 2D block array.
     *
     * @returns An updated 2D block array with added empty rows (if necessary) and modifications applied to each row.
 */
  function addRemainingEmptyRow(copy2DArray: ReadonlyArray<ReadonlyArray<Block | false>>):ReadonlyArray<ReadonlyArray<Block | false>>{
    const remainingRow=20-copy2DArray.length
    
    if (remainingRow>0){
      const appendRow=new Array(remainingRow).fill(null).map(() => new Array(10).fill(false))
      const updatedArray = appendRow.reduce((accumulator, row) => {
        // Check if the row contains only non-false values (blocks)
        // Add the row to the accumulator
        return [row, ...accumulator] as ReadonlyArray<ReadonlyArray<Block | false>>;
      }, copy2DArray);
  
      //return a 2d array that every row applied the modifyBlockPosition
      return updatedArray.map((row, rowIndex) => modifyBlocksPosition(row, rowIndex));
    }
  
    return copy2DArray
  }



  /**
 * Performs a 2D matrix multiplication on a given block's position.
 *
 * This function rotates the block's position 90 degrees counterclockwise in a 2D plane.
 *
 * @param blockPosition - An array containing the x and y coordinates of the block's position.
 * @returns An array representing the new position of the block after rotation.
 */
  function matrixMuLtiplication(blockPostion:ReadonlyArray<number>):ReadonlyArray<number>{
    const newX=(0*blockPostion[0])+(1*blockPostion[1])///[x,y]
    const newY=(-1*blockPostion[0])+(0*blockPostion[1])
    return [newX,newY]as const
  }
  


  /**
 * Rotates a set of blocks around their center position.
 *
 * This function performs a 90-degree clockwise rotation of a given set of blocks
 * around their center position, maintaining their relative positions.
 *
 * @param fourBlocks - An object representing a set of four blocks to be rotated.
 * @param stateCount - The current state count, used to assign unique IDs to the rotated blocks.
 * @returns An updated `fourBlockType` object with the rotated block positions.
 */
  function blocksRotation(fourBlocks:fourBlockType,stateCount:number):fourBlockType{
    //Center block position
    const originPosition=[fourBlocks.arrayBlock[1].x,fourBlocks.arrayBlock[1].y]//centre
    
    //NewRotatedBlock
    const newFourBlockArrayBlock=fourBlocks.arrayBlock.map((block)=>{
      const blockRelativePosition=[originPosition[0]-block.x,originPosition[1]-block.y]
      const rotatePostion=matrixMuLtiplication(blockRelativePosition)
      const rotateActualPosition=[rotatePostion[0]+originPosition[0],rotatePostion[1]+originPosition[1]]
      return {...block,
        x:rotateActualPosition[0],
        y:rotateActualPosition[1],
        id:block.type+stateCount
      }
    })
  
  
    return {...fourBlocks,
      arrayBlock:newFourBlockArrayBlock,
      newStateCreatedCount:stateCount
    } as fourBlockType
  
  }
  
  
  
  
  
  
  
  
  
  
  abstract class RNG {
    // LCG using GCC's constants
    private static m = 0x80000000; // 2**31
    private static a = 1103515245;
    private static c = 12345;
  
    /**
     * Call `hash` repeatedly to generate the sequence of hashes.
     * @param seed 
     * @returns a hash of the seed
     */
    public static hash = (seed: number) => (RNG.a * seed + RNG.c) % RNG.m;
    
  
    /**
     * Takes hash value and scales it to the range [0, 6]
     * @param hash hash value 
     * @returns number between 0-6 inclusive
     */
    public static scale = (hash: number) => (hash % 7);
  }
  
   

  /**
 * Generates a new set of Tetris blocks based on the given state count using the provided random number generator (RNG).
 * @param stateCount - The state count used for randomness.
 * @returns A new set of Tetris blocks with the associated state count.
 */
  function spawnRandomNewBlocks(stateCount:number): fourBlockType{
  
    return {...blockArray[RNG.scale(RNG.hash(stateCount))],
            newStateCreatedCount:stateCount
            } as fourBlockType
  }



  /**
 * Centers the preview Tetris blocks by adjusting their positions.
 * @param previewFourBlock - The preview Tetris blocks to be centered.
 * @returns A new set of Tetris blocks with adjusted positions to be centered.
 */
  function centrePreview(previewFourBlock:fourBlockType) :fourBlockType{
    return  {...previewFourBlock,arrayBlock:previewFourBlock.arrayBlock.map((block)=>{return {...block,y:block.y+20,x:block.x-20}})}
  }

  /**
 * Calculates the current level based on the current score in the Tetris game.
 * @param currentScore - The current score achieved in the game.
 * @returns The corresponding level based on the current score.
 */
  function returnCurrentLevel(currentScore:number):number{
    return currentScore <= 3 ? 1 : currentScore <= 5 ? 2 : 3;
  }
  
  

  function isNotNullOrUndefined<T extends object>(input: null | undefined | T): input is T {
    return input != null;
  }
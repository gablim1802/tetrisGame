
  export{Viewport,blockArray,Constants,Teleport,Rotation,LeftRight,Down,Tick,Restart,initialState}
  import {Block,fourBlockType,State} from './types'
  import{addBlock,checkCollision,checkClearBlock,blocksRotation,spawnRandomNewBlocks,returnCurrentLevel} from './util'

  const Viewport = {
      CANVAS_WIDTH: 200,
      CANVAS_HEIGHT: 400,
      PREVIEW_WIDTH: 160,
      PREVIEW_HEIGHT: 80,
    } as const;
    
  const Constants = {
  TICK_RATE_MS: 10,
  GRID_WIDTH: 10,
  GRID_HEIGHT: 20,
  } as const;

  const Block = {
  WIDTH: 20,
  HEIGHT: 20,
  }as const;

  interface Action {
  apply(s: State): State;
  }


  const blockCube:fourBlockType={
      arrayBlock:[
                { id:`cblock1: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2-Block.WIDTH),
                  y: 0,
                  style: "fill: green",
                  type:'cblock1: '
                }
                  ,
    
                { id:`cblock2: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2),
                  y: 0,
                  style: "fill: green",
                  type:'cblock2: '
                },
                  
                { id:`cblock3: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2-Block.WIDTH),
                  y: Block.WIDTH,
                  style: "fill: green",
                  type:'cblock3: '
                },
                  
                { id:`cblock4: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2),
                  y: Block.WIDTH,
                  style: "fill: green",
                  type:'cblock4: '
                }
              ],
    
    
    newStateCreatedCount:0
    }
    
    const blockI:fourBlockType={
      arrayBlock:[
                { id:`iblock1: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2-Block.WIDTH)-Block.WIDTH,
                  y: 0,
                  style: "fill: red",
                  type:'iblock1: '
                }
                  ,
    
                { id:`iblock2: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2-Block.WIDTH),
                  y: 0,
                  style: "fill: red",
                  type:'iblock2: '
                },
                  
                { id:`iblock3: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2),
                  y: 0,
                  style: "fill: red",
                  type:'iblock3: '
                },
                  
                { id:`iblock4: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2)+Block.WIDTH,
                  y: 0,
                  style: "fill: red",
                  type:'iblock4: '
                }
              ],
    
    
    newStateCreatedCount:0
    }
    
    const blockL:fourBlockType={
      arrayBlock:[
                { id:`lblock1: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2-Block.WIDTH)-Block.WIDTH,
                  y: 0,
                  style: "fill: blue",
                  type:'lblock1: '
                }
                  ,
    
                { id:`lblock2: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2-Block.WIDTH)-Block.WIDTH,
                  y: Block.WIDTH,
                  style: "fill: blue",
                  type:'lblock2: '
                },
                  
                { id:`lblock3: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2-Block.WIDTH),
                  y: Block.WIDTH,
                  style: "fill: blue",
                  type:'lblock3: '
                },
                  
                { id:`lblock4: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2),
                  y: Block.WIDTH,
                  style: "fill: blue",
                  type:'lblock4: '
                }
              ],
    
    
    newStateCreatedCount:0
    
    }
    
    const blockJ:fourBlockType={
      arrayBlock:[
                { id:`jblock1: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2),
                  y: 0,
                  style: "fill: orange",
                  type:'jblock1: '
                }
                  ,
    
                { id:`jblock2: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2),
                  y: Block.HEIGHT,
                  style: "fill: orange",
                  type:'jblock2: '
                },
                  
                { id:`jblock3: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2-Block.WIDTH),
                  y: Block.HEIGHT,
                  style: "fill: orange",
                  type:'jblock3: '
                },
                  
                { id:`jblock4: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2-Block.WIDTH)-Block.WIDTH,
                  y: Block.WIDTH,
                  style: "fill: orange",
                  type:'jblock4: '
                }
              ],
    
    
    newStateCreatedCount:0
    }
    
    
    const blockZ:fourBlockType={
      arrayBlock:[
                { id:`zblock1: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2-Block.WIDTH)-Block.WIDTH,
                  y: 0,
                  style: "fill: yellow",
                  type:'zblock1: '
                }
                  ,
    
                { id:`zblock2: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2-Block.WIDTH),
                  y: 0,
                  style: "fill: yellow",
                  type:'zblock2: '
                },
                  
                { id:`zblock3: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2-Block.WIDTH),
                  y: Block.WIDTH,
                  style: "fill: yellow",
                  type:'zblock3: '
                },
                  
                { id:`zblock4: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2),
                  y: Block.WIDTH,
                  style: "fill: yellow",
                  type:'zblock4: '
                }
              ],
    
    
    newStateCreatedCount:0
    }
    
    const blockS:fourBlockType={
      arrayBlock:[
                { id:`sblock1: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2-Block.WIDTH)-Block.WIDTH,
                  y: Block.WIDTH,
                  style: "fill: purple",
                  type:'sblock1: '
                }
                  ,
    
                { id:`sblock2: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2-Block.WIDTH),
                  y: 0,
                  style: "fill: purple",
                  type:'sblock2: '
                },
                  
                { id:`sblock3: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2-Block.WIDTH),
                  y: Block.WIDTH,
                  style: "fill: purple",
                  type:'sblock3: '
                },
                  
                { id:`sblock4: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2),
                  y: 0,
                  style: "fill: purple",
                  type:'sblock4: '
                }
              ],
    
    
    newStateCreatedCount:0
    }
    
    const blockT:fourBlockType={
      arrayBlock:[
                { id:`tblock1: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2-Block.WIDTH)-Block.WIDTH,
                  y: Block.WIDTH,
                  style: "fill: pink",
                  type:'tblock1: '
                }
                  ,
    
                { id:`tblock2: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2-Block.WIDTH),
                  y: Block.WIDTH,
                  style: "fill: pink",
                  type:'tblock2: '
                },
                  
                { id:`tblock3: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2-Block.WIDTH),
                  y: 0,
                  style: "fill: pink",
                  type:'tblock3: '
                },
                  
                { id:`tblock4: ${0}`,
                  height: Block.HEIGHT,
                  width: Block.WIDTH,
                  x: (Viewport.CANVAS_WIDTH/2),
                  y: Block.WIDTH,
                  style: "fill: pink",
                  type:'tblock4: '
                }
              ],
    
    
    newStateCreatedCount:0
    }
    
    
    const blockArray:ReadonlyArray<fourBlockType>=[blockCube,blockI,blockJ,blockL,blockS,blockT,blockZ]
    
    const initialState: State = {
      fourBlock: spawnRandomNewBlocks(10),
      gameEnd: false,
      newStateCreatedCount: 0,
      lastFourBlock: {arrayBlock:[],newStateCreatedCount:0} as fourBlockType,
      spawnNewBlock: false,
      arrayStopBlock:new Array(20).fill(null).map(() => new Array(10).fill(false)),
      clearLine:false,
      previewBlock:spawnRandomNewBlocks(1000),
      currentTickMiliSec:0,
      currentLevel:1,
      currentScore:0,
      highestScore:0
    } as const;




    class Teleport implements Action { 
      constructor() {} 
      /**
       * Hard drop the current state
       * @param s previous state
       * @returns rotated state
       */
      apply = (s: State) => {
        return !s.spawnNewBlock
        ? Teleport.handleTeleport({
            ...s,
            lastFourBlock: s.fourBlock,
          })
        : { ...s };
      }
      


      /**
       * Normally move the block downWard .
       *
       * @param o - The current Tetris block state.
       * @param newStateCount - The current state count.
       * @returns A new Tetris block state with the body moved.
      */
      
      static moveBody = (o: fourBlockType, direction: number,newStateCount:number): fourBlockType => {
        
        return {
          ...o,
          newStateCreatedCount:newStateCount,
          arrayBlock: o.arrayBlock.map(block => ({
            ...block,
            y: (block.y) + direction,
            id:block.type+newStateCount
          }))
        };
      }

    /**
     * Teleport collision detection for the Tetris game.
     *
     * @param s - The current game state.
     * @param lastOriginalState - The previous game state.
     * @returns A new game state based on collision detection. It returns either the
     * last original state (if a collision occurs) or the current state.
      */
    
      static handleTeleportCollision=(s: State, lastOriginalState:State):State|true => {
  
        //Check Block and block collision 
        const collideBlockBoolean=checkCollision(s.fourBlock.arrayBlock,[...s.arrayStopBlock] as ReadonlyArray<ReadonlyArray<Block|false>>)
    
    
        //True means got collision happen
        if (collideBlockBoolean){
          const checkClearBlockInfo=checkClearBlock(addBlock([...lastOriginalState.fourBlock.arrayBlock],[...lastOriginalState.arrayStopBlock] as ReadonlyArray<ReadonlyArray<Block|false>>))
          ///Last block of current
          return {...lastOriginalState,
            spawnNewBlock:true,
            arrayStopBlock:checkClearBlockInfo.updated2DArray,
            clearLine:checkClearBlockInfo.updatedArrayBoolean,
            currentScore:checkClearBlockInfo.clearLineTotal+lastOriginalState.currentScore
          }
            
        }
    
        //Current modify state
        return true
    
    }

      /**
       * Function that will return a teleported state and remember the initial teleport 
       * shape and used it to delete the previous blocks.
       *
       * @param s - The last tetris state.
       * @returns A new Tetris block state with the body teleported.
      */
      static handleTeleport = (s: State): State => {
    
        const originalLastFourBlock=s.lastFourBlock
        const returnState=this.moveUntilCollision({...s},s.newStateCreatedCount+1)
    
        return {...returnState,
        lastFourBlock:{...originalLastFourBlock} as fourBlockType,
        newStateCreatedCount:s.newStateCreatedCount+1
        }
    
    
      }
    

    /**
     * Recursion that moves the Tetris block body down until collision happened
     *
     * @param o - The current Tetris block state.
     * @param newStateCount - The current state count.
     * @returns A new Tetris block state with the body teleported.
    */
    static moveUntilCollision = (currentState:State, newStateCount:number):State => {
      const newFourBlock = this.moveBody(currentState.fourBlock, 20, newStateCount);
    
      const newCurrentState = { ...currentState, fourBlock: newFourBlock };
    
      const handleResult = this.handleTeleportCollision(newCurrentState, currentState);
      
      if (handleResult === true) {
        return this.moveUntilCollision(newCurrentState,newStateCount);
      }
      return handleResult
    };
    
    
    
  }




    class Rotation implements Action { 
      constructor() { } 
      /**
       * Rotate the current shape
       * @param s previous state
       * @returns rotated state
       */
      apply = (s: State) => {
        
        
    
        if (!s.spawnNewBlock){
        return Rotation.handleCollisions({
          ...s,
          fourBlock: Rotation.moveBody(s.fourBlock,s.newStateCreatedCount+1),
          lastFourBlock: s.fourBlock,
          newStateCreatedCount:s.newStateCreatedCount+1// You might need to modify this line as well // You might need to modify this line as well
      
        },{...s})
    
        }
    
        else{return {...s}}

      }


      /**
       * Rotates the Tetris block body based on its type and the current state count.
       *
       * @param o - The current Tetris block state.
       * @param newStateCount - The current state count.
       * @returns A new Tetris block state with the body moved.
      */
      static moveBody = (o: fourBlockType,newStateCount:number): fourBlockType => {
    
        if (o.arrayBlock[0].type=='cblock1: '){
          return {...o,arrayBlock:o.arrayBlock.map((block)=>{return{...block,id:block.type+newStateCount}})}
        }
        return blocksRotation(o,newStateCount)
      }
      
    /**
     * Handles rotation collision detection for the Tetris game.
     *
     * @param s - The current game state.
     * @param lastOriginalState - The previous game state.
     * @returns A new game state based on collision detection. It returns either the
     * last original state (if a collision occurs) or the current state.
      */
    
      static handleCollisions = (s: State, lastOriginalState:State): State => {
        
        //Check Block and block collision 
        const collideBlockBoolean = checkCollision(s.fourBlock.arrayBlock, [...s.arrayStopBlock] as ReadonlyArray<ReadonlyArray<Block|false>>);

        // Return either lastOriginalState or the current state based on collision
        return collideBlockBoolean ? { ...lastOriginalState } : { ...s };
      }
    

    
    }


  class LeftRight implements Action { 
      constructor(public readonly direction: number) { } 
      /**
       * Move the shape left or right based on direction number
       * @param s previous state
       * @returns rotated state
       */
      apply = (s: State) => {
        
    
        if (!s.spawnNewBlock){
        return LeftRight.handleCollisions({
          ...s,
          fourBlock: LeftRight.moveBody(s.fourBlock,this.direction,s.newStateCreatedCount+1),
          lastFourBlock: s.fourBlock,
          newStateCreatedCount:s.newStateCreatedCount+1// You might need to modify this line as well
        },{...s})
        }

        return {...s}
    
        
      }

      /**
       * Move the Tetris block horizontally by the specified direction.
       *
       * @param o - The current Tetris block configuration.
       * @param direction - The direction of movement (-1 for left, 1 for right).
       * @param newStateCount - The count of new states created.
       * @returns The updated Tetris block configuration after horizontal movement.
       */
    
      static moveBody = (o: fourBlockType, direction: number , newStateCount:number): fourBlockType => {
        return {
          ...o,
          arrayBlock: o.arrayBlock.map(block => ({
            ...block,
            x: (block.x) + direction,
            id:block.type+newStateCount
          }))
        };
      }
    
      /**
       * Handle collisions between the falling Tetris block and the existing blocks on the game grid.
       *
       * @param s - The current game state, including the falling Tetris block.
       * @param lastOriginalState - The previous game state before the collision check.
       * @returns The updated game state after collision handling. It may revert to the previous state if a collision occurs.
       */
      static handleCollisions = (s: State, lastOriginalState:State): State => {
    
        const collideBlockBoolean = checkCollision(s.fourBlock.arrayBlock, [...s.arrayStopBlock] as ReadonlyArray<ReadonlyArray<Block|false>>);
        // Return either lastOriginalState or the current state based on collision
        return collideBlockBoolean ? { ...lastOriginalState } : { ...s };
      }
    
    
    
    }



    class Down implements Action { 
      constructor(public readonly direction: number) { } 
      /**
       * Move tetris shape down
       * @param s previous state
       * @returns rotated state
       */
      apply = (s: State) => {
        return s.newStateCreatedCount > 0
        ? Down.handleCollisions({
            ...s,
            fourBlock: Down.moveBody(s.fourBlock, this.direction, s.newStateCreatedCount + 1),
            lastFourBlock: s.fourBlock,
            newStateCreatedCount: s.newStateCreatedCount + 1,
          }, { ...s })
        : { ...s };
      
      }


      /**
       * Move the blocks in a fourBlockType object in a specified direction.
       * @param o - The fourBlockType object to move.
       * @param direction - The direction to move the blocks (positive value moves down, negative moves up).
       * @param newStateCount - The new state count to assign to the updated fourBlockType.
       * @returns A new fourBlockType object with the blocks moved in the specified direction.
      */
      static moveBody = (o: fourBlockType, direction: number,newStateCount:number): fourBlockType => {
        return {
          ...o,
          newStateCreatedCount:newStateCount,
          arrayBlock: o.arrayBlock.map(block => ({
            ...block,
            y: (block.y) + direction,
            id:block.type+newStateCount
          }))
        };
      }
      

      /**
       * Handle collisions between blocks in the current state and the stop blocks on the grid.
       * @param s - The current state to handle collisions for.
       * @param lastOriginalState - The last original state before any potential collision handling.
       * @returns The updated state after collision handling.
       */
      static handleCollisions = (s: State, lastOriginalState:State): State => {    
        const collideBlockBoolean=checkCollision(s.fourBlock.arrayBlock,[...s.arrayStopBlock] as ReadonlyArray<ReadonlyArray<Block|false>>)
        if (collideBlockBoolean){
          //To reduce reduncdant same arrayStopBlock
          if (s.spawnNewBlock){return {...lastOriginalState}}
          else{
            const checkClearBlockInfo=checkClearBlock(addBlock([...lastOriginalState.fourBlock.arrayBlock],[...lastOriginalState.arrayStopBlock] as ReadonlyArray<ReadonlyArray<Block|false>>))
            ///Last block of current
            return {...lastOriginalState,
              spawnNewBlock:true,
              arrayStopBlock:checkClearBlockInfo.updated2DArray,
              clearLine:checkClearBlockInfo.updatedArrayBoolean,
              currentScore:checkClearBlockInfo.clearLineTotal+lastOriginalState.currentScore
            }
          }
          
        }
        //Current modify state
        return {...s}
      } 
    
    }


    class Tick implements Action {
      constructor(public readonly elapsed: number) {}
      /** 
       * interval tick: Tetris blocks move, collisions happen, 
       * will check whether need to spawn new block or not.
       * Will also check end game condition.
       * @param s old State
       * @returns new State
       */
      apply(s: State): State {
          if(this.elapsed>0 && !s.gameEnd&& (s.currentTickMiliSec>60/s.currentLevel)){
              const newStateCount=s.newStateCreatedCount+1
    
            if (!s.spawnNewBlock){
              return Tick.handleCollisions({
                ...s,
                fourBlock: Tick.moveBody(s.fourBlock, newStateCount),
                newStateCreatedCount: newStateCount,
                lastFourBlock: s.fourBlock,
                currentTickMiliSec:0
              },{...s,
                currentTickMiliSec:0});
            }
    
            
          //For handle end game havent implement 
          return Tick.handleEndGame({...initialState,arrayStopBlock:[...s.arrayStopBlock],
                                      newStateCreatedCount:newStateCount,
                                      fourBlock:{...s.previewBlock,
                                                  arrayBlock:s.previewBlock.arrayBlock.map(block => ({
                                                      ...block,
                                                      id:block.type+newStateCount
                                                  }))
                                      },
                                      previewBlock:spawnRandomNewBlocks(newStateCount),
                                      currentScore:s.currentScore,
                                      currentLevel:returnCurrentLevel(s.currentScore),
                                      highestScore:s.highestScore
                                      } )
          }
    
          return {...s,currentTickMiliSec:s.currentTickMiliSec+1}
          
      }
      
      /** 
       * all tick-based physical movement comes through this function
       * @param o Blocks to move
       * @param newStateCount Current state count
       * @returns the moved blocks
       */
      static moveBody = (o: fourBlockType,newStateCount:number): fourBlockType => (
        
      {
          ...o,
          newStateCreatedCount:newStateCount,
          arrayBlock: [...o.arrayBlock].map(block => ({
            ...block,
            id:block.type+newStateCount,
            y:block.y+(20)
          }))
      })
    
      /** 
       * Handle end game, will return a end game state if end game condition met
       * @param s Newly spawn state
       * @returns Updated gameEnd property of state
       */
      static handleEndGame =  (s: State): State => {
        //Collide with blocks
        const currentFourBlockArray = s.fourBlock.arrayBlock;
        const collideBlockBoolean=checkCollision(currentFourBlockArray,[...s.arrayStopBlock] as ReadonlyArray<ReadonlyArray<Block|false>>)
        //True means got collision happen
        return collideBlockBoolean?{...s,gameEnd:true}:{...s}  
      }
    
      /** 
       * Check tick collision, if collision happened check whether got full blocks of row,
       * then updated the state.
       * @param s Moved body state
       * @param lastOriginalState State before move body action occur on it
       * @returns Updated state with updated 2D array
       */
      static handleCollisions = (s: State, lastOriginalState:State): State => {
        const currentFourBlockArray = s.fourBlock.arrayBlock;
        const collideBlockBoolean=checkCollision(currentFourBlockArray,[...s.arrayStopBlock] as ReadonlyArray<ReadonlyArray<Block|false>>)
        //True means got collision happen
    
        //collideblock and collideBoundary return not the same state
        if (collideBlockBoolean){
          const checkClearBlockInfo=checkClearBlock(addBlock([...lastOriginalState.fourBlock.arrayBlock],[...lastOriginalState.arrayStopBlock] as ReadonlyArray<ReadonlyArray<Block|false>>))

          return {...lastOriginalState,
            spawnNewBlock:true,
            arrayStopBlock:checkClearBlockInfo.updated2DArray,
            clearLine:checkClearBlockInfo.updatedArrayBoolean,
            currentScore:checkClearBlockInfo.clearLineTotal+lastOriginalState.currentScore
          }
            
        }
    
        // No collision happen allow block moveBody
        return {...s}
    }
    
      
      
      
    
    }
    
    
    class Restart implements Action { 
      constructor() {} 
      /**
       * Restart the game by returning modify initial state by keep track of high score
       * @param s previous state
       * @returns new restart initial state
       */
      apply = (s: State):State => {
        return {...initialState,highestScore:s.currentScore>s.highestScore?s.currentScore:s.highestScore}
    }
    
    
    
    
    }
    
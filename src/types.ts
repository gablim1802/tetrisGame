
export type {Key,updated2DArrayInfo,Block,fourBlockType,State,Action}

interface Action {
    apply(s: State): State;
    }
type Key = "KeyS" | "KeyA" | "KeyD" | "KeyW" |"Space";

type updated2DArrayInfo={updated2DArray:ReadonlyArray<ReadonlyArray<Block | false>>,updatedArrayBoolean:boolean, clearLineTotal:number}

type Block=Readonly<{
    id:string
    height: number
    width: number
    x:number
    y:number
    style:string
    type:string
  }>;
  
  type fourBlockType=Readonly<{
    arrayBlock:ReadonlyArray<Block>
    newStateCreatedCount:number
  }>;
  
  type State = Readonly<{
    fourBlock: fourBlockType
    gameEnd: boolean
    newStateCreatedCount: number 
    lastFourBlock: fourBlockType
    spawnNewBlock: boolean
    arrayStopBlock:ReadonlyArray<ReadonlyArray<Block|false>>
    clearLine:boolean
    previewBlock: fourBlockType
    currentTickMiliSec:number
    currentLevel:number
    currentScore:number
    highestScore:number
  }>;
  

/**
 * Inside this file you will use the classes and functions from rx.js
 * to add visuals to the svg element in index.html, animate them, and make them interactive.
 *
 * Study and complete the tasks in observable exercises first to get ideas.
 *
 * Course Notes showing Asteroids in FRP: https://tgdwyer.github.io/asteroids/
 *
 * You will be marked on your functional programming style
 * as well as the functionality that you implement.
 *
 * Document your code!
 */

import "./style.css";

import { fromEvent, interval, merge } from "rxjs";
import { map, filter, scan } from "rxjs/operators";
import {Key,State,Action} from './types'
import{Viewport,Constants,Teleport,Rotation,LeftRight,Down,Tick,Restart,initialState}from './state'
import{centrePreview,isNotNullOrUndefined} from './util'


/** Rendering (side effects) */

/**
 * Displays a SVG element on the canvas. Brings to foreground.
 * @param elem SVG element to display
 */
const show = (elem: SVGGraphicsElement) => {
  elem.setAttribute("visibility", "visible");
  elem.parentNode!.appendChild(elem);
};

/**
 * Hides a SVG element on the canvas.
 * @param elem SVG element to hide
 */
const hide = (elem: SVGGraphicsElement) =>
  elem.setAttribute("visibility", "hidden");

/**
 * Creates an SVG element with the given properties.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/SVG/Element for valid
 * element names and properties.
 *
 * @param namespace Namespace of the SVG element
 * @param name SVGElement name
 * @param props Properties to set on the SVG element
 * @returns SVG element
 */
const createSvgElement = (
  namespace: string | null,
  name: string,
  props: Record<string, string | number> = {}
) => {
  const elem = document.createElementNS(namespace, name) as SVGElement;
  Object.entries(props).forEach(([k, v]) => elem.setAttribute(k, v.toString())); // Convert to string
  return elem;
};

/**
 * This is the function called on page load. Your main game loop
 * should be called here.
 */
export function main() {
  // Canvas elements
  const svg = document.querySelector("#svgCanvas") as SVGGraphicsElement &
    HTMLElement;
  const preview = document.querySelector("#svgPreview") as SVGGraphicsElement &
    HTMLElement;
  const gameover = document.querySelector("#gameOver") as SVGGraphicsElement &
    HTMLElement;
  const container = document.querySelector("#main") as HTMLElement;

  svg.setAttribute("height", `${Viewport.CANVAS_HEIGHT}`);
  svg.setAttribute("width", `${Viewport.CANVAS_WIDTH}`);
  preview.setAttribute("height", `${Viewport.PREVIEW_HEIGHT}`);
  preview.setAttribute("width", `${Viewport.PREVIEW_WIDTH}`);

  // Text fields
  const levelText = document.querySelector("#levelText") as HTMLElement;
  const scoreText = document.querySelector("#scoreText") as HTMLElement;
  const highScoreText = document.querySelector("#highScoreText") as HTMLElement;

  /** User input */
  const restartButton =document.querySelector("#restartButton") as HTMLButtonElement;

  const key$ = fromEvent<KeyboardEvent>(document, "keypress");
  
  const fromKey = (keyCode: Key) =>
    key$.pipe(filter(({ code }) => code === keyCode));
  
  const left$ = fromKey("KeyA").pipe(map(_ => new LeftRight(-20)));
  const right$ = fromKey("KeyD").pipe(map(_ => new LeftRight(20)));
  const down$ = fromKey("KeyS").pipe(map(_ => new Down(20)));
  const rotate$ = fromKey("KeyW").pipe(map(_ => new Rotation()));
  const teleport$ = fromKey("Space").pipe(map(_ => new Teleport()));
  const restartClick$ = fromEvent<MouseEvent>(restartButton, "mousedown").pipe(map(_ => new Restart()));
  const gameClock$ = interval(Constants.TICK_RATE_MS).pipe(map(elapsed => new Tick(elapsed)))

  
  // Make sure restartButton exists before creating the observable
 
  
  

  // Create an observable for the restart button click event
  

  /** Observables */

  /** Determines the rate of time steps */
 


  /**
   * Renders the current state to the canvas.
   *
   * In MVC terms, this updates the View using the Model.
   *
   * @param s Current state
   */
  const render = (s: State) => {

    //Remove lastFourBlock
    s.lastFourBlock.arrayBlock.map(block=>document.getElementById(block.id)).filter(isNotNullOrUndefined).map(filteredO=>svg.removeChild(filteredO));

    
    // Add blocks to the main grid canvas
    s.fourBlock.arrayBlock.forEach((block) => {
  // Check if the block with the same id exists in the SVG
    const existingBlock = document.getElementById(block.id);

  // If the block with the same id doesn't exist, append it
  if (!existingBlock) {

    svg.appendChild(createSvgElement(svg.namespaceURI, "rect", block));
  }
});
    

    
 


    //Clear line 
    if (s.clearLine){
      const elementsToRemove = [...svg.children];
      elementsToRemove.forEach(element => {element.id!="gameOver"&&element.id!="restartButton" ?svg.removeChild(element):null});
    s.arrayStopBlock.forEach((row, i) => {
      row.forEach((value, j) => {if (value!=false ){svg.appendChild(createSvgElement(svg.namespaceURI, "rect", value))}});
  });
    }


    //Clear all the previous preview block
    const elementsToRemove = [...preview.children];
    elementsToRemove.forEach(element => preview.removeChild(element));
    
    //Add Update previewBlocks
    const previewBlock=centrePreview(s.previewBlock).arrayBlock
    previewBlock.map(block=>preview.appendChild(createSvgElement(preview.namespaceURI, "rect", block)))


    //Update scoreboard
    levelText.textContent = `${s.currentLevel}`; // Replace "2" with the desired level value
    scoreText.textContent = `${s.currentScore}`; // Replace "100" with the desired score value
    highScoreText.textContent = `${s.highestScore}`; 


    //Show clear all the elements if game ends
    if (s.gameEnd){

      const elementsToRemoveBlock = [...svg.children];
      elementsToRemoveBlock.forEach(element => {element.id!="gameOver"&&element.id!="restartButton" ?svg.removeChild(element):null});

      const elementsToRemove = [...preview.children];
      elementsToRemove.forEach(element => preview.removeChild(element));

    }

    

    

  };

  const reduceState = (s: State, action: Action) => action.apply(s);

  const source$ = merge(gameClock$, left$, right$, down$, rotate$,teleport$,restartClick$)
  .pipe(scan(reduceState, initialState));

const subscription = source$.subscribe((s: State) => {
  render(s);

  if (s.gameEnd) {
    show(gameover);
    
     // Unsubscribe from the source$ observable
  } else {
    hide(gameover);
  }
});
}

// The following simply runs your main function on window load.  Make sure to leave it in place.
if (typeof window !== "undefined") {
  window.onload = () => {
    main();
  };
}
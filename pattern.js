import { Screenshot } from './screenshot';
import React from 'react';


/**
* Compares the passcode to the user input and displays the number of dots
* that are correct and in the right order, and dots that are correct in the wrong order
* @param pattern user inputted pattern
* @param pass the password pregernerated
*/
export function feedback(pattern, pass){
    let feedback = [0, 0];
    for (let i = 0; i < pass.length; i++) {
      if (pattern[i] === pass[i]) {
        feedback[0]++;
      } else if (pass.includes(pattern[i])) {
        feedback[1]++;
      }
    }
    return feedback;
}

/**
* Creates a screenshot and pushes it to the front of the array containing the images
* @param feedback array of correct dots and semi correct dots
* @param screenshots array of all the screenshots
* @param pattern user inputted pattern
* @param length length of the pattern
* @param size size of the board
*/
export function screenshots(feedback, screenshots, pattern, length, size){
  screenshots.reverse();
  screenshots.push(<Screenshot length={length} size={size} correct={feedback[0]} semi={feedback[1]} key={'' + screenshots.length} dots={pattern}></Screenshot>);
  screenshots.reverse();
  return screenshots;
}

/**
 * Generate valid pass codes based on grid size
 */
export function generate(length, size, pass){
  for (let i = 0; i < length; i = pass.length) {
      let idx = Math.floor(Math.random() * size * size);

      if (pass.includes(idx))
          continue;

      if (i > 0) {
          let yLast = Math.floor(pass[i - 1] / size);
          let xLast = pass[i - 1] % size;
          let y = Math.floor(idx / size);
          let x = idx % size;

          //console.log(xLast, yLast, pass[i - 1], x, y, idx);

          if (x === xLast) {
              for (let k = yLast + Math.sign(y - yLast); k !== y + Math.sign(y - yLast) && pass.length !== length; k += Math.sign(y - yLast)) {
                  let idx = k * size + x;
                  if (pass.includes(idx))
                      continue;
                  pass.push(idx);
              }
          } else {
              let slope = (y - yLast) / (x - xLast);

              for (let k = 1; k <= Math.abs(x - xLast) && pass.length !== length; k++) {
                  let yn = slope * k * Math.sign(x - xLast) + yLast;
                  let xn = k * Math.sign(x - xLast) + xLast;
                  if (yn % 1 === 0 && xn % 1 === 0) {
                      let idx = yn * size + xn;
                      if (pass.includes(idx))
                          continue;
                      pass.push(idx);
                  }
              }
          }
      } else {
          pass.push(idx);
      }
  }
  return pass;
}

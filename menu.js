import React from 'react'
import leftArrow from './leftArrow.png';
import rightArrow from './rightArrow.png';
import dots from './instructionsdots.png';
import demo from './dem.mp4';
const menu = (props) => {


    return (
        <div className="container">
            <div className="menu">
                <h1>BreakLock</h1>
            </div>


            <div className="splitLeft">

                <div>
                  <h2> Gamemode: {props.gamemode} </h2>
                  <button onClick={props.nextGamemode}> next </button>
                </div>

                <div>
                  <h4> {props.instructions} </h4>
                  <video style={{ width: '30%' }}
                      src={demo}
                      autoPlay loop
                      video />
                </div>
                <img type = "image" alt="dots" src={dots}/>
            </div>
            <div className="splitRight">
                <h2> Size: </h2>
                <div>
                    <input src={rightArrow} type="image" alt="right arrow" id="image" width="40px" height="40px" onClick={props.addSize} />
                </div>
                <h4> {props.size} </h4>
                <div>
                    <input src={leftArrow} type="image" alt="left arrow" id="image" width="40px" height="40px" onClick={props.subSize} />
                </div>
            </div>
            <div className="splitRightRight">
                <h2> Length: </h2>
                <div>
                    <input src={rightArrow} type="image" alt="right arrow" id="image" width="40px" height="40px" onClick={props.addLength} />
                </div>
                <h4> {props.length} </h4>
                <div>
                    <input src={leftArrow} type="image" alt="left arrow" id="image" width="40px" height="40px" onClick={props.subLength} />
                </div>
            </div>
            <button onClick={props.goToGame}> Play! </button>
        </div>


    );
};

export default menu;

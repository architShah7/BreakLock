import React from 'react'
import { Lock } from './lock';

const game = (props) => {
    let s = {
        width: (50 * (props.size - 1) + 30 * props.size),
        height: (50 * (props.size - 1) + 30 * props.size),
    }

    return (
        <div className="container">
            <div className="menu">
                <h1>BreakLock</h1>
            </div>
            <div style={s} className="pattern"><Lock size={props.size} length={props.length} check={props.check}></Lock></div>
            <div style={{ marginTop: 45 }}> attempt: {props.attemptNum} </div>
            <button style={{ marginTop: 45 }} onClick={props.goToMenu}> Back to Menu </button>
            <button style={{ marginTop: 45 }} onClick={props.resetScreenshots}> Clear </button>
            <div className="shots">
                {props.screenshots}
            </div>
        </div>


    );
};

export default game;

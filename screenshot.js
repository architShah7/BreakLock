import React, { Component } from 'react';
/**
 * Capture user's most recent move and display it
 */
export class Screenshot extends Component {
    /**
     * Displays the pattern attempted by the user
     */

    svgDots = (circles, l, size) => {
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                circles.push(<circle cx={'' + l[x]} cy={'' + l[y]} rel={circles.length} r="1"></circle>);
            }
        }

    }

    svgLines = (lines, length, l, size) => {
        for (let i = 0; i < length - 1; i++) {
            let val = Math.floor(255 / length * (i + 1));
            let color = val * 65536 + val * 256 + val;
            let x1 = l[this.props.dots[i] % size];
            let y1 = l[Math.floor(this.props.dots[i] / size)];
            let x2 = l[this.props.dots[i + 1] % size];
            let y2 = l[Math.floor(this.props.dots[i + 1] / size)];
            lines.push(<line x1={x1} y1={y1} x2={x2} y2={y2} stroke={'#' + color.toString(16)}></line>);
        }

    }

    render() {
        let l = [];
        let size = this.props.size;
        let length = this.props.length;
        for (let i = 0; i < size; i++) {
            l.push('' + (15 + 70 / (size - 1) * i));
        }

        //adding dots to the array
        let circles = [];
        this.svgDots(circles, l, size);

        let lines = [];
        this.svgLines(lines, length, l, size);

        // let correct = [];
        // let semi = [];

        let stroke = 14 * 3 / size;

        //let i = 0;

        //Returns the svg consisting the grid, user's attempt, and number of correct and semi-correct dots
        return (<svg width="100" height="130">
            <g fill="#fff">
                {circles}
            </g>
            <g strokeWidth={'' + stroke} strokeLinecap="round">
                {lines}
            </g>
            <g>
                <circle cx={35} cy="110" r="10" strokeWidth="2" fill="#fff" stroke="#fff" fillOpacity="1" strokeOpacity="1"></circle>
                <circle cx={65} cy="110" r="10" strokeWidth="2" fill="#000" stroke="#fff" fillOpacity=".25" strokeOpacity="1"></circle>
                <text x={35} y="110" textAnchor="middle" fill="#000" strokeWidth="0px" dy=".3em">{this.props.correct}</text>
                <text x={65} y="110" textAnchor="middle" fill="#fff" strokeWidth="0px" dy=".3em">{this.props.semi}</text>
            </g>
        </svg>
        );
    }
}

import React, { Component } from 'react';
import './lock.css';
import './pattern.js';
var patternjs = require('./pattern');
/**
 * Displays and controls fully functioning android lock pattern
 */
export class Lock extends Component {
    state = {
        down: false,
        lines: [],
        length: 4,
        size: 3,
        active: [],
        pass: [],
        status: ''
    }

    /**
     * Initializes the game variables and a grid lock with size n x n
     * @param {*} props
     */
    constructor(props) {
        super(props);

        if (this.props.length !== undefined)
            this.state.length = this.props.length;
        if (this.props.size !== undefined)
            this.state.size = this.props.size;

        this.state.active = [...Array(this.state.length)].fill(false);

        this.state.pass = [];
        this.setState({
            pass: patternjs.generate(this.state.length, this.state.size, this.state.pass)
        });
        console.log(this.state.pass);
    }

    /**
     * Check the entered pattern for correctness
     * @returns true if the pattern is correct, false otherwise
     */
    check = () => {
        if (this.props.check !== undefined)
            this.props.check(this.state.pattern, this.state.pass);

        for (let i = 0; i < this.state.length; i++)
            if (this.state.pattern[i] !== this.state.pass[i])
                return false;

        return true;
    }

    /**
     * Verifies whether the given coordinates lie within a bounding rectangle
     */
    contains = (rect, x, y) => { return x <= rect.right && x >= rect.left && y <= rect.bottom && y >= rect.top; }

    /**
     * Mouse up function to help with adding selected dots in the array
     * @param e
     */
    up = (e) => {
        if (!this.state.down)
            return;

        this.setState({ down: false });

        if (this.state.pattern.length !== this.state.length)
            this.setState({
                pattern: [],
                active: [...Array(this.state.size * this.state.size)].fill(false),
                lines: []
            });
    }

    /**
     * Mouse move function to help with adding selected dots in the array
     * @param e - Event javascript object to capture information about the mouse move event
     */
    move = (e) => {
        if (!this.state.down) return;

        let board = document.getElementById("board").getBoundingClientRect();

        let dots = [];

        for (let i = 0; i < this.state.size * this.state.size; i++)
            dots.push(document.getElementById('' + i).getBoundingClientRect());

        let x = e.clientX;
        let y = e.clientY;

        let o = [...Array(this.state.length)].fill(0);

        let lines = [];
        let off = 15;

        for (let i = 0; i < dots.length; i++) {
            if (this.contains(dots[i], x, y) && !this.state.pattern.includes(i)) {
                let active = this.state.active;
                let yLast = Math.floor(this.state.pattern[this.state.pattern.length - 1] / this.state.size);
                let xLast = this.state.pattern[this.state.pattern.length - 1] % this.state.size;
                let y = Math.floor(i / this.state.size);
                let x = i % this.state.size;

                if (x === xLast) {
                    for (let k = yLast + Math.sign(y - yLast); k !== y + Math.sign(y - yLast) && this.state.pattern.length !== this.state.length; k += Math.sign(y - yLast)) {
                        let idx = k * this.state.size + x;
                        if (this.state.pattern.includes(idx))
                            continue;
                        active[idx] = true;
                        o[this.state.pattern.length] = 2.5;
                        this.state.pattern.push(idx);
                    }
                } else {
                    let slope = (y - yLast) / (x - xLast);

                    for (let k = 1; k <= Math.abs(x - xLast) && this.state.pattern.length !== this.state.length; k++) {
                        let yn = slope * k * Math.sign(x - xLast) + yLast;
                        let xn = k * Math.sign(x - xLast) + xLast;
                        if (yn % 1 === 0 && xn % 1 === 0) {
                            let idx = yn * this.state.size + xn;
                            if (this.state.pattern.includes(idx))
                                continue;
                            active[idx] = true;
                            o[this.state.pattern.length] = 2.5;
                            this.state.pattern.push(idx);
                        }
                    }
                }

                this.setState({ active: active });
            }
        }

        let i = 0;

        for (; i < this.state.pattern.length - 1; i++) {
            let val = Math.floor(255 / this.state.length * (i + 1));
            let color = val * 65536 + val * 256 + val;
            let x1 = dots[this.state.pattern[i]].left - board.left + off - o[i];
            let y1 = dots[this.state.pattern[i]].top - board.top + off - o[i];
            let x2 = dots[this.state.pattern[i + 1]].left - board.left + off - o[i + 1];
            let y2 = dots[this.state.pattern[i + 1]].top - board.top + off - o[i + 1];
            lines.push(<line key={'' + i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={'#' + color.toString(16)}></line>);
        }

        if (this.state.pattern.length !== this.state.length) {
            let color = (255) * 65536 + (255) * 256 + (255);
            let x1 = dots[this.state.pattern[i]].left - board.left + off - o[i];
            let y1 = dots[this.state.pattern[i]].top - board.top + off - o[i];
            let x2 = x - board.left;
            let y2 = y - board.top;
            lines.push(<line key={'' + i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={'#' + color.toString(16)}></line>);
        }

        this.setState({ lines: lines });

        if (this.state.pattern.length === this.state.length) {
            this.setState({ down: false });
            this.setState({ status: this.check() ? 'right' : 'wrong' });
        }
    }
    /**
     * Calculates the grid width in pixels
     * @returns width of the board
     */
    width = () => {
        return (50 * (this.state.size - 1) + 30 * this.state.size);
    }

    /**
    * Calculates the grid height in pixels
    * @returns height of the board
    */
    height = () => {
        return (50 * (this.state.size - 1) + 30 * this.state.size);
    }

    /**
     * Obtains and updates the dots selected by the user based on the mouse down event
     * @param e - javacript event object
     * @param id - Selected dot's identifier
     */
    down = (e, id) => {
        let active = [...Array(this.state.size * this.state.size)].fill(false);
        active[id] = true;
        this.setState({ down: true, pattern: [id], active: active, lines: [], status: '' });
    }


    /**
     * Dynamically displays the gameboard
     */
    render() {
        let cells = [];
        const divstyle = {
            gridTemplateColumns: 'auto '.repeat(this.state.size),
        };

        for (let i = 0; i < this.state.size * this.state.size; i++) {
            let name = this.state.status === '' ? "active" : this.state.status;

            cells.push(
                <div
                    key={'' + i}
                    id={'' + i}
                    className={!this.state.active[i] ? "dot" : name}
                    onMouseDown={(e) => this.down(e, i)}
                />);
        }

        let s = {
            width: this.width(),
            height: this.height()
        }

        return <div id="wrapper"><div id="board" className="board" onMouseUp={(e) => this.up(e)} onMouseMove={(e) => this.move(e)}>
            <div className="lines">
                <svg style={s}>
                    <g strokeWidth="12.5" strokeLinecap="round">
                        {this.state.lines}
                    </g>
                </svg>
            </div>
            <div style={divstyle} className="lock">
                {cells}
            </div>
        </div></div>
    }
}

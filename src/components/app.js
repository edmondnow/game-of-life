import React, { Component } from "react";
import ReactDOM from "react-dom";
import Panel from './panel';


class GameOfLife extends Component{
  constructor(props){
    super(props);
    this.state = {
      res: 4,
      width: 0,
      height: 0,
      cols: 250,
      rows: 250,
      passed: [],
      grid: [],
      generation: 0
    }
  }
  

  make2DArray(){
    let grid = Array.from(Array(this.state.rows), () => new Array(this.state.cols));
    return grid;
  }


  makeGrid(){
    
    let grid = this.make2DArray();
    for (let i = 0; i < this.state.cols; i++) {
      for (let j = 0; j < this.state.rows; j++) {
        grid[i][j] = Math.floor(Math.random() * 2);
      }
    }
    this.setState({grid: grid, passed: grid}) 
  }


  draw(){
    let cols = this.state.cols;
    let rows = this.state.rows
    let res = this.state.res;
    let grid = this.state.grid;
    let canvas = ReactDOM.findDOMNode(this.refs.canvas)
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 1000, 1000);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = i * res;
          let y = j * res;
          if(grid[i][j]==1){
            let sumPassed = this.countNeighbors(this.state.passed, i, j)
            if(sumPassed==3&&this.state.passed[i][j]==0){
              ctx.fillStyle = this.randomColor();
            } else {
               ctx.fillStyle = "white";
            }
            ctx.rect(x, y, res, res);
            ctx.fillRect(x, y, res-1, res-1)
          }
          
        }
    }
}

  randomColor(){
    let colors = [ '#FD5B78','#FF6037','#FF9966','#FF9933','#FFCC33','#FFFF66','#FFFF66','#CCFF00','#66FF66','#AAF0D1','#50BFE6','#FF6EFF','#EE34D2','#FF00CC','#FF00CC',]
    return colors[Math.floor(Math.random() * colors.length)] 
  }

  nextGen(){

    let cols = this.state.cols;
    let rows = this.state.rows
    let res = this.state.res;
    let grid = this.state.grid;
    let next = this.make2DArray();
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        //count live neighbors
        let neighbors = this.countNeighbors(grid, i, j)
        if (state == 0 && neighbors == 3){
          next[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)){
          next[i][j] = 0;
        } else {
          next[i][j] = state; 
        } 
      }  
    }
  
    grid = next;
    return grid;
  
  }

  updateDimensions() {
      console.log('resize event')
      this.setState({width: window.innerWidth, height: window.innerHeight});
  }
 
  countNeighbors(grid, x, y){
    let cols = this.state.cols;
    let rows = this.state.rows
    let sum = 0;
    for(let i = -1; i < 2; i++){
      for( let j = -1; j <2; j++){
        let col =  (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        sum+= grid[col][row];
      }
    }
    sum-= grid[x][y]
    return sum
  }

  componentWillMount(){
    this.updateDimensions()
    this.makeGrid();

  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions());
    this.draw();
    let next = this.nextGen();
    this.setState({passed: this.state.grid, grid: next, generation: this.state.generation + 1});
  }

  componentDidUpdate(){
    let next = this.nextGen();
    this.draw();
    setTimeout(()=>{
      this.setState({passed: this.state.grid, grid: next, generation: this.state.generation + 1});
    }, 10)
  }
  componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
}

  render(){
    return (
      <div>
        <Panel gen={this.state.generation}/>
        <canvas ref="canvas" style={{width : this.state.width, height: this.state.height}} 
        width={this.state.width/1.5} height={this.state.height/1.5}></canvas>
      </div>
    )
  }
}




export default GameOfLife;



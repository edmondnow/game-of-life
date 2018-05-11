import React, { Component } from "react";
import ReactDOM from "react-dom";

class NewCanvas extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (<canvas ref="canvas" width="1000" height="1000"></canvas>)
  }
  
}

class GameOfLife extends Component{
  constructor(props){
    super(props);
    this.state = {
      res: 40,
      width: 1000,
      height: 1000,
      cols: 25,
      rows:25,
      grid: []
    }
  }
  

  make2DArray(){
    let cols = this.state.width / this.state.res; 
    let rows = this.state.height / this.state.res;
    let grid = Array.from(Array(rows), () => new Array(cols));
    return grid;
  }


  makeGrid(){
    let grid = this.make2DArray();
    for (let i = 0; i < this.state.cols; i++) {
      for (let j = 0; j < this.state.rows; j++) {
        grid[i][j] = Math.floor(Math.random() * 2);
      }
    }
    this.setState({grid}) 
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
          ctx.rect(x, y, res, res);
          ctx.stroke();
          if(grid[i][j]==1){
            ctx.fillRect(x,y,res-1,res-1)
          }
          
        }
    }
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
    let check = this.checkArrays(grid, next);
    if(!check){
      grid = next;
      return grid;
    }
  
  }
  checkArrays(grid, next){
    for(let i = 0; i<grid.length; i++){
      if(grid[i]!=next[i]){
        return false
      }
    }
    return true
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
    this.makeGrid();
  }

  componentDidMount() {
    this.draw();
    let grid = this.nextGen();
    this.setState({grid});
  }

  componentDidUpdate(){
    let grid = this.nextGen();
    this.draw();
    setTimeout(()=>{
      this.setState({grid});
    }, 10)
  }


  render(){
    return(
      <div>
        <NewCanvas ref="canvas"/>
      </div>
    )
  }
}




export default GameOfLife;


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
      pause: false,
      passed: [],
      grid: [],
      generation: 0
    }

    this.handlePause = this.handlePause.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.boardClickHandler = this.boardClickHandler.bind(this);
  
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
    this.setState({grid: grid, passed: grid});
    
  }
  
  clearBoardReturnCtx(){
    let canvas = ReactDOM.findDOMNode(this.refs.canvas)
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 1000, 1000);
    return ctx
  }

  draw(){
    let cols = this.state.cols;
    let rows = this.state.rows
    let res = this.state.res;
    let grid = this.state.grid;
    let passed = this.state.passed;
    let ctx = this.clearBoardReturnCtx();
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = i * res;
          let y = j * res;
          if(grid[i][j]==1){
            let sumPassed = this.countNeighbors(passed, i, j)
            if(sumPassed==3&&passed[i][j]==0){
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
  
  handleClear(e){
    if(e.target.id=='Clear & Stop'){
      this.setState({grid: [], passed: [], generation: 0,pause: true});
      this.clearBoardReturnCtx()
    } else if (e.target.id=='Fill & Start'){
      this.makeGrid();
      this.setState({pause: false});
    }
    
  }
  
  boardClickHandler(evt){
    let res = this.state.res
    let canvas = ReactDOM.findDOMNode(this.refs.canvas)
    let rect = canvas.getBoundingClientRect();
    let ctx = canvas.getContext("2d");
    let x = ((evt.clientX - rect.left) / (rect.right - rect.left) * (canvas.width));
    let y = ((evt.clientY - rect.top) / (rect.bottom - rect.top) * (canvas.height));
    console.log(`x:${Math.round(x/4)} and y:${Math.round(y/4)}`);
    //ctx.fillStyle = "white";
    //ctx.rect(x, y, res, res);
    //ctx.fillRect(x, y, res-1, res-1)
    let grid = this.state.grid
    let i = Math.round(x/4);
    let j = Math.round(y/4);
    console.log(grid[i][j]);
    if(grid[i][j]==0){
      grid[i][j]==1
    } else {
      grid[i][j]==0
    }

    //this.setState({grid})
    //this.draw()
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
      this.setState({width: window.innerWidth, height: window.innerHeight - 44});
  }


  handlePause(e){
    if(!this.state.pause&&this.state.grid.length===0){
      this.makeGrid();
    } else if(this.state.pause&&this.state.grid.length!=0){
      this.setState({pause: false})
    } else if(!this.state.pause){
      this.setState({pause: true})
    }
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

  shouldComponentUpdate(nextProps, nextState){
    return (nextState.pause==true ? false : true)

  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions());
    let canvas = ReactDOM.findDOMNode(this.refs.canvas)
    canvas.addEventListener('click', this.boardClickHandler);
    let next = this.nextGen();
    this.setState({passed: this.state.grid, grid: next, generation: this.state.generation + 1});
  }

  componentDidUpdate(){

    this.draw();
    if(!this.state.pause){
      let next = this.nextGen();
    
      setTimeout(()=>{
        this.setState({passed: this.state.grid, grid: next, generation: this.state.generation + 1});
      }, 0)
    }
  }
  componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
}

  render(){
    return (
      <div>
        <Panel gen={this.state.generation} handlePause={this.handlePause} handleClear={this.handleClear} />
        <canvas ref="canvas" style={{width : this.state.width, height: this.state.height}} 
        width={this.state.width/1.6} height={this.state.height/1.6}></canvas>
      </div>
    )
  }
}




export default GameOfLife;



import React, { Component } from 'react'
import './style.css';
import './split.css';
export default class App extends Component {
  constructor() {
    super()
    this.state = {
      count: 0,
      sec: '00.00',
      mins: '00',
      // start: false,
      split: [],
      lapdiff: [],
    }
  }


  render() {
    // let timer;
    const starttime = () => {

      this.myInterval = setInterval(() => {
        // console.log(this.state.count);
        this.setState({ count: this.state.count + 1 })
        var sec = (this.state.count / 100)
        var min = Math.floor(sec / 60)
        sec = sec % 60;

        this.setState({
          sec: sec.toFixed(2).toString().padStart(5, '0'), mins: min.toString().padStart(2, '0'),
        })



      }, 10)
    }


    const handlestop = () => {
      clearInterval(this.myInterval);
      // console.log("Its working");
    }

    const handlesplit = () => {
      // clearInterval(this.myInterval);
      const add = `${this.state.mins}:${this.state.sec}`;
      if (this.state.split[this.state.split.length - 1] !== add)
        this.setState({ split: [...this.state.split, add] });
      console.log(this.state.split);
      if (this.state.split.length >= 2) {
        var firstlast = this.state.split[this.state.split.length - 1].split(":")[1];
        var secondlast = this.state.split[this.state.split.length - 2].split(":")[1];
        var diff = firstlast - secondlast;
        this.setState({ lapdiff: [...this.state.lapdiff, diff] });
      }
    }

    const handlereset = () => {
      clearInterval(this.myInterval);
      this.setState({ count: 0, split: [], sec: '00.00', mins: '00', lapdiff: [] });
    }

    return (
      <div className="App" >
        <p>{this.state.mins}:{this.state.sec}</p>
        <button onClick={starttime}>Start</button>
        <button onClick={handlestop}>stop</button>
        <button onClick={handlesplit}>Split</button>
        <button onClick={handlereset}>Reset</button>
        <div className="maindiv">
          <div className="item1">

            {
              this.state.split.map(item => (<p>{item}</p>))

            }
          </div>
          <div className="item1">
            {
              this.state.lapdiff.map(item => (<p className="diff">{String(item).slice(0, 4)}</p>))
            }
          </div>
        </div>
      </div >
    )
  }
}


// export default App;
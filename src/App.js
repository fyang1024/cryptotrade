import React, { Component } from 'react'
import { connect } from 'react-redux'
import { start } from './redux/actions'
import './App.css'

const mapStateToProps = state => ({
  trades: state.trades,
  stats: state.stats
})

class App extends Component {

  constructor(props) {
    super(props)
    this.dispatchStart = this.dispatchStart.bind(this)
  }

  dispatchStart() {
    this.props.dispatch(start())
  }

  render() {
    const { trades, stats } = this.props
    console.log('stats', stats)
    return (
      <div className="App">
        <button onClick={this.dispatchStart}>Start</button>
        <p>{trades && trades.length}</p>
        { stats &&
          <table align='center' width='80%'>
            <tbody>
            <tr>
              <th>Price</th>
              <th>Buy Volume</th>
              <th>Sell Volume</th>
              <th>Total Volume</th>
              <th>Time</th>
            </tr>
            {
              Object.keys(stats).map((key, index) =>
                <tr key = {index}>
                  <td>{key}</td>
                  <td>{stats[key].buy}</td>
                  <td>{stats[key].sell}</td>
                  <td>{stats[key].total}</td>
                  <td>{stats[key].time}</td>
                </tr>
              )
            }
            </tbody>
          </table>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);

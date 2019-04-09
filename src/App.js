import React, { Component } from 'react'
import { connect } from 'react-redux'
import { start } from './redux/actions'
import './App.css'

const mapStateToProps = state => ({
  count: state.count,
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
    const { count, stats } = this.props
    return (
      <div className="App">
        <button onClick={this.dispatchStart}>Start</button>
        <p>Trades: {count}</p>
        { stats && Object.keys(stats).length &&
          <table align='center' width='68%'>
            <tbody>
            <tr>
              <th>Price</th>
              <th>Buy Volume</th>
              <th>Sell Volume</th>
              <th>Total Volume</th>
              <th>Trades</th>
            </tr>
            {
              Object.keys(stats).map((key, index) =>
                <tr key = {index}>
                  <td>{key}</td>
                  <td>{stats[key].buy}</td>
                  <td>{stats[key].sell}</td>
                  <td>{stats[key].total}</td>
                  <td>{stats[key].trades}</td>
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

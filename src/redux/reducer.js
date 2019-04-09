import { DATA_RECEIVED } from "./actions";

const MAX_TRADES = 100

export default function(state, action) {
  switch (action.type) {
    case DATA_RECEIVED: {
      let { trades, stats } = state;
      let newTrades = [...trades]
      while (newTrades.length >= MAX_TRADES) {
        newTrades.shift()
      }
      let newTrade = action.payload
      let price = newTrade[3].toFixed(2).toString();

      let newStats = {...stats}
      if (!newStats[price]) {
        newStats[price] = {buy: 0, sell:0, total: 0, trades:0, time: 0}
      }
      if(newTrade[2] > 0) {
        newStats[price].buy += newTrade[2]
      } else {
        newStats[price].sell += Math.abs(newTrade[2])
      }
      newStats[price].total = newStats[price].buy + newStats[price].sell
      newStats[price].trades += 1
      newTrades.push(newTrade)
      return {count: state.count + 1, trades: newTrades, stats: newStats}
    }
    default:
      return {count: 0, trades: [], stats: {}}
  }
}

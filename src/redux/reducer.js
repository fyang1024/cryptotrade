import { RETRIEVE_DATA, DATA_RECEIVED } from "./actions";

const MAX_TRADES = 100

export default function(state, action) {
  switch (action.type) {
    case RETRIEVE_DATA:
      return {}
    case DATA_RECEIVED: {
      let { trades, stats } = state;
      if (!trades) {
        trades = []
        stats = {}
      }
      let newTrades = [...trades]
      while (newTrades.length >= MAX_TRADES) {
        newTrades.shift()
      }
      let newTrade = action.payload
      let price = newTrade[3].toString();

      let newStats = {...stats}
      if (!newStats[price]) {
        newStats[price] = {buy: 0, sell:0, total: 0, time: 0}
      }
      if(newTrade[2] > 0) {
        newStats[price].buy += newTrade[2]
      } else {
        newStats[price].sell += Math.abs(newTrade[2])
      }
      newStats[price].total = newStats[price].buy + newStats[price].sell
      if(newTrades.length && newTrade[2] === newTrades[newTrades.length - 1][2]) {
        newStats[price].time += Math.abs(newTrade[1] - newTrades[newTrades.length - 1][1])
      }
      newTrades.push(newTrade)
      return {trades: newTrades, stats: newStats}
    }
    default:
      return {}
  }
}

export const RETRIEVE_DATA = 'RETRIEVE_DATA'
export const DATA_RECEIVED = 'DATA_RECEIVED'

const retrieveData = () => ({type: RETRIEVE_DATA})
const dataRetrieved = (data) => ({type: DATA_RECEIVED, payload: data})

export function start() {
  console.log('started')
  return (dispatch) => {
    dispatch(retrieveData())
    const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2')
    wss.onmessage = (msg) => {
      if (msg.data && msg.data.length) {
        let data = JSON.parse(msg.data)
        if (data[1] === 'te') {
          console.log('received trade data', data[2])
          console.log(data[2])
          dispatch(dataRetrieved(data[2]))
        }
      }
    }
    let msg = JSON.stringify({
      event: 'subscribe',
      channel: 'trades',
      symbol: 'tBTCUSD'
    })
    wss.onopen = () => wss.send(msg)
  }
}

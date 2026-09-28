import WebSocket from "ws";

const TWELVE_DATA_API_KEY = process.env.TWELVE_DATA_API_KEY;

const TWELVE_DATA_WS_URL =
  `wss://ws.twelvedata.com/v1/quotes/price?apikey=${TWELVE_DATA_API_KEY}`;

const symbols = [
  "EUR/USD",
  "XAU/USD",
];

let marketSocket = null;
let reconnectTimer = null;
let heartbeatTimer = null;

const latestMarkets = {};

export const connectToMarketData = (io) => {
  if (!TWELVE_DATA_API_KEY) {
    throw new Error("TWELVE_DATA_API_KEY is not defined");
  }

  const connect = () => {
    if (
      marketSocket &&
      (
        marketSocket.readyState === WebSocket.OPEN ||
        marketSocket.readyState === WebSocket.CONNECTING
      )
    ) {
      console.log("Twelve Data connection already active");
      return;
    }

    console.log("Connecting to Twelve Data...");

    marketSocket = new WebSocket(TWELVE_DATA_WS_URL);

    marketSocket.on("open", () => {
      console.log("Connected to Twelve Data");
      marketSocket.send(
        JSON.stringify({
          action: "subscribe",
          params: {
            symbols: symbols.join(","),
          },
        })
      );

      console.log(`Subscribed to: ${symbols.join(", ")}`);
      if (heartbeatTimer) {
        clearInterval(heartbeatTimer);
      }

      heartbeatTimer = setInterval(() => {
        if (marketSocket?.readyState === WebSocket.OPEN) {
          marketSocket.send(
            JSON.stringify({
              action: "heartbeat",
            })
          );

          console.log("Heartbeat sent");
        }
      }, 10000);
    });

    marketSocket.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString());
        if (message.event === "subscribe-status") {
          console.log(
            "Subscription status:",
            JSON.stringify(message, null, 2)
          );

          return;
        }

        if (message.event === "heartbeat") {
          console.log("Heartbeat response received");
          return;
        }

        // Price update
        if (message.event === "price") {
          const market = {
            symbol: message.symbol,
            price: Number(message.price),
            timestamp: message.timestamp,
          };

          // Save latest price
          latestMarkets[message.symbol] = market;

          console.log("Market update:", market);
          
         io.emit("market_update", market);
        }
      } catch (error) {
        console.error(
          "Failed to process Twelve Data message:",
          error
        );
      }
    });

    marketSocket.on("error", (error) => {
      console.error(
        "Twelve Data WebSocket error:",
        error
      );
    });

    marketSocket.on("close", (code, reason) => {
      console.log(
        `Twelve Data disconnected. Code: ${code}, Reason: ${reason.toString()}`
      );


      if (heartbeatTimer) {
        clearInterval(heartbeatTimer);
        heartbeatTimer = null;
      }

      marketSocket = null;

      // Reconnect
      if (!reconnectTimer) {
        console.log("Reconnecting to Twelve Data in 5 seconds...");

        reconnectTimer = setTimeout(() => {
          reconnectTimer = null;

          connect();
        }, 5000);
      }
    });
  };

  connect();
};

export const getLatestMarkets = () => {
  return Object.values(latestMarkets);
};
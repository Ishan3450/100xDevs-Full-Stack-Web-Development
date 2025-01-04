import { createClient, RedisClientType } from "redis";

export class PubSubManager {
  private static instance: PubSubManager;
  private redisClient: RedisClientType;
  private subscriptions: Map<string, string[]>;

  private constructor() {
    this.redisClient = createClient();
    this.redisClient.connect();
    this.subscriptions = new Map();
  }

  public static getInstance(): PubSubManager {
    if (!this.instance) {
      this.instance = new PubSubManager();
    }
    return this.instance;
  }

  addUserToStock(userId: string, stockName: string) {
    if (!this.subscriptions.has(stockName)) {
      this.subscriptions.set(stockName, []);
    }
    this.subscriptions.get(stockName)?.push(userId);

    if (this.subscriptions.get(stockName)?.length === 1) {
      this.redisClient.subscribe(stockName, (message) => {
        this.forwardStockPriceToUser(stockName, message);
      });
      console.log(`Subscribed to Redis channel: ${stockName}`);
    }
  }

  removeUserFromStock(userId: string, stockName: string) {
    this.subscriptions.get(stockName)?.filter((id) => id !== userId);

    if (this.subscriptions.get(stockName)?.length === 0) {
      this.redisClient.unsubscribe(stockName);
      console.log(`UnSubscribed to Redis channel: ${stockName}`);
    }
  }

  // Define the method that will be called when a message is published to the subscribed channel
  private forwardStockPriceToUser(stock: string, price: string) {
    console.log(`Message received on channel ${stock}: ${price}`);
    this.subscriptions.get(stock)?.forEach((sub) => {
      console.log(`Sending message to user: ${sub}`);
    });
  }

  // Cleanup on instance destruction
  public async disconnect() {
    await this.redisClient.quit();
  }
}

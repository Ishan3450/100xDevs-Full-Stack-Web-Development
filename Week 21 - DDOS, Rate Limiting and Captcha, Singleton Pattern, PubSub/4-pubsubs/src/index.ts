import { PubSubManager } from "./PubSubManager";

setInterval(() => {
  PubSubManager.getInstance().addUserToStock(Math.random().toString(), "APPL");
}, 5000);

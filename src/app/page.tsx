import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { subscribe, natsConnect } from "../pubsub2";
import { createAppJwt } from "../pubsub2/userJwt";

const LiveNewsFeed = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const natsWsUrl = "wss://europe-west3-gcp-dl-testnet-brokernode-frankfurt01.synternet.com:443";
    const exampleSubscribeSubject = "stark.news.live";
    const subscribeAccessToken = "SAAMTLX5KZ27GIVAHQNKD5FOEV5UZO73W2NEWMRHOVBUYGE42S5ZMCH6UQ";

    const connectToNats = async () => {
      const { userSeed: seed, jwt } = createAppJwt(subscribeAccessToken);
      const config = { url: natsWsUrl };

      try {
        await subscribe({
          onMessages: (messages) => {
            messages
              .filter((message) => message.subject === exampleSubscribeSubject)
              .forEach((message) => {
                const newsData = JSON.parse(message.data);
                setNewsItems((prevItems) => [newsData, ...prevItems].slice(0, 10)); // Keep only the latest 10 items
              });
          },
          onError: (text, error) => console.error(text, error),
          jwt: jwt,
          nkey: seed,
          config: config,
          subject: exampleSubscribeSubject,
        });
        console.log("Connected to NATS server.");
      } catch (error) {
        console.error("Failed to connect to NATS server:", error);
      }
    };

    connectToNats();

    return () => {
      // Clean up the connection when the component unmounts
      // You might need to implement a disconnect function in your pubsub2 module
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Live News Feed</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <p className="text-xs text-gray-500">Source: {item.creator}</p>
              <p className="text-xs text-gray-500">Published: {new Date(item.pubDate).toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LiveNewsFeed;

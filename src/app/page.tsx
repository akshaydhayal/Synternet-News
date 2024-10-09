"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";

const LiveNewsFeed = () => {
  const [newsItems, setNewsItems] = useState([]);
  console.log("news items ",newsItems);

  return (
    <div className="container mx-auto p-4">
      <Header setNewsItems={setNewsItems} />

      <h1 className="text-2xl font-bold mb-4">Live News Feed</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {newsItems.length > 0 &&
          newsItems.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              {item.image && (
                  <img src={item.image} className="w-full h-36 object-cover"/>
              )}
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

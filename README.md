# Synternet Live News Headlines

Live Project Link: [https://synternet-news.vercel.app/](https://synternet-news.vercel.app/)

## Description

The Live News Feed is a dynamic web application that fetches and displays real-time news articles from RSS feeds, leveraging Synternet for live data streaming. News items are published to Synternet data streams at regular 30-second intervals from a EC2 Server, ensuring users receive the latest news in real time. The app subscribes to these data streams, updates the content as new items are published, and presents them in an easy-to-read, card-based layout. The UI is designed for efficiency, with skeleton loaders shown during data retrieval, ensuring a smooth user experience even when live data is temporarily unavailable.

## Features

- **Live News Publishing**: Live Headlines from a RSS Feed are published every 30 seconds through a EC2 Server, providing real-time updates.
- **Client Subscribes to Synternet Stream:**: Utilizes Synternet to subscribe to live news data streams.
- **Real-Time Updates:**: The app dynamically updates the feed without needing a page reload, offering a continuous flow of news as it is published to the data stream.

## Website Demo

![Mission Dashboard](https://github.com/akshaydhayal/Synternet-News/blob/main/Create-Next-App.png)

*Figure 1: Live News Headlines Page*



## Video Demo:
https://www.loom.com/share/8295bdcef9a24e74a42a90fbc8c3067e?sid=52934ec4-3654-49c1-9a72-4b1f73b415ef

## Technologies Used

- **Frontend**: Next.js, React,  Tailwind CSS, Lucide Icons
- **Live streams**: Synternet, EC2 Server
  
## Synternet Streams Used

- **Published Stream**: stark.news.live
- **Subscribed streams**: stark.news.live

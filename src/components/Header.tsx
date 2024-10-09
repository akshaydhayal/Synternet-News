import React, { useEffect, useRef, useState } from "react";
// import { FaBell } from "react-icons/fa";

//@ts-expect-error Function
const Header = ({ setNewsItems }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(false);

  const eventSourceRef = useRef(null);

  useEffect(() => {
    const connectEventSource = () => {
      if (typeof window === "undefined") return;

      if (eventSourceRef.current) {
        //@ts-expect-error close
        eventSourceRef.current.close();
      }

      const eventSource = new EventSource("/api/nats");
      //@ts-expect-error close
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log("EventSource connected");
        setIsConnected(true);
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setNewsItems(data);
          setLastUpdated(new Date().toLocaleString());
        } catch (error) {
          console.error("Error parsing event data:", error);
        }
      };

      eventSource.onerror = (error) => {
        console.error("EventSource failed:", error);
        setIsConnected(false);
        eventSource.close();
        setTimeout(connectEventSource, 5000);
      };
    };

    connectEventSource();

    return () => {
      if (eventSourceRef.current) {
        //@ts-expect-error close
        eventSourceRef.current.close();
      }
    };
  }, [setNewsItems]);

  return (
    // <header className="py-6 bg-gradient-to-r from-green-700 via-green-800 to-green-900 shadow-lg">
    //   <div className="container mx-auto text-center">
    //     <div className="flex items-center gap-6 justify-center">
    //       <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-500">Cricket Live</h1>
    //       {/* <FaBell className={`text-yellow-400 mb-2 text-4xl ${isConnected ? "animate-bounce" : ""}`} /> */}
    //     </div>
    //     <p className="text-lg text-gray-300">Stay updated with real-time cricket scores and match details from around the world.</p>
    //     <p className={`mt-2 ${isConnected ? "text-green-400" : "text-red-500"}`}>{isConnected ? "Connected to live updates" : "Connecting to server..."}</p>
    //   </div>
    // </header>

    <header className="py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4 mb-0 md:mb-0">
            <h1 className="text-4xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Live News</h1>
          </div>
          <div className="text-center md:text-right">
            <div className="flex items-center gap-4">
              <p className={`text-base font-medium ${isConnected ? "text-green-400" : "text-red-400"}`}>
                {isConnected ? "● Connected to live updates" : "○ Connecting to server..."}
              </p>
              {lastUpdated && <p className="text-base text-gray-400 ">Last updated at: {lastUpdated}</p>}
            </div>
          </div>
        </div>
        <p className="text-lg text-center text-gray-300 mt-2">Real-time Global Headlines and News from Around the World: Stay Updated with Breaking Stories</p>
      </div>
    </header>
  );
};

export default Header;

"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

const LiveNewsFeed = () => {
  const [newsItems, setNewsItems] = useState([]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header setNewsItems={setNewsItems} />

      <main className="container mx-auto px-4 py-8">
        {/* <h1 className="text-3xl font-bold mb-8 text-center">Live News Feed{newsItems.length==0 && <Loader2 className="h-8 w-8 text-green-400 animate-spin" />}</h1> */}
        <div className="text-3xl font-bold mb-8 text-center flex justify-center gap-4 items-center">
          Live News Feed
          {newsItems.length==0 && <div className="flex items-center gap-2">
            <p className="text-base font-medium"> ( Getting data from a Synternet Live News Data stream )</p>
            <Loader2 className="h-9 w-9 text-green-400 animate-spin" />
            </div>
          }</div>

        {newsItems.length === 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsItems && newsItems.length>0 && newsItems.map((item, index) => (
              <Card key={index} className=" bg-gray-800 border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* @ts-expect-error ignore */}
                {item.image && <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />}
                <CardHeader className="p-2 px-6">
                  {/* @ts-expect-error ignore */}
                  <CardTitle className="text-lg font-semibold text-gray-100">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                  {/* @ts-expect-error ignore */}
                  <p className="text-sm text-gray-300 mb-2 line-clamp-5">{item.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    {/* @ts-expect-error ignore */}
                    <p>Source: {item.creator}</p>
                    {/* @ts-expect-error ignore */}
                    <p>{new Date(item.pubDate).toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default LiveNewsFeed;









// "use client";
// import React, { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Header from "@/components/Header";

// const LiveNewsFeed = () => {
//   const [newsItems, setNewsItems] = useState([]);
//   console.log("news items ",newsItems);

//   return (
//     <div className="container mx-auto p-4">
//       <Header setNewsItems={setNewsItems} />

//       <h1 className="text-2xl font-bold mb-4">Live News Feed</h1>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {newsItems.length > 0 &&
//           newsItems.map((item, index) => (
//             <Card key={index} className="overflow-hidden">
//               {item.image && (
//                   <img src={item.image} className="w-full h-36 object-cover"/>
//               )}
//               <CardHeader>
//                 <CardTitle className="text-lg">{item.title}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm text-gray-600 mb-2">{item.description}</p>
//                 <p className="text-xs text-gray-500">Source: {item.creator}</p>
//                 <p className="text-xs text-gray-500">Published: {new Date(item.pubDate).toLocaleString()}</p>
//               </CardContent>
//             </Card>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default LiveNewsFeed;

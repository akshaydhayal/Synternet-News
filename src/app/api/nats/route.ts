import { NextResponse } from "next/server";
import { NatsService } from "../../../pubsub/nats";
import { createAppJwt } from "../../../pubsub/userJwt";
import nodemailer from "nodemailer";
import { alertModel } from "@/db/models/alerts";
import { dbConnect } from "@/db/dbConnect";

export const dynamic = "force-dynamic";

let service: NatsService | null = null;

export async function GET() {
//   await dbConnect();
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  if (!service) {
    console.log("Initializing NATS service");
    const natsUrl = "europe-west3-gcp-dl-testnet-brokernode-frankfurt01.synternet.com:4222";
    const subject = "stark.news.live";
    const accessToken = process.env.SUBSCRIBE_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json({ error: "Access token not found" }, { status: 500 });
    }

    service = new NatsService({
      url: natsUrl,
      natsCredsFile: createAppJwt(accessToken),
    });

    try {
      console.log("Connecting to NATS server...");
      await service.waitForConnection();
      console.log("Connected to NATS server.");
    } catch (error) {
      console.error("Failed to connect to NATS server:", error);
      return NextResponse.json({ error: "Failed to connect to NATS" }, { status: 500 });
    }

    service.addHandler(subject, async (data: Uint8Array) => {
      const decodedData = new TextDecoder().decode(data);
      console.log(`Received message on ${subject}: ${decodedData}`);
      //   await sendAlerts(decodedData);
      await writer.write(encoder.encode(`data: ${decodedData}\n\n`));
    });

    //  setInterval(() => {
    //   writer.write(encoder.encode(`data: ping\n\n`));
    // }, 1700); // Send ping every 30 seconds

    await service.serve();
  }

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}




// import { NextRequest } from "next/server";
// import { NatsService } from "../../../pubsub/nats";
// import { createAppJwt } from "../../../pubsub/userJwt";

// export const dynamic = "force-dynamic";

// let subscribeService: NatsService | null = null;

// async function connectToSubscribe() {
//   if (!subscribeService) {
//     const subscribeAccessToken = process.env.SUBSCRIBE_ACCESS_TOKEN;
//     const natsUrl = "europe-west3-gcp-dl-testnet-brokernode-frankfurt01.synternet.com:4222";

//     if (!subscribeAccessToken) throw new Error("Subscribe access token not found");

//     subscribeService = new NatsService({
//       url: natsUrl,
//       natsCredsFile: createAppJwt(subscribeAccessToken),
//     });

//     await subscribeService.waitForConnection();
//     console.log("Connected to subscribe NATS server.");
//   }
//   return subscribeService;
// }

// export async function GET(req: NextRequest) {
//   const responseStream = new TransformStream();
//   const writer = responseStream.writable.getWriter();
//   const encoder = new TextEncoder();

//   const service = await connectToSubscribe();
//   const subject = "stark.news.live";

//   service.addHandler(subject, async (data: Uint8Array) => {
//     const decodedData = new TextDecoder().decode(data);
//     console.log(`Received message on ${subject}`);
//     await writer.write(encoder.encode(`data: ${decodedData}\n\n`));
//   });

//   await service.serve();

//   req.signal.addEventListener("abort", () => {
//     console.log("Connection aborted by the client");
//     writer.close().catch(console.error);
//   });

//   return new Response(responseStream.readable, {
//     headers: {
//       "Content-Type": "text/event-stream",
//       "Cache-Control": "no-cache",
//       Connection: "keep-alive",
//     },
//   });
// }

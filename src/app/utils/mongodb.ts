import { env } from "@/env";
import { MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient(env.NODE_CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export { client };

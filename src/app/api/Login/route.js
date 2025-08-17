import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // .env.local me rakho
const client = new MongoClient(uri);

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    await client.connect();
    const db = client.db(); // URL me jo DB diya hai wahi use hoga
    const collection = db.collection("Login");

    const user = await collection.findOne({ username, password });

    if (user) {
      return new Response(
        JSON.stringify({ success: true, message: "Login successful" }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid username or password" }),
        { status: 401 }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Something went wrong" }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

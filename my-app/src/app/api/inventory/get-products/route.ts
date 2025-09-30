import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const inventoryRef = collection(db, "inventory");
    const snapshot = await getDocs(inventoryRef);
    const products = snapshot.docs.map((doc) => doc.data());
    return NextResponse.json(products);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

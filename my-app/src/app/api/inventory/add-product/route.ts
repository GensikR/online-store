import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { collection, doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { name, description, details, price, quantity, images } = data;

    if (!name || !description || !details || !price || !quantity || !images?.length) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const inventoryRef = collection(db, "inventory");
    const productDocRef = doc(inventoryRef, name.toLowerCase());

    const existingProduct = await getDoc(productDocRef);

    if (existingProduct.exists()) {
      // Add new quantity to existing
      await updateDoc(productDocRef, {
        quantity: increment(quantity),
      });
    } else {
      // Add new product
      await setDoc(productDocRef, {
        name,
        description,
        details,
        price,
        quantity,
        images,
      });
    }

    return NextResponse.json({ message: "Product added successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

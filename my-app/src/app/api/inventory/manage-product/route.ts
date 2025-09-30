import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, updatedFields } = data;

    if (!name || !updatedFields) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const productRef = doc(db, "inventory", name.toLowerCase());
    const existing = await getDoc(productRef);

    if (!existing.exists()) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (updatedFields.quantity === 0) {
      // Delete product if quantity = 0
      await deleteDoc(productRef);
    } else {
      // Update other fields
      await updateDoc(productRef, updatedFields);
    }

    return NextResponse.json({ message: "Product updated" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

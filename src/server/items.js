"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const serialize = (doc) => {
  if (!doc) return null;

  return {
    ...doc,
    _id: doc?._id?.toString ? doc._id.toString() : doc._id,
  };
};

export const getItems = async () => {
  try {
    const col = dbConnect(collections.ITEMS);

    const items = await col
      .find({})
      .sort({ createdAt: -1 }) // nice default
      .toArray();

    return items.map(serialize);
  } catch (err) {
    console.error("getItems error:", err);
    return [];
  }
};

export const getSingleItem = async (id) => {
  try {
    if (!id || typeof id !== "string") return null;

    const col = dbConnect(collections.ITEMS);

    // Allow both Mongo ObjectId and custom ids like "itm-001"
    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { id };

    const item = await col.findOne(query);
    if (!item) return null;

    return serialize(item);
  } catch (err) {
    console.error("getSingleItem error:", err);
    return null;
  }
};

// create item (protected)
export const createItem = async (payload) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { ok: false, status: 401, error: "Unauthorized" };
    }

    const name = (payload?.name || "").toString().trim();
    const description = (payload?.description || "").toString().trim();

    const priceNum = Number(payload?.price);
    const stockNum =
      payload?.stock === "" || payload?.stock === undefined
        ? 0
        : parseInt(payload.stock, 10);

    const category = (payload?.category || "Uncategorized").toString().trim();
    const currency = (payload?.currency || "USD").toString().trim();

    const tagsRaw = (payload?.tags || "").toString();
    const tags = tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 10);

    // Validation (edge cases)
    if (name.length < 2) return { ok: false, status: 400, error: "Name must be at least 2 characters." };
    if (description.length < 10) return { ok: false, status: 400, error: "Description must be at least 10 characters." };
    if (!Number.isFinite(priceNum) || priceNum < 0) return { ok: false, status: 400, error: "Price must be a valid non‑negative number." };
    if (!Number.isFinite(stockNum) || stockNum < 0) return { ok: false, status: 400, error: "Stock must be a valid non‑negative integer." };

    const now = new Date();

    const doc = {
      name,
      description,
      price: priceNum,
      stock: stockNum,
      category,
      currency,
      tags,
      status: "active",
      createdAt: now,
      updatedAt: now,
      createdBy: {
        id: session.user.id,
        email: session.user.email,
      },
    };

    const result = await dbConnect(collections.ITEMS).insertOne(doc);

    return { ok: true, status: 201, id: result.insertedId.toString() };
  } catch (err) {
    console.error("createItem error:", err);
    return { ok: false, status: 500, error: "Failed to create item." };
  }
};

"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

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

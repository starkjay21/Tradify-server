import express from "express";
import mongoose from "mongoose";
import { ItemModel } from "../models/Items.js";
import {UserModel} from "../models/Users.js";
import {verifyToken} from "./users.js";

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const response = await ItemModel.find({})
        res.json(response)
    } catch (error) {
        res.json({ message: error })
    }
})

router.post("/", verifyToken, async (req, res) => {
    const item = new ItemModel(req.body)

    try {
        const response = await item.save()
        res.json(response)
    } catch (error) {
        res.json({ message: error })
    }
})

router.put("/", verifyToken, async (req, res) => {

    try {
        const item = await ItemModel.findById(req.body.itemID)
        const user = await UserModel.findById(req.body.userID)
        user.savedItems.push(item)
        await user.save()
        res.json({ savedItems: user.savedItems })
    } catch (error) {
        res.json({ message: error })
    }
})

router.put("/remove", verifyToken, async (req, res) => {
    try {
        const item = await ItemModel.findById(req.body.itemID)
        const user = await UserModel.findById(req.body.userID)
        const index = user.savedItems.indexOf(item._id);
        if (index > -1) { // only splice array when item is found
            user.savedItems.splice(index, 1); // 2nd parameter means remove one item only
        }
        await user.save()
        res.json({ savedItems: user.savedItems })
    } catch (error) {
        res.json({ message: error })
    }
})

router.get("/:userID", verifyToken, async (req, res) => {
    const user = await UserModel.findById(req.params.userID)
    const userListings = await ItemModel.find({
        itemOwner: user._id
    })
    res.json({ userListings })
})
router.get("/savedItems/ids/:userID", verifyToken, async (req, res) => {
    const user = await UserModel.findById(req.params.userID)
    res.json({ savedItemIDs: user?.savedItems })
})

router.get("/savedItems/:userID", verifyToken, async (req, res) => {
  const user = await UserModel.findById(req.params.userID)
  const savedItems = await ItemModel.find({
      _id: { $in: user?.savedItems }
  })
  res.json({ savedItems })
})

export { router as itemRouter }

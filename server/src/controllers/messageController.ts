import type { Request, Response } from "express";
import { Message } from "../models/Message.js";

export const createMessage = async (
  req: Request,
  res: Response,
) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};
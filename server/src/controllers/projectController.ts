import type { Request, Response } from "express";
import { Project } from "../models/Project.js";

export const getProjects = async (
  _req: Request,
  res: Response,
) => {
  try {
    const projects = await Project.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: projects,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to get projects",
    });
  }
};

export const getProjectBySlug = async (
  req: Request,
  res: Response,
) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to get project",
    });
  }
};
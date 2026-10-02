import Project from "../models/Project.js";



export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        message: "Name and description are required"
      });
    }

    const project = await Project.create({
      name,
      description,
      createdBy: req.user._id
    });

    res.status(201).json({
      message: "Project created successfully",
      project
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create project"
    });
  }
};
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("createdBy", "name email");

    res.status(200).json(projects);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch projects"
    });
  }
};
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.status(200).json(project);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch project"
    });
  }
};
export const updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.status(200).json({
      message: "Project updated successfully",
      project
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update project"
    });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.status(200).json({
      message: "Project deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete project"
    });
  }
};
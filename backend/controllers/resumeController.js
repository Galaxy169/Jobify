import { getResume, upsertResume } from "../models/resumeModel.js";

export const fetchResume = async (req, res) => {
  try {
    const resume = await getResume(req.user.id);

    res.json({
      message: "Resume fetched",
      data: resume,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const saveResume = async (req, res) => {
  try {
    await upsertResume(req.user.id, req.body);

    res.json({ message: "Resume saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

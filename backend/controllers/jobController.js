import {
  createJob,
  getJobsByUser,
  getJobById,
  updateJob,
  deleteJob,
} from "../models/jobModel.js";

import {
  createPost,
  updatePost,
  deletePostByJob,
} from "../models/communityModel.js";


export const addJob = async (req, res) => {
  try {
    const jobId = await createJob(req.user.id, req.body);
    console.log(req.body);

    if (req.body.share_in_community) {
      await createPost({
        user_id: req.user.id,
        job_id: jobId,
        company: req.body.company,
        role: req.body.role,
        question: req.body.interview_questions,
        experience: req.body.experience,
      });
    }

    res.json({ message: "Job created", data: { jobId } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await getJobsByUser(req.user.id);

    res.json({ message: "Jobs fetched", data: jobs });
  } catch (err) {
    console.error("Get jobs error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const editJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const existing = await getJobById(jobId, req.user.id);
    if (!existing) {
      return res.status(404).json({ message: "Job not found" });
    }

    await updateJob(jobId, req.user.id, req.body);

    // COMMUNITY SYNC
    if (req.body.share_in_community) {
      if (existing.share_in_community) {
        // update existing post
        await updatePost(jobId, {
          company: req.body.company,
          role: req.body.role,
          question: req.body.interview_questions,
          experience: req.body.experience,
        });
      } else {
        // create new post
        await createPost({
          user_id: req.user.id,
          job_id: jobId,
          company: req.body.company,
          role: req.body.role,
          question: req.body.interview_questions,
          experience: req.body.experience,
        });
      }
    } else {
      // remove post if unchecked
      await deletePostByJob(jobId);
    }

    res.json({ message: "Job updated" });
  } catch (err) {
    console.error("Edit job error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    await deletePostByJob(jobId); // clean community
    await deleteJob(jobId, req.user.id);

    res.json({ message: "Job deleted" });
  } catch (err) {
    console.error("Delete job error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

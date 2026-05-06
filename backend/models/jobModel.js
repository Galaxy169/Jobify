import { pool } from "../config/db.js";

export const createJob = async (userId, data) => {
  const {
    company,
    role,
    work_type,
    salary_range,
    status,
    date_applied,
    location,
    job_posting_url,
    notes,
    interview_questions,
    experience,
    share_in_community,
  } = data;

  const [result] = await pool.query(
    `INSERT INTO jobs
    (user_id, company, role, work_type, salary_range, status,
     date_applied, location, job_posting_url, notes,
     interview_questions, experience, share_in_community)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      company,
      role,
      work_type,
      salary_range,
      status,
      date_applied,
      location,
      job_posting_url,
      notes,
      interview_questions,
      experience,
      share_in_community,
    ],
  );

  return result.insertId;
};

export const getJobsByUser = async (userId) => {
  const [rows] = await pool.query(
    "SELECT * FROM jobs WHERE user_id = ? ORDER BY created_at DESC",
    [userId],
  );
  return rows;
};

export const getJobById = async (id, userId) => {
  const [rows] = await pool.query(
    "SELECT * FROM jobs WHERE id = ? AND user_id = ?",
    [id, userId],
  );
  return rows[0];
};

export const updateJob = async (id, userId, data) => {
  const {
    company,
    role,
    work_type,
    salary_range,
    status,
    date_applied,
    location,
    job_posting_url,
    notes,
    interview_questions,
    experience,
    share_in_community,
  } = data;

  await pool.query(
    `UPDATE jobs SET
      company=?, role=?, work_type=?, salary_range=?, status=?,
      date_applied=?, location=?, job_posting_url=?, notes=?,
      interview_questions=?, experience=?, share_in_community=?
     WHERE id=? AND user_id=?`,
    [
      company,
      role,
      work_type,
      salary_range,
      status,
      date_applied,
      location,
      job_posting_url,
      notes,
      interview_questions,
      experience,
      share_in_community,
      id,
      userId,
    ],
  );
};

export const deleteJob = async (id, userId) => {
  await pool.query("DELETE FROM jobs WHERE id = ? AND user_id = ?", [
    id,
    userId,
  ]);
};
import { pool } from "../config/db.js";

export const createPost = async (data) => {
  const { user_id, job_id, company, role, question, experience } = data;

  await pool.query(
    `INSERT INTO community_posts 
    (user_id, job_id, company, role, question, experience)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [user_id, job_id, company, role, question, experience],
  );
};

export const deletePostByJob = async (jobId) => {
  await pool.query("DELETE FROM community_posts WHERE job_id = ?", [jobId]);
};

export const getPosts = async (limit) => {
  let query = `
    SELECT company, role, question, experience, created_at
    FROM community_posts
    ORDER BY created_at DESC
  `;

  if (limit) query += " LIMIT ?";

  const [rows] = limit
    ? await pool.query(query, [limit])
    : await pool.query(query);

  return rows;
};

export const updatePost = async (jobId, data) => {
  const { company, role, question, experience } = data;

  await pool.query(
    `UPDATE community_posts 
     SET company=?, role=?, question=?, experience=?
     WHERE job_id=?`,
    [company, role, question, experience, jobId],
  );
};
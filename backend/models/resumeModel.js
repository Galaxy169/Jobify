import { pool } from "../config/db.js";

export const getResume = async (userId) => {
  const [rows] = await pool.query("SELECT * FROM resumes WHERE user_id = ?", [
    userId,
  ]);
  return rows[0];
};

export const upsertResume = async (userId, data) => {
  const {
    full_name,
    email,
    phone,
    linkedin,
    skills,
    education,
    projects,
    experience,
  } = data;

  await pool.query(
    `INSERT INTO resumes 
    (user_id, full_name, email, phone, linkedin, skills, education, projects, experience)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
    full_name=?, email=?, phone=?, linkedin=?, skills=?, education=?, projects=?, experience=?`,
    [
      userId,
      full_name,
      email,
      phone,
      linkedin,
      skills,
      JSON.stringify(education),
      JSON.stringify(projects),
      JSON.stringify(experience),

      full_name,
      email,
      phone,
      linkedin,
      skills,
      JSON.stringify(education),
      JSON.stringify(projects),
      JSON.stringify(experience),
    ],
  );
};

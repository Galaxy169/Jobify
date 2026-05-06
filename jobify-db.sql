CREATE DATABASE IF NOT EXISTS jobify;
USE jobify;

-- USERS
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    subscription_type ENUM('free','premium') DEFAULT 'free',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- JOBS
CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    company VARCHAR(100),
    role VARCHAR(100),
    work_type ENUM('remote','onsite','hybrid'),
    salary_range VARCHAR(50),
    status ENUM('saved','applied','interviewing','offer','rejected') DEFAULT 'saved',
    date_applied DATE,
    location VARCHAR(100),
    job_posting_url VARCHAR(255),
    notes TEXT,
    interview_questions TEXT,
    experience TEXT,
    share_in_community TINYINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- COMMUNITY
CREATE TABLE community_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    job_id INT,
    company VARCHAR(100),
    role VARCHAR(100),
    question TEXT,
    experience TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

-- RESUME
CREATE TABLE resumes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    full_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    linkedin VARCHAR(255),
    skills TEXT,
    education JSON,
    projects JSON,
    experience JSON,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- PAYMENTS
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    razorpay_order_id VARCHAR(100),
    razorpay_payment_id VARCHAR(100),
    status ENUM('created','paid','failed') DEFAULT 'created',
    amount INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
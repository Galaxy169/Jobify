# Getting Started

- **MAKE SURE YOUR NODE VERSION IS 22.22.2 (LTS) or above.**
- https://nodejs.org/en/download
- Read Them:

## 1. Clone Repo (Skip if already done)

```bash
git clone https://github.com/Galaxy169/Jobify.git
cd jobify
```

### 2. Setup Backend

```bash
cd backend
npm install
```

**Rename `.env.example` to `.env` in backend the folder.**

Run the backend server:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

### Common Error

#### node is not recognized as an internal command

- make sure node is installed on your computer and Environment Variables is set up correctly.

#### ps1 cannot be loaded because running scripts is disabled on this system.

- Open PowerShell as Administrator and run the below command

```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

- Then type Y for yes.

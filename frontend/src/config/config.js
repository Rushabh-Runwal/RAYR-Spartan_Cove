export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-domain.com/api" // production backend URL
    : "http://localhost:5002"; // development backend URL

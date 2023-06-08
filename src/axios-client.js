import axios from "axios";

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5032/api/v1/"
      : "",
  headers: {
    "Content-Type": "application/json",
  },
});

export const backendURL = "http://localhost:5032/api/v1";

export default client;

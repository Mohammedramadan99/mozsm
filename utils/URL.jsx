const dev = process.env.NODE_ENV !== "production";
const URL = dev
        ? "http://localhost:3000"
        : process.env.API_URL;
export default URL
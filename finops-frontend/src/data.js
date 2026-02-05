import axios from "axios";

export const fetchSavingsData = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/savings");
    return res.data;
  } catch (error) {
    console.error("❌ Failed to fetch savings data", error);
    return [];
  }
};

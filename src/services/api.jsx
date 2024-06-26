import axios from "axios";


const API_KEY = "2_hAdcol023eQ37BYC4vEV9mvzPjo_GRTmrzYrmqWn0";

axios.defaults.baseURL = "https://api.unsplash.com";

export const FetchMaterials = async (searchQuery, page, perPage = 12) => {
  
  try {
    const response = await axios.get("/search/photos", {
      params: {
        query: searchQuery,
        page: page,
        per_page: perPage,
        order_by: "relevant",
        orientation: "landscape",
        client_id: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching materials:", error);
    throw error;
  }
};
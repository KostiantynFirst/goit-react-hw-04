import axios from "axios";

// export const FetchMaterials = async (searchQuery, page) => {

// const API_KEY = "2_hAdcol023eQ37BYC4vEV9mvzPjo_GRTmrzYrmqWn0";
// axios.defaults.baseURL = 'https://api.unsplash.com/search/photos';
    
// try {
//       const res = await axios.get(
//           `?page=${page}&query=${searchQuery}&client_id=${API_KEY}&orderBy=relevant&orientation=landscape&per_page=12`
//       );
//   return res.data;

//       }  
//     catch (error) {
//       throw error;
//   }
// }



// const baseURL = "https://api.unsplash.com";
// const client_id = "2_hAdcol023eQ37BYC4vEV9mvzPjo_GRTmrzYrmqWn0";
// axios.defaults.baseURL = baseURL;


// export const FetchMaterials = async (
//   query,
//   page = 1,
//   perPage = 10,
//   orderBy = "relevant",
//   color,
//   orientation
// ) => {
//   try {
//     const { data } = await axios.get("/search/photos", {
//       params: {
//         query,
//         page,
//         per_page: perPage,
//         order_by: orderBy,
//         color,
//         orientation,
//         client_id,
//       },
//     });

//     const { results, total_pages } = data;

//     return { results, total_pages };
//   } catch (error) {
//     console.error("Error fetching images:", error);
//     throw error; 
//   }
// };



const API_KEY = "2_hAdcol023eQ37BYC4vEV9mvzPjo_GRTmrzYrmqWn0";

axios.defaults.baseURL = "https://api.unsplash.com";

export const FetchMaterials = async (searchQuery, page) => {
  try {
    const response = await axios.get("/search/photos", {
      params: {
        query: searchQuery,
        page: page,
        per_page: 12,
        order_by: "relevant",
        orientation: "landscape",
        client_id: API_KEY,
      },
    });

    return response.data; // Возвращаем только данные из ответа
  } catch (error) {
    console.error("Error fetching materials:", error);
    throw error; // Пробрасываем ошибку выше для обработки
  }
};
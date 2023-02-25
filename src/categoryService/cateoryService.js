import categoryServiceConfig from "./cateoryServiceConfig";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTY3NzI1NTI4NywiZXhwIjoxNjc3MjU3MDg3LCJ0eXBlIjoiYWNjZXNzIn0.VCPt6Frrho22stgyZMpATpFweRxs9b_AanC3uAQXrck";

const axiosCall = axios.create({
  baseURL: "https://drkbaapbackend-production.up.railway.app/v1/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const axiosCallFD = axios.create({
  baseURL: "https://drkbaapbackend-production.up.railway.app/v1/",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  },
});

const createCourseCategory = async (categoryBody) => {
  try {
    const res = await axiosCall.post(
      categoryServiceConfig.courseCategory,
      {...categoryBody, parentId:1}
    );
    console.log(res.data);
    return res.data
  } catch (error) {
    console.log(error.response.data);
  }
};

const deleteCourseCategory = async (id) => {
  try {
    const res = await axiosCall.delete(
      categoryServiceConfig.courseCategory + id
    );
    console.log(res.data);
  } catch (error) {
    console.log(error.response.data);
  }
};

const getCourseCategory = async (id) => {
  try {
    const res = await axiosCall.get(categoryServiceConfig.courseCategory + id);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

const editCourseCategory = async (id, categoryBody) => {
  try {
    const res = await axiosCall.patch(
      categoryServiceConfig.courseCategory + id,
      categoryBody
    );
    console.log(res.data);
  } catch (error) {
    console.log(error.response.data);
  }
};

const getAllCourseCategory = async () => {
  try {
    const res = await axiosCall.get(categoryServiceConfig.courseCategory);
    return res.data.filter((item) => item.parentId === 1);
  } catch (error) {
    console.log(error.response.data);
  }
};

const uploadFile = async (formData) => {
  try {
    const res = await axiosCallFD.post(
      categoryServiceConfig.uploadFile,
      formData
    );
    return res.data.url;
  } catch (error) {
    console.log(error.response.data);
  }
};

const categoryApi = {
  getAllCourseCategory,
  getCourseCategory,
  uploadFile,
  createCourseCategory,
  editCourseCategory,
  deleteCourseCategory,
};

export default categoryApi;

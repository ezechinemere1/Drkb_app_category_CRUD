import categoryServiceConfig from "./cateoryServiceConfig";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTY3NzM1ODM3MiwiZXhwIjoxNjc3MzYwMTcyLCJ0eXBlIjoiYWNjZXNzIn0.7THSdENj9FhuR3Lw9utiFQoZNuWc4cvHXSeHkLYC9Xk";

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

/**
 * Create course category
 * @param {Object} categoryBody 
 * @returns 
 */
const createCourseCategory = async (categoryBody) => {
  try {
    const res = await axiosCall.post(categoryServiceConfig.courseCategory, {
      ...categoryBody,
      parentId: 1,
    });
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

/**
 * Delete course category
 * @param {number} id 
 */
const deleteCourseCategory = async (id) => {
  try {
    await axiosCall.delete(categoryServiceConfig.courseCategory + id);
  } catch (error) {
    console.log(error.response.data);
  }
};

/**
 * Get course category by id
 * @param {number} id 
 * @returns {Promise<courseCategory>}
 */
const getCourseCategory = async (id) => {
  try {
    const res = await axiosCall.get(categoryServiceConfig.courseCategory + id);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

/**
 * Edit course category
 * @param {number} id 
 * @param {Object} categoryBody 
 */
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

/**
 * Get all course categories
 * @returns {Promise<courseCategories[]>}
 */
const getAllCourseCategory = async () => {
  try {
    const res = await axiosCall.get(categoryServiceConfig.courseCategory);
    return res.data.filter((item) => item.parentId === 1);
  } catch (error) {
    console.log(error.response.data);
  }
};

/**
 * Upload file to server
 * @param {Object} formData
 * @returns {Promise<url>}
 */
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

/**
 * Create formData and send to upload function
 * @param {Object} icon 
 * @returns {Promise<url>}
 */
const handleUploadIcon = async (icon) => {
  const formData = new FormData();
  formData.append("link", icon);
  return uploadFile(formData);
};

/**
 * Crate course category
 * @param {Object} categoryBody 
 * @returns {Promise<courseCategory>}
 */
const handleCreateCourseCategory = async (categoryBody) => {
  const { icon, ...rest } = categoryBody;
  const iconUrl = await handleUploadIcon(icon[0]);
  return createCourseCategory({ icon: iconUrl, ...rest });
};

/**
 * Update course category
 * @param {number} id 
 * @param {Object} categoryBody 
 * @returns {Promise<courseCategory>}
 */
const handleUpdateCourseCategory = async (id, categoryBody) => {
  const { icon, ...rest } = categoryBody;
  // // if icon is not changed then icon will be undefined
  if (!icon) return editCourseCategory(id, { ...rest });

  const iconUrl = await handleUploadIcon(icon[0]);
  return editCourseCategory(id, { icon: iconUrl, ...rest });
};

const categoryApi = {
  getAllCourseCategory,
  getCourseCategory,
  uploadFile,
  createCourseCategory,
  editCourseCategory,
  deleteCourseCategory,
  handleCreateCourseCategory,
  handleUpdateCourseCategory,
};

export default categoryApi;

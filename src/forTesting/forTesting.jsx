import React from "react";
import { useState } from "react";
import axios from "axios";

function ReserchDataModel({
  setName,
  setDescription,
  setIcon,
  name,
  description,
  icon,
  setInputValue,
  inputValue,
  editCategory
}) {
  const [show, setShow] = useState(true);
console.log(icon)

  const closeModal = () => {
    setShow(false);
  };

  const handleChange = (e) => {
    setName(e.target.value);
    setDescription(e.target.value);
    setIcon(e.target.files[0]);
  };


//   create A category
  const createDataCategories = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("link", icon); // add file to form data

    try {
      let response = await axios.post(
        "https://drkbaapbackend-production.up.railway.app/v1/uploads",
        formData,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTY3NzA2NjU3MiwiZXhwIjoxNjc3MDY4MzcyLCJ0eXBlIjoiYWNjZXNzIn0.AW60G3PMfXyPSj3X4ZHpa7CcQXikDBdMCx0n3jDg7HM",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { url } = response.data.url;
      setIcon(url);
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await axios.post(
        "https://drkbaapbackend-production.up.railway.app/v1/categories",

        {
          name,
          description,
          icon,
          parentId: 2,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTY3NzExNjYwMiwiZXhwIjoxNjc3MTE4NDAyLCJ0eXBlIjoiYWNjZXNzIn0.5KncgRCsyN4UYUxoRMKA5q0z2dS_Sfoe-cShWqE7Hdw",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("hello world");
      console.log(response);
    } catch (error) {
      console.log(console.error());
    }
  };

  return (
    <div
      className={`fixed w-full h-full block left-0 top-0 right-0 z-11 items-center 
    ${show  ? "block" : "hidden"}`}
      style={{ background: "rgba(0, 40, 40, 0.25)" }}
    >
      <div className="relative mt-10  lg:w-1/3 md:w-2/3 w-full px-4 h-full mx-auto ">
        {/* Modal content */}
        <div className="bg-white rounded-lg shadow relative dark:bg-gray-700 md:w-full">
          <div className="flex justify-end p-2">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={closeModal}
            >
              {" "}
              Close
            </button>
          </div>
          <form className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8">
            <h3 className=" dark:text-white text-center syne  font-semibold text-xl text-blue-700">
              Add Category
            </h3>
            <div className=" md:h-20 md:py-1 md:px-4 border-dashed border-4 border-sky-500">

              <input
                type="file"
                id="myFileInput"
                name="myFileInput"
                className="bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-16 md:px-28 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Upload an Icon"
                required
                onChange={handleChange}
     
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Name of Category
              </label>
              <input
                type="text"
                name="Category_name"
                id="Category"
                placeholder="Course title"
                className="bg-gray-50 border border-gray-300 w-full text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-16 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                onChange={handleChange}
                value={editCategory?(inputValue.name):''}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Description
              </label>
              <input
                type="text"
                name="description_name"
                id="description"
                placeholder="Description"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-32 md:px-32 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                value={editCategory?(inputValue.description):''}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e) => createDataCategories(e)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReserchDataModel;
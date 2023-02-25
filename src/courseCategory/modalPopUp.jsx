import React, { useState } from "react";
import categoryService from "../categoryService";

export default function ModalPopUp({
  visible,
  onClose,
  data,
  setData,
  action,
}) {
  const [icon, setIcon] = useState(null);
  const [edit, setEdit] = useState({});

  function handle(e) {
    const newData = { ...data };
    if (e.target.name !== "icon") {
      newData[e.target.name] = e.target.value;
      setData(newData);
    } else {
      setIcon(e.target.files[0]);
    }

    if (action === "edit") {
      setEdit({ [e.target.name]: e.target.value, ...edit });
    }
  }

  const handleCreateCategory = (e) => {
    e.preventDefault();
    handleUploadIcon(icon)
      .then((val) => {
        return { ...data, icon: val };
      })
      .then((info) => {
        categoryService.createCourseCategory(info).then((c) => {
          setData({});
          setIcon(null);
          onClose(true);
        });
      });
  };

  const handleEditCategory = (e) => {
    e.preventDefault();


    console.log({edit, icon})
    
  };

  const handleUploadIcon = async (icon) => {
    const formData = new FormData();
    formData.append("link", icon);
    return categoryService.uploadFile(formData);
  };

  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center ">
      <div>
        <div className="relative  px-4 h-full md:h-auto">
          {/* Modal content */}
          <div className="bg-white rounded-lg shadow relative  md:w-full">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  dark:hover:text-white"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
            {/* form begins here */}
            <form
              className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
              action="#"
            >
              <h3 className="` text-blue-600  text-center syne  font-semibold text-xl">
                Add Course Category
              </h3>
              <div className=" md:h-20 md:py-1 md:px-4 border-dashed border-4 ">
                <input
                  type="file"
                  name="icon"
                  id="icon"
                  className="bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-16 md:px-28 "
                  placeholder="Upload an Icon"
                  required=""
                  onChange={(e) => handle(e)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-900 block mb-2 "
                >
                  Name of Category
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Course title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-16 w-full md:px-32  placeholder-gray-400 "
                  required=""
                  onChange={(e) => handle(e)}
                  value={data.name}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-32 md:px-32 "
                  required=""
                  onChange={(e) => handle(e)}
                  value={data.description}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={
                  action === "create"
                    ? (e) => handleCreateCategory(e)
                    : (e) => handleEditCategory(e)
                }
              >
                {action === "create" ? "Create" : "Update"}
              </button>
            </form>
            {/* form ends here */}
          </div>
        </div>
      </div>
    </div>
  );
}

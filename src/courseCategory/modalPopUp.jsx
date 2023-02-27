import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import categoryService from "../categoryService";

export default function ModalPopUp({
  visible,
  onClose,
  category,
  setCategory,
  action,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: category, // Set the initial data here
  });
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    reset({
      name: category?.name,
      description: category?.description,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // handle change to fetch only updated data
  const handleChange = (field) => {
    setFormValues({ ...formValues, [field]: dirtyFields[field] });
  };

  // handle submission with only changed data
  const onSubmit = (data) => {
    // get keys of all changed fields
    const changedKeys = Object.keys(formValues);

    // filter out the fields based on changed keys
    const filteredData = changedKeys.reduce((acc, key) => {
      acc[key] = data[key];
      return acc;
    }, {});

    // remove icon field if its length is empty
    if (data.icon?.length === 0) delete data.icon;

    // route to create or edit category
    if (action === "create") {
      // send API request to create category
      categoryService.handleCreateCourseCategory(filteredData).then(() => {
        setCategory({});
        reset();
        onClose(true);
      });
    } else {
      // manually resolve category name to send only if it changes
      if (filteredData.name === category.name) delete filteredData.name;

      // send API request to update category
      categoryService
        .handleUpdateCourseCategory(category.id, filteredData)
        .then(() => {
          setCategory({});
          reset();
          onClose(true);
        });
    }
  };

  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center ">
      <div>
        <div className="relative  px-4 h-full md:h-auto">
          {/* Modal content */}
          <div className="bg-white rounded-lg shadow relative  md:w-full">
            <div className="flex justify-end p-2">
              {/* close modal button */}
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  dark:hover:text-white"
                onClick={() => {
                  setCategory({});
                  onClose();
                }}
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
                  {...register("icon")}
                  onChange={() => handleChange("icon")}
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
                  {...register("name")}
                  onChange={() => handleChange("name")}
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
                  {...register("description")}
                  onChange={() => handleChange("description")}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleSubmit(onSubmit)}
                // onClick={
                //   action === "create"
                //     ? (e) => handleCreateCategory(e)
                //     : (e) => handleEditCategory(e)
                // }
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

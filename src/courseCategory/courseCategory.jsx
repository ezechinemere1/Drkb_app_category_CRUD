import React, { useEffect, useState } from "react";
import ModalPopUp from "./modalPopUp";
import Vector from "../courseCategory/images/Vector.png";
import Edit from "../courseCategory/images/edit.png";
import View from "../courseCategory/images/view.png";
import Delete from "../courseCategory/images/delete.png";
import categoryService from "../categoryService";

export default function CourseCategory() {
  const [showMyModal, setShowMyModal] = useState(false);
  const [action, setAction] = useState("");
  const [data, setData] = useState({});
  const [categories, setCategories] = useState([]);

  const handleOnclose = () => {
    categoryService.getAllCourseCategory().then((values) => {
      setCategories(values);
    });
    setShowMyModal(false);
  };

  useEffect(() => {
    categoryService.getAllCourseCategory().then((values) => {
      setCategories(values);
    });
  }, []);

  const handleDelete = (id) => {
    return categoryService.deleteCourseCategory(id).then(() => {
      categoryService.getAllCourseCategory().then((values) => {
        setCategories(values);
      });
    });
  };

  const handleGetId = (id) => {
    categoryService.getCourseCategory(id).then((c) => {
      setData(c);
      setAction("edit");
      setShowMyModal(true);
    });
  };

  const create = () => {
    setAction("create");
    setShowMyModal(true);
  };


  return (
    <>
      <div className=" bg-gray-100 h-screen">
        <div className=" container m-auto  ">
          <h3 className="syne  font-semibold text-xl text-blue-700">
            Manage Categories
          </h3>
          <p className="md:mt-4 text-gray-500">
            The Category section helps in having various categories of courese
            created
          </p>
          <div className="flex flex-row bg-white p-2  md:p-4 mt-2 items-baseline justify-between md:flex-row md:mt-5">
            <div className="flex flex-row md:flex-row gap-2 md:gap:4 items-center ">
              <span>show</span>
              <select className="bg-gray-300 w-12 h-7 rounded-md">
                <option value="">10</option>
                <option value={1}>11</option>
                <option value={2}>12</option>
                <option value={2}>24</option>
              </select>
              <span className="hidden md:block">entries</span>
              <div className="relative md:block">
                <label className="relative block">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-9">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="black"
                      className="w-4 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="search..."
                    className="h-10 md:w-80 w-4/5 rounded-lg pl-16 border border-gray-400"
                  />
                </label>
              </div>
            </div>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 md:hidden"
                data-modal-toggle="authentication-modal"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <button
                onClick={() => create()}
                className=" hidden md:block bg-blue-600 p-1 md:py-2 md:pl-8 md:pr-2 text-white font-xs rounded-lg"
                type="button"
                data-modal-toggle="authentication-modal"
              >
                Add Category
              </button>
            </div>
          </div>
          {/* table container begins here */}
          <div className="relative overflow-x-auto  sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-white d">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S/No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Icon
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex gap-1">
                      <span>
                        <img src={Vector} alt="" />
                      </span>
                      <span>Name</span>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex gap-1">
                      <span>
                        <img src={Vector} alt="" />
                      </span>
                      <span>Date</span>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex gap-1">
                      <span>
                        <img src={Vector} alt="" />
                      </span>
                      <span>Description</span>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item, idx) => (
                  <tr key={idx} className="bg-purple border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      #{idx}
                    </th>
                    <td className="px-6 py-4 rounded-full ">
                      <img
                        className="rounded-full w-10 h-10"
                        src={item.icon}
                        alt={""}
                      />
                    </td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.updatedAt}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="md:px-6 py-4 flex gap-1">
                      <button onClick={() => handleGetId(item.id)}>
                        {" "}
                        <img src={Edit} alt="" />
                      </button>

                      <button>
                        {" "}
                        <img src={View} alt="" />
                      </button>

                      <button onClick={() => handleDelete(item.id)}>
                        {" "}
                        <img src={Delete} alt="" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* table container ends here */}
          </div>
          <div className="bg-white">
            <div className="w-1/3 py-5 m-auto flex items-center justify-center gap-3">
              <h3 className="text-gray-400">Previous</h3>
              <p className="bg-purple-500 py-1 px-3 rounded-lg">1</p>
              <p className="bg-gray-300 py-1 px-3 rounded-lg ">2</p>
              <p className="bg-gray-300 py-1 px-3 rounded-lg">3</p>
              <h3 className="text-gray-400">Next</h3>
            </div>
          </div>

          <ModalPopUp
            onClose={handleOnclose}
            visible={showMyModal}
            data={data}
            setData={setData}
            action={action}
          />
        </div>
      </div>
    </>
  );
}

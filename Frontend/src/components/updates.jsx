/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
  const { id } = useParams();
  const [user, setUser] = useState({
    title: "",
    author: "",
    ISBN: "",
    rating: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((Prev) => {
      return { ...Prev, [name]: value };
    });
  };
  useEffect(() => {
    fetch("http://localhost:5500/getUser/" + id)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No response");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5500/update/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        console.log("successfully sent data", response);
      })
      .catch((err) => {
        console.log("error occured", err);
      });
  };

  return (
    <div className="w-1/3 shadow mx-auto my-32">
      <form onSubmit={handleSubmit} class="space-y-6 px-12 py-6 ">
        <legend class="text-2xl ">General information</legend>
        <div>
          <label for="" class="block px-2 text-gray-400">
            Title
          </label>
          <select
            name="title"
            id=""
            onChange={handleChange}
            class="outline-none border-b border-gray-200 w-[100%]"
            required
          >
            <option value=""></option>
            <option value="Manager">Manager</option>
            <option value="Stock Manager">Stock Manager</option>
            <option value="Executive Officer">Executive Officer</option>
          </select>
        </div>
        <div class="flex gap-3">
          <div>
            <label for="" class="block px-2 text-gray-400">
              FirstName
            </label>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              class="border-b w-[100%] border-gray-200 outline-none focus:outline-none ps-4"
            />
          </div>
          <div>
            <label for="" class="block px-2 text-gray-400">
              LastName
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="lastName"
              class="border-b border-gray-200 outline-none focus:outline-none ps-4"
            />
          </div>
        </div>
        <div>
          <label for="" class="block px-2 text-gray-400">
            Position
          </label>
          <select
            name="position"
            onChange={handleChange}
            id=""
            class="outline-none border-b border-gray-200 w-[100%]"
          >
            <option value=""></option>
            <option value="Senior">Senior</option>
            <option value="Junior">Junior</option>
          </select>
        </div>
        <div>
          <label for="" class="block px-2 text-gray-400">
            Company
          </label>
          <input
            type="text"
            name="company"
            onChange={handleChange}
            class="border-b border-gray-200 outline-none focus:outline-none ps-4 w-[100%]"
          />
        </div>
        <div class="flex gap-12">
          <div>
            <label for="" class="block px-2 text-gray-400">
              Business Arena
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="businessArena"
              class="border-b w-[100%] border-gray-200 outline-none focus:outline-none ps-4"
            />
          </div>
          <div>
            <label for="" class="block px-2 text-gray-400">
              Employees
            </label>
            <select
              name="employees"
              id=""
              onChange={handleChange}
              class="outline-none border-b border-gray-200 w-[100%]"
            >
              <option value=""></option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20+</option>
            </select>
          </div>
        </div>
        <div>
          <button className="px-4 py-2 bg-[#ba03fc] rounded text-white mx-auto my-12">
            Save Data
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;

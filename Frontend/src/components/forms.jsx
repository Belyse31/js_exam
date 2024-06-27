/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Forms() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    position: "",
    company: "",
    businessArena: "",
    employees: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();

    fetch("http://localhost:5500/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed");
        }

        console.log("Saved successfully");
        navigate("/all")
      })
      .catch((err) => {
        console.log("Error in saving the record.");
      });
  };

  const [contact, setContact] = useState({
    streetNumber: "",
    additionalInfo: "",
    zipCode: "",
    place: "",
    country: "",
    code: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setContact((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();

    fetch("http://localhost:5500/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed");
        }

        console.log("Saved successfully");
      })
      .catch((err) => {
        console.log("Error in saving the record.");
      });
  };

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5500/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to get Data!");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log("Error in getting data", err);
      });
  }, []);

  const handleDelete = (id) => {
    fetch("http://localhost:5500/delete/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error Occured");
        }
        setUsers((users) => {
          return users.filter((user) => user._id !== id);
        });
      })
      .catch((err) => {
        console.log("failed to delete the record", err);
      });
  };
  return (
    <div>
      <div className="flex justify-center p-12">
        <div class="flex md:flex-row flex-col justify-between  rounded bg-white space-y-32 md:space-y-0 shadow">
          <div>
            <form onSubmit={handleSubmit1} class="space-y-6 px-12 py-6 ">
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
                <button type="submit"  
                className="px-4 py-2 bg-blue-500 rounded text-white mx-auto my-12">
                  Save Data
                </button>
              </div>
            </form>
          </div>
          <div>
            <form
              onSubmit={handleSubmit2}
              class="space-y-6 px-16 py-6 bg-blue-500 text-white"
            >
              <legend class="text-2xl ">Contacts Details</legend>
              <div>
                <label for="" class="block px-2">
                  Street * Nr
                </label>
                <input
                  onChange={handleChange2}
                  type="text"
                  name="streetNumber"
                  class=" border-b border-white outline-none focus:outline-none ps-4 w-[100%] rounded bg-[#ba03fc]"
                />
              </div>
              <div>
                <label for="" class="block px-2">
                  Additional Information
                </label>
                <input
                  onChange={handleChange2}
                  type="text"
                  name="additionalInfo"
                  class=" border-b border-white outline-none focus:outline-none ps-4 w-[100%] rounded bg-[#ba03fc]"
                />
              </div>
              <div class="flex gap-3">
                <div>
                  <label for="" class="block px-2">
                    Zip Code
                  </label>
                  <input
                    onChange={handleChange2}
                    type="text"
                    name="zipCode"
                    class="  border-b w-[50%] border-white outline-none focus:outline-none ps-4 rounded bg-[#ba03fc]"
                  />
                </div>
                <div>
                  <label for="" class="block">
                    Place
                  </label>
                  <select
                    onChange={handleChange2}
                    name="place"
                    id=""
                    class="  outline-none border-b border-white w-[100%] px-12 rounded bg-[#ba03fc]"
                  >
                    <option value=""></option>
                    <option value="Mukmira">Mukamira</option>
                    <option value="Musanze">Musanze</option>
                  </select>
                </div>
              </div>
              <div>
                <label for="" class="block px-2">
                  Country
                </label>
                <select
                  onChange={handleChange2}
                  name="country"
                  id=""
                  class="  outline-none border-b border-white w-[100%] rounded bg-[#ba03fc]"
                >
                  <option value=""></option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Uganda">Uganda</option>
                </select>
              </div>
              <div class="flex gap-3">
                <div>
                  <label for="" class="block px-2">
                    Code+
                  </label>
                  <input
                    onChange={handleChange2}
                    type="text"
                    name="code"
                    class="  border-b w-[50%] border-white outline-none focus:outline-none ps-4 rounded bg-[#ba03fc]"
                  />
                </div>
                <div>
                  <label for="" class="block">
                    Phone Number
                  </label>
                  <input
                    onChange={handleChange2}
                    type="tel"
                    name="phoneNumber"
                    class="  border-b w-[100%] border-white outline-none focus:outline-none ps-4 rounded bg-[#ba03fc]"
                  />
                </div>
              </div>
              <div>
                <label for="" class="block">
                  Email
                </label>
                <input
                  onChange={handleChange2}
                  type="email"
                  name="email"
                  class="  border-b w-[100%] border-white outline-none focus:outline-none ps-4 rounded bg-[#ba03fc]"
                />
              </div>
              <div>
                <input type="checkbox" name="" id="" />
                <label for="" class="">
                  I do accept <a href="#">The terms and conditions</a> of your
                  site
                </label>
              </div>
              <button class="bg-white rounded-xl text-black px-4 py-1 shadow hover:bg-purple-400 hover:text-white">
                Register Badge
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* <button className="bg-blue-500 hover:bg-green-800 text-white py-2 px-4 rounded-xl mx-2">
        General Information
      </button>
      <table className="border mx-auto">
        <thead className="border">
          <tr className="bg-violet-200">
            <th className="border px-4 py-4">Title</th>
            <th className="border px-4 py-4">First Name</th>
            <th className="border px-4 py-4">Last Name</th>
            <th className="border px-4 py-4">Position</th>
            <th className=" px-4 py-4">Company</th>
            <th className="border px-4 py-4">Business Arena</th>
            <th className="border px-4 py-4">Employees</th>
            <th className="border px-4 py-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id} className="bg-gray-90">
                <td className="border px-4 py-4">{user.title}</td>
                <td className="border px-4 py-4">{user.firstName}</td>
                <td className="border px-4 py-4">{user.lastName}</td>
                <td className="border px-4 py-4">{user.position}</td>
                <td className="border px-4 py-4">{user.company}</td>
                <td className="border px-4 py-4">{user.businessArena}</td>
                <td className="border px-4 py-4">{user.employees}</td>
                <td className="border px-4 py-4">
                  <Link
                    to={`/update/${user._id}`}
                    className="bg-green-500 hover:bg-green-800 text-white py-2 px-4 rounded-xl mx-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-800 text-white py-2 px-4 rounded-xl mx-2"
                    onClick={() => {
                      handleDelete(user._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
   
    </div>
  );
}

export default Forms;
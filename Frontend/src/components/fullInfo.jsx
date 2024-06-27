/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Forms() {
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
         <table className="border mx-auto">
        <thead className="border">
          <tr className="bg-violet-200">
            <th className="border px-4 py-4">Street Number</th>
            <th className="border px-4 py-4">Additional Information</th>
            <th className="border px-4 py-4">zip Code</th>
            <th className="border px-4 py-4">Place</th>
            <th className=" px-4 py-4">Country</th>
            <th className="border px-4 py-4">Code</th>
            <th className="border px-4 py-4">Phone Number</th>            
            <th className="border px-4 py-4">Email</th>
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
      </table>
         </div>
        </div>
      </div>
     
    </div>
  );
}

export default Forms;
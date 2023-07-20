import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../service/UserService";
import api from "../service/UserService";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    api
      .get("http://localhost:8080/api/v1/getAll")
      .then((response) => {
        setUsers(response.data);
        //   console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = (UserId) => {
    api
      .delete("http://localhost:8080/api/v1/deleteUserById/" + UserId)
      .then((response) => {
        getAllUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center"> List Users </h2>
      <Link to="/add-User" className="btn btn-primary mb-2">
        {" "}
        Add User{" "}
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <th> User Id </th>
          <th> User Name </th>
          <th> User Email </th>
          <th> User Role </th>
          <th> Actions </th>
        </thead>
        <tbody>
          {Array.isArray(users) ? (
            users.map((User) => (
              <tr key={User.id}>
                <td> {User.id} </td>
                <td> {User.name} </td>
                <td>{User.email}</td>
                <td>{User.appUserRole}</td>

                <td>
                  <Link className="btn btn-info" to={`/edit-User/${User.id}`}>
                    Update
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(User.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    {" "}
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;

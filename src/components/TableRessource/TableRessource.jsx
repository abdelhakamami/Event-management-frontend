import React, { useEffect, useState } from "react";
import axios from "axios";

function TableRessource() {
  const [ressource, setRessources] = useState([]);
  const [currentClientName, setCurrentClientName] = useState("");
  const [currentPhone, setCurrentPhone] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [counter, setCounter] = useState(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    const fetchRessource = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/getAllRessource"
        );
        setRessources(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRessource();
  }, []);

  const fetchRessourceDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/getRessourceById/${id}`
      );
      const ressourceDetails = response.data;
      setCurrentClientName(ressourceDetails.clientname);
      setCurrentPhone(ressourceDetails.phone);
      setCurrentEmail(ressourceDetails.email);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (id, index) => {
    setEditId(id);
    setEditIndex(index);
    fetchRessourceDetails(id);
    window.my_modal_2.showModal();
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedRessource = {
        clientname: currentClientName,
        phone: currentPhone,
        email: currentEmail,
      };

      await axios.put(
        `http://localhost:8080/api/v1/updateRessource/${editId}`,
        updatedRessource
      );

      // Update the fournisseur in the local state
      const updatedRessources = [...ressource];
      updatedRessources[editIndex] = {
        ...updatedRessources[editIndex],
        clientname: currentClientName,
        phone: currentPhone,
        email: currentEmail,
      };
      setRessources(updatedRessources);

      // Clear the form and close the modal
      setCurrentClientName("");
      setCurrentPhone("");
      setCurrentEmail("");
      window.my_modal_2.close();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async (id) => {
    setEditId(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/deleteRessourceById/${editId}`
      );

      // Remove the fournisseur from the local state
      const updatedRessources = ressource.filter(
        (ressources) => ressources.id !== editId
      );
      setRessources(updatedRessources);

      // Close the delete confirmation modal
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();

    try {
      const newRessource = {
        id: counter + 1,
        clientname: currentClientName,
        phone: currentPhone,
        email: currentEmail,
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/addRessource",
        newRessource
      );

      const createdRessource = response.data;

      // Add the new fournisseur to the local state
      setRessources([...ressource, createdRessource]);

      // Clear the form and close the modal
      setCounter(counter + 1);
      setCurrentClientName("");
      setCurrentPhone("");
      setCurrentEmail("");
      window.my_modal_3.close();
    } catch (error) {
      console.error(error);
    }
  };
  const ressurceCount = ressource.length;

  return (
    <div>
      <div className="flex justify-center m-10 text-3xl text-base-300 font-bold justify-between">
        <h1>Table Ressource</h1>
        <button
          className="btn btn-ms"
          onClick={() => window.my_modal_3.showModal()}
        >
          Add Ressource
        </button>
        <dialog id="my_modal_3" className="modal">
          <form
            method="dialog"
            className="modal-box flex flex-col items-center gap-10"
            onSubmit={handleAddSubmit}
          >
            <h3 className="font-bold text-lg">Add Ressource</h3>
            <input
              type="text"
              placeholder="client name"
              className="input input-bordered w-full max-w-xs"
              value={currentClientName}
              onChange={(e) => setCurrentClientName(e.target.value)}
            />
            <input
              type="text"
              placeholder="phone"
              className="input input-bordered w-full max-w-xs"
              value={currentPhone}
              onChange={(e) => setCurrentPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="email"
              className="input input-bordered w-full max-w-xs"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
            />
            <div className="modal-action flex">
              <button type="submit" className="btn">
                Add
              </button>
            </div>
          </form>
        </dialog>
      </div>
      <div className="scrolling-touch m-10 border border-base-300 ">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-base-300 text-lg">
                <th></th>
                <th>client name</th>
                <th>email</th>
                <th>phone number</th>
                <th>edit</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {ressource.map((ressources, index) => (
                <tr key={ressources.id}>
                  <th></th>
                  <td>
                    <div className="flex items-center">{ressources.clientname}</div>
                  </td>
                  <td>
                    <div className="font-bold">{ressources.email}</div>
                  </td>
                  <td>
                    <div>{ressources.phone}</div>
                  </td>
                  <td className="flex gap-2">
                    <dialog id="my_modal_2" className="modal">
                      <form
                        method="dialog"
                        className="modal-box flex flex-col items-center gap-10"
                        onSubmit={handleEditSubmit}
                      >
                        <h3 className="font-bold text-lg">Edit Fournisseur</h3>
                        <input
                          type="text"
                          defaultValue={currentClientName}
                          className="input input-bordered w-full max-w-xs"
                          onChange={(e) => setCurrentClientName(e.target.value)}
                        />
                        <input
                          type="text"
                          defaultValue={currentPhone}
                          className="input input-bordered w-full max-w-xs"
                          onChange={(e) => setCurrentPhone(e.target.value)}
                        />
                        <input
                          type="text"
                          defaultValue={currentEmail}
                          className="input input-bordered w-full max-w-xs"
                          onChange={(e) => setCurrentEmail(e.target.value)}
                        />
                        <div className="modal-action flex">
                          <button type="submit" className="btn">
                            Submit
                          </button>
                        </div>
                      </form>
                    </dialog>
                    <button
                      className="btn btn-ms"
                      onClick={() => handleEditClick(ressources.id, index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-ms btn-ghost btn-outline"
                      onClick={() => handleDeleteClick(ressources.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box flex flex-col items-center gap-4 p-6 bg-white">
            <h3 className="text-lg font-bold">Confirm Deletion</h3>
            <p>Are you sure you want to delete this resource?</p>
            <div className="modal-action flex gap-2">
              <button className="btn btn-primary" onClick={confirmDelete}>
                Delete
              </button>
              <button className="btn btn-secondary" onClick={() => setShowDeleteConfirmation(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
       <div className="flex justify-center text-base-300">
        <div className="stats shadow">
          <div className="stat flex flex-col justify-center items-center">
            <div className="stat-title">Total fournisseur</div>
            <div className="stat-value">{ressurceCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableRessource;

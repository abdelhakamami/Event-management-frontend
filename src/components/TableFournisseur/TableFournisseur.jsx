import React, { useEffect, useState } from "react";
import axios from "axios";

function TableFournisseur() {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const [currentContact, setCurrentContact] = useState("");
  const [editId, setEditId] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchFournisseurs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/getAllFournisseur"
        );
        setFournisseurs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFournisseurs();
  }, []);

  const fetchFournisseurDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/getFournisseurById/${id}`
      );
      const fournisseurDetails = response.data;
      setCurrentName(fournisseurDetails.name);
      setCurrentContact(fournisseurDetails.contact);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (id, index) => {
    setEditId(id);
    setEditIndex(index);
    fetchFournisseurDetails(id);
    window.my_modal_2.showModal();
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedFournisseur = {
        name: currentName,
        contact: currentContact,
      };

      await axios.put(
        `http://localhost:8080/api/v1/updateFournisseur/${editId}`,
        updatedFournisseur
      );

      // Update the fournisseur in the local state
      const updatedFournisseurs = [...fournisseurs];
      updatedFournisseurs[editIndex] = {
        ...updatedFournisseurs[editIndex],
        name: currentName,
        contact: currentContact,
      };
      setFournisseurs(updatedFournisseurs);

      // Clear the form and close the modal
      setCurrentName("");
      setCurrentContact("");
      window.my_modal_2.close();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async (id) => {
    // Show the confirmation dialog to the user
    const confirmDelete = window.confirm("Are you sure you want to delete this fournisseur?");
    if (!confirmDelete) {
      return; // User cancelled the delete action
    }

    try {
      await axios.delete(
        `http://localhost:8080/api/v1/deleteFournisseurById/${id}`
      );

      // Remove the fournisseur from the local state
      const updatedFournisseurs = fournisseurs.filter(
        (fournisseur) => fournisseur.id !== id
      );
      setFournisseurs(updatedFournisseurs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();

    try {
      const newFournisseur = {
        id: counter + 1,
        name: currentName,
        contact: currentContact,
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/addFournisseur",
        newFournisseur
      );

      const createdFournisseur = response.data;

      // Add the new fournisseur to the local state
      setFournisseurs([...fournisseurs, createdFournisseur]);

      // Clear the form and close the modal
      setCounter(counter + 1);
      setCurrentName("");
      setCurrentContact("");
      window.my_modal_1.close();
    } catch (error) {
      console.error(error);
    }
  };
  const fournisseursCount = fournisseurs.length;
  return (
    <div>
      <div className="flex justify-center m-10 text-3xl text-base-300 font-bold justify-between">
        <h1>Table Fournisseur</h1>
        <button className="btn" onClick={() => window.my_modal_1.showModal()}>
          Add Fournisseur
        </button>
        <dialog id="my_modal_1" className="modal">
          <form
            method="dialog"
            className="modal-box flex flex-col items-center gap-10"
            onSubmit={handleAddSubmit}
          >
            <h3 className="font-bold text-lg">Add Fournisseur</h3>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full max-w-xs"
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Contact"
              className="input input-bordered w-full max-w-xs"
              value={currentContact}
              onChange={(e) => setCurrentContact(e.target.value)}
            />
            <div className="modal-action flex">
              <button type="submit" className="btn">
                Add
              </button>
            </div>
          </form>
        </dialog>
      </div>
      <div className="scrolling-touch m-10 border border-base-300">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-base-300 text-lg">
                <th></th>
                <th>name</th>
                <th>contact</th>
                <th>edit</th>
              </tr>
            </thead>
            <tbody>
              {fournisseurs.map((fournisseur, index) => (
                <tr key={fournisseur.id}>
                  <td></td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold">{fournisseur.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{fournisseur.contact}</td>
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
                          defaultValue={currentName}
                          className="input input-bordered w-full max-w-xs"
                          onChange={(e) => setCurrentName(e.target.value)}
                        />
                        <input
                          type="text"
                          defaultValue={currentContact}
                          className="input input-bordered w-full max-w-xs"
                          onChange={(e) => setCurrentContact(e.target.value)}
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
                      onClick={() => handleEditClick(fournisseur.id, index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-ms btn-ghost btn-outline"
                      onClick={() => handleDeleteClick(fournisseur.id)}
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
      <div className="flex justify-center text-base-300">
        <div className="stats shadow">
          <div className="stat flex flex-col justify-center items-center">
            <div className="stat-title">Total fournisseur</div>
            <div className="stat-value">{fournisseursCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableFournisseur;

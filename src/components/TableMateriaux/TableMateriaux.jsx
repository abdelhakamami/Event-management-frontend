import React, { useEffect, useState } from "react";
import axios from "axios";

function TableMateriaux() {
  const [materiel, setMateriels] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const [currentQuantite, setCurrentQuantite] = useState("");
  const [editId, setEditId] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchMateriel = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/getAllMateriaux"
        );
        setMateriels(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMateriel();
  }, []);

  const fetchMaterielDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/getMateriauxById/${id}`
      );
      const materielDetails = response.data;
      setCurrentName(materielDetails.name);
      setCurrentQuantite(materielDetails.quantite);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (id, index) => {
    setEditId(id);
    setEditIndex(index);
    fetchMaterielDetails(id);
    window.my_modal_2.showModal();
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedMateriel = {
        name: currentName,
        quantite: currentQuantite,
      };

      await axios.put(
        `http://localhost:8080/api/v1/updateMateriaux/${editId}`,
        updatedMateriel
      );

      // Update the fournisseur in the local state
      const updatedMateriels = [...materiel];
      updatedMateriels[editIndex] = {
        ...updatedMateriels[editIndex],
        name: currentName,
        quantite: currentQuantite,
      };
      setMateriels(updatedMateriels);

      // Clear the form and close the modal
      setCurrentName("");
      setCurrentQuantite("");
      window.my_modal_2.close();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async (id) => {
    // Show the confirmation dialog to the user
    const confirmDelete = window.confirm("Are you sure you want to delete this materiel?");
    if (!confirmDelete) {
      return; // User cancelled the delete action
    }

    try {
      await axios.delete(
        `http://localhost:8080/api/v1/deleteMateriauxById/${id}`
      );

      // Remove the fournisseur from the local state
      const updatedMateriels = materiel.filter(
        (materiels) => materiels.id !== id
      );
      setMateriels(updatedMateriels);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();

    try {
      const newMateriel = {
        id: counter + 1,
        name: currentName,
        quantite: currentQuantite,
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/addMateriaux",
        newMateriel
      );

      const createdMateriel = response.data;

      // Add the new fournisseur to the local state
      setMateriels([...materiel, createdMateriel]);

      // Clear the form and close the modal
      setCounter(counter + 1);
      setCurrentName("");
      setCurrentQuantite("");
      window.my_modal_3.close();
    } catch (error) {
      console.error(error);
    }
  };
  const materielCount = materiel.length;

  return (
    <div>
      <div className="flex justify-center m-10 text-3xl text-base-300 font-bold justify-between">
        <h1>Table Materiaux</h1>
        <button
          className="btn btn-ms"
          onClick={() => window.my_modal_3.showModal()}
        >
          Add Materiel
        </button>
        <dialog id="my_modal_3" className="modal">
          <form
            method="dialog"
            className="modal-box flex flex-col items-center gap-10"
            onSubmit={handleAddSubmit}
          >
            <h3 className="font-bold text-lg">Add materiel</h3>
            <input
              type="text"
              defaultValue={currentName}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setCurrentName(e.target.value)}
            />
            <input
              type="text"
              defaultValue={currentQuantite}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setCurrentQuantite(e.target.value)}
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
                <th>name</th>
                <th>quantite</th>
                <th>edit</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {materiel.map((materiaux, index) => (
                <tr key={materiaux.id}>
                  <th></th>
                  <td>
                    <div>
                      <div className="font-bold">{materiaux.name}</div>
                    </div>
                  </td>
                  <td>{materiaux.quantite}</td>
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
                          defaultValue={currentQuantite}
                          className="input input-bordered w-full max-w-xs"
                          onChange={(e) => setCurrentQuantite(e.target.value)}
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
                      onClick={() => handleEditClick(materiaux.id, index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-ms btn-ghost btn-outline"
                      onClick={() => handleDeleteClick(materiaux.id)}
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
            <div className="stat-value">{materielCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableMateriaux;

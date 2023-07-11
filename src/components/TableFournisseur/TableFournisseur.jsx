import React from "react";
import fournisseur from "../../data/fournisseur";

function TableFournisseur() {
  return (
    <div>
      <div className="flex justify-center m-10 text-3xl text-base-300 font-bold justify-between">
        <h1>Table Fournisseur</h1>
        <button className="btn btn-ms">Add Fournisseur</button>
      </div>
      <div className="scrolling-touch m-10 border border-base-300 ">
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
            <thead >
              <tr className="text-base-300 text-lg">
                <th></th>
                <th>name</th>
                <th>contact</th>
                <th>edit</th>
              </tr>
            </thead>
            {fournisseur.map((fournisseurs) => (
              <tbody>
                {/* row 1 */}
                <tr>
                  <th></th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={fournisseurs.photo}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{fournisseurs.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{fournisseurs.contact}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-ms">Edit</button>
                    <button className="btn btn-ms btn-ghost btn-outline">Delete</button>

                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableFournisseur;

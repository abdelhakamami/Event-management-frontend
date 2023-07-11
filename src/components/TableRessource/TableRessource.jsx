import React from 'react'
import ressource from '../../data/ressource';

function TableRessource () {
  return (
    <div>
      <div className="flex justify-center m-10 text-3xl text-base-300 font-bold justify-between">
        <h1>Table Ressource</h1>
        <button className="btn btn-ms">Add Ressource</button>
      </div>
      <div className="scrolling-touch m-10 border border-base-300 ">
        <div className="overflow-x-auto">
          <table className="table ">
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
            {ressource.map((ressources) => (
              <tbody>
                {/* row 1 */}
                <tr>
                  <th></th>
                  <td>
                    <div className="flex items-center">
                      {ressources.clientname}
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{ressources.contact}</div>
                  </td>
                  <td>
                    <div>{ressources.phone}</div>
                  </td>
                  <td className="flex gap-2">
                    <button className="btn btn-ms">Edit</button>
                    <button className="btn btn-ms btn-ghost btn-outline">
                      Delete
                    </button>
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

export default TableRessource;
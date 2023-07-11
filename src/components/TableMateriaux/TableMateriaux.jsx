import React from 'react'
import materiel from '../../data/materiel'

function TableMateriaux ()  {
  return (
    <div>
      <div className="flex justify-center m-10 text-3xl text-base-300 font-bold justify-between">
        <h1>Table Materiaux</h1>
        <button className="btn btn-ms">Add Materiel</button>
      </div>
      <div className="scrolling-touch m-10 border border-base-300 ">
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
            <thead>
              <tr className="text-base-300 text-lg">
                <th></th>
                <th>photo</th>
                <th>name</th>
                <th>quantite</th>
                <th>edit</th>
              </tr>
            </thead>
            {materiel.map((materiels) => (
              <tbody>
                {/* row 1 */}
                <tr>
                  <th></th>

                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={materiels.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-bold">{materiels.name}</div>
                    </div>
                  </td>
                  <td>{materiels.quantite}</td>
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

export default TableMateriaux;
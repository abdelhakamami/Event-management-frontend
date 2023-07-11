import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import TableFournisseur from "../../components/TableFournisseur/TableFournisseur";
import TableMateriaux from "../../components/TableMateriaux/TableMateriaux";
import TableRessource from "../../components/TableRessource/TableRessource";

function Dashbord() {
  const [showTable, setShowTable] = useState("fournisseur");
  
  const handleButtonClick = (tableName) => {
    setShowTable(tableName);
  };

  return (
    <div>
      <Layout>
        <div className="flex flex-col justify-center items-center text-xl gap-5 my-20">
          <li>
            <button onClick={() => handleButtonClick("fournisseur")}>
              fournisseur
            </button>
          </li>
          <li>
            <button onClick={() => handleButtonClick("ressource")}>
              ressource
            </button>
          </li>
          <li>
            <button onClick={() => handleButtonClick("materiaux")}>
              materiaux
            </button>
          </li>
        </div>
      </Layout>

      {showTable === "fournisseur" && <TableFournisseur />}
      {showTable === "ressource" && <TableRessource />}
      {showTable === "materiaux" && <TableMateriaux />}
    </div>
  );
}

export default Dashbord;

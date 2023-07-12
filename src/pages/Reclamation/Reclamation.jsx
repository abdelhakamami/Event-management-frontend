import React, { useEffect, useState } from 'react' ;
import Layout from '../../components/Layout/Layout' ;
import axios from 'axios' ;
import ModalComponent from './components/ModalComponent';


const Reclamation = () => {
    const [reclamations, setReclamations] = useState([]);
    const [modal, setModal] = useState(false)
    const [modalBody, setModalBody] = useState()
    const deleteReclamation = async (e,id) =>{
        try {
            e.stopPropagation();
            const reclamation = await axios.delete(`${process.env.REACT_APP_BACK_URL}/api/reclamation/delete/${id}`);
            if (reclamation.status===200) {
                getReclamations();

            }
           
        } catch (error) {
            console.log(error);
        }

    }

    const getReclamations = async () => {


        try {
            const reclamationsData = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/reclamation/get`);
            console.log(reclamationsData);
            setReclamations(reclamationsData.data);
           
        } catch (error) {
            console.log(error);
        }
    }
    const handleModal = (contenu) => {
        setModal(true);
        setModalBody(contenu)
      }
    useEffect(() => {
        getReclamations();
    }, [])

  
    return (
    <div>
        <Layout role={0} />
        
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg flex justify-center h-screen">
        <table class="w-1/2 text-sm text-left text-gray-500 dark:text-gray-400 table-auto h-fit">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        User
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Title
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {reclamations.map((reclamation)=>   <tr onClick={() => handleModal(reclamation.contenu)} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">

                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {reclamation.user.fistName}
                                                    </th>
                                                    <td class="px-6 py-4">
                                                        {reclamation.titre}
                                                    </td>

                                                    <td class="px-6 py-4 w-fit whitespace-nowrap">
                                                    <button type="button" onClick={(e) => {
                                                        const result = global.confirm("Would you like to delete this item ?")
                                                        if(result){

                                                            deleteReclamation(e,reclamation.id)
                                                        }
                                                        }}class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ">Delete</button>

                                                    </td>
                                                    </tr>)}
                
                
            </tbody>
        </table>

    </div>

    {(modal && modalBody )&&  <ModalComponent bodyMsg={modalBody} setIsOpen={setModal} />}

    </div>
  )
}

export default Reclamation
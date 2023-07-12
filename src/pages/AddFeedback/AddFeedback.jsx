import axios from 'axios';
import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout';

const AddFeedback = () => {
    const [note, setNote] = useState(0);
    const [contenu, setContenu] = useState();
    const [toastMsg, setToastMsg] = useState(''); 
    const [show, setShow]= useState(false);    
    const addfeedback = async (e) => {
  
      try {
        e.preventDefault()
        const userID = Math.floor(Math.random() * 2)+1;
        const result = await axios.post(`http://localhost:8080/api/feedback/add/${userID}`,{
          note: note,
          contenu: contenu
        });
        
        if(result.status===200){
          setNote("")
          setContenu("")
          setShow(true);
          setToastMsg('Feedback added successfully');
          setTimeout((()=>setShow(false)),3000);

        }
      } catch (error) {
        console.log(error);
      }
    }

    return (
      <div className='w-full '   >
           <Layout role={1} />
          <div className='w-1/2 m-auto '>
          {show ?
          <div id="toast-bottom-right" x-init="setTimeout(() => isOpen = false, 3000)" class="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow right-5 bottom-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
            <div className="text-sm font-normal">{toastMsg}</div>
          </div>
          : null}
          <form className='w-full' onSubmit={addfeedback}>
          <div class="mb-6">
              <span for="titre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note</span>
              <div className="rating">
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onClick={()=>setNote(1)}  />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onClick={()=>setNote(2)}  />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onClick={()=>setNote(3)}  />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onClick={()=>setNote(4)}  />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onClick={()=>setNote(5)}  />
              </div>
          </div>
          <div class="mb-6">
          <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contenu</label>      
          <textarea  onChange={(e)=>setContenu(e.target.value)} value={contenu} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ecrire le contenu de votre feedback..."></textarea>
  
          </div>
         
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>
          </div>
          
  
      </div>
    )
  }

export default AddFeedback;
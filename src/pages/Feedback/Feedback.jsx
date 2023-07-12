import React, { useEffect, useState } from 'react' ;
import Layout from '../../components/Layout/Layout' ;
import axios from 'axios' ;


const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [constFeedBack, setConstFeedBack] = useState([])
    const [search, setSearch] = useState("")
    const deleteFeedback = async (e,id) =>{
        try {
            e.stopPropagation();
            const feedback = await axios.delete(`${process.env.REACT_APP_BACK_URL}/api/feedback/delete/${id}`);
            if (feedback.status===200) {
                getFeedbacks();

            }
           
        } catch (error) {
            console.log(error);
        }

    }

    const getFeedbacks = async () => {


        try {
            const feedbacksData = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/feedback/get`);
            console.log(feedbacksData);
            setFeedbacks(feedbacksData.data);
            setConstFeedBack(feedbacksData.data)
           
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getFeedbacks();
    }, [])

  
    return (
    <div>
        <Layout role={0} />
        
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col  gap-12 h-screen py-20 px-24">
        <div className='flex flex-col gap-4 w-1/2'>
        <label htmlFor="">Search</label>
        <div className='flex flex-row gap-8 items-center  '>
        <input className=' bg-primary-content min-h-12 border border-black  rounded-sm w-[400px]' onChange={e=> setSearch(e.target.value)}/>
        <button className='block align-center px-10 min-h-12 bg-primary text-white rounded-sm'>Find</button>

        </div>
        </div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto h-fit bg-primary-content ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        User
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Note
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Continu
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {feedbacks?.filter(elem => elem.contenu.toLowerCase().includes(search.toLowerCase())).map((feedback)=>   <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">

                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {feedback.user.fistName}
                                                    </th>
                                                    <td class="px-6 py-4">
                                                        <div className="rating">
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked={feedback.note >=1} />
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked={feedback.note >=2} />
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked={feedback.note >=3}/>
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked={feedback.note >=4}/>
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked={feedback.note >=5}/></div>
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {feedback.contenu}
                                                    </td>

                                                    <td class="px-6 py-4 w-fit whitespace-nowrap">
                                                    <button type="button" onClick={(e) => {
                                                        const result = global.confirm("Would you like to delete this item ?")
                                                        if(result){
                                                            deleteFeedback(e,feedback.id)
                                                        }
                                                        
                                                        }}class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ">Delete</button>

                                                    </td>
                                                    </tr>)}
                
                
            </tbody>
        </table>

    </div>

    </div>
  )
}

export default Feedback
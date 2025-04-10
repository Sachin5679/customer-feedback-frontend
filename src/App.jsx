import { useEffect } from 'react';
import axios from 'axios'
import './App.css'

function App() {
  useEffect(()=>{
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredResp,
    })

    google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      { theme: "outline", size: "large" }
    )
  },[]);
  const handleCredResp = async(response)=>{
    try{
      const res=await axios.post('http://localhost:5000/api/auth/google',{
        token:response.credential,
      },{
        withCredentials: true,
      })
      alert('Login Successful!');
    } catch(err){
      console.error(err);
      alert('Login Failed!');
    }
  };

  return (
    <>
    <div className='flex justify-center items-center h-screen'>
      <div id='googleBtn'></div>
    </div>
    </>
  )
}

export default App

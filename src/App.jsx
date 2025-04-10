import { useEffect,useState } from 'react';
import axios from 'axios'
import Dashboard from './pages/Dashboard';
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{
    axios.get('http://localhost:5000/api/protected',{
      withCredentials:true,
    }).then(()=>setIsAuthenticated(true)).catch(()=>setIsAuthenticated(false));

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
      });

      alert('Login Successful!');

      setIsAuthenticated(true);
    } catch(err){
      console.error(err);
      alert('Login Failed!');
    }
  };

  
  if (isAuthenticated) return <Dashboard />;

  return (
    <>
    <div className='flex justify-center items-center h-screen'>
      <div id='googleBtn'></div>
    </div>
    </>
  )
}

export default App

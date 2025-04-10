import { useEffect,useState } from "react";
import axios from "axios";

function Dashboard(){
    const [feedback, setFeedback] = useState({});
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Product Features',
    });

    // const fetchFeedback = async()=>{
    //     const res = await axios.get('/feedback');
    //     setFeedback(res.data);
    // };
    const fetchFeedback = async () => {
        const dummyData = {
          "Product Features": [
            { id: 1, title: "Dark Mode", description: "Add support for dark theme." },
            { id: 2, title: "Offline Mode", description: "App should work offline." }
          ],
          "Product Pricing": [
            { id: 3, title: "Discounts", description: "Add more student discounts." }
          ],
          "Product Usability": [
            { id: 4, title: "Faster Load", description: "Improve initial load time." }
          ]
        };
      
        setFeedback(dummyData);
      };
      

    useEffect(()=>{
        fetchFeedback();
    },[]);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        await axios.post('/feedback',formData);
        setFormData({ title: '', description: '', category: 'Product Features' });
        fetchFeedback();
    }

    return (
        <>
            <div className="p-4">

            <h2 className="text-xl font-bold mb-4">Submit Feedback</h2>

            <form onSubmit={handleSubmit} className="space-y-2">
                <input type="text" placeholder="Title" required className="border p-1" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />

                <textarea placeholder="Description" required className="border p-1 w-full" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>

                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="border p-1">
                    <option>Product Features</option>
                    <option>Product Pricing</option>
                    <option>Product Usability</option>
                </select>

                <button className="bg-blue-500 text-white px-4 py-1 rounded">Submit</button>
            </form>

            <h2 className="text-xl font-bold mt-8">Feedback</h2>
            {Object.entries(feedback).map(([cat, items]) => (
                <div key={cat}>
                <h3 className="text-lg font-semibold mt-4">{cat}</h3>
                {items.map(item => (
                    <div key={item.id} className="border p-2 my-1">
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                    </div>
                ))}
                </div>
            ))}
            </div>
        </>
    );
}

export default Dashboard;
import { useEffect, useState } from "react";
import { addBrand, deleteBrand, getBrand } from "../../Api/adminApi";

const TrustedClients = () => {
    const [showModal, setShowModal] = useState(false);
    const [clients, setClients] = useState([]);
    const [title, setTitle] = useState("");
    const [logo, setLogo] = useState(null);

    const handleAddClient = async () => {
        if (!title || !logo) {
            alert("Title & Logo required");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("image", logo);
            formData.append("tittle", title);
            const res = await addBrand(formData);
            // Response from backend
            // const savedClient = res.data.data;
            // setClients((prev) => [...prev, savedClient]);
            setShowModal(false);
            getBrand(setClients);
            setTitle("");
            setLogo(null);
            setShowModal(false);
        } catch (error) {
            console.error(error);
            alert("Image upload failed");
        }
    };

    useEffect(() => {
        getBrand(setClients);
    }, [])


    const handleDelete = (id) => {
        if (!window.confirm("Delete this client?")) return;
        deleteBrand(id).then(() => {

            getBrand(setClients);
        })
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-gray-100 p-10 text-gray-800">

            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-bold tracking-tight">
                    Client <span className="text-blue-600">Logos</span>
                </h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-6 py-3 rounded-xl font-semibold 
                     bg-gradient-to-r from-blue-600 to-indigo-600
                     text-white shadow-lg hover:shadow-xl
                     hover:scale-105 transition"
                >
                    + Add Client
                </button>
            </div>
            {/* Empty State */}
            {clients.length === 0 ? (
                <div className="text-center text-gray-400 mt-24">
                    No client logos added yet
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
                    {clients.map((client) => (
                        <div
                            key={client.id}
                            className="group bg-white/80 backdrop-blur-lg
                         border border-gray-200 rounded-2xl p-6
                         shadow-md hover:shadow-xl
                         transition transform hover:-translate-y-1"
                        >
                            <img
                                src={client.image}
                                alt={client.title}
                                className="h-24 w-full object-contain mb-4"
                            />

                            <h3 className="text-lg font-semibold text-center mb-5">
                                {client.title}
                            </h3>

                            <button
                                onClick={() => handleDelete(client._id)}
                                className="w-full py-2 rounded-lg
                           bg-red-50 text-red-600
                           hover:bg-red-600 hover:text-white
                           transition"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border">
                        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                            Add Client Logo
                        </h3>
                        <input
                            type="text"
                            placeholder="Client Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full mb-4 p-3 rounded-lg border
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setLogo(e.target.files[0])}
                            className="w-full mb-6 p-3 rounded-lg border"
                        />
                        <div className="flex gap-4">
                            <button
                                onClick={handleAddClient}
                                className="flex-1 py-3 rounded-lg font-semibold
                           bg-gradient-to-r from-blue-600 to-indigo-600
                           text-white hover:scale-105 transition"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrustedClients;

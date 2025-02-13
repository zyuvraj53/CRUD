import axios from "axios";
import { useState } from "react";

export default function TableList({ handleOpen, tableData, setTableData, searchTerm }) {
    const [error, setError] = useState(null);

    // Filter the tableData based on the searchTerm
    const filteredData = tableData.filter(
        (client) =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.job.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to delete a client
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this client?");
        if (confirmDelete) {
            try {
                await axios.delete(`https://crud-backend-oqn5.onrender.com/api/clients/${id}`); // API call to delete client
                setTableData((prevData) => prevData.filter((client) => client.id !== id)); // Update state
            } catch (err) {
                setError(err.message); // Handle any errors
            }
        }
    };

    // Function to toggle client status
    const handleToggleStatus = async (id) => {
        try {
            // Find the client in the tableData
            const clientToUpdate = tableData.find((client) => client.id === id);
            if (!clientToUpdate) return;

            // Toggle the status
            const updatedClient = { ...clientToUpdate, isactive: !clientToUpdate.isactive };

            // Send update request to the API
            await axios.put(`https://crud-backend-oqn5.onrender.com/api/clients/${id}`, updatedClient);

            // Update state
            setTableData((prevData) =>
                prevData.map((client) =>
                    client.id === id ? updatedClient : client
                )
            );
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            {error && <div className="alert alert-error">{error}</div>}

            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Job</th>
                            <th>Rate</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="hover">
                        {/* row 1 */}
                        {filteredData.map((client) => (
                            <tr key={client.id}>
                                <th>{client.id}</th>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.job}</td>
                                <td>{client.rate}</td>
                                <td>
                                    <button
                                        className={`btn rounded-full w-20 ${client.isactive ? `btn-primary` : `btn-outline btn-primary`}`}
                                        onClick={() => handleToggleStatus(client.id)}
                                    >
                                        {client.isactive ? "Active" : "Inactive"}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleOpen("edit", client)}
                                        className="btn btn-secondary"
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-accent ml-2"
                                        onClick={() => handleDelete(client.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// API URL (adjust if needed)
const API_URL = 'http://localhost:9090/api/users';

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [editingId, setEditingId] = useState(null);

    // Fetch all users
    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Create user
    const createUser = async () => {
        try {
            const response = await axios.post(API_URL, { name, email });
            setUsers([...users, response.data]);
            setName('');
            setEmail('');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    // Update user
    const updateUser = async () => {
        try {
            const response = await axios.put(`${API_URL}/${editingId}`, { name, email });
            setUsers(users.map(user => user.id === editingId ? response.data : user));
            setEditingId(null);
            setName('');
            setEmail('');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Delete user
    const deleteUser = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>User Management System</h1>
            
            {/* Form for Add/Edit */}
            <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>{editingId ? 'Edit User' : 'Add New User'}</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ margin: '5px', padding: '8px', width: '200px' }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ margin: '5px', padding: '8px', width: '250px' }}
                />
                {editingId ? (
                    <button onClick={updateUser} style={{ margin: '5px', padding: '8px 15px', backgroundColor: 'orange', color: 'white', border: 'none', cursor: 'pointer' }}>
                        Update
                    </button>
                ) : (
                    <button onClick={createUser} style={{ margin: '5px', padding: '8px 15px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}>
                        Add
                    </button>
                )}
                {editingId && (
                    <button onClick={() => { setEditingId(null); setName(''); setEmail(''); }} style={{ margin: '5px', padding: '8px 15px', backgroundColor: 'gray', color: 'white', border: 'none', cursor: 'pointer' }}>
                        Cancel
                    </button>
                )}
            </div>

            {/* Users List */}
            <div>
                <h2>Users List</h2>
                <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f2f2f2' }}>
                        <tr><th>ID</th><th>Name</th><th>Email</th><th>Created At</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr><td colSpan="5" style={{ textAlign: 'center' }}>No users found</td></tr>
                        ) : (
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                                    <td>
                                        <button 
                                            onClick={() => { setEditingId(user.id); setName(user.name); setEmail(user.email); }}
                                            style={{ margin: '2px', padding: '5px 10px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => deleteUser(user.id)}
                                            style={{ margin: '2px', padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
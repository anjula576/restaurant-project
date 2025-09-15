import React, { useEffect, useState } from "react";

function Users() {
    const [users, setUsers] = useState<string[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((u, i) => (
                    <li key={i}>{u}</li>
                ))}
            </ul>
        </div>
    );
}

export default Users;

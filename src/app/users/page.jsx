import React from 'react';
import { getUsers } from '../lib/data';
import UsersTable from '../Component/UsersTable';

const UserPage = async() => {
    const users = await getUsers();
    return (
        <div>
            <h1>User Management: {users.length}</h1>
            <UsersTable users={users}></UsersTable>
        </div>
    );
};

export default UserPage;
import React from 'react';
import { getUsers } from '../lib/data';
import UsersTable from '../Component/UsersTable';
import { deleteUser } from '../lib/actions';

const UserPage = async() => {
    const users = await getUsers();
    return (
        <div>
            <h1>User Management: {users.length}</h1>
            <UsersTable users={users} deleteUserAction={deleteUser}></UsersTable>
        </div>
    );
};

export default UserPage;
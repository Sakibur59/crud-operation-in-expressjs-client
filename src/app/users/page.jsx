import React from 'react';
import { getUsers } from '../lib/data';
import UsersTable from '../Component/UsersTable';
import { AddUser, deleteUser } from '../lib/actions';
import AddUserModal from '../Component/AddUserModal';

const UserPage = async() => {
    const users = await getUsers();
    return (
        <div>
            <div className='flex gap-2'>
            <h1>User Management: {users.length}</h1>
                <AddUserModal createUserAction={AddUser}></AddUserModal>
            </div>
            <UsersTable users={users} deleteUserAction={deleteUser}></UsersTable>
        </div>
    );
};

export default UserPage;
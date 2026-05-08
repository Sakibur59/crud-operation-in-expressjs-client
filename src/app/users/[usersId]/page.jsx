import { getUserById } from '@/app/lib/data';
import React from 'react';

const UserDetailsPage = async({params}) => {
    const {usersId} = await params;
    const user = await getUserById(usersId);
    return (
        <div>
            <h2>User details:{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div>
    );
};

export default UserDetailsPage;
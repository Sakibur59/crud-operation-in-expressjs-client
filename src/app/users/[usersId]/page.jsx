import { getUserById } from '@/app/lib/data';
import React from 'react';

const UserDetailsPage = async({params}) => {
    const {usersId} = await params;
    const user = await getUserById(usersId);
    return (
        <div>
            <h2>User details:{user.name}</h2>
        </div>
    );
};

export default UserDetailsPage;
import React from 'react';


const LeaderPage = ({ name, position }) => {
    return (
        <div>
            <h2>{name}</h2>
            <p>{position}</p>
        </div>
    );
};

export default LeaderPage;
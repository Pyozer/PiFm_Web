import React from 'react';

const Card = (props) => (
    <div className="card mb-3 shadow-sm">
        <div className="card-body">
            <h4 className="card-title"><i className={"mr-2 " + props.iconTitle}></i> { props.title }</h4>
            { props.children }
        </div>
    </div>
);

export default Card;
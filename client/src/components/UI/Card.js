import React from 'react';

const Card = (props) => (
    <div class="card mb-3 shadow-sm">
        <div class="card-body">
            <h4 class="card-title"><i class={"mr-2 " + props.iconTitle}></i> { props.title }</h4>
            { props.children }
        </div>
    </div>
);

export default Card;
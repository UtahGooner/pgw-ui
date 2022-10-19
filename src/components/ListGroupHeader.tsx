import React from 'react';
import classNames from "classnames";


function ListGroupHeader({open = false, children}:{
    open?: boolean,
    children?:React.ReactNode,
}) {
    return (
        <li className={classNames("list-group-item group-header", {'group-header--open': open})} >
            {children}
        </li>
    );
}

export default ListGroupHeader;

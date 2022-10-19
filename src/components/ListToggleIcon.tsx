import React from 'react';

const ListToggleIcon = ({open, controls, onClick, children}: {
    open: boolean;
    controls?: string;
    onClick: () => void;
    children?: React.ReactNode,
}) => {
    return (
        <div className="list-toggle-icon" onClick={onClick}
             aria-controls={controls} aria-expanded={open}>
            <div>{children}</div>
            <div>
                {!open && <img src="/images/icons/chevron-up.svg" alt="closed"/>}
                {open && <img src="/images/icons/chevron-down.svg" alt="open"/>}
            </div>
        </div>
    );
}

export default ListToggleIcon;

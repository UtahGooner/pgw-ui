import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Pagination from "react-bootstrap/Pagination";

const ImagePagination = ({activePage, pages, maxButtons, className = '', filtered = false, onSelect}:{
    activePage: number;
    pages: number;
    maxButtons: number;
    className?: string;
    filtered?: boolean;
    onSelect: (page:number) => void;
}) => {
    const hasMore = pages > maxButtons;
    const maxPageButtons = pages > maxButtons ? maxButtons - 2 : maxButtons;

    let renderPages = [];
    const pageRange = Math.floor(maxPageButtons / 2);
    const beforeRender = Math.min(activePage - pageRange, pages - maxPageButtons);
    const afterRender = Math.max(activePage + pageRange, maxPageButtons);
    const firstEllipsis = [];
    const lastEllipsis = [];
    for (let i = 2; i < pages; i += 1) {
        if (i <= beforeRender) {
            firstEllipsis.push(i);
        } else if (i < afterRender) {
            renderPages.push(i);
        } else {
            lastEllipsis.push(i);
        }
    }

    return (
        <Pagination aria-label="Page Navigation">
            <Pagination.First disabled={activePage < 2} onClick={() => onSelect(1)} />
            <Pagination.Prev disabled={activePage < 2} onClick={() => onSelect(activePage - 1)}/>
            <Pagination.Item active={activePage === 1} onClick={() => onSelect(1)}>{1}</Pagination.Item>
            {!!firstEllipsis.length && <Pagination.Ellipsis />}
            {renderPages.map(p => (
                <Pagination.Item key={p} active={activePage === p} onClick={() => onSelect(p)} >{p}</Pagination.Item>
            ))}
            {!!lastEllipsis.length && <Pagination.Ellipsis />}
            <Pagination.Item active={activePage === pages} onClick={() => onSelect(pages)}>{pages}</Pagination.Item>
            <Pagination.Next disabled={pages - activePage < 1} onClick={() => onSelect(Math.min(activePage + 1, pages))} />
            <Pagination.Last disabled={pages - activePage < 1} onClick={() => onSelect(pages)} />
        </Pagination>
    )
}

export default ImagePagination;

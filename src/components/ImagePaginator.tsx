import React, {ChangeEvent, useId} from 'react';
import useWindowDimensions from "../hooks/windowDimensions";
import {useSelector} from "react-redux";
import {selectImagePages, selectImagesPerPage, selectPage, setImagesPerPage, setPage} from "../features/sites";
import {useAppDispatch} from "../app/configureStore";
import ImagePagination from "./ImagePagination";

const allowedImagesPerPage = [4, 6, 8, 12, 16, 24];

const AutoSizePagination = ({id, page, pages, onChangePage}: {
    id: string;
    page: number;
    pages: number;
    onChangePage: (page: number) => void;
}) => {
    const windowDimensions = useWindowDimensions();
    const maxButtons = Math.ceil((windowDimensions.width - 250) / 50);
    return (
        <div id={id} data-width={windowDimensions.width} data-height={windowDimensions.height}
             data-max-buttons={maxButtons}>
            <ImagePagination onSelect={onChangePage} activePage={page} pages={pages} maxButtons={maxButtons}/>
        </div>
    )
}

const ImagePaginator = () => {
    const dispatch = useAppDispatch();
    const imagesPerPage = useSelector(selectImagesPerPage);
    const page = useSelector(selectPage);
    const pages = useSelector(selectImagePages);
    const ippId = useId();
    const pageId = useId();

    const onChangeImagesPerPage = (ev: ChangeEvent<HTMLSelectElement>) => {
        const imagesPerPage = Number(ev.target.value || 12);
        dispatch(setImagesPerPage(imagesPerPage))
    }

    const onChangePage = (page: number) => dispatch(setPage(page));

    return (
        <div className="container-fluid">
            <div className="row g-3 align-items-baseline my-3">
                <div className="col-auto">
                    <label className="text-light" htmlFor={ippId}>Images</label>
                </div>
                <div className="col-auto">
                    <select value={imagesPerPage} className="form-select" onChange={onChangeImagesPerPage} id={ippId}>
                        {allowedImagesPerPage.map(value => (<option key={value} value={value}>{value}</option>))}
                    </select>
                </div>
                <div className="col-auto">
                    <label className="text-light" htmlFor={pageId}>Page</label>
                </div>
                <div className="col">
                    <AutoSizePagination id={pageId} onChangePage={onChangePage} page={page} pages={pages}/>
                </div>
            </div>

        </div>
    )
}
export default ImagePaginator;

import React, {ChangeEvent, HTMLAttributes} from 'react';
import {useSelector} from 'react-redux';
import {selectSites} from "../features/sites";
import classNames from "classnames";

export interface SiteSelectProps extends Omit<HTMLAttributes<HTMLSelectElement>, 'onChange'> {
    siteId: number;
    onChange: (id: number) => void;
}

const SiteSelect = ({siteId, className, onChange, ...props}: SiteSelectProps) => {
    const sites = useSelector(selectSites);
    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        const value = Number(ev.target.value);
        if (isNaN(value)) {
            return;
        }
        onChange(value);
    }

    return (
        <select className={classNames("form-select form-select-sm", className)} value={siteId}
                onChange={changeHandler} {...props}>
            {sites.map(site => (<option key={site.id} value={site.id}>{site.name}</option>))}
        </select>
    );
}

export default SiteSelect;

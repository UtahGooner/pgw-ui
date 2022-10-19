import React from 'react';
import {NavLink} from "react-router-dom";
import {blogPathLink} from "../utils/path";
import {BlogHeader} from "../types/blog";

const BlogDate = ({year = new Date().getFullYear(), month = 1}) => {
    return (
        <small>{String(month).padStart(2, '0')}/{year}</small>
    )
}

const BlogLink = ({blog, active}: { blog: BlogHeader, active: boolean }) => {
    const {name, title, year, month} = blog;
    if (active) {
        return (
            <li className="list-group-item active">
                <div>{title}</div>
                <div><BlogDate month={month} year={year}/></div>
            </li>
        )
    }
    const path = blogPathLink({name, year, month});

    return (
        <li className="list-group-item">
            <NavLink to={path}>
                <div>{title}</div>
            </NavLink>
            <NavLink to={path}>
                <div><BlogDate month={month} year={year}/></div>
            </NavLink>
        </li>
    );
};

export default BlogLink;

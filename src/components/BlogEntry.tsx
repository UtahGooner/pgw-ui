import React, {useEffect} from "react";
import {useAppDispatch} from "../app/configureStore";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {loadBlog, selectCurrentPost} from "../features/blog";
import {siteTitle} from "../utils/helmet";
import {Helmet} from "react-helmet";

const BlogEntry = () => {
    const dispatch = useAppDispatch();
    const {name} = useParams<'name'>();
    const entry = useSelector(selectCurrentPost);

    useEffect(() => {
        if (!entry || entry.name !== name) {
            if (name) {
                dispatch(loadBlog(name))
            }
        }
    }, [name])

    if (!entry) {
        return null;
    }
    return (
        <div className="container blog-content mb-5">
            <Helmet>
                <title>{siteTitle(entry.title)}</title>
            </Helmet>
            <h1>
                <Link to={entry.link}>{entry.title}</Link>
            </h1>
            <div className="mb-3">
                <small>Published: {new Date(entry.date).toLocaleDateString()}</small>
            </div>
            <div dangerouslySetInnerHTML={{__html: entry.content}}/>
        </div>
    )
}

export default BlogEntry;

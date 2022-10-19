import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import ListToggleIcon from "./ListToggleIcon";
import ListGroupHeader from "./ListGroupHeader";
import Collapse from "react-bootstrap/Collapse";
import BlogLink from "./BlogLink";
import {selectBlogList} from "../features/blog";
import {useAppDispatch} from "../app/configureStore";
import {useParams} from "react-router-dom";
import {selectShowBlogs, toggleShowBlogs} from "../features/drawer";

const DrawerBlogEntryList = () => {
    const dispatch = useAppDispatch();
    const {name} = useParams<'name'>();
    const posts = useSelector(selectBlogList);
    const showBlogs = useSelector(selectShowBlogs);

    const clickHandler = () => dispatch(toggleShowBlogs());

    return (
        <Fragment>
            <ListGroupHeader open={showBlogs}>
                <ListToggleIcon onClick={clickHandler} open={showBlogs} controls="drawer-blogs-list">
                    Blogs
                </ListToggleIcon>
            </ListGroupHeader>
            <Collapse in={showBlogs}>
                <li>
                    <div id="drawer-blogs-list" className="collapsible-list">
                        <ul>
                            {posts.map(_post => {
                                return (
                                    <BlogLink key={_post.id} blog={_post} active={_post.name === name}/>
                                )
                            })}
                        </ul>
                    </div>
                </li>
            </Collapse>
        </Fragment>
    );
}

export default DrawerBlogEntryList;

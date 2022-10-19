import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {loadHomeContent, selectBlogLoading, selectHomeContent} from "../features/blog";
import {useAppDispatch} from "../app/configureStore";
import {Link} from "react-router-dom";

const HomeContent = () => {
    const dispatch = useAppDispatch();
    const entry = useSelector(selectHomeContent);
    const loading = useSelector(selectBlogLoading);

    useEffect(() => {
        if (!entry && !loading) {
            dispatch(loadHomeContent());
        }
    }, []);

    if (!entry) {
        return null;
    }

    return (
        <div className="home-content">
            {loading && (
                <div className="progress">
                    <div className="progress-bar progress-bar-animated progress-bar-striped"
                         style={{width: '100%'}}/>
                </div>
            )}
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-3">Petroglyph Watch</h1>
                    <p className="lead">A site dedicated to preserving and documenting petroglyphs, pictographs and
                        other stories preserved on rocks in
                        the American Southwest.
                    </p>
                </div>
                <div className="current-blog-content">
                    <h1><Link to={entry.link}>{entry.title}</Link></h1>
                    <div dangerouslySetInnerHTML={{__html: entry.content}}/>
                </div>
            </div>
        </div>
    );
}

export default HomeContent;

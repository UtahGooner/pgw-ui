import React from "react";
import {Figure} from "react-bootstrap";
import {Helmet} from "react-helmet";

const NoMatch = () => {
    return (
        <div className="container py-5">
            <Helmet>
                <title>404: Not Found</title>
            </Helmet>
            <h1>The page your are looking for was not found.</h1>
            <Figure>
                <Figure.Image width={400} height={266} alt="404, Not found!"
                              src="/images/smithsonian-butte-ut/800/img_8504.jpeg" />
                <Figure.Caption>
                    You seem to have arrived at a non-existent page.
                </Figure.Caption>
            </Figure>
        </div>

    )
}

export default NoMatch;

import React, {useEffect} from "react";
import {useAppDispatch} from "../app/configureStore";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {loadSite, selectCurrentSite, selectCurrentSiteLoading} from "../features/sites";
import {Helmet} from "react-helmet";
import {siteTitle} from "../utils/helmet";
import useWindowDimensions from "../hooks/windowDimensions";
import SiteContentContainer from "./SiteContentContainer";
import SiteHeader from "./SiteHeader";
import SiteImages from "./SiteImages";


const SiteContainer = () => {
    const dispatch = useAppDispatch();
    const {site} = useParams<'site'>();
    const currentSite = useSelector(selectCurrentSite);
    const loading = useSelector(selectCurrentSiteLoading);

    useEffect(() => {
        if (!site) {
            return;
        }
        if (!currentSite || currentSite.path !== site) {
            if (!loading) {
                dispatch(loadSite(site));
            }
        }
    }, [site]);

    if (!currentSite) {
        return null;
    }

    return (
        <>
            <Helmet>
                <title>{siteTitle(currentSite.name)}</title>
            </Helmet>
            <SiteContentContainer path={currentSite.path} header={currentSite.header}>
                <SiteHeader/>
                {!!currentSite.description && (
                    <div className="site--description" dangerouslySetInnerHTML={{__html: currentSite.description}} />
                )}
                <SiteImages />
            </SiteContentContainer>
        </>
    )
}

export default SiteContainer;

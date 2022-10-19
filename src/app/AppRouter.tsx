import {Route, Routes} from "react-router-dom";
import AppLayout from "./AppLayout";
import HomeContent from "../components/HomeContent";
import BlogEntry from "../components/BlogEntry";
import SiteContainer from "../components/SiteContainer";
import NoMatch from "../components/NoMatch";

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<AppLayout/>}>
                <Route index element={<HomeContent/>}/>
                <Route path="/home" element={<HomeContent/>}/>
                <Route path="/sites/:site" element={<SiteContainer/>}/>
                <Route path="/blog" element={<BlogEntry/>}>
                    <Route path=":year/:month/:name" element={<BlogEntry/>}/>
                    <Route path=":name" element={<BlogEntry/>}/>
                </Route>
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    )
}
export default AppRouter;

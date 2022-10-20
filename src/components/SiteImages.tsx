import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import SiteImage from "./SiteImage";
import classNames from 'classnames';
import ImagePaginator from "./ImagePaginator";
import {selectCurrentSite, selectImagesPerPage, selectPagedImages} from "../features/sites";
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useMediaQuery from "@mui/material/useMediaQuery";
import ResponsiveImage from "./ResponsiveImage";

const calcPerRow = (imagesPerPage: number) => {
    switch (true) {
    case imagesPerPage < 8 && imagesPerPage % 3 !== 0:
        return 2;
    case imagesPerPage < 12 && imagesPerPage % 3 === 0:
        return 3;
    default:
        return 4;
    }
}

const LazyImage = ({filename, path}:{
    filename: string;
    path: string;
}) => {
    const src400 = `/images/${encodeURIComponent(path)}/400/${encodeURIComponent(filename)}`;
    const src800 = `/images/${encodeURIComponent(path)}/800/${encodeURIComponent(filename)}`;
    const srcSet = `${src400} 800w, ${src800}`;
    return (
        <img loading="lazy"
             src={src400}
             srcSet={srcSet}
             alt={filename} className="img-fluid" />
    )
}

const SiteImages = () => {
    const pagesImages = useSelector(selectPagedImages);
    const imagesPerPage = useSelector(selectImagesPerPage);
    const currentSite = useSelector(selectCurrentSite);
    const isSmall = useMediaQuery('(max-width:600px;');
    const isMedium = useMediaQuery('(max-width: 900px');
    const cols = isSmall ? 1 : (isMedium ? 2 : (imagesPerPage % 3 === 0 ? 3 : 2));

    if (!currentSite) {
        return null;
    }
    return (
        <div className="image-list">
            <ImagePaginator/>
            <Box sx={{backgroundColor: '#ffc48f', p: 3}}>
                <ImageList variant="masonry" cols={cols} gap={8}>
                    {pagesImages.map(img => (
                        <ImageListItem key={img.filename}>
                            <LazyImage filename={img.filename} path={currentSite!.path} />
                        </ImageListItem>
                    ))}

                </ImageList>
            </Box>
        </div>
    )
}

export default SiteImages;
//
// class SiteImages extends Component {
//     static propTypes = {
//         siteId: PropTypes.number,
//         path: PropTypes.string,
//         list: PropTypes.arrayOf(PropTypes.shape(imagePropType)),
//         loading: PropTypes.bool,
//         selected: PropTypes.shape(imagePropType),
//         imagesPerPage: PropTypes.number,
//         updateImageAttributes: PropTypes.func.isRequired,
//         selectImage: PropTypes.func.isRequired,
//         saveImage: PropTypes.func.isRequired,
//         setImagesPerPage: PropTypes.func.isRequired,
//     };
//
//     static defaultProps = {
//         siteId: 0,
//         path: '',
//         images: [],
//         loading: false,
//         selected: {},
//         imagesPerPage: 6,
//     };
//
//     state = {
//         page: 1,
//         zoomed: 0,
//         zooming: false,
//         deviceWidth: 0,
//     };
//
//     constructor(props) {
//         super(props);
//         this.onSelectImage = this.onSelectImage.bind(this);
//     }
//
//     componentDidUpdate(prevProps, prevState) {
//
//         if (prevProps.siteId !== this.props.siteId && this.state.page !== 1) {
//             this.setState({page: 1});
//         }
//     }
//
//
//     onSelectImage(id) {
//         const {zoomed} = this.state;
//         if (zoomed === id) {
//             this.setState({zoomed: 0});
//         } else {
//             this.setState({zoomed: id});
//         }
//     }
//
//
//     render() {
//         const {page, zoomed} = this.state;
//
//         const {list, path, selected, imagesPerPage} = this.props;
//         const panels = list.filter(img => img.attributes.imageType === 'panel');
//         const glyphs = list.filter(img => img.attributes.imageType !== 'panel');
//         const pageGlyphs = list.filter((img, index) => !!selected.id ? selected.id === img.id : Math.floor(index / imagesPerPage) === page - 1);
//
//         const imagesPerRow = () => {
//             switch (true) {
//             case imagesPerPage < 8 && imagesPerPage % 3 !== 0:
//                 return 2;
//             case imagesPerPage < 12 && imagesPerPage % 3 === 0:
//                 return 3;
//             default:
//                 return 4;
//             }
//         }
//
//         const glyphClassNames = {
//             'site-images--2': imagesPerPage < 8 && imagesPerPage % 3 !== 0,
//             'site-images--3': imagesPerPage < 12 && imagesPerPage % 3 === 0,
//             'site-images--4': imagesPerPage >= 8 && imagesPerPage % 4 === 0,
//         }
//         return (
//             <div className="image-list">
//                 <div className={classNames("site-images", glyphClassNames)}>
//                     {pageGlyphs.map(img => (
//                         <SiteImage key={img.id} path={path} imagesPerRow={imagesPerRow()}
//                                    {...(img.id === selected.id ? selected : img)}
//                                    selected={img.id === selected.id}
//                                    onChangeAttributes={this.props.updateImageAttributes}
//                                    onSave={() => this.props.saveImage(selected)}
//                                    onClick={() => this.props.selectImage(img)}/>
//                     ))}
//                 </div>
//                 <div className="form-inline mt-3">
//                     <ImagePaginator page={page} onChangePage={(page) => this.setState({page})}
//                                     images={list.length}
//                                     imagesPerPage={imagesPerPage}
//                                     allowedImagesPerPage={[4,6,8,12,16,24]}
//                                     onChangeImagesPerPage={this.props.setImagesPerPage}
//                     />
//                 </div>
//             </div>
//         );
//     }
// }
//
//
// function mapStateToProps({sites, user}) {
//     const {id: siteId, path, images} = sites.selected;
//     const {imagesPerPage} = user.preferences;
//     const {list, loading, selected} = images;
//     return {siteId, path, list, loading, selected, imagesPerPage};
// }
//
// const mapDispatchToProps = {
//     updateImageAttributes,
//     selectImage,
//     saveImage,
//     setImagesPerPage,
// };
//
//
// export default connect(
//     mapStateToProps, mapDispatchToProps
// )(SiteImages);

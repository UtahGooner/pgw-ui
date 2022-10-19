import PropTypes from 'prop-types';

export const userProfileShape = {
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    isAdmin: PropTypes.bool,
    roles: PropTypes.arrayOf(PropTypes.string),
    dateCreated: PropTypes.string,
    dateUpdated: PropTypes.string,
    picture: PropTypes.string,
    iat: PropTypes.number,
    exp: PropTypes.number,
    iss: PropTypes.string,
};

export const userProfileDefault = {
    id: 0,
    name: '',
    email: '',
    isAdmin: false,
    roles: [],
    dateCreated: null,
    dateUpdated: null,
    picture: '/images/logo.png',
    iat: 0,
    exp: 0,
    iss: 'petroglyhwatch.com',
};

export const blogEntryShape = {
    id: PropTypes.number,
    name: PropTypes.string,
    date: PropTypes.string,
    content: PropTypes.string,
    title: PropTypes.string,
    status: PropTypes.string,
    commentStatus: PropTypes.string,
    parent: PropTypes.any,
    tags: PropTypes.arrayOf(PropTypes.string),
    link: PropTypes.string,
    year: PropTypes.number,
    month: PropTypes.number,
};
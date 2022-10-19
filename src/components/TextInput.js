import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Form from 'react-bootstrap/Form';

const TextInput = ({as="input", type="text", value, field, className = '', onChange, ...props}) => {
    const changeHandler = (ev) => {
        return onChange({field, value: ev.target.value});
    }
    return (
        <Form.Control as={as} type={type} value={value} size="sm"
               className={classNames('form-control form-control-sm', className)}
               {...props} onChange={changeHandler}/>
    );
};

TextInput.propTypes = {
    as: PropTypes.oneOf(['input', 'textarea', 'select']),
    value: PropTypes.string,
    field: PropTypes.string,
    type: PropTypes.oneOf(["text", "date", "color", "datetime-local", "email", "file", "month", "password",
        "range", "search", "time", "url", "week"
    ]),
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func.isRequired,
};

export default TextInput;
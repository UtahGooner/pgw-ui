import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Select extends Component {
    static propTypes = {
        value: PropTypes.string,
        name: PropTypes.string,
        className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        onChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        value: '',
        name: 'select',
        className: {},
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }


    onChange(ev) {
        const {name} = this.props;
        this.props.onChange({name, value: ev.target.value});
    }

    render() {

        const {className, onChange, children, ...props} = this.props;
        return (
            <select onChange={this.onChange} className={classNames('form-control form-control-sm', className)}
                    {...props}>
                {children}
            </select>
        );
    }
}

Select.propTypes = {};

export default Select;
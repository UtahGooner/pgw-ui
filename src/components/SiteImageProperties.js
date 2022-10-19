import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from "./Select";
import SiteSelect from "./SiteSelect";


class SiteImageProperties extends Component {
    static propTypes = {
        id: PropTypes.number,
        description: PropTypes.string,
        attributes: PropTypes.shape({
            imageType: PropTypes.string,
            tags: PropTypes.arrayOf(PropTypes.string),
        }),
        changed: PropTypes.bool,
        siteId: PropTypes.number,
        onChange: PropTypes.func.isRequired,
        onSave: PropTypes.func.isRequired,
    };

    static defaultProps = {
        id: 0,
        description: '',
        attributes: {
            imageType: '',
            tags: [],
        },
        siteId: 0,
    };

    state = {
        action: '',
        moveToSite: 0,
    };

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeAction = this.onChangeAction.bind(this);
        this.onChangeMoveToSite = this.onChangeMoveToSite.bind(this);
    }

    componentDidMount() {
        if (this.state.moveToSite !== this.props.siteId) {
            this.setState({moveToSite: this.props.siteId});
        }
    }


    onChangeAction({value}) {
        this.setState({action: value});
    }

    onChangeMoveToSite(value) {
        this.setState({moveToSite: value});
    }

    onSubmit(ev) {
        ev.preventDefault();
        this.props.onSave();
    }

    onChange({name, value}) {
        this.props.onChange({[name]: value})
    }

    render() {
        const {imageType, tags, changed} = this.props.attributes;
        const {action, moveToSite} = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form-inline mt-1 mb-1">
                    <div className="form-group mr-3">
                        <label className="mr-1">Image Type</label>
                        <Select className="form-control form-control-sm" value={imageType || ''} name="imageType" onChange={this.onChange}>
                            <option value="">Select One</option>
                            <option value="panel">Panel</option>
                            <option value="glyph">Glyph</option>
                        </Select>
                    </div>
                    {changed && <button type="submit" className="btn btn-primary btn-sm">Save</button>}

                </form>
                <div className="form-inline mt-1 mb-3">
                    <div className="form-group mr-3">
                        <label>Action</label>
                        <Select className="form-control form-control-sm" value={action} onChange={this.onChangeAction}>
                            <option value="">-</option>
                            <option value="move">Move Image</option>
                        </Select>
                        {action === 'move' && (<SiteSelect siteId={moveToSite} onChange={this.onChangeMoveToSite}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

SiteImageProperties.propTypes = {};

export default SiteImageProperties;

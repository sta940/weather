import React, { Component } from 'react';
import { setActivePlace, setActiveDay } from '../actions/actions';
import { connect } from 'react-redux';

class ControlPanel extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.props.setActivePlace(event.target.value);
        this.props.goToViewport(this.props.cities[event.target.value]);
    }

    handleSubmit(event) {
        this.props.setActiveDay(event.target.value);
    }

    render() {
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <select className="form-control" activeKey={this.props.activePlace} onChange={this.handleChange}
                        >
                            {this.props.cities.map((city, index) => (
                                <option key={index} value={index} eventKey={index}>{city.city}</option>
                            ))}
                        </select>
                    </div>
                    <button type="button" value="0" className="btn btn-primary" onClick={this.handleSubmit} >Today</button>
                    <button type="button" value="1" className="btn btn-primary" onClick={this.handleSubmit} >Tomorrow</button>
                    <button type="button" value="2" className="btn btn-primary" onClick={this.handleSubmit} >
                        The day after tomorrow</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activePlace: state.activePlace,
        value: state.activeDay
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setActivePlace: (index) => dispatch(setActivePlace(index)),
        setActiveDay: (index) => dispatch(setActiveDay(index))
    };
};

export default connect(mapStateToProps,
    mapDispatchToProps)(ControlPanel);
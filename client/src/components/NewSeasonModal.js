import React, { Component } from 'react';

class NewSeasonModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seasonEnd: null,
        };
    }

    onDateChange = evt => {
        console.log(evt.target.value);
        this.setState({
            seasonEnd: new Date(evt.target.value)
        });
    }

    onSubmit = () => {
        this.props.resetSeason(this.state.seasonEnd);
    }

    renderFooter = () => {
        let { seasonEnd } = this.state;
        let validDate = false;
        
        if (seasonEnd instanceof Date && !isNaN(seasonEnd)) {
            validDate = true;
        }

        return (
            <div className="modal_footer">
                <button 
                    disabled={!validDate} 
                    onClick={this.onSubmit}>
                        Yes
                </button>
                <button onClick={this.props.onDecline}>No</button>
            </div>
        );
    }

    render() {
        return (
            <div className="modal_wrapper">
                <div className="new_season modal_inner">
                    <div className="modal_header">
                        Reset Season
                    </div>
                    <div className="modal_body">
                        <p>Are you sure you wish to reset the season? This will reset all wins, draws and losses to 0</p>
                        <div className="season_end_date_wrapper">
                            <label htmlFor="season_end">End season date:</label>
                            <input 
                                onChange={this.onDateChange} 
                                id="season_end" 
                                type="date" 
                            />
                        </div>
                    </div>
                    {this.renderFooter()}
                </div>
            </div>
        );
    }
}

export default NewSeasonModal;
import React, { Component } from 'react';
import moment from 'moment';

class SeasonEndCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countdown: this.getCountdownTime(props.seasonEnd),
        };
        this.interval = null;
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            let countdown = this.getCountdownTime(this.props.seasonEnd);
            let countdownBelowZero = (
                countdown.days() < 0 || 
                countdown.hours() < 0 || 
                countdown.minutes() < 0 || 
                countdown.seconds() < 0
            ) ;
            if (countdownBelowZero && !this.props.refetchingLatestSeason) {
                this.props.refetchSeason();
            } else if (!countdownBelowZero) {
                this.setState({
                    countdown
                });
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.interval = null;
    }

    getCountdownTime = seasonEnd => {
        if (!seasonEnd) return null;

        let now = moment().unix();
        let seasonEndUnix = moment(seasonEnd).unix();
        let diffTime = seasonEndUnix - now;
        return moment.duration(diffTime * 1000);
    }

    render() {
        let { countdown } = this.state;
        if (!countdown) return null;
        return (
            <div className="season_end_countdown">
                {countdown.days()} days, {countdown.hours()} hours, {countdown.minutes()} minutes and {countdown.seconds()} seconds until season ends
            </div>
        );
    }
}

export default SeasonEndCounter;
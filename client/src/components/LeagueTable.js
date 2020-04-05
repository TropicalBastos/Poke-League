import React, { Component } from 'react';
import EntryRow from './EntryRow';
import Api from '../api/api';
import Notifications, {notify} from 'react-notify-toast';
import ConfirmationModal from './ConfirmationModal';
import logo from '../assets/logo.png';
import './style.scss';
import NewSeasonModal from './NewSeasonModal';
import SeasonEndCounter from './SeasonEndCounter';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import WinnerBanner from './WinnerBanner';
import moment from 'moment';

const initialFieldEdit = {
    field: null,
    id: null
};

export default class LeagueTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [],
            fieldEdit: {
                ...initialFieldEdit 
            },
            deleteModal: false,
            deleteId: null,
            resetSeasonModal: false,
            latestSeason: null,
            refetchingLatestSeason: false,
        };
    }

    componentDidMount() {
        this.fetchEntries();
    }

    fetchEntries = () => {
        Api.getEntries().then(response => {
            this.setState({
                entries: response.data
            });
        });

        Api.getLatestSeason().then(response => {
            this.setState({
                latestSeason: response.data
            });
        });
    }

    addEntry = () => {
        Api.createEntry({}).then(response => {
            this.fetchEntries();
        });
    }

    onDelete = id => {
        Api.deleteEntry(id).then(() => {
            notify.show('Record has been deleted successfully', 'success', 2500);
            this.fetchEntries();
        })
        .catch(err => {
            notify.show('An error occured while trying to delete the record', 'error', 2500);
        });
    }

    onEdit = (field, id) => {
        this.setState({
            fieldEdit: {
                field,
                id
            }
        });
    }

    onCellBlur = (entry) => {
        this.setState({
            fieldEdit: {
                ...initialFieldEdit 
            },
        });

        Api.updateEntry(entry).then(response => {
            notify.show('Record updated successfully', 'success', 2500);
            this.fetchEntries();
        })
        .catch(err => {
            notify.show('An error occured while trying to update the record', 'error', 2500);
        });
    }

    refetchSeason = () => {
        this.setState({
            refetchingLatestSeason: true,
        }, async () => {
            try {
                let seasonResponse = await Api.getLatestSeason();
                this.setState({
                    latestSeason: seasonResponse.data,
                    refetchingLatestSeason: false,
                });
            } catch (e) {
                console.log(e);
            }
        });
    }

    resetSeason = seasonEnd => {
        this.setState({
            resetSeasonModal: false,
        }, async () => {
            try {
                let response = await Api.resetSeason({ seasonEnd });
                let seasonResponse = await Api.getLatestSeason();
                notify.show('The season has been reset successfully', 'success', 2500);
                this.setState({
                    entries: response.data,
                    latestSeason: seasonResponse.data,
                });
            } catch(err) {
                notify.show('An error occured while trying to reset the season', 'error', 2500);
            }
        });
    }

    hasSeasonEnded = () => {
        let { latestSeason } = this.state;
        let now = moment();
        return latestSeason && now.isAfter(moment(latestSeason.seasonEnd));
    }

    render() {
        let { 
            entries, 
            fieldEdit, 
            deleteId, 
            deleteModal,
            resetSeasonModal,
            latestSeason,
            refetchingLatestSeason,
        } = this.state;

        entries = entries.sort((a, b) => b.score - a.score);

        if (!latestSeason) {
            return(
                <div className="loader">
                    <Loader
                    type="Puff"
                    color="#ffcb09"
                    height={100}
                    width={100}
                    />
                </div>
            );
        }

        let seasonEnded = this.hasSeasonEnded();

        return (
            <div className="league_table_wrapper">
                {!seasonEnded &&
                    <SeasonEndCounter 
                        seasonEnd={latestSeason ? latestSeason.seasonEnd : null} 
                        refetchSeason={this.refetchSeason}
                        refetchingLatestSeason={refetchingLatestSeason}
                    />
                }
                
                <img className="logo" src={logo} />
                <Notifications />

                {resetSeasonModal &&
                    <NewSeasonModal
                        resetSeason={this.resetSeason}
                        onDecline={() => this.setState({
                            resetSeasonModal: false,
                        })}
                    />
                }

                {deleteModal &&
                    <ConfirmationModal
                        title="Confirm Delete"
                        message="Are you sure you wish to delete this record?"
                        onApprove={() => {
                            this.setState({
                                deleteId: null,
                                deleteModal: false,
                            });
                            this.onDelete(deleteId)
                        }}
                        onDecline={() => this.setState({
                            deleteId: null,
                            deleteModal: false,
                        })}
                    />
                }

                <div className="league_table_inner">
                    <div
                        onClick={() => this.setState({
                            resetSeasonModal: true,
                        })} 
                        className="reset_season">
                        New Season
                    </div>

                    {seasonEnded && <WinnerBanner winner={latestSeason.winner} />}

                    {!seasonEnded &&
                        <div className="league_table_inner_header">
                            <div>
                                Name
                            </div>
                            <div>
                                W
                            </div>
                            <div>
                                D
                            </div>
                            <div>
                                L
                            </div>
                            <div>
                                Games
                            </div>
                            <div>
                                Score
                            </div>
                            <div>
                                Action
                            </div>
                        </div>
                    }

                    {!seasonEnded &&
                        <div className="league_table_inner_body">
                            {entries.map((entry, index) => (
                                <EntryRow 
                                    key={index}
                                    onDelete={(id) => this.setState({ 
                                        deleteId: id,
                                        deleteModal: true,
                                    })} 
                                    entry={entry} 
                                    fieldEdit={fieldEdit}
                                    onEdit={this.onEdit}
                                    onBlur={this.onCellBlur}
                                />
                            ))}
                            <div className="league_table_inner_body_row">
                                <div 
                                    onClick={this.addEntry}
                                    className="add_row">
                                    Add Entry +
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
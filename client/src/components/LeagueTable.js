import React, { Component } from 'react';
import EntryRow from './EntryRow';
import Api from '../api/api';
import Notifications, {notify} from 'react-notify-toast';
import ConfirmationModal from './ConfirmationModal';
import logo from '../assets/logo.png';
import './style.scss';
import NewSeasonModal from './NewSeasonModal';

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

    resetSeason = seasonEnd => {
        this.setState({
            resetSeasonModal: false,
        }, () => {
            Api.resetSeason({ seasonEnd }).then(response => {
                notify.show('The season has been reset successfully', 'success', 2500);
                this.setState({
                    entries: response.data
                })
            })
            .catch(err => {
                notify.show('An error occured while trying to reset the season', 'error', 2500);
            });
        });
    }

    render() {
        let { 
            entries, 
            fieldEdit, 
            deleteId, 
            deleteModal,
            resetSeasonModal 
        } = this.state;

        entries = entries.sort((a, b) => b.score - a.score);

        return (
            <div className="league_table_wrapper">
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
                        Reset Season
                    </div>
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
                </div>
            </div>
        );
    }
}
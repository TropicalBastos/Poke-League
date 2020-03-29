import React, { Component } from 'react';
import EntryRow from './EntryRow';
import Api from '../api/api';
import './style.scss';

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
        let { entries } = this.state;
        entries = entries.filter(e => e.id !== id);
        this.setState({
            entries
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
        console.log(entry);
        Api.updateEntry(entry).then(response => {
            this.fetchEntries();
        });
    }

    render() {
        let { entries, fieldEdit } = this.state;
        entries = entries.sort((a, b) => b.score - a.score);

        return (
            <div className="league_table_wrapper">
                <h1>The Poke League</h1>
                <div className="league_table_inner">
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
                                onDelete={this.onDelete} 
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
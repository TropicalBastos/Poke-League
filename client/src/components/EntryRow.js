import React, { Component } from 'react';

class EntryRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.entry ? props.entry.id : null,
            name: props.entry ? props.entry.name || '' : '',
            wins: props.entry ? props.entry.wins || 0 : 0,
            losses: props.entry ? props.entry.losses || 0 : 0,
            draws: props.entry ? props.entry.draws || 0 : 0,
        };
        this.inputRef = React.createRef();
    }

    componentDidUpdate() {
        if (this.inputRef && this.inputRef.current) {
            this.inputRef.current.focus();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.entry !== this.props.entry) {
            this.setState({
                id: nextProps.entry.id,
                name: nextProps.entry.name,
                wins: nextProps.entry.wins,
                losses: nextProps.entry.losses,
                draws: nextProps.entry.draws,
            });
        }
    }

    onUpdateState = (key, value) => {
        this.setState({
            [key]: value
        });
    }

    onUpdateNumState = (key, value) => {
        let cleaned = parseInt(value);
        cleaned = isNaN(cleaned) ? '' : cleaned;
        this.onUpdateState(key, cleaned);
    }

    render() {
        let { fieldEdit, entry, onDelete, onEdit, onBlur } = this.props;
        let { name, wins, losses, draws, id } = this.state;

        return (
            <div className="league_table_inner_body_row">
                <div 
                    className={(fieldEdit.field === 'name' && fieldEdit.id === id) ? 'white_border': ''}
                    onClick={() => onEdit('name', id)}>
                    {fieldEdit.field === 'name' && fieldEdit.id === id ? 
                        <input 
                            ref={this.inputRef}
                            onBlur={() => onBlur(this.state)} 
                            value={name || ''} 
                            onChange={evt => this.onUpdateState('name', evt.target.value)}
                        /> : 
                        name
                    }
                </div>
                <div 
                    className={(fieldEdit.field === 'wins' && fieldEdit.id === id) ? 'white_border': ''}
                    onClick={() => onEdit('wins', id)}>
                    {fieldEdit.field === 'wins' && fieldEdit.id === id ? 
                        <input 
                            ref={this.inputRef}
                            onBlur={() => onBlur(this.state)} 
                            type="number" 
                            value={wins} 
                            onChange={evt => this.onUpdateNumState('wins', evt.target.value)}
                        /> : 
                        wins
                    }
                </div>
                <div 
                    className={(fieldEdit.field === 'draws' && fieldEdit.id === id) ? 'white_border': ''}
                    onClick={() => onEdit('draws', id)}>
                    {fieldEdit.field === 'draws' && fieldEdit.id === id ? 
                        <input 
                            ref={this.inputRef}
                            onBlur={() => onBlur(this.state)} 
                            type="number" 
                            value={draws} 
                            onChange={evt => this.onUpdateNumState('draws', evt.target.value)}
                        /> : 
                        draws
                    }
                </div>
                <div 
                    className={(fieldEdit.field === 'losses' && fieldEdit.id === id) ? 'white_border': ''}
                    onClick={() => onEdit('losses', id)}>
                    {fieldEdit.field === 'losses' && fieldEdit.id === id ? 
                        <input 
                            ref={this.inputRef}
                            onBlur={() => onBlur(this.state)} 
                            type="number" 
                            value={losses} 
                            onChange={evt => this.onUpdateNumState('losses', evt.target.value)}
                        /> : 
                        losses
                    }
                </div>
                <div>{entry.games}</div>
                <div>{entry.score}</div>
                <div 
                    onClick={() => onDelete(id)}
                    className="league_table_inner_body_row_delete">
                        Delete
                </div>
            </div>
        );
    }
}

export default EntryRow;
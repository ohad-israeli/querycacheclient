import React, { Component } from 'react';

class EmpList extends Component {

    constructor() {
        super()
        this.state = {
            employees: [],
        }
    }

    handleInput = e => {
        this.searchPattern = e.target.value;
    }

    queryEmps = () => {
        console.time('DBQuery');
        // Fetch the data from our hard working server
        fetch(`http://localhost:5000/query?name=${this.searchPattern}`)
            .then(result => {
                console.timeEnd('DBQuery');
                return result.json();
            }).then(data => {
                // foreach row render the name of the employee
                let empData = data.map((empRec) => {
                    return (
                        <li key={empRec.emp_no}>{`${empRec.first_name} ${empRec.last_name}`}</li>
                    );
                });
                this.setState({ employees: empData });
            });
    }

    render() {
        return (
            <div className="EmpList">
                <div className="header">
                    <input
                        placeholder="Search"
                        onChange={this.handleInput}
                        value={this.state.searchPattern}
                    />
                    <button onClick={this.queryEmps}> Search </button>
                </div>
                <ul className="theList">{this.state.employees}</ul>
            </div>
        )
    }
}

export default EmpList
import React from 'react';

class Hello extends React.Component
{
    state = {
        date: ""
    };

    getDate() {
        var date = { currentTime: new Date().toLocaleString() };
    
        this.setState({
          date: date
        });
      }

    render()
    {
        return(
            <div class="date">
                <p>Found a way to add the current date!</p>
                <p>{this.props.name}</p>
                <p>{this.state.date}</p>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
          date: new Date().toLocaleString()
        };
      }
}

export default Hello;
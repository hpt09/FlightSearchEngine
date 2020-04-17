import React from 'react';

class OneWayTicket extends React.Component{

    render() {
        return ( <div class="ticket">
        <h4>Rs. {this.props.price}</h4>
        <h5>{this.props.flightNo}</h5>
      <h4>Depart: {this.props.departTime}</h4>
      <h4>Arrive: {this.props.arriveTime}</h4>
      </div>
        )
            }


}

export default OneWayTicket;
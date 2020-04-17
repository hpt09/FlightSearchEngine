import React from 'react';

class ReturnTicket extends React.Component{

    render() {
        return ( <div class="ticket">
        <h4>Rs. {this.props.price}</h4>
        <div style={{float:'left'}}>
        <h5>{this.props.flightNo}</h5>
       <h4>Depart: {this.props.departTime}</h4>
       <h4>Arrive: {this.props.arriveTime}</h4>
       </div>
      <div style={{float:'right'}}>  
        <h5>{this.props.returnFlightNo}</h5>
      <h4>Depart: {this.props.returnDepartTime}</h4>
      <h4>Arrive: {this.props.returnArriveTime}</h4>
      </div>
      </div>
        )
            }


}

export default ReturnTicket;
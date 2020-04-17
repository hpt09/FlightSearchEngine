import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import './Search.css'

  class Search extends React.Component{
  constructor(){
    super();
    this.state = {
      originCity: '',
      destinationCity: '',
      departureDate: '',
      passengers: 0,
      returnDate: '',
      submitted: false,
      tabKey: 'oneway',
      price:100000,
      flights: []
      };
  }

  

//   componentDidMount() {
//     this.setState({ isLoading: true });
//     axios.get('/flights.json')
//     .then(result => 
//         this.setState({
//           flights: result.data,
//             isLoading: false
//         })
//     )
//     .catch(error => 
//         this.setState({
//             error,
//             isLoading: false
//         })
//     );
// }

handleChange = (e) => {
  this.setState({
      [e.target.name]:e.target.value})
}

handleSubmit = () => {
  
  if(this.state.tabKey === 'oneway'){
    this.setState({ isLoading: true });
    axios.get('/flights.json')
    .then(result => 
        this.setState({
          flights: result.data,
            isLoading: false
        })
    )
    .catch(error => 
        this.setState({
            error,
            isLoading: false
        })
    );
  } else if(this.state.tabKey === 'return'){
    axios.get('/returnFlights.json')
    .then(result => 
        this.setState({
          flights: result.data,
            isLoading: false
        })
    )
    .catch(error => 
        this.setState({
            error,
            isLoading: false
        })
    );
  }
  this.setState(
    {submitted:true})
  
}


  render(){
    
    if(this.state.isLoading) {
      return "Loading..."
  }
  if(this.state.error) {
      return <p>{this.state.error.message}</p>
  }
    
        return (
      <div>

        <h1>Flight Search Engine</h1><br/>
        <aside >
        <Tabs defaultActiveKey="oneway" id="uncontrolled-tab-example" onSelect={(k) => this.setState({tabKey:k})}>
  <Tab eventKey="oneway" title="One Way">
    <div class="form-group">
          <input placeholder='Enter Origin city' class="form-control" name="originCity" onChange={this.handleChange}></input>
          <input placeholder='Enter Destination city' class="form-control" name="destinationCity" onChange={this.handleChange}></input>
   
          <span>Departure Date</span><input type="date" class="form-control" name="departureDate" onChange={this.handleChange} ></input>
          
          <span>Passengers</span><input type="number" class="form-control" name="passengers" onChange={this.handleChange}></input>
         
          <button onClick={this.handleSubmit}>Search</button><br/>
          </div>  
          
          <label>Refine flight search</label><br/>
          <label>$0</label>
          <span class='max'>$100000</span>
          <div class="slidecontainer">
          <input type="range" min="1" max="100000" defaultValue="100000" class="slider" name="price" onChange={this.handleChange}></input>
          <br/><span class='value'>${this.state.price}</span>
          </div>
  </Tab>
  <Tab eventKey="return" title="Return">
  <div class="form-group">
          <input placeholder='Enter Origin city' class="form-control" name="originCity" onChange={this.handleChange}></input>
          <input placeholder='Enter Destination city' class="form-control" name="destinationCity" onChange={this.handleChange}></input>
   
          <span>Departure Date</span><input type="date" class="form-control" name="departureDate" onChange={this.handleChange} ></input>
          <span>Return Date</span><input type="date" class="form-control" name="returnDate" onChange={this.handleChange} ></input>
          
          <span>Passengers</span><input type="number" class="form-control" name="passengers" onChange={this.handleChange}></input>
         
          <button onClick={this.handleSubmit}>Search</button><br/>
          </div>  
          
          <label>Refine flight search</label><br/>
          <label>$0</label>
          <span class='max'>$100000</span>
          <div class="slidecontainer">
          <input type="range" min="1" max="100000" defaultValue="10000" class="slider" name="price" onChange={this.handleChange}></input>
          <br/><span class='value'>${this.state.price}</span>
          </div>
    </Tab>
    </Tabs>   
        </aside>
        <section>

          {/* {this.state.submitted === true && this.state.tabKey === 'oneway' ? (
            <h3>{this.state.originCity} > {this.state.destinationCity}</h3>
          ) : <h3>Please search on the right</h3>} */}


          {this.state.submitted === true && this.state.tabKey === 'oneway' &&
          <div>
          <h3>{this.state.originCity} > {this.state.destinationCity}</h3>
          <span class='dates'>Depart: {this.state.departureDate}</span>
          </div>}
                       
                       {this.state.flights.map(flight => {
                                       return flight.originCity == this.state.originCity && 
                                       flight.destinationCity == this.state.destinationCity && 
                                       flight.departureDate == this.state.departureDate && 
                                       flight.passengers >= this.state.passengers &&
                                       flight.price <= this.state.price &&
                                       this.state.submitted == true &&
                                       this.state.tabKey == 'oneway' ? (
                                       <div class="ticket">
                                         <h4>Rs. {flight.price}</h4>
                                         <h5>{flight.flightNo}</h5>
                                       <h4>Depart: {flight.departTime}</h4>
                                       <h4>Arrive: {flight.arriveTime}</h4>
                                       </div>
                                ) : <h4>No Flights found with the input data</h4>
                        })
                      }

{this.state.submitted === true && this.state.tabKey === 'return' &&
          <div>
          <h3>{this.state.originCity} > {this.state.destinationCity} > {this.state.originCity}</h3>
          
          <span class='dates'>Depart: {this.state.departureDate}</span><br/>
          <span class='dates'>Return: {this.state.returnDate}</span>
          
          </div>}
                       
                       {this.state.flights.map(flight => {
                                       return flight.originCity == this.state.originCity && 
                                       flight.destinationCity == this.state.destinationCity && 
                                       flight.departureDate == this.state.departureDate &&
                                       flight.returnDate == this.state.returnDate && 
                                       flight.passengers >= this.state.passengers &&
                                       flight.price <= this.state.price &&
                                       this.state.submitted == true &&
                                       this.state.tabKey == 'return' ? (
                                       <div class="ticket">
                                         <h4>Rs. {flight.price}</h4>
                                         <div style={{float:'left'}}>
                                         <h5>{flight.flightNo}</h5>
                                        <h4>Depart: {flight.departTime}</h4>
                                        <h4>Arrive: {flight.arriveTime}</h4>
                                        </div>
                                       <div style={{float:'right'}}>  
                                         <h5>{flight.returnFlightNo}</h5>
                                       <h4>Depart: {flight.returnDepartTime}</h4>
                                       <h4>Arrive: {flight.returnArriveTime}</h4>
                                       </div>
                                       </div>
                                ) : <br/>
                        })
                      }


                       </section>
          </div>
        
    )
  }
}
export default Search;
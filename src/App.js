import React, { Component } from 'react';
import lunr from 'lunr';

var index = lunr(function() {
  this.field('name', {boost: 10})
  this.field('url')
  this.ref('id')
});

var safetyDataSheets = [{"id":3,"name":"Econase XT 25","url":"http://localhost:3000/safety_data_sheets/3.json"},{"id":4,"name":"Blue Beast EF","url":"http://localhost:3000/safety_data_sheets/4.json"},{"id":8,"name":"Acrylic Enamel Aerosol Paint","url":"http://localhost:3000/safety_data_sheets/8.json"},{"id":9,"name":"Antifreeze - Coolant - Prime","url":"http://localhost:3000/safety_data_sheets/9.json"},{"id":10,"name":"Anti-Sieze Lubricant Permatex","url":"http://localhost:3000/safety_data_sheets/10.json"},{"id":11,"name":"Goof Off","url":"http://localhost:3000/safety_data_sheets/11.json"},{"id":12,"name":"Copper Sulfate","url":"http://localhost:3000/safety_data_sheets/12.json"},{"id":13,"name":"Organic Cane Molasses","url":"http://localhost:3000/safety_data_sheets/13.json"},{"id":14,"name":"Selenium","url":"http://localhost:3000/safety_data_sheets/14.json"},{"id":15,"name":"Alimet","url":"http://localhost:3000/safety_data_sheets/15.json"},{"id":16,"name":"Vitec 4000","url":"http://localhost:3000/safety_data_sheets/16.json"}]

index.add(safetyDataSheets)

var pepareData = function(){
  return (safetyDataSheets.forEach( sheet => {
      index.add(sheet);
      console.log(sheet);
  })
  ) 
}

pepareData(); 

export default class Item extends Component {
  render() {
    return (
      <h1>{this.props.data}</h1>
        )
  }
}


export default class App extends Component {
  constructor(){
    super();
    this.state = {searchTerm: '',
                  items: []}
  }

  search(event){
    var query = index.search(event.target.value);
    this.setState({searchTerm: event.target.value,
                  items: query});
  }
  
  render() {
    return (
      <div>
        <h1> Items </h1>
        <input onChange={this.search.bind(this)}></input>

        {this.state.items.map(function(item){ 
          return (
                <Item data={item.ref} />
          )
         })} 
      </div>
    );
  }
}



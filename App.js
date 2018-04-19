
import React, { Component } from 'react'
import ReactJson from 'react-json-view'
import './App.css'

import axios from 'axios'

class App extends Component {
  constructor () {
    super()
    this.state = {
      host:'http://localhost:4503',
      path:'',
      path2:'/content/we-retail/api/',
      path3:'faqs/orders',
      pathfaqs:'faqs',
      testhid:"inv_div",




    }

    this.handleClick = this.handleClick.bind(this)
    this.handleClick2 = this.handleClick2.bind(this)
    this.handleClick3 = this.handleClick3.bind(this)
  }

  handleClick () {
    this.setState({testhid:'inv_div'})
    axios.get( this.state.host + this.state.path2 + this.state.pathfaqs + '.model.json')
      .then(response => {
      this.setState({jsonDISP: response.data})

	  })
  }
  handleClick2 () {
    this.setState({testhid:'inv_div'})
    axios.get( this.state.host + this.state.path2 + this.state.path3 + '.model.json')
      .then(response => {
      this.setState({test: response.data})
      this.setState({jsonDISP: response.data})
    })
  }
  handleClick3 () {
    this.setState({testhid:'viv_div'})
    axios.get( this.state.host + this.state.path2 + this.state.pathfaqs + '.model.json')
    .then(response=>{
      this.setState({jsonDISP: response.data})
      var a=0;
      for (var i = 0; i < response.data[":items"].root[":items"].list.items.length; i++) {
        var path=this.state.host+response.data[":items"].root[":items"].list.items[i].path+".model.json";
        axios.get(path)
          .then(response => {
            if(a==0){this.setState({jsonDISP0: response.data})}
            if(a==1){this.setState({jsonDISP1: response.data})}
            if(a==2){this.setState({jsonDISP2: response.data})}
            if(a==3){this.setState({jsonDISP3: response.data})}
            a++

          });

      }
    });

  }

  render () {
    return (
      <div>
        <ul>
          <li><button className='button' onClick={this.handleClick}>load FAQs Json</button></li>
          <li><button className='button' onClick={this.handleClick2}>load orders Json</button></li>
          <li><button className='button' onClick={this.handleClick3}>load all Jsons</button></li>
        </ul>
        <ReactJson src={this.state.jsonDISP} />
        <div className={this.state.testhid}>
          <ReactJson src={this.state.jsonDISP0} />
          <ReactJson src={this.state.jsonDISP1} />
          <ReactJson src={this.state.jsonDISP2} />
          <ReactJson src={this.state.jsonDISP3} />
        </div>
      </div>
    )
  }


}
export default App

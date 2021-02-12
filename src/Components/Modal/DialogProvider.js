import React, { Component } from "react";
class DialogProvider extends Component {
  state = { list=[] };
  
  handleClose=(id)=>{
      this.setState(list.setState({list:list.filter(x=>x.id!==id)}));
  }
  render() {
    return (
      <>
      {list.map(x=> <AlertDialog onClose={this.handleClose} ></AlertDialog>)}
       
        {...this.props.children}
      </>
    );
  }
}

export default DialogProvider;

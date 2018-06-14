import React from 'react';
export class News extends React.Component{
    render(){
        console.log(this);
        return (
            <div>
                <h1> 这是News </h1>
                {this.props.match.params.name}
            </div>
        )
    }
}
export class Def extends React.Component{
    render(){
        return <h1>详情：{this.props.match.params.sum}</h1>
    }
}
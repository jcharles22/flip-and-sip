import React, { Component } from 'react'
import { Stage, Shape } from "@createjs/easeljs";
// import { Tween } from "@createjs/tweenjs";
import '../css/GamePage.css'

export default class GamePage extends Component {
    state={
        cards : {
            1: {
                title: 'Social',
                desc: 'Everyone Drink',
            },
            2: {
                title: "2's for you",
                desc: this.randomPlayer() + ' take a sip'
            }
        }
    }
    componentDidMount(){
        
        let stage = new Stage("myCanvas");
        let circle = new Shape();
        circle.graphics.beginFill("blue").drawRect(185, 75, 150, 150); 
        stage.addChild(circle);
        stage.update();
        // let ss = new SpriteSheet({
        //     frames: {
        //       width: 32,
        //       height: 64,
        //       numFrames: 19
        //     },
        //     animations: {run: [0, 25], jump: [26, 63, "run"]},
        //     images: ["./assets/runningGrant.png"]
        //   });
           
        //   let sprite = new Sprite(ss, "run");
        //   sprite.scaleY = sprite.scaleX = 0.4;
        //   stage.addChild(sprite);
           
        //   sprite.on("click", evt => sprite.gotoAndPlay("jump"));
           
        //   Ticker.on("tick", stage);
       }
    
    randomPlayer() {
        let players = this.props.state
        let keys = Object.keys(players)
        return players[keys[keys.length * Math.random() << 0]]
    }

    render() {
        
        console.log(this.state)
        return (
            <div>                
                <canvas id='myCanvas' width='500' height='300'></canvas>
            </div>
        )
    }
}

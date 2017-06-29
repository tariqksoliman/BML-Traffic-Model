# BML-Traffic-Model

The [Biham–Middleton–Levine traffic model](https://en.wikipedia.org/wiki/Biham%E2%80%93Middleton%E2%80%93Levine_traffic_model) is a cellular automaton that represents a flow of traffic.

## [Live Demo!](http://tariqksoliman.github.io/BML-Traffic-Model)

The concept is simple:  
&nbsp;&nbsp;&nbsp;Pixels represent cars  
&nbsp;&nbsp;&nbsp;They are two types of cars:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cars that move downward  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cars that move rightward  
&nbsp;&nbsp;&nbsp;Car types take turns:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All downward cars move  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then all rightward cars move  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then all downwards cars move again  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;And so on...  
&nbsp;&nbsp;&nbsp;Cars only move if their future spot is vacant  
&nbsp;&nbsp;&nbsp;Cars of their type only move all at once

### TODO:
Use WebGL shaders instead of straight canvas.
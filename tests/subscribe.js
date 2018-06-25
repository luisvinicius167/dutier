// Import Dutier-Logger
!function(o,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):o.Logger=e()}(this,function(){"use strict";return function(o){var e=o.action,t=o.oldState,n=o.state,c=new Date,i=c.getHours(),s=c.getMinutes(),f=c.getSeconds(),l=c.getMilliseconds();console.groupCollapsed("%caction %c"+e.type+" %c@"+i+":"+s+":"+f+":"+l,"color: #898989; font-size: 13px; font-weight: 500;","color: #333; font-size: 13px; font-weight: bold;","color: #898989; font-size: 13px; font-weight: 500;"),console.log("%c prev state ","color: #888; font-size: 13px; font-weight: 500;",t),console.log("%c action ","color: #0098f9; font-size: 13px; font-weight: 500;",e),console.log("%c next state ","color: #00c34e; font-size: 13px; font-weight: 500;",n),console.groupEnd()}});

const unsubscribe = store.subscribe( ( { type, state } ) => {
  console.log(type, state)
})

Dutier.applyMiddleware(Logger)

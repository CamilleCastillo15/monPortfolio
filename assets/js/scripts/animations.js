tl = new TimelineLite({delay:0.4});

TweenLite.set(".dev-front", {visibility:"visible"})

tl.from(".img-screen", 0.6, {y:-30, opacity:0})
  .from(".img-tablet", 0.6, {y:30, opacity:0}, "-=0.3")
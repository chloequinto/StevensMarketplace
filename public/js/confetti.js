// Documentation @ https://github.com/Agezao/confetti-js#readme
var confettiSettings = { 
    target: 'my-canvas', 
    "max":"200",
    "size":"1",
    "animate":true,
    "props":["circle","square","triangle","line"],
    "colors":[[226,46,64],[165,104,246],[230,61,135],[0,199,228],[253,214,126]],
    "clock":"25",
    "rotate":true,
    "width":window.screen.width,
    "height": window.screen.height,
    "start_from_edge":false,
    "respawn":true
};
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();
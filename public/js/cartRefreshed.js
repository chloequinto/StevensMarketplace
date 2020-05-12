if(window.performance){ 
    console.info("Test")
}

if (performance.navigation.type === 1){ 
    console.info("This page was reloaded")
}
else{ 
    console.info("Not reloaded")
}
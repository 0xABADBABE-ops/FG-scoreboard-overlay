const logo_duration=3;                  //Duration logo appear before trasition to next logo in sec
const logo_trasition_duration=2;       // trastion duration for bith fade in fade out in sec
const logo_cycle_duration=10;          // time gap between logo cycles in sec

window.onload=init;                               // When the window finishes loading, the init function is executed




function init(){              // Main initialization function

      // Set initial startup flag
    var startup=true;

      // Get references to various DOM elements to display data
    const p1textwrapper = document.getElementById('P1wrapper');
    const p2textwrapper = document.getElementById('P2wrapper');
    const roundwrap = document.getElementById('round');
    const p1nameelement = document.getElementById('P1name');
    const p1teamelement = document.getElementById('P1teamname');
    const p2nameelement = document.getElementById('P2name')
    const p2teamelement = document.getElementById('P2teamname');
    const p1scoreelement = document.getElementById('P1score');
    const p2scoreelement = document.getElementById('P2score');
    const roundelement = document.getElementById('round');
    
        // Start the live data fetch process
    function startlive(){

    

        fetch("./StreamControl/streamcontrol.json")            //Using the fetch() API to Read local JSON file from steamcontrol(JSON parsing)
        .then(response => response.json())             // Parse the JSON response
        .then(data => showInfo(data));        // Call showInfo with the parsed data           
        
        
            function showInfo(data) {


                 // Extract relevant data from the fetched JSON
                var p1Name = data.p1Name;
                var p2Name = data.p2Name;
                var p1Team = data.p1Team;
                var p2Team = data.p2Team;
                var p1Score = data.p1Score;
                var p2Score = data.p2Score;
                var round = data.round;

                
                
                   // Check if it's the first time loading the data
                if(startup==true){
                                      // assing the elements with the fetched data
                    p1nameelement.innerHTML=p1Name;
                    p2nameelement.innerHTML=p2Name;
                    p1teamelement.innerHTML=p1Team;
                    p2teamelement.innerHTML=p2Team;
                    p1scoreelement.innerHTML=p1Score;
                    p2scoreelement.innerHTML=p2Score;
                    roundelement.innerHTML=round;
                
                    resizeTextToFitround(roundwrap);    // Adjust text size to fit the available space
                    resizeTextToFitpname(p1textwrapper);
                    resizeTextToFitpname(p2textwrapper);
                    
                    startupanmiation();    // Trigger animation for the first load
                    startup=false;          // Set the startup flag to false to indicate it's no longer the first load
                    
            
                }
                else{      // For subsequent updates after the first load               
                        
                     // Check if player 1's name or team has changed
                    if(p1nameelement.textContent != p1Name || p1teamelement.textContent!=p1Team ){
                        // Animate player 1's wrapper to transition to the new content
                        gsap.to("#P1wrapper",{
                            x:-30,
                            opacity: 0,
                            duration: 0.5,
                            delay: 0,
                            ease: "power1.out",
                            onComplete:function(){
                                p1teamelement.innerHTML=p1Team;
                                p1nameelement.innerHTML=p1Name;
                                resizeTextToFitpname(p1textwrapper); // Resize text after updating
                            }
                        })
                        
                         // Animate player 1's wrapper to transition to the new content
                        gsap.to("#P1wrapper",{
                            x:0,
                            opacity: 1,
                            duration: 0.5,
                            delay:0.5,
                            ease: "power1.out"
                        })

                    }
                        // Check if player 2's name or team has changed
                    if(p2nameelement.textContent != p2Name || p2teamelement.textContent!=p2Team ){
                        gsap.to("#P2wrapper",{
                            x:+30,
                            opacity: 0,
                            duration: 0.5,
                            delay: 0,
                            ease: "power1.out",
                            onComplete:function(){
                                p2teamelement.innerHTML=p2Team;
                                p2nameelement.innerHTML=p2Name;
                                resizeTextToFitpname(p2textwrapper);
                            }
                        })
                        

                        gsap.to("#P2wrapper",{
                            x:0,
                            opacity: 1,
                            duration: 0.5,
                            delay:0.5,
                            ease: "power1.out"
                        })

                    }

                      // Check if the round has changed
                    if(roundelement.textContent != round ){
                        gsap.to("#round",{
                            y:-35,
                            opacity: 0,
                            duration: 0.5,
                            delay: 0,
                            ease: "power1.in",
                            onComplete:function(){
                                roundelement.innerHTML=round;
                                resizeTextToFitround(roundwrap);  // Resize round text after updating
                            }
                        })
                        

                        gsap.to("#round",{
                            y:0,
                            opacity: 1,
                            duration: 0.5,
                            delay:0.5,
                            ease: "power1.out"
                        })

                    }

                    // Check if player 1's score has changed
                    if(p1scoreelement.textContent != p1Score ){
                        gsap.to("#P1score",{
                            opacity: 0,
                            duration: 0.2,
                            delay: 0,
                            ease: "power1.out",
                            onComplete:function(){
                                p1scoreelement.innerHTML=p1Score; // Update score
                                
                            }
                        })
                        

                        gsap.to("#P1score",{
                            opacity: 1,
                            duration: 1,
                            delay:0.2,
                            ease: "power1.out"
                        })

                    }

                    // Check if player 2's score has changed
                    if(p2scoreelement.textContent != p2Score ){
                        gsap.to("#P2score",{
                            opacity: 0,
                            duration: 0.2,
                            delay: 0,
                            ease: "power1.out",
                            onComplete:function(){
                                p2scoreelement.innerHTML=p2Score; // Update score
                                
                            }
                        })
                        

                        gsap.to("#P2score",{
                            opacity: 1,
                            duration: 1,
                            delay:0.2,
                            ease: "power1.out"
                        })

                    }
                }
                
            
            }

       
        

    }

 startlive();   // Start live updates for the game state
 setInterval(startlive,500);  // Set interval to repeatedly fetch and update the game state every 500ms
   // Call the logo loop animation function

 

}

function startupanmiation(){      // Function to handle startup animations for various elements
    gsap.from(".BG",{
        y:-35,
        opacity: 0,
        duration: 0.7,
        delay: 0.5,
        ease: "power3.out"
    })
    
    
    gsap.from("#roundBG",{
        y:-35,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out"
    })
    
    gsap.from("#P1wrapper",{
        x:-30,
        opacity: 0,
        duration: 0.5,
        delay: 1,
        ease: "power1.out"
    })
    gsap.from("#P2wrapper",{
        x:+30,
        opacity: 0,
        duration: 0.5,
        delay: 1,
        ease: "power1.out"
    })
    
    gsap.from("#round",{
        y:-35,
        opacity: 0,
        duration: 0.5,
        delay: 1,
        ease: "power1.out"
    })
    
    gsap.from(".score",{
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: "power1.out"
    })
    }

    // Function to resize text to fit inside a given container player name
function resizeTextToFitpname(element) {
      element.style.fontSize = `37px`;
      
    const maxWidth = element.clientWidth;
    const maxHeight = element.clientHeight;
    const minFontSize = 8; // Minimum font size in pixels
    let fontSize = parseInt(window.getComputedStyle(element).fontSize, 10);
    let textFits = false;
 
      // Loop to gradually decrease font size until the text fits
    while (!textFits && fontSize > minFontSize) {
        element.style.fontSize = `${fontSize}px`;
        if (element.scrollWidth <= maxWidth && element.scrollHeight <= maxHeight) {
            textFits = true;
        } else {
            fontSize -= 1;
        }
    }

     // Apply the final font size
    element.style.fontSize = `${fontSize}px`;
}


// Function to resize text to fit inside a given container player name
function resizeTextToFitround(element) {
      element.style.fontSize = `25px`;
      
    const maxWidth = element.clientWidth;
    const maxHeight = element.clientHeight;
    const minFontSize = 8; // Minimum font size in pixels
    let fontSize = parseInt(window.getComputedStyle(element).fontSize, 10);
    let textFits = false;
 
      // Loop to gradually decrease font size until the text fits
    while (!textFits && fontSize > minFontSize) {
        element.style.fontSize = `${fontSize}px`;
        if (element.scrollWidth <= maxWidth && element.scrollHeight <= maxHeight) {
            textFits = true;
        } else {
            fontSize -= 1;
        }
    }

     // Apply the final font size
    element.style.fontSize = `${fontSize}px`;
}

// Function to handle the animation loop for logos
function logoloop(){
    const wrapper = document.getElementById("logowrapper");
    if (!wrapper) return; // Exit if wrapper doesn't exist

    const logos = wrapper.querySelectorAll("img"); // all images inside
    if (logos.length === 0) return; // Exit if there are no <img> tags

    const validLogos = [];

    // Check which images actually loaded
    logos.forEach((img) => {
        if (img.complete && img.naturalWidth !== 0) {
            validLogos.push(img);
        } else {
            img.style.display = "none"; // hide broken images
        }
    });

    // Exit if no valid images to animate
    if (validLogos.length === 0) return;

    const logoTimeline = gsap.timeline({
        repeat: -1,
        repeatDelay: logo_cycle_duration
    });

    validLogos.forEach((img) => {
        logoTimeline.from(img, {
            opacity: 0,
            duration: logo_trasition_duration,
            ease: "power1.in"
        });

        logoTimeline.to(img, {
            opacity: 0,
            duration: logo_trasition_duration,
            delay: logo_duration,
            ease: "power1.out"
        });
    });
}
logoloop();




 //----------github.com/Y3S99-------------

$(() => {

    // Hold id names in constants
    const $redLight = $('#red-light');
    const $yellowLight = $('#yellow-light');
    const $greenLight = $('#green-light');
    const $activateButton = $('#activate');


    // Hold class names in constants
    const colorRed = 'red';
    const colorYellow = 'yellow';
    const colorGreen = 'green';

    // Hold all of the ids in an array
    const lightsArray = [
        $redLight,
        $yellowLight,
        $greenLight
    ];

    // Hold all of the color classes in an array
    const colorArray = [
        colorRed,
        colorYellow,
        colorGreen
    ];

    // Add a color to a circle
    const addColor = ($selector, color) => {
        $selector.addClass(color);
    };

    // Remove a color from a circle
    const removeColor = ($selector, color) => {
        $selector.removeClass(color);
    };

    // Switch on all of the lights
    const activateLights = () => {
        for (let i = 0; i < lightsArray.length; i++) {
            addColor(lightsArray[i], colorArray[i]);
        }
    };

    // Switch off all of the lights
    const deactivateLights = () => {
        for (let i = 0; i < lightsArray.length; i++) {
            removeColor(lightsArray[i], colorArray[i]);
        }
    };


    const asyncFuncs = (funcArray, timeout, timeoutDiff=0) => {

        for (let i = 0; i < funcArray.length; i++, timeout += timeoutDiff) {
            setTimeout(funcArray[i], timeout);
        }
    }

    const mainAsync = (funcArray, timeout, intervalRepeatTimes, timeoutDiff=0, intervalTime=0) => {
        // If interval time is not set then set it with this logic
        // This will make sure that interval won't end, until inner timeouts are done running
        if (intervalTime === 0) {
            intervalTime = timeout + (funcArray.length - 1) * timeoutDiff;
        }
        const interval = setInterval(() => {
            console.log("Hi");
            --intervalRepeatTimes;
            if (intervalRepeatTimes === 0)
                clearInterval(interval);
            asyncFuncs(funcArray, timeout, timeoutDiff);
        }, intervalTime);
    }


    /* FUNCTION DEFINITION BEGIN */

    const clickEvent = () => {
        mainAsync([activateLights, deactivateLights], 400, 2, 400);
        //setTimeout(() => {addColor($redLight, colorRed)}, 1800);
        /*const trafficFlow = (() => {




            setTimeout(() => {
                timerRed = 10;

                let lightCounter = setInterval(() => {
                    timerRed--;
                    $('#red-counter').empty().append(timerRed);
                    if (timerRed == 1) {
                        addColor($yellowLight, colorYellow);
                    }

                    if (timerRed == -1) {
                        $('#green-counter').empty().append("Go!");
                        removeColor($redLight, colorRed);
                        addColor($greenLight, colorGreen);
                        $('#red-counter').empty();
                        clearInterval(lightCounter);

                    }
                }, 1000);
            }, 2200);

            // LOGIC FOR GREEN LIGHT
            // Red light amount = 10 * 1000 + 2200 = 12200
            setTimeout(() => {
                timerGreen = 5;

                let lightCounter = setInterval(() => {
                    timerGreen--;
                    $('#green-counter').empty().append(timerGreen);
                    removeColor($yellowLight, colorYellow);
                    if (timerGreen == 0) {
                        $('#red-counter').empty().append("Stop!");
                        addColor($redLight, colorRed);
                    }
                    if (timerGreen == -1) {
                        removeColor($greenLight, colorGreen);
                        addColor($redLight, colorRed);
                        $('#green-counter').empty();
                        clearInterval(lightCounter);
                    }
                // Call per second
                }, 1000);
            }, 13400);
            //setTimeout(() => {addColor($greenLight, colorGreen)}, 18400);
        })();*/

    };

    /* FUNCTION DEFINITION END */


    // Once the button is clicked call clickEvent()
    $activateButton.click(() => {
      clickEvent();
      // Then clear div for new use
      setTimeout(() => {
        $('#red-counter').empty();
        removeColor($redLight, colorRed);
      }, 21000);
    });
});

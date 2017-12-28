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

    // Globab timer to track light's counter
    // let timer;
    // const lightCounter = ($idSelector) => {
    //     // If it's red light delay higher
    //     timer = $idSelector === $("red-light") ? 10 : 5;
    //
    // };



    $activateButton.click(() => {
        // Once activate is clicked give a feeling of resetting lights
        setTimeout(activateLights, 300);
        setTimeout(deactivateLights, 700);
        setTimeout(activateLights, 1100);
        setTimeout(deactivateLights, 1500);
        // Turn on the red light once resetting stops
        setTimeout(() => {addColor($redLight, colorRed)}, 2000);

        // Don't start timer until resetting finishes
        setTimeout(() => {
            timer = 10;

            let lightCounter = setInterval(() => {
                timer--;
                $('#red-counter').empty().append(timer);
                if (timer === 1) {
                    $('#green-counter').append("Go!");
                }
                if (timer === -1) {
                    removeColor($redLight, colorRed);
                    $('#red-counter').empty();
                    clearInterval(lightCounter);

                }
            }, 1000);
        }, 2200);

        // Red light amount = 10 * 1 + 2.2 = 12.2 + 100 for delay on purpose
        setTimeout(() => {
            timer = 10;

            let lightCounter = setInterval(() => {
                timer--;
                $('#red-counter').empty().append(timer);
                if (timer == -1) {
                    removeColor($redLight, colorRed);
                    $('#red-counter').empty();
                    clearInterval(lightCounter);

                }
            }, 1000);
        }, 12300);


        /*setTimeout(() => {

        }, 10000);*/
    });

    // Switch on or off manually by clicking on light
    $redLight.click(() => {
        addColor($redLight, colorRed);
        // Switch off other colors
        removeColor($yellowLight, colorYellow);
        removeColor($greenLight, colorGreen);
    });

    // Switch on or off manually by clicking on light
    $yellowLight.click(() => {
        addColor($yellowLight, colorYellow);
        // Switch off other colors
        removeColor($redLight, colorRed);
        removeColor($greenLight, colorGreen);
    });

    // Switch on or off manually by clicking on light
    $greenLight.click(() => {
        addColor($greenLight, colorGreen);
        // Switch off other colors
        removeColor($yellowLight, colorYellow);
        removeColor($redLight, colorRed);
    });
});

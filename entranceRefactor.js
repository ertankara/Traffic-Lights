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

    // Combined version of timeout and interval
    const mainAsync = (funcArray, timeout, intervalRepeatTimes, timeoutDiff=0, intervalTime=0) => {
        // If interval time is not set then set it with this logic
        // This will make sure that interval won't end, until inner timeouts are done running
        if (intervalTime === 0) {
            // One less than funcArray length because in the implementation of asyncFuncs() it starts with timeout
            // Then starts to add timeoutDiff if any value is present.
            intervalTime = timeout + (funcArray.length - 1) * timeoutDiff;
        }
        const interval = setInterval(() => {
            --intervalRepeatTimes;
            if (intervalRepeatTimes === 0)
                clearInterval(interval);
            asyncFuncs(funcArray, timeout, timeoutDiff);
        }, intervalTime);
    };



    // Set light timers
    const redOn = () => {
        let redTimer = 9;
        addColor($redLight, colorRed);
        let intervalTime = setInterval(() => {

        if (redTimer === 3) {
            mainAsync([() => {removeColor($redLight, colorRed)},
                () => {addColor($redLight, colorRed)}], 200, 3, 200);
        }

        if (redTimer === 0) {
            $redLight.empty();
            removeColor($redLight, colorRed);
            clearInterval(intervalTime);
        }
        --redTimer;
        }, 1000);
    };

    const yellowOn = () => {
        addColor($yellowLight, colorYellow);
        setTimeout(() => {
            removeColor($yellowLight, colorYellow);
        }, 2600);
    };



    const greenOn = () => {
        let greenTimer = 4;
        addColor($greenLight, colorGreen);
        let intervalTime = setInterval(() => {
        if (greenTimer === 3) {
            mainAsync([() => {removeColor($greenLight, colorGreen)},
                () => {addColor($greenLight, colorGreen)}], 200, 3, 200);
        }
        if (greenTimer === 0) {
            $greenLight.empty();
            removeColor($greenLight, colorGreen);
            clearInterval(intervalTime);
        }
        --greenTimer;

        }, 1000);
    };

    const workingLights = () => {
        // Deactivate lights after 100 times
        let callTimes = 100;
        let redDelay = 500;
        let yellowDelay = 9100;
        let greenDelay = 10500;
        let overAllDelay = 0;
        while (callTimes > 0) {
            setTimeout(redOn, redDelay + overAllDelay);
            setTimeout(yellowOn, yellowDelay + overAllDelay);
            setTimeout(greenOn, greenDelay +overAllDelay);
            overAllDelay += 15020;
            callTimes--;
        }
    };


    // Once the button is clicked call clickEvent()
    $activateButton.click(() => {
        $activateButton.hide();
        // Reset lights
        mainAsync([activateLights, deactivateLights], 400, 3, 400);
        setTimeout(workingLights, 3400);

    });
});

/**
 * Document ready run scripts
 */
$(document).ready(function() {
    var terminatorAnimationFlag = false;
    // Scroll Events
    $(document).on('scroll', function() {
        if ($('#terminator-visible-flag:visible').visible( true, true ) && !terminatorAnimationFlag) {
            terminatorAnimationFlag = true; // Stop repeat animations
            animateTerminatorImage();
            animateSkillBars();
        }
    });
});


/**
 * Draw a bar for the skills graph. Bars are composed of appended divs using intervals
 * and a gradual background color increase (red)
 * @param {string} id - HTML id of the bar's desired parent div
 * @param {int} length - Number of appended divs = length of entire bar
 */
function drawBar(id, length) {
    var red = 200;
    var div = $('#'+id);
    var counter = 0;
    var i = setInterval(function () {
        var html = "<div class='skill-bar' style='background-color: rgb(" + red + ",0,0);'></div>";
        div.append(html);
        counter++;
        red += 6;

        if (counter == length) {
            clearInterval(i);
        }
    }, 25);
}

/**
 * Animation for the text on the terminator image and the associated skill
 * bars dispalyed when visible in the viewport.
 */
function animateTerminatorImage() {
    // In pixels
    var defaultFontSize = 14;
    var defaultImgSize = 516;
    var defaultLineHeight = 13;

    // set text & lineheight sizes
    var img = document.getElementById('terminator-img');
    var width = parseInt(img.clientWidth);
    var percDec = Math.floor(((defaultImgSize - width) / width) * 100, 0);

    var fontSize = Math.round(defaultFontSize - (defaultFontSize * (percDec / 100)), 1);
    // smallest possible font size
    fontSize = (fontSize < 8) ? 8 : fontSize;
    var lineHeight = Math.round(defaultLineHeight - (defaultLineHeight * (percDec / 100)), 1);
    // smallest possible line height
    lineHeight = (lineHeight < 8) ? 8 : lineHeight;

    // "analysis" div styles & position
    $("#terminator-text1").css({
        'top': '15%',
        'left': '55%',
        'fontSize': fontSize + 'px',
        'lineHeight': lineHeight + 'px'
    });

    // Create "analysis" text string and type to div
    var str = "ANALYSIS<br>****************<br>\n\
                NAME: ERIC DAVIS<br>LOCATION:<br>\n\
                COLUMBUS<br>AGE: 28<br>SKILLS:<br>\n\
                DEVELOPMENT +<br>PC HARDWARE";
    var typer = $("#terminator-text1");
    typer.typer([str]);

    // "match" div styles & position
    $("#terminator-text2").css({
        'top': '75%',
        'left': '40%',
        'fontSize': Math.floor(fontSize * 2.2) + 'px',
        'lineHeight': lineHeight + 'px'
    });

    // Create "match..." text string and type to div
    setTimeout(function () {
        var str = "MATCH...<span id='blink' class='blink' style='position: absolute; font-size: 2.25rem;'>&#9646;</span>";
        var typer = $("#terminator-text2");
        typer.typer([str]);
    }, 1700);

    // Set blinking block interval for cursor block
    setTimeout(function () {
        $('.blink').each(function () {
            var element = $(this);
            setInterval(function () {
                if (element.css('visibility') == 'hidden') {
                    element.css('visibility', 'visible');
                } else {
                    element.css('visibility', 'hidden');
                }
            }, 750);
        });
    }, 2200);
}

/**
 * Animation function to type out skill name labels & draw bars for the
 * terminator skills graph content.
 * @param {Array} skillArr - Array of skill names (string)
 */
function animateSkillBars() {
    var skills = {
        'sql': 12,
        'html': 20,
        'css': 17,
        'vuejs': 14,
        'javascript': 15,
        'laravel': 18,
        'php': 18
    };

    $.each(skills, function(key, value) {
        var label = $("#" + key + "-label");
        label.typer([key]);
        setTimeout(function () {
            drawBar(key + "-bar", value);
        }, 500);
    });
}

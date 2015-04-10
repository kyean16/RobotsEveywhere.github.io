//TODO (maybe) (thanks peter ward) : 20% opacity sunshine thing behind gabe.
//TODO each click loads more images

$(function() {

    // We poll these variables while the wallet is being prepared
    var gabeReady = false;
    // also only care about the first time we load the steam iframe, or else we keep adding sales
    // every time we navigate to a new steam link.
    var iframeReady = false;
    var audioReady = false;

    // The carefully, lovingly determined percentages which his holiness removes from the prices of his products.
    var ROBOT_IMAGES = [1, 2, 3,4,5]

    // lolsorandom
    var randomChoice = function(list) {
            return list[Math.floor(Math.random()*list.length)]
    }

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    var setRobot = function(randomRobot){
        var robot ="";
        var x = document.getElementById("sale-box");
        if (randomRobot == 1)
        {
                robot = "url('static/img/bender.png')";
                x.style.height =119;
                x.style.width = 89;
        }
        else if (randomRobot == 2)
        {
                robot = "url('static/img/data.png')";
                x.style.height =157;
                x.style.width = 120;
        }
        else if (randomRobot == 3)
        {
                robot = "url('static/img/rd2d.png')";
                x.style.height =149;
                x.style.width = 149;
        }
             else if (randomRobot == 4)
        {
                robot = "url('static/img/ultron.png')";
                x.style.height =106;
                x.style.width = 230;
        }
             else if (randomRobot == 5)
        {
                robot = "url('static/img/terminator.png')";
                x.style.height =200;
                x.style.width = 356;
        }
        var x = document.getElementById("sale-box")
        x.style.backgroundImage = robot ;
    }

    var startRain = function () {
        console.log("ARE YOU READY FOR A MIRACLE?");

        var $saleBox = $('#sale-box');
        // How long in ms to wait until adding another sale box.
        var interval = 600;
        var numSales = 0;

        // Adds a bender at a random x position.
        var addSale = function() {
            // Get the width every time we add a sale to account for dynamic widths.
            // Thanks ocbaker on github for finding this bug.
            var pageWidth = $('body').width();
            var maxSales = 40;
            var xPos = getRandomInt(0, pageWidth);
            var randomRobot = randomChoice(ROBOT_IMAGES);
            setRobot(randomRobot);
            
            // Just copy the hidden box we had at page load time to make a new box.
            var newSale = $saleBox.clone().show();
            
            //newSale.text("-" + percentOff + "%"); // >js >strings

            newSale.css("left", xPos);
            $('body').append(newSale);

            //Only have maxSales sale boxes onscreen at once.
            if (numSales < maxSales) {
                // Add a new sale box later.
                window.setTimeout(addSale, interval);
                numSales++;
            }

        };

        // Set an interval to decrease the interval #inception
        window.setInterval(function() {
            interval = Math.max(10, interval - 10);
        }, 500);

        window.setTimeout(addSale, 2*1000);

    };

    var startGabe = function() {
        $('div.gag').show();
        $('div.gag').addClass('gag-animation');
    }


    var praiseBeToGaben = function () {
        $('div.prepare-gag').hide();
        startGabe();
        startRain();
        $audio.trigger('play');
        window.setTimeout(
                function() {
                    $('div.sunburst').fadeIn(4000);
                }
                , 8000)
    }


    //TODO: system requirements for these legit CSS animations
    var $steamFrame = $('iframe.steam')

    $steamFrame.load(function() {
        if (iframeReady) {
            return
        }
        iframeReady = true; //programming
    });

    $gabe = $('div.gag > img');
    //Even if we loaded from cache, praise be. Nothing can cache his holiness forever.
    if ($gabe[0].complete) {
        gabeReady = true;
    }
    else {
        $gabe.load(function () {
            gabeReady = true;
        });
    }

    $audio = $('audio');
    $audio.on('loadedmetadata', function() {
        audioReady = true;
    });
    $audio.on('ended', function() {
        this.currentTime = 0;
        this.play();
    });

    var prepareWallet = function() {
        if (gabeReady && iframeReady && audioReady) {
            $('.prepare-loader').css('max-height', $('.prepare-loader > img').height() / 3 + 'px');
            window.setTimeout(praiseBeToGaben, 1000);
        } else {
            window.setTimeout(prepareWallet, 100);
        }
    }

    prepareWallet();
});




$(function() {
  // Define global variables
  let endScrollHandle, forward, gradientDiffR, gradientDiffXY, imagesArray, lDiff, lDiffR, lDiffWinRatio, lDiffX, moonOrb, oldSLeft, oldSlidesTop, orbAnimateRatio, opacityDiff, slCanvas, slideNum, wHeight, wWidth, zInd;
  // These globals are for desktop/mobile canvas animation
  let waiting = false;
  let leftMoonSlide = true;
  const sun = $('#sun'); 
  const moon = $('#moon');
  const orbContainer = $('#layer0'); // contains Sun and Moon 
  const container = $('.layers'); // contains desktop/tablet content
  // Text for the website
  const contentArray = [
    '<p>Section one. Bacon ipsum dolor amet alcatra beef meatloaf brisket beef ribs meatball tenderloin shank ball tip ribeye pig pastrami filet mignon. Sirloin tail fatback venison shank salami. Picanha pastrami venison meatball kevin pork chop leberkas. Meatloaf tenderloin leberkas pancetta hamburger cow kielbasa, filet mignon tri-tip beef ribs.</p><p>Bacon ipsum dolor amet alcatra beef meatloaf brisket beef ribs meatball tenderloin shank ball tip ribeye pig pastrami filet mignon. Sirloin tail fatback venison shank salami. Picanha pastrami venison meatball kevin pork chop leberkas. Meatloaf tenderloin leberkas pancetta hamburger cow kielbasa, filet mignon tri-tip beef ribs.</p>',
    '<p>Section two. Bacon ipsum dolor amet alcatra beef meatloaf brisket beef ribs meatball tenderloin shank ball tip ribeye pig pastrami filet mignon. Sirloin tail fatback venison shank salami. Picanha pastrami venison meatball kevin pork chop leberkas. Meatloaf tenderloin leberkas pancetta hamburger cow kielbasa, filet mignon tri-tip beef ribs.</p><p>Bacon ipsum dolor amet alcatra beef meatloaf brisket beef ribs meatball tenderloin shank ball tip ribeye pig pastrami filet mignon. Sirloin tail fatback venison shank salami. Picanha pastrami venison meatball kevin pork chop leberkas. Meatloaf tenderloin leberkas pancetta hamburger cow kielbasa, filet mignon tri-tip beef ribs.</p>',
    '<p>Section three. Bacon ipsum dolor amet alcatra beef meatloaf brisket beef ribs meatball tenderloin shank ball tip ribeye pig pastrami filet mignon. Sirloin tail fatback venison shank salami. Picanha pastrami venison meatball kevin pork chop leberkas. Meatloaf tenderloin leberkas pancetta hamburger cow kielbasa, filet mignon tri-tip beef ribs.</p><p>Bacon ipsum dolor amet alcatra beef meatloaf brisket beef ribs meatball tenderloin shank ball tip ribeye pig pastrami filet mignon. Sirloin tail fatback venison shank salami. Picanha pastrami venison meatball kevin pork chop leberkas. Meatloaf tenderloin leberkas pancetta hamburger cow kielbasa, filet mignon tri-tip beef ribs.</p>',
    '<p>Section four. Bacon ipsum dolor amet alcatra beef meatloaf brisket beef ribs meatball tenderloin shank ball tip ribeye pig pastrami filet mignon. Sirloin tail fatback venison shank salami. Picanha pastrami venison meatball kevin pork chop leberkas. Meatloaf tenderloin leberkas pancetta hamburger cow kielbasa, filet mignon tri-tip beef ribs.</p><p>Bacon ipsum dolor amet alcatra beef meatloaf brisket beef ribs meatball tenderloin shank ball tip ribeye pig pastrami filet mignon. Sirloin tail fatback venison shank salami. Picanha pastrami venison meatball kevin pork chop leberkas. Meatloaf tenderloin leberkas pancetta hamburger cow kielbasa, filet mignon tri-tip beef ribs.</p>',
    '<p>Section five. Bacon ipsum dolor amet alcatra beef meatloaf brisket beef ribs meatball tenderloin shank ball tip ribeye pig pastrami filet mignon. Sirloin tail fatback venison shank salami. Picanha pastrami venison meatball kevin pork chop leberkas. Meatloaf tenderloin leberkas pancetta hamburger cow kielbasa, filet mignon tri-tip beef ribs.</p><p>Bacon ipsum dolor amet alcatra beef meatloaf brisket beef ribs meatball tenderloin shank ball tip ribeye pig pastrami filet mignon. Sirloin tail fatback venison shank salami. Picanha pastrami venison meatball kevin pork chop leberkas. Meatloaf tenderloin leberkas pancetta hamburger cow kielbasa, filet mignon tri-tip beef ribs.</p>',
    '<p>Section six. Bacon ipsum dolor amet alcatra beef meatloaf brisket beef ribs meatball tenderloin shank ball tip ribeye pig pastrami filet mignon. Sirloin tail fatback venison shank salami. Picanha pastrami venison meatball kevin pork chop leberkas. Meatloaf tenderloin leberkas pancetta hamburger cow kielbasa, filet mignon tri-tip beef ribs.</p><p>Bacon ipsum dolor amet alcatra beef meatloaf brisket beef ribs meatball tenderloin shank ball tip ribeye pig pastrami filet mignon. Sirloin tail fatback venison shank salami. Picanha pastrami venison meatball kevin pork chop leberkas. Meatloaf tenderloin leberkas pancetta hamburger cow kielbasa, filet mignon tri-tip beef ribs.</p>'
  ];
  // Set up text for mobile and desktop/tablet versions
  $('#mobile_group2 .text, #layer1 .layer_text').html(contentArray[0]);
  $('#layer1 .layer_text').append('<p><a class="nav-arrow" href="#layer2">=></a></p>');
  $('#mobile_group3 .text, #layer2 .layer_text').html(contentArray[1]);
  $('#layer2 .layer_text').append('<p><a class="nav-arrow" href="#layer3">=></a></p>');
  $('#mobile_group4 .text, #layer3 .layer_text').html(contentArray[2]);
  $('#layer3 .layer_text').append('<p><a class="nav-arrow" href="#layer4">=></a></p>');
  $('#mobile_group5 .text, #layer4 .layer_text').html(contentArray[3]);
  $('#layer4 .layer_text').append('<p><a class="nav-arrow" href="#layer5">=></a></p>');
  $('#mobile_group6 .text, #layer5 .layer_text').html(contentArray[4]);
  $('#layer5 .layer_text').append('<p><a class="nav-arrow" href="#layer6">=></a></p>');
  $('#mobile_group7 .text, #layer6 .layer_text').html(contentArray[5]);
  $('#layer6 .layer_text').append('<p><a class="nav-arrow" href="#layer1"><=</a></p>');
  // Canvas objects:
  const mobileSunObj = {
    id: 'mobile_sun',
    rgArray: [150, 150, 150, 150, 150, 100], // radial gradient params
    csArray: ['transparent', 'yellow'], // color stop params
    arc: 150 // arc dimensions
  };
  const sunObj = {
    id: 'sun',
    rgArray: [50, 50, 50, 50, 50, 100], // radial gradient params
    csArray: ['yellow', 'orange'], // color stop params
    arc: 50, // arc dimensions
    opacity: 1 // canvas opacity
  };
  const moonObj = {
    id: 'moon',
    rgArray: [50, 50, 50, 50, 50, 100], // radial gradient params
    csArray: ['transparent', 'white'], // color stop params
    arc: 50, // arc dimensions
    opacity: 0 // canvas opacity
  };
  function detectUA() { // Test for browser and device
    const ua  = navigator.userAgent.toLowerCase();
    let key =        ((ua.indexOf("opr")     > -1) ? "opera"   : null);
        key = key || ((ua.indexOf("edge")    > -1) ? "edge"    : null);
        key = key || ((ua.indexOf("firefox") > -1) ? "firefox" : null);
        key = key || ((ua.indexOf("chrome")  > -1) ? "chrome"  : null);
        key = key || ((ua.indexOf("safari")  > -1) ? "safari"  : null);
        key = key || ((ua.indexOf("msie")    > -1) ? "ie"      : null);
    let oskey =          ((ua.indexOf("macintosh") > -1) ? "mac"     : null);
        oskey = oskey || ((ua.indexOf("windows") > -1)   ? "windows" : null);
        oskey = oskey || "other";
    
    try {
      let re      = (key == "ie") ? "msie (\\d)" : key + "\\/(\\d\\.\\d)"
      let matches = ua.match(new RegExp(re, "i"));
      let version = matches ? parseFloat(matches[1]) : null;
    } catch (e) {}

    return {
      full:      ua, 
      name:      key + (version ? " " + version.toString() : ""),
      version:   version,
      isFirefox: (key == "firefox"),
      isChrome:  (key == "chrome"),
      isSafari:  (key == "safari"),
      isEdge:    (key == "edge"),
      isOpera:   (key == "opera"),
      isIE:      (key == "ie"),
      isMac:     (oskey == "mac"),
      isWindows: (oskey == "windows"),
      isOtherOS: (oskey == "other"), 
      hasCanvas: (document.createElement('canvas').getContext),
      hasAudio:  (typeof(Audio) != 'undefined'),
      hasTouch:  ('ontouchstart' in window)
    }
  }
  const ua = detectUA();
  const hasTouch = ua.hasTouch;
  const isSafari = ua.isSafari;
  const isEdge = ua.isEdge;
  const isOpera = ua.isOpera;
  const isFirefox = ua.isFirefox;
  const isChrome = ua.isChrome;
  const isWindows = ua.isWindows;
  // Map images to preload
  const imagesMap = new Map();
  imagesMap.set('mobile', ['mobile-bg1.png', 'mobile-bg2.png', 'mobile-bg4.png', 'mobile-bg6.png', 'mobile-bg7.png', 'birds.png']);
  imagesMap.set('desktop', ['bg1.png', 'bg2.png', 'stars3.jpg', 'bg3.png', 'stars4.jpg', 'bg4.png', 'bg5.png', 'bg6.png', 'birds.png']);
  // Canvas orb generator
  const canvasOrb = o => {
    const orb = document.getElementById(o.id);
    const orbContext = orb.getContext('2d');
    return {
      draw: () => {
        if (o.rgArray[2] < 0) o.rgArray[2] = 0; // start radius should never be less than zero
        if (o.rgArray[5] < 0) o.rgArray[5] = 0; // end radius should never be less than zero
        const orbGradient = orbContext.createRadialGradient(...o.rgArray);
        orbGradient.addColorStop(0, o.csArray[0]);
        orbGradient.addColorStop(1, o.csArray[1]);
        orbContext.fillStyle = orbGradient;
        orbContext.beginPath();
        orbContext.arc(o.arc, o.arc, o.arc, 0, 2*Math.PI);
        orbContext.fill();
      }
    }
  };
  window.addEventListener('resize', () => { onWindowResize() }); // Handle browser resizing
  // Any time the browser is resized, redraw canvas, preload images, create canvas objects and define variables based on mobile v. desktop dimensions
  const onWindowResize = () => {
    wHeight = $(window).height();
    wWidth = $(window).width();
    // If Mobile
    if (hasTouch || wWidth < 768) {
      imagesArray = imagesMap.get('mobile');
      // Draw mobile Sun
      const mobileSunOrb = canvasOrb(mobileSunObj);
      mobileSunOrb.draw();
      if (hasTouch) { // Tablets don't like horizontal parallax :(
        $('.layers').hide();
        $('.mobile_layers').show();
      }
    // If Desktop/Tablet
    } else {
      orbAnimateRatio = parseFloat(wHeight / (wWidth * 2)).toFixed(2); // defines top/left animation offset
      $('.layer_bird_fore img').width(wWidth * 0.5); // resize birds
      $('.layer_bird_back img').width(wWidth * 0.25);
      $('.layer_bird_deep img').width(wWidth * 0.1);
      imagesArray = imagesMap.get('desktop');
      // Draw desktop Sun
      sunOrb = canvasOrb(sunObj);
      sunOrb.draw();
      // Draw desktop Moon
      moonOrb = canvasOrb(moonObj);
      moonOrb.draw();
      if (isFirefox) container.scrollLeft(0); // Firefox fix
      // Handle anchor navigation
      $('a').click(function() {
        let target = $($.attr(this, 'href'));
        let scrollTimer = 5000;
        if ((isWindows && isOpera) || (isWindows && isChrome)) { scrollTimer = 100; }
        container.animate({
            scrollLeft: container.scrollLeft() + target.offset().left
        }, scrollTimer);
        return false;
      });
    } 
    for (let image of imagesArray) { let img = new Image(); img.src = 'images/' + image; } // Preload images
  };
  onWindowResize(); // Call immediately to define on load

  // All logic below pertains to the canvas objects (animation and tinting/opacity) for desktop/tablet version only
  let sLeft = container.scrollLeft(); // Default left position of canvas container
  let slidesTop = parseFloat(sun.css('top')); // Default top position of canvas container
  // As user scrolls, use timeout functions to make canvas render as smoothly as possible
  container.scroll(() => {
      oldSLeft = sLeft;
      if (waiting) return;
      waiting = true;
      clearTimeout(endScrollHandle); // clear previous scheduled endScrollHandle
      sLeft = container.scrollLeft();
      scroll(oldSLeft, sLeft); // Scroll logic below
      setTimeout(() => {
          waiting = false;
      }, 10);
      // schedule an extra execution of scroll() after 20ms
      // in case the scrolling stops in next 10ms
      endScrollHandle = setTimeout(() => {
          scroll(oldSLeft, sLeft);
      }, 20);
  });
  // Set canvas variables for different slides
  const scrollVariableSetter = (cMult, diffR, diffXY, oMult, xyDiff = 1) => {
    slCanvas = wWidth * cMult;
    gradientDiffR = diffR;
    gradientDiffXY = diffXY;
    lDiffWinRatio = lDiff / slCanvas;
    lDiffR = gradientDiffR * lDiffWinRatio;
    opacityDiff = oMult * lDiffWinRatio;
    lDiffXY = gradientDiffXY * lDiffWinRatio * xyDiff;
  };
  // Logic for canvas objects as user scrolls
  const scroll = (prevLeft, newLeft) => {
    // Determine which slide user is on and set the z-index on the canvas container
    slideNum = parseInt(newLeft / wWidth).toFixed(0);
    slideNum++;
    zInd = slideNum * 10 + 1;
    orbContainer.css('z-index', zInd);
    oldSlidesTop = slidesTop; // Compare old top position to new for animation
    // Determine direction moving based on change to container scroll
    lDiff = newLeft - prevLeft;
    lDiff >= 0 ? forward = true : forward = false;

    // Starting position (reset the sun)
    if (newLeft === 0) {
      sunObj.rgArray[1] = sunObj.rgArray[2] = sunObj.rgArray[4] = 50;
      sun.css({ 'top': '0px', 'left': '0px' });
      slidesTop = newLeft = 0;

    // Midday to sunset (slides 1 & 2)
    } else if (slideNum < 3) {
      orbContainer.css('z-index', 11); // overwrite z-index
      sun.show();
      moon.hide();
      scrollVariableSetter(2, 50, 50, 100);
      if (forward) { // Sun goes down
        sunObj.opacity += opacityDiff;
        if (sunObj.rgArray[2] < 1) {
          sunObj.rgArray[1] = sunObj.rgArray[4] = 100;
          sunObj.rgArray[2] = 0;
          lDiffR = 0;
        }
      } else { // Sun comes up
        sunObj.opacity -= opacityDiff;
        if (sunObj.rgArray[2] > 49) {
          sunObj.rgArray[1] = sunObj.rgArray[2] = sunObj.rgArray[4] = 50;
          lDiffR = 0;
        }
      }
      sunObj.rgArray[1] = sunObj.rgArray[4] += lDiffXY;
      sunObj.rgArray[2] -= lDiffR;
      slidesTop = oldSlidesTop + (lDiff * (orbAnimateRatio / 4));
      // Safari handling
      isSafari || isEdge ? sun.css({ 'left': newLeft / 15, 'top': slidesTop * 2, 'opacity': sunObj.opacity * 2 }) : sun.css({ 'left': newLeft, 'top': slidesTop, 'opacity': sunObj.opacity });
      sunOrb.draw();
      // Reset Moon and hide
      moonObj.rgArray[0] = moonObj.rgArray[2] = moonObj.rgArray[3] = 50;
      moonObj.opacity = 0;
      moon.css({ 'left': wWidth + 'px' });
      moonOrb.draw();

    // Night (slides 3 & 4)
    } else if (slideNum < 5) {
      orbContainer.css('z-index', 41); // overwrite z-index
      moon.show();
      sun.hide();
      scrollVariableSetter(1, 50, 150, 1);
      moonObj.rgArray[0] = moonObj.rgArray[3] -= lDiffXY;
      if (forward) { // moving forward, Moon waxes, is full, then wanes
        if (moonObj.rgArray[2] < 2 && leftMoonSlide) {
          moonObj.rgArray[0] = moonObj.rgArray[3] = 200;
          moonObj.rgArray[2] = 2;
          leftMoonSlide = false; // once Moon is full, move from waxing to waning
        }
        if (!leftMoonSlide && moonObj.rgArray[2] > 50) {
          moonObj.rgArray[0] = moonObj.rgArray[2] = moonObj.rgArray[3] = 50;
          lDiffR = 0;
        }
      } else { // moving backwards, Moon wanes, is full, then waxes
        opacityDiff *= 1.5;
        lDiffR *= 0.8;
        if (moonObj.rgArray[2] < 2 && !leftMoonSlide) {
          moonObj.rgArray[0] = moonObj.rgArray[3] = -100;
          moonObj.rgArray[2] = 2;
          leftMoonSlide = true; // once Moon is full, move from waning to waxing
        }
        if (leftMoonSlide && moonObj.rgArray[2] > 50) {
          moonObj.rgArray[0] = moonObj.rgArray[2] = moonObj.rgArray[3] = 50;
          lDiffR = 0;
        }
      } 
      if (leftMoonSlide) { // waxing Moon
        moonObj.opacity += opacityDiff;
        moonObj.rgArray[2] -= lDiffR;
        sunObj.rgArray[1] = sunObj.rgArray[4] = 100; // reset Sun for set
      } else { // waning Moon
        moonObj.opacity -= opacityDiff;
        moonObj.rgArray[2] += lDiffR;
        sunObj.rgArray[1] = sunObj.rgArray[4] = 0; // reset Sun for rise
      }
      moonOrb.draw();
      moon.css({ 'left': newLeft - wWidth / 2.1, 'opacity': moonObj.opacity });
      // Safari handling
      isSafari || isEdge ? moon.css({ 'left': (newLeft / 15) - (wWidth / 2.1), 'opacity': moonObj.opacity * 1 }) : moon.css({ 'left': newLeft - wWidth / 2.1, 'opacity': moonObj.opacity });
      // Keep the sun hidden at night
      sunObj.rgArray[2] = 0;
      sunObj.opacity = 0;

    // Dawn to midday (slides 5 & 6)
    } else {
      sun.show();
      moon.hide();
      scrollVariableSetter(2, 50, 50, 2, 2);
      if (forward) { // Sun goes up
        if (sunObj.rgArray[2] > 49) sunObj.rgArray[1] = sunObj.rgArray[2] = sunObj.rgArray[4] = 50; 
      } else { // Sun goes down
        if (sunObj.rgArray[2] < 1) {
          sunObj.rgArray[1] = sunObj.rgArray[2] = sunObj.rgArray[4] = 0; 
          sun.hide(); 
        }
      }
      sunObj.opacity > 1 ? sunObj.opacity = 1 : sunObj.opacity += opacityDiff; // Opacity should never exceed "1"
      slidesTop < 0 ? slidesTop = 0 : slidesTop = oldSlidesTop - (lDiff * (orbAnimateRatio / 2)); // Sun should stay visible in browser
      slidesTop === 0 ? (
        sunObj.rgArray[1] = sunObj.rgArray[2] = sunObj.rgArray[4] = 50
      ) : (
        sunObj.rgArray[1] = sunObj.rgArray[4] += lDiffXY, 
        sunObj.rgArray[2] += lDiffR 
      );
      // Safari handling
      isSafari || isEdge ? sun.css({ 'left': newLeft / 15, 'top': slidesTop * 2, 'opacity': sunObj.opacity * 2 }) : sun.css({ 'left': newLeft, 'top': slidesTop, 'opacity': sunObj.opacity });
      if (newLeft > wWidth * 5 - wWidth / 3) orbContainer.css('z-index', 61); // Change z-index as sun comes up from behind mountains
      sunOrb.draw();
    }
  };
});
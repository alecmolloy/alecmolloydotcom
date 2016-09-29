var midnight = 1446336000 - (80 * 60 );

function timeDelta() {
    return (Date.now()/1000) - midnight;
}

var h, s, b;
function whatColor() {
    var time = timeDelta();
    h = (time * 20) % 255;
    s = 100;
    b = Math.min(time / 36 / 2, 50);

    return 'hsl(' + h + ',' + s + '%,' + b + '%)';
}

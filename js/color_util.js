// HSV to RGB
export function hsv2rgb(Hdeg, S, V) {
    var R, G, B, var_r, var_g, var_b;
    var H = Hdeg / 360; // convert from degrees to 0 to 1
    if (S === 0) { // HSV values = From 0 to 1
        R = V * 255; // RGB results = From 0 to 255
        G = V * 255;
        B = V * 255;
    } else {
        var var_h = H * 6;
        var var_i = Math.floor(var_h); //Or ... var_i = floor( var_h )
        var var_1 = V * (1 - S);
        var var_2 = V * (1 - S * (var_h - var_i));
        var var_3 = V * (1 - S * (1 - (var_h - var_i)));
        if (var_i === 0) {
            var_r = V;
            var_g = var_3;
            var_b = var_1;
        } else if (var_i == 1) {
            var_r = var_2;
            var_g = V;
            var_b = var_1;
        } else if (var_i == 2) {
            var_r = var_1;
            var_g = V;
            var_b = var_3;
        } else if (var_i == 3) {
            var_r = var_1;
            var_g = var_2;
            var_b = V;
        } else if (var_i == 4) {
            var_r = var_3;
            var_g = var_1;
            var_b = V;
        } else {
            var_r = V;
            var_g = var_1;
            var_b = var_2;
        }
        R = Math.round(var_r * 255); //RGB results = From 0 to 255
        G = Math.round(var_g * 255);
        B = Math.round(var_b * 255);
    }
    return [R, G, B];
}

// RGB to HSL
export function rgbToHsl(rgbArr) {
    var r1 = rgbArr[0] / 255;
    var g1 = rgbArr[1] / 255;
    var b1 = rgbArr[2] / 255;
    var maxColor = Math.max(r1, g1, b1);
    var minColor = Math.min(r1, g1, b1);
    //Calculate L:
    var L = (maxColor + minColor) / 2;
    var S = 0;
    var H = 0;
    if (maxColor != minColor) {
        //Calculate S:
        if (L < 0.5) {
            S = (maxColor - minColor) / (maxColor + minColor);
        } else {
            S = (maxColor - minColor) / (2.0 - maxColor - minColor);
        }
        //Calculate H:
        if (r1 == maxColor) {
            H = (g1 - b1) / (maxColor - minColor);
        } else if (g1 == maxColor) {
            H = 2.0 + (b1 - r1) / (maxColor - minColor);
        } else {
            H = 4.0 + (r1 - g1) / (maxColor - minColor);
        }
    }
    L = L * 100;
    S = S * 100;
    H = H * 60;
    if (H < 0) {
        H += 360;
    }
    return [Math.round(H), Math.round(S), Math.round(L)];
}




export function hslToRgb(h, s, l) {
    let r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function hueToRgb(hue) {
    const h = hue / 360;
    const s = 1;
    const l = 0.5;

    const rgb = hslToRgb(h, s, l);
    return rgb;
}

export function hexToHue(hex) {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb);
    return hsl[0]; // Return the hue value
}

export function hexToRgb(hex) {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');

    // Parse the r, g, b values
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return [r, g, b];
}

// Helper function to convert RGB to Hex
export function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}



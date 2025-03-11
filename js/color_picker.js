import { hsv2rgb, rgbToHsl, hexToHue, hslToRgb, hueToRgb, rgbToHex, hexToRgb } from './color_util.js';

export class Color_picker {
    constructor(containerId, colorInit, onCancel, onOk) {
        this.sw;
        this.canvas_width_height = 160;
        this.canvasX = 0;
        this.canvasY = 0;
        this.canvasXTemp = 0;
        this.canvasYTemp = 0;
        this.hue = hexToHue(colorInit);
        this.alpha = 0;
        this.R = 0;
        this.G = 0;
        this.B = 0;
        this.RGB = '';
        this.RGBA = '';
        this.HSL = '';
        this.HSLA = '';
        this.HEX = '';
        this.rgbString = '';
        this.rgbStringTemp = '';
        this.rgbaString = '';
        this.hslString = '';


        this.x_temp = 0;
        this.y_temp = 0;

        this.x_offset = 0;
        this.y_offset = 0;

        this.selected = false; // Track the selected element for dragging
        this.defaults = { left: 0, top: 0 }; // Default offsets for positioning
        this.x_pos = 340; // Mouse X position
        this.y_pos = 350; // Mouse Y position
        this.x_elem = 0; // Element X offset
        this.y_elem = 0; // Element Y offset


        this.onCancel = onCancel;
        this.onOk = onOk;

        // Initialize canvasImage
        this.canvasImage = new Image();
        this.canvasImage.src = 'images/pickpng.png';
        this.canvasImage.onload = () => {
            // Ensure the image is loaded before drawing
            this.drawCanvasInit();
        };

        // Create and append elements
        this.colorPicker = document.createElement('DIV');
        this.colorPicker.className = "cpd_colorPickerpicker";



        this.pc = document.createElement('DIV');
        this.pc.id = "cpd_pcpicker";


        this.topElsCon = document.createElement('DIV');
        this.topElsCon.id = "cpd_topElsCon";
        //////////////////////////

        this.preview = document.createElement('DIV');
        this.preview.id = "cpd_previewpicker";
        this.preview.className = "cpd_topEls";

        //////////////////////////

        this.picked = document.createElement('DIV');
        this.picked.id = "cpd_pickedpicker";
        this.picked.className = "cpd_topEls";
        //////////////////////////

        this.buttonCon = document.createElement('DIV');
        this.buttonCon.id = "cpd_buttonCon";

        this.colorOptions = document.createElement('input');
        this.colorOptions.type = "color";
        this.colorOptions.id = "cpd_colorOptions";
        this.colorOptions.className = "cpd_topEls";
        this.colorOptions.addEventListener('input', this.updateColorFromPicker.bind(this));
        this.colorOptions.addEventListener('click', this.handleColorOptionsClick.bind(this));

        this.okButton = document.createElement('INPUT');
        this.okButton.id = "cpd_okButton";
        this.okButton.type = "button";
        this.okButton.value = "OK";
        this.okButton.className = "cpd_topEls";

        this.okButton.addEventListener('click', () => {
            console.log('Ok Button');
            this.getColor();
            this.onCancel();
        });


        //////////////////////////

        this.cancelButton = document.createElement('INPUT');
        this.cancelButton.id = "cpd_closeButton";
        this.cancelButton.type = "button";
        this.cancelButton.value = "Cancel";
        this.cancelButton.className = "cpd_topEls";

        this.cancelButton.addEventListener('click', () => {
            console.log('Cancel Button');
            this.onCancel();
        });

        //////////////////////////

        this.wrapperOfTwo = document.createElement('DIV');
        this.wrapperOfTwo.id = "cpd_wrapperOfTwo";

        this.topElsCon.appendChild(this.preview);
        this.topElsCon.appendChild(this.picked);
        this.topElsCon.appendChild(this.colorOptions);
        this.wrapperOfTwo.appendChild(this.topElsCon);

        this.buttonCon.appendChild(this.okButton)
        this.buttonCon.appendChild(this.cancelButton);
        this.wrapperOfTwo.appendChild(this.buttonCon);
        //this.pc.appendChild(this.wrapperOfTwo);
        this.colorPicker.appendChild(this.wrapperOfTwo);
        //////////////////////////

        this.s1 = document.createElement('DIV');
        this.s1.id = "cpd_s1picker";

        this.rangeInput = document.createElement('INPUT');
        this.rangeInput.id = 'cpd_slider1picker';
        this.rangeInput.type = "range";
        this.rangeInput.value = this.hue;
        this.rangeInput.min = 0;
        this.rangeInput.max = 360;
        this.rangeInput.addEventListener('input', this.updateHue.bind(this));

        this.s1.appendChild(this.rangeInput);
        this.colorPicker.appendChild(this.s1);
        //////////////////////////

        this.incon = document.createElement('DIV');

        this.canvas = document.createElement('CANVAS');
        this.canvas.className = "cpd_c3picker";
        this.canvas.id = "cpd_pickerpicker";
        this.canvas.width = this.canvas_width_height;
        this.canvas.height = this.canvas_width_height;

        this.ctx = this.canvas.getContext('2d');
        //////////////////////////

        this.controls = document.createElement('DIV');
        this.controls.id = "cpd_contpicker";

        //////////////////////////

        this.controls.appendChild(this.canvas);
        this.incon.appendChild(this.controls);
        this.colorPicker.appendChild(this.incon);

        const clist = ["R", "G", "B", "RGB", "HSL", "HEX"];
        const con = document.createElement('DIV');
        con.id = "cpd_stats_div";
        for (let i = 0; i < clist.length; i++) {


            const lable = document.createElement('LABEL');
            lable.className = "cpd_lbpicker";
            lable.style.float = "left";
            lable.style.color = "#000000";

            const input = document.createElement('INPUT');
            input.className = "cpd_inppicker";
            input.id = clist[i].toLowerCase() + "Val";
            input.type = "text";
            input.onclick = function () {
                this.setSelectionRange(0, this.value.length);
            };

            input.style.backgroundColor = "#121212";
            //input.style.border = "1px solid lightgray";
            input.style.color = "#DDDDDD";
            input.style.float = "right";

            input.style.marginLeft = "1px";
            input.style.textTransform = "uppercase";
            input.style.width = "50%";
            input.style.minWidth = "100px";

            const tn = document.createTextNode(clist[i]);

            lable.appendChild(tn);

            const divc = document.createElement('div');
            divc.className = "cpd_divcpicker";
            divc.appendChild(lable);
            divc.appendChild(input);
            con.appendChild(divc);
            this.controls.appendChild(con);
        }

        // Append to container
        const container = document.getElementById(containerId);
        if (container) {
            container.appendChild(this.colorPicker);
        } else {
            console.error(`Element with ID '${containerId}' not found.`);
        }

        // Initialize
        this.canvas.addEventListener('mousemove', this.moveCanvas.bind(this));
        this.canvas.addEventListener('click', this.clickCanvas.bind(this));


        this.updateVarText(hueToRgb(this.hue));
        this.updatext();
        this.updatepreviw();
        this.updatepicked();
        this.updatePicker(this.hue);
        this.updateColorOptions();
    }

    getColor() {
        const elements = document.getElementById('Containerback');
        const color = this.rgbStringTemp;

        elements.style.setProperty('--c2', color); // Change to any color you want
        //console.log('Color:', this.rgbStringTemp);
    }

    moveCanvas(e) {
        if (e.target.nodeName === "CANVAS") {
            const canvasOffset = this.canvas.getBoundingClientRect();

            // Calculate scaling factors
            const scaleX = this.canvas.width / this.canvas.clientWidth;
            const scaleY = this.canvas.height / this.canvas.clientHeight;

            // Scale the mouse coordinates
            this.canvasXTemp = Math.floor((e.pageX - canvasOffset.left) * scaleX);
            this.canvasYTemp = Math.floor((e.pageY - canvasOffset.top) * scaleY);

            this.greyMoved(this.canvasXTemp, this.canvasYTemp, this.hue, this.alpha);

            if (e.which === 1) {
                this.canvasX = this.canvasXTemp;
                this.canvasY = this.canvasYTemp;
                this.updateBody();
                this.updatext();
                this.updatepreviw();

                //this.clearCanvas();
                //this.drawCanvas(this.canvasX, this.canvasY, 10);
            }
        }
    }

    clickCanvas(e) {
        if (e.target.nodeName === "CANVAS") {
            const canvasOffset = this.canvas.getBoundingClientRect();

            // Calculate scaling factors
            const scaleX = this.canvas.width / this.canvas.clientWidth;
            const scaleY = this.canvas.height / this.canvas.clientHeight;

            // Scale the mouse coordinates
            this.canvasX = Math.floor((e.pageX - canvasOffset.left) * scaleX);
            this.canvasY = Math.floor((e.pageY - canvasOffset.top) * scaleY);

            this.greyMoved(this.canvasX, this.canvasY, this.hue, this.alpha);
            this.updatepicked();
            this.updateColorOptions();
            this.updateBody();
            this.updatext();
            this.clearCanvas();
            this.drawCanvas(this.canvasX, this.canvasY, 10);
        }
    }


    updatePopup() {
        const top = "10px";
        const left = (window.innerWidth - this.popupContent.offsetWidth) / 2;
        this.popupContent.style.top = top;
        this.popupContent.style.left = left + 'px';
    }

    greyMoved(x, y, hue, alpha) {
        const sw = this.canvas.width;
        const xside = x <= sw ? x : sw;
        const yside = y <= sw ? y : sw;
        const sat = xside / sw;
        const val = 1 - yside / sw;
        this.updateVarText(hsv2rgb(hue, sat, val), alpha, x, y, hue);
        return false;
    }

    updateVarText(rgbarray, alpha, x, y, hue) {
        this.R = Math.round(rgbarray[0]);
        this.G = Math.round(rgbarray[1]);
        this.B = Math.round(rgbarray[2]);
        this.RGB = `${this.R},${this.G},${this.B}`;
        this.HSL = rgbToHsl([this.R, this.G, this.B]);
        const dColor = this.B + 256 * this.G + 65536 * this.B;
        this.HEX = `#${('0000' + dColor.toString(16)).substr(-6)}`;
        this.rgbString = `rgb(${this.RGB})`;
        this.rgbStringTemp = this.rgbString;
        this.rgbaString = `rgba(${this.RGBA})`;
    }


    updatePicker(hue) {
        //console.log('updatePicker, hue: ' + hue);
        this.canvas.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    }

    updatepreviw() {
        this.preview.style.backgroundColor = this.rgbStringTemp;
        //console.log('updatepreviw, rgbStringTemp: ' + this.rgbStringTemp);
    }

    updatepicked() {
        this.picked.style.backgroundColor = this.rgbStringTemp;
        //console.log('updatepicked, rgbStringTemp: ' + this.rgbStringTemp);
    }

    updateColorOptions() {
        //console.log('updateColorOptions, rgbStringTemp: ' + this.rgbStringTemp);
        this.colorOptions.value = rgbToHex(this.R, this.G, this.B);
    }


    updateBody() {
        document.querySelectorAll('p').forEach(p => {
            p.style.backgroundColor = this.rgbaString;
        });
    }

    updateColorFromPicker(event) {
        const hexColor = event.target.value;
        const hue = hexToHue(hexColor);
        this.hue = hue;
        //console.log('updateColorFromPicker, hue: ' + hue);
        this.rangeInput.value = hue;
        this.updateVarText(hexToRgb(hexColor));
        this.updatext();
        this.updatepreviw();
        this.updatepicked();
        this.updatePicker(this.hue);
        this.updateColorOptions();
    }

    handleColorOptionsClick(event) {
        //console.log('Color options clicked:', event.target.value);
        this.clearCanvas();
    }

    drawCanvasInit() {
        const scaleX = this.canvas.width / this.canvas.clientWidth;
        const scaleY = this.canvas.height / this.canvas.clientHeight;
        this.ctx.closePath();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.drawImage(this.canvasImage, 0, 0, this.canvas.width, this.canvas.height);
    }


    drawCanvas(x, y, cross) {
        const scaleX = this.canvas.width / this.canvas.clientWidth;
        const scaleY = this.canvas.height / this.canvas.clientHeight;

        const scaledX = x * scaleX;
        const scaledY = y * scaleY;

        this.ctx.closePath();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.drawImage(this.canvasImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.moveTo(scaledX + cross, scaledY);
        this.ctx.lineTo(scaledX - cross, scaledY);
        this.ctx.moveTo(scaledX, scaledY + cross);
        this.ctx.lineTo(scaledX, scaledY - cross);
        this.ctx.lineWidth = cross / 5;
        this.ctx.stroke();
    }

    clearCanvas() {
        this.ctx.closePath();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.drawImage(this.canvasImage, 0, 0, this.canvas.width, this.canvas.height);
    }

    updatext() {
        document.getElementById('rVal').value = this.R;
        document.getElementById('gVal').value = this.G;
        document.getElementById('bVal').value = this.B;
        document.getElementById('rgbVal').value = this.RGB;
        document.getElementById('hslVal').value = this.HSL;
        document.getElementById('hexVal').value = this.HEX;
    }

    canScale(x) {
        const sw = this.canvas.height;
        const sww = sw / 288;
        return x / sww;
    }

    updateHue(event) {
        this.hue = event.target.value;
        this.greyMoved(this.canvasX, this.canvasY, this.hue, this.alpha);
        this.updatePicker(this.hue);
        this.updatepreviw();
        this.updatext();
    }

    updateAlpha(event) {
        this.alpha = event.target.value;
        this.greyMoved(this.canvasX, this.canvasY, this.hue, this.alpha);
        this.updatepicked();
        this.updatext();
    }



}

export function createColorPickerDialog(containerId, location = { top: '50%', left: '50%' }, in_color = '#000000') {
    const uniqueId = new Date().getTime();
    const div = document.createElement('div');
    div.className = 'dialog-box';
    div.id = 'dialog-box-' + uniqueId;

    // Create dialog header
    const dialogHeader = document.createElement('div');
    dialogHeader.className = 'dialog-header';

    // Create dialog title
    const dialogTitle = document.createElement('h3');
    dialogTitle.className = 'dialog-title';
    dialogTitle.textContent = 'Color Picker dialog';

    // Create close button
    const dialogClose = document.createElement('a');
    dialogClose.href = '#';
    dialogClose.className = 'dialog-close';
    dialogClose.title = 'Close';
    dialogClose.innerHTML = '&times;';

    // Append title and close button to header
    dialogHeader.appendChild(dialogTitle);
    dialogHeader.appendChild(dialogClose);

    // Create dialog content
    const dialogContent = document.createElement('div');
    dialogContent.className = 'dialog-content';

    // Append header and content to dialog
    div.appendChild(dialogHeader);
    div.appendChild(dialogContent);

    // Append dialog to the specified container
    const container = document.getElementById(containerId);
    container.appendChild(div);

    const dialog = document.getElementById('dialog-box-' + uniqueId);
    const CP_Container = document.createElement('div');
    CP_Container.id = 'CP_Container';
    dialogContent.appendChild(CP_Container);

    // Set default size
    dialog.style.width = '380px';
    dialog.style.height = 'auto';

    // Position the dialog
    dialog.style.position = 'absolute';

    // Get the dimensions of the dialog and the window
    const dialogRect = dialog.getBoundingClientRect();

    let desiredLeft = parseInt(location.top);
    let desiredTop = parseInt(location.left);

     // Ensure the dialog stays within the window boundaries
    const { left, top } = ensureWithinBounds(desiredLeft, desiredTop, dialogRect);

    dialog.style.top = `${left}px`;
    dialog.style.left = `${top}px`;
    //dialog.style.transform = 'translate(-50%, -50%)';

    const color_picker = new Color_picker('CP_Container', in_color, () => {
        container.removeChild(dialog);
        return null;
    }, (color) => {
        container.removeChild(dialog);
        return color;
    });

    dialogClose.addEventListener('click', (e) => {
        e.preventDefault();
        container.removeChild(dialog);
        return null;
    });

    // Make the dialog draggable
    let isDragging = false;
    let initialX, initialY;
    let startPosX, startPosY;

    dialogHeader.addEventListener('mousedown', (e) => {
        e.preventDefault();

        isDragging = true;

        // Store the initial mouse position
        initialX = e.clientX;
        initialY = e.clientY;

        // Store the initial dialog position
        const computedStyle = window.getComputedStyle(dialog);
        startPosX = parseInt(computedStyle.left, 10);
        startPosY = parseInt(computedStyle.top, 10);

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;

        // Calculate the new position based on mouse movement
        const dx = e.clientX - initialX;
        const dy = e.clientY - initialY;

        // Calculate the desired position
        let desiredLeft = startPosX + dx;
        let desiredTop = startPosY + dy;


        // Ensure the dialog stays within the window boundaries
        const { left, top } = ensureWithinBounds(desiredLeft, desiredTop, dialogRect);

        // Apply the new position
        dialog.style.left = `${left}px`;
        dialog.style.top = `${top}px`;
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    function ensureWithinBounds(x, y, dialogRect) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Calculate the maximum allowed positions
        const maxX = windowWidth - dialogRect.width;
        const maxY = windowHeight - dialogRect.height;

        // Clamp the positions to stay within bounds
        const clampedX = Math.max(0, Math.min(x, maxX));
        const clampedY = Math.max(0, Math.min(y, maxY));

        return { left: clampedX, top: clampedY };
    }
}
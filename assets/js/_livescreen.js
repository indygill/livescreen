class LiveScreen {
    /**
     * Class constructor
     * 
     * @param {string} device id of html element to bind to, with class of .marvel-device
     */
    constructor(device) {
        this.device = document.getElementById(device);
        if (!this.isMarvelDevice()) {
            return console.error('ID passed is not a valid marvel-device');
        }
        this.dateTime = new Date();
        this.assignScreenElements();
    }

    /**
     * Checks to see if the this.device has a class of .marvel-device
     * 
     * @returns {boolean} true if this.device has class of .marvel-device, false if it doesn't, or if this.device == null
     */
    isMarvelDevice() {
        if ( this.device == null) {
            return false;
        }
        return this.device.classList.contains('marvel-device');
    }

    /**
     * Searches the children of this.device for the first matching element
     * 
     * @param {string} ele html attribute to search for
     * @returns {mixed} first html element if found, or null
     */
    findElement(ele) {
        return this.device.querySelector(ele);
    }

    /**
     * Assigns html elements to internal properties
     */
    assignScreenElements() {
        this.carrierEle = this.findElement('.carrier');
        this.timeEle = this.findElement('.time');
        this.dateEle = this.findElement('.date');
    }

    /**
     * Uses innerText to add text to the carrier element
     * 
     * @param {string} label text to enter into the carrier element
     */
    carrier(label) {
        try {
            this.carrierEle.innerText = label;
        } catch(e) {
            if (this.isMarvelDevice()) {
                return console.error('Carrier element not found. Ensure <li class="carrier"></li> exists in your markup');
            }
        }
    }

    time(time = false) {
        try {
            if (time != false) {
                this.timeEle.innerText = time;
            } else {
                this.updateTime();
                setInterval(this.updateTime.bind(this), 1000);
            }
        } catch(e) {
            if (this.isMarvelDevice()) {
                console.error('Time element not found. Ensure <div class="time"></div> exists in your markup');
            }
        }
        
    }

    updateTime() {
        let hours = ('0' + this.dateTime.getHours()).slice(-2),
            mins = ('0' + this.dateTime.getMinutes()).slice(-2);
        let value = hours + ':' + mins;
        if (this.timeEle.innerText != value) {
            this.timeEle.innerText = value;
        }
    }

    date(date = false) {
        try {
            if (date != false) {
                this.dateEle.innerText = date;
            } else {
                this.updateDate();
                setInterval(this.updateDate.bind(this), 1000);
            }
        } catch(e) {
            if (this.isMarvelDevice()) {
                console.error('Date element not found. Ensure <div class="dtae"></div> exists in your markup');
            }
        }
        
    }

    updateDate() {
        const days = ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday'];
        const months = ['January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December'];
        let day = days[this.dateTime.getMonth()],
            month = months[this.dateTime.getMonth()],
            date = ('0' + this.dateTime.getDate()).slice(-2);
        let value = day + ', ' + month + ' ' + date;
        if (this.dateEle.innerText != value) {
            this.dateEle.innerText = value;
        }
    }

}
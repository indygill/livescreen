class LiveScreen {
    /**
    * Class constructor
    * 
    * @param {string} device id of html element to bind to, with class of .marvel-device
    * @param {object} options object array to alter default settings
    */
    constructor (id) {
        this.assignMarvelDevice(id);
        this.setDefaultOptions();
        this.drawScreen();
    }

    /**
     * Creates a new dom element
     * 
     * @param {string} className class to assign to newly created element
     * @returns HTML DOM Element
     */
    create(className) {
        let ele = document.createElement('div');
        ele.classList.add(className);
        return ele;
    }

    /**
     * First finds an element with the matching id
     * Then checks to see if the element is a valid marvel-device
     * If so, is assigns the html element to this.device
     * 
     * @param {string} id html id attribute
     * @returns void
     */
    assignMarvelDevice(id) {
        const element = document.getElementById(id);
        if (element == null) {
            return console.error('Unable to find element with the id of ' + id);
        }
        if (!element.classList.contains('marvel-device')) {
            return console.error('The element you\'re trying to bind to isn\'t a valid marvel-device.');
        }
        this.device = element;
    }

    setDefaultOptions() {
        this.options = {
            carrier: 'T-Mobile',
            device: this.getDeviceModel(),
            os: 'ios12',
            status_bar: {
                carrier: false,
                wifi: false,
                tab: false,
                lock: false,
                bluetooth: false,
                signal: false,
                battery: false,
                date: false,
                time: false,
                user: false,
            },
            lock_icon: false,
            clock: true,
            notifications: true,
            login: false,
            unlock_text: false,
            shortcuts: false
        };
        switch (this.options.device) {
            case 'iphone-x':
            case 'iphone8':
            case 'iphone8plus':
            case 'iphone5c':
            case 'iphone5s':
            case 'iphone4s':
            case 'ipad':
                this.options.os = 'ios12';
                break;
            case 'note8':
            case 's5':
            case 'nexus5':
            case 'htc-one':
                this.options.os = 'pie';
                break;
            case 'lumia920':
                this.options.os = 'windows-phone-8';
                break;
            case 'macbook':
                this.options.os = 'high-sierra';
                break;
        }
        switch (this.options.os) {
            case 'ios12':
                if (this.options.device == 'iphone-x') {
                    this.options.lock_icon = true;
                    this.options.unlock_text = 'Swipe up to unlock';
                } else {
                    this.options.status_bar.lock = true;
                    this.options.unlock_text = 'Press home to unlock';
                }
                this.options.status_bar.signal = true;
                this.options.status_bar.wifi = true;
                this.options.status_bar.battery = true;
                this.options.status_bar.carrier = true;
                this.options.status_bar.bluetooth = true;
                this.options.shortcuts = true;
                break;
            case 'pie':
                this.options.status_bar.signal = true;
                this.options.status_bar.bluetooth = true;
                this.options.status_bar.carrier = true;
                this.options.status_bar.wifi = true;
                this.options.status_bar.battery = true;
                this.options.shortcuts = true;
                break;
            case 'windows-phone-8':
                this.options.status_bar.signal = true;
                this.options.status_bar.carrier = true;
                this.options.status_bar.wifi = true;
                this.options.status_bar.battery = true;
                this.options.notifications = false;
                this.options.shortcuts = true;
                break;
            case 'high-sierra':
                this.options.clock = false;
                this.options.status_bar.wifi = true;
                this.options.status_bar.battery = true;
                this.options.status_bar.date = true;
                this.options.status_bar.time = true;
                this.options.notifications = false;
                this.options.login = true;
                this.options.unlock_text = 'Cancel';
                this.options.shortcuts = true;
                break;
        }
    }

    /**
     * Matchs the classes from this.device against a preset array of supported models.
     * 
     * @returns {mixed} device model name or console error
     */
    getDeviceModel() {
        const deviceClasses = this.device.classList;
        const deviceModels = ['iphone-x', 'note8', 'iphone8', 'iphone8plus', 'iphone5s', 'iphone5c', 'ipad', 'iphone4s', 'nexus5', 'lumia920', 's5', 'htc-one', 'macbook'];
        let i = 0;
        let model = false;
        while (i < deviceModels.length) {
            model = deviceModels[i];
            if (deviceClasses.contains(model) == true) {
                break;
            }
            i++;
        }
        if (!model) {
            return console.error('Can\'t find marvel device model associated with element with ' + this.device.id + ' id');
        }
        return model;
    }

    /**
     * Adds the passed elements as a child of .marvel-device > .screen
     * 
     * @param {HTML DOM ELement} ele element to add
     */
    addToScreen(ele) {
        this.device.getElementsByClassName('screen')[0].appendChild(ele);
    }

    /**
     * Checks the value certain options and calls the relevant methods
     * @returns {void}
     */
    drawScreen() {
        this.device.classList.add(this.options.os);
        this.drawStatusBar();
        if (this.options.lock_icon == true) {
            this.drawLockIcon();
        }
        if (this.options.clock == true) {
            this.drawClock();
        }
        if (this.options.notifications == true) {
            this.drawNotifications();
        }
        if (this.options.login == true) {
            this.drawLogin();
        }
        if (this.options.unlock_text != false) {
            this.drawUnlock();
        }
        if (this.options.shortcuts == true) {
            this.drawShortcuts();
        }
        if (this.options.status_bar.time == true || this.options.clock == true) {
            this.time();
        }
        if (this.options.status_bar.date == true || this.options.clock == true) {
            this.date();
        }
    }

    /**
     * Creates the HTML ELement used for the status bar, as well as the children elements based on the key: values from this.options
     * @returns {void}
     */
    drawStatusBar() {
        const status_bar = this.create('status_bar');
        for (let eleName in this.options.status_bar) {
            let option = this.options.status_bar[eleName];
            if (option == true) {
                let ele = this.create(eleName);
                if (this.options.hasOwnProperty(eleName)) {
                    ele.innerHTML = this.options[eleName];
                }
                status_bar.appendChild(ele);
            }
        }
        this.addToScreen(status_bar);
    }

    /**
     * Creates the HTML ELement used for the lock icon
     * @returns {void}
     */
    drawLockIcon() {
        const lock = this.create('lock_icon');
        this.addToScreen(lock);
    }

    /**
    * Creates the HTML ELement used for the time and date clock
    * @returns {void}
    */
    drawClock() {
        const clock = this.create('clock');
        const time = this.create('time');
        const date = this.create('date');
        clock.appendChild(time);
        clock.appendChild(date);
        this.addToScreen(clock);
    }

    /**
    * Creates the HTML wrapper ELement used for the notifications
    * @returns {void}
    */
    drawNotification(notification) {
        const notificationContainer = this.device.querySelector('.notifications');
        let notificationEle = this.create(notification.type);
        notificationEle.classList.add('shrink');
        let topEle = this.create('top');
        let iconEle = this.create('icon');
        let titleEle = this.create('title');
        titleEle.innerText = notification.type;

        let time_agoEle = this.create('time_ago');
        time_agoEle.innerText = (Math.floor(Math.random() * 10) + 1) + " min";

        let imageEle = this.create('image');
        if (notification.image != false) {
            imageEle.style.backgroundImage = notification.image;
        }

        let descriptionEle = this.create('description');
        descriptionEle.innerText = notification.description;

        topEle.appendChild(iconEle);
        topEle.appendChild(titleEle);
        topEle.appendChild(time_agoEle);
        notificationEle.appendChild(topEle);
        notificationEle.appendChild(imageEle);
        notificationEle.appendChild(descriptionEle);

        if (notificationContainer.childNodes.length < 1) {
            notificationContainer.appendChild(notificationEle);
        } else {
            let child = notificationContainer.firstChild;
            notificationContainer.insertBefore(notificationEle, child);
        }
        setTimeout(function (notificationContainer) {
            notificationContainer.firstChild.classList.remove('shrink');
        }, 100, notificationContainer);
    }

    /**
    * Creates the HTML Child ELement used for the notifications
    * @returns {void}
    */
    drawNotifications() {
        const notifications = [
            { type: 'instagram', image: false, icon: false, description: 'instagram liked your comment' },
            { type: 'facebook', image: false, icon: false, description: 'Facebook liked your post' },
            { type: 'whatsapp', image: false, icon: false, description: 'WhatsApp have sent you a reply' },
            { type: 'twitter', image: false, icon: false, description: 'Twitter just retweeted you' },
            { type: 'snapchat', image: false, icon: false, description: 'Snapchat replayed your snap!' },
            { type: 'telegram', image: false, icon: false, description: 'Telegram has joined your channel' }
        ];
        const notificationsEle = this.create('notifications');
        this.addToScreen(notificationsEle);
        let i = 0;
        setInterval(function ($this) {
            $this.drawNotification(notifications[i]);
            i++;
            if (i >= 6) {
                i = 0;
                setTimeout(function () {
                    notificationsEle.classList.add('swipe')
                }, 1350);
                setTimeout(function () {
                    notificationsEle.innerHTML = '';
                    notificationsEle.classList.remove('swipe');
                }, 2450);
                i = 0;
            }
        }, 3500, this);

    }

    /**
    * Creates the HTML ELement used for the login screen
    * @returns {void}
    */
    drawLogin() {
        const loginEle = this.create('login');
        const profileEle = this.create('profile');
        const userEle = this.create('user');
        userEle.innerText = 'Bill Gates';
        const passwordEle = this.create('password');
        loginEle.appendChild(profileEle);
        loginEle.appendChild(userEle);
        loginEle.appendChild(passwordEle);
        this.addToScreen(loginEle);
    }

    /**
    * Creates the HTML ELement used for the unlock text
    * @returns {void}
    */
    drawUnlock() {
        const unlockEle = this.create('unlock');
        unlockEle.innerText = this.options.unlock_text;
        this.addToScreen(unlockEle);
    }

    /**
    * Creates the HTML ELement used for the lock screen shortcuts
    * @returns {void}
    */
    drawShortcuts() {
        const shortcutsEle = this.create('shortcuts');
        const first = this.create('first');
        const second = this.create('second');
        const third = this.create('third');
        shortcutsEle.appendChild(first);
        shortcutsEle.appendChild(second);
        shortcutsEle.appendChild(third);
        this.addToScreen(shortcutsEle);
    }

    /**
    * Sets up the interval used for the time
    * @returns {void}
    */
    time() {
        try {
            this.updateTime();
            setInterval(this.updateTime.bind(this), 1000);
        } catch (e) {
            console.dir(e);
        }
    }

    /**
    * CHecks to see if the time elements have the current time values and updates them accordingly
    * @returns {void}
    */
    updateTime() {
        let dateTime = new Date();
        let hours = ('0' + dateTime.getHours()).slice(-2),
            mins = ('0' + dateTime.getMinutes()).slice(-2);
        let value = hours + ':' + mins;
        const timeEles = this.device.querySelectorAll('.time');
        let i = 0;
        while (i < timeEles.length) {
            let timeEle = timeEles[i];
            if (timeEle.innerText != value) {
                timeEle.innerText = value;
            }
            i++;
        }
    }
    /**
    * Sets up the interval used for the date
    * @returns {void}
    */
    date() {
        try {
            this.updateDate();
            setInterval(this.updateDate.bind(this), 1000);
        } catch (e) {
            console.dir(e);
        }

    }

    /**
    * CHecks to see if the date elements have the current date values and updates them accordingly
    * @returns {void}
    */
    updateDate() {
        let dateTime = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let day = days[dateTime.getDay()],
            month = months[dateTime.getMonth()],
            date = ('0' + dateTime.getDate()).slice(-2);
        let value = day + ', ' + month + ' ' + date;
        const dateEles = this.device.querySelectorAll('.date');
        let i = 0;
        while (i < dateEles.length) {
            let dateEle = dateEles[i];
            if (dateEle.parentNode.classList.contains('status_bar')) {
                value = day.substring(0, 3);
            }
            if (dateEle.innerText != value) {
                dateEle.innerText = value;
            }
            i++;
        }
    }
}
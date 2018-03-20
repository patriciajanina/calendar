document.addEventListener('DOMContentLoaded', function () {
    var btnAddMonth = document.querySelector('.change-left');
    var btnSubtractMonth = document.querySelector('.change-right');

    //check how many days have a month
    //add onClick event to change month var m = new Date().getMonth() + MY VARIABLE;
    //check every date which day of month it is (mon=sun)
    //push all dates to exact day
    //if first date of mon is bigger than first day of month push days from previous month

    function Calendar() {
        this.counter = 1;
        this.counterYear = 0;
        this.year = new Date().getFullYear();
        this.month = new Date().getMonth();
        this.day = new Date().getDate();
        this.daysInExactMounth = 0;
        this.div = '';
        this.firstDayLoop = 0;
        this.lastDayLoop = 0;
        this.tab = [];
        this.pushedDays = '';

        this.yearAfterClick = 0;
        this.monthAfterClick = 0;
        this.firstDayEveryMonth = 0;
        this.lastDayEveryMonth = 0;
    }

    //adding months
    //if months higher than 13 adding new year setting new month
    //and reseting counter
    Calendar.prototype.addToCounter = function () {
        this.counter++;
        if (this.counter + this.month >= 13) {
            this.counterYear++;
            this.counter = 1;
            this.month = 0;
        }
    };
    //subtract months
    //if months less then 0 subtract neew year
    //and counter equal 12
    Calendar.prototype.subtractFromCounter = function () {
        this.counter--;
        if (this.counter + this.month <= 0) {
            this.counterYear--;
            this.counter = 12;
            this.month = 0;
        }
    };
    // //adding days (not in use at the moment)
    // Calendar.prototype.addDays = function () {
    //     var currentDate = new Date();
    //     var data = currentDate.setDate(this.day + 1);
    //     this.toFullDate = function () {
    //         return new Date(data);
    //     }
    // };

    //getting days in exact month
    //loop is less equal 41 due to possibility 6 rows and 42 elements
    Calendar.prototype.generateDivs = function () {
        for (var i = 0; i <= 41; i++) {
            //creating 42 divs on window-on-load
            this.div = document.createElement('div');
            var calendar = document.querySelector('.calendar');
            this.div.className = 'col col' + i;
            calendar.appendChild(this.div);
        }
    };
    //
    Calendar.prototype.daysInMonth = function () {
        //checking the current year
        //changing year on click-changing on click
        this.yearAfterClick = this.year + this.counterYear;

        //checking current month-changing on click
        this.monthAfterClick = this.month + this.counter;

        var d = new Date(this.yearAfterClick, this.monthAfterClick, 0);
        //checking the first day of month (this is dynamically changing on click )
        this.firstDayEveryMonth = new Date(this.yearAfterClick, this.monthAfterClick - 1, 1);

        //if day is equal zero firstDayLoop is equal 6
        if (this.firstDayEveryMonth.getDay() !== 0) {
            var otherDays = 7 - this.firstDayEveryMonth.getDay();
            this.firstDayLoop = ((7 - otherDays) * -1) + 2;
        } else {
            this.firstDayLoop = ((7 - 1) * -1) + 1;
        }
        //sum of days in month-changing on click
        this.daysInExactMounth = d.getDate();

        //checking the day of last date
        this.lastDayEveryMonth = new Date(this.yearAfterClick, this.monthAfterClick, 0);
        if (this.lastDayEveryMonth.getDay() !== 0) {
            this.lastDayLoop = (7 - this.lastDayEveryMonth.getDay());
        } else {
            this.lastDayLoop = 0;
        }

        this.tab = [];
        //looping all days
        //index equal sum of all days which exist before every first of exact month
        //index less equal amount days of exact month plus any empty space by end of the line
        for (var i = this.firstDayLoop; i <= this.daysInExactMounth + this.lastDayLoop; i++) {
            //all days which I want to push in tab
            var days = new Date(this.yearAfterClick, this.monthAfterClick - 1, i);
            //pushing all days to tab
            this.tab.push(days.getDate())
        }
        //display month and year in html file- dynamically changing on click
        var yearText = document.querySelector('.year');
        yearText.innerHTML = this.yearAfterClick;
        var monthText = document.querySelector('.month');
        monthText.innerHTML = this.monthAfterClick;
    };
    //pushing all days into divs - dynamically changing on click
    Calendar.prototype.pushing = function () {
        for (var j = 0; j <= 41; j++) {
            this.pushedDays = document.querySelectorAll('.col' + j);
            this.pushedDays.innerHTML = '';
            if (this.pushedDays[0]) {
                this.pushedDays[0].innerHTML = this.tab[j];
                if (this.pushedDays[0].innerHTML === 'undefined') {
                    this.pushedDays[0].innerHTML = ' ';
                }
            }
            else {
                this.pushedDays.innerHTML = this.tab[j];
                if (this.pushedDays.innerHTML === 'undefined') {
                    this.pushedDays[0].innerHTML = ' ';
                }
            }
        }
    };
    Calendar.prototype.styling = function () {
        for (var y = 0; y <= 41; y++) {
            this.pushedDays = document.querySelectorAll('.col' + y);
            var d = this.pushedDays[0].innerHTML;
            var t = new Date(this.yearAfterClick, this.monthAfterClick - 1, d);
            // min and max helps find a days from prev or next month and add them class
            var min = this.firstDayLoop * (-1);
            var max = this.daysInExactMounth + min;
            //looking for today
            if (d == this.day && this.monthAfterClick == this.month + 1) {
                this.pushedDays[0].classList.add('today');
            } else {
                this.pushedDays[0].classList.remove('today');
            }
            //if y less then sum of amount of days and days from prev month
            if (max < y) {
                //then add class to these days
                this.pushedDays[0].classList.add('color');
                // check the day of the date (looking for sunday)
                var k = new Date(this.yearAfterClick, this.monthAfterClick, d);
                //the day of date is sunday(equal 0) then add class else remove class
                if (k.getDay() === 0 && this.pushedDays[0].innerHTML !== ' ') {
                    this.pushedDays[0].classList.add('sunday');
                } else {
                    this.pushedDays[0].classList.remove('sunday');
                }
                //if any of these has same day remove class
                this.pushedDays[0].classList.remove('today');

            }
            //else if y is less than my days before first of month
            else if (min >= y) {
                this.pushedDays[0].classList.add('color');
                //if any day of these is saturday than delete this
                this.pushedDays[0].classList.remove('saturday');
                //if any of these has same day remove class
                this.pushedDays[0].classList.remove('today');

            } else { //else remove class and do if statement
                this.pushedDays[0].classList.remove('color');
                //looking for sundays
                if (t.getDay() === 0 && this.pushedDays[0].innerHTML !== ' ') {
                    this.pushedDays[0].classList.add('sunday');
                } else {
                    this.pushedDays[0].classList.remove('sunday');
                }
                //looking for saturdays
                if (t.getDay() === 6 && this.pushedDays[0].innerHTML !== ' ') {
                    this.pushedDays[0].classList.add('saturday');
                } else {
                    this.pushedDays[0].classList.remove('saturday');
                }
            }
        }
    };
    //creating new object
    var calendar = new Calendar();
    calendar.daysInMonth();
    calendar.generateDivs();
    calendar.pushing();
    calendar.styling();
    //
    btnAddMonth.addEventListener('click', function () {
        calendar.addToCounter();
        calendar.daysInMonth();
        calendar.pushing();
        calendar.styling();
    });
    btnSubtractMonth.addEventListener('click', function () {
        calendar.subtractFromCounter();
        calendar.daysInMonth();
        calendar.pushing();
        calendar.styling();
    });
});
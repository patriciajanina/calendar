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
    Calendar.prototype.subtractFromCounter= function () {
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
        //chengin year on click-changing on click
        var y = this.year + this.counterYear;

        //checking current month-changing on click
        var m = this.month + this.counter;

        var d = new Date(y, m, 0);
        //checking the first day of month (this is dynamically changing on click )
        var firstDay = new Date(y, m - 1, 1);

        //if day is equal zero firstDayLoop is equal 6
        if (firstDay.getDay() !== 0) {
            var otherDays = 7 - firstDay.getDay();
            this.firstDayLoop = ((7 - otherDays) * -1) + 2;
        } else {
            this.firstDayLoop = ((7 - 1) * -1) + 1;
        }
        //sum of days in month-changing on click
        this.daysInExactMounth = d.getDate();

       //checking the day of last date
        var lastDay = new Date(y, m, 0);
        if (lastDay.getDay() !== 0) {
            this.lastDayLoop = (7 - lastDay.getDay());
        } else {
            this.lastDayLoop = 0;
        }

        this.tab = [];
        //looping all days
        //index equal sum of all days which exist before every first of exact month
        //index less equal amount days of exact month plus any empty space by end of the line
        for (var i = this.firstDayLoop; i <= this.daysInExactMounth + this.lastDayLoop; i++) {
            //all days which I want to push in tab
            var days = new Date(y, m - 1, i);
            //pushing all days to tab
            this.tab.push(days.getDate())
        }
        //display month and year in html file- dynamically changing on click
        var yearText = document.querySelector('.year');
        yearText.innerHTML = y;
        var monthText = document.querySelector('.month');
        monthText.innerHTML = m;
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
    //creating new object
    var calendar = new Calendar();
    calendar.daysInMonth();
    calendar.generateDivs();
    calendar.pushing();
    //
    btnAddMonth.addEventListener('click', function () {
        calendar.addToCounter();
        calendar.daysInMonth();
        calendar.pushing();
    });
    btnSubtractMonth.addEventListener('click', function () {
        calendar.subtractFromCounter();
        calendar.daysInMonth();
        calendar.pushing();
    });
});
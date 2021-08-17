class TimeStamp {
    constructor(str2Day = '', str3LetterMonth = '', str2Year = '', str2Hours = '', str2Minutes = '') {
        this.day;
        this.month;
        this.year;
        this.hours;
        this.minutes;

        if (typeof str2Day === 'string' && typeof str3LetterMonth === 'string' && typeof str2Year === 'string' &&
            typeof str2Hours === 'string' && typeof str2Minutes === 'string') {
            if (str2Day.length !== 2 && str2Day !== '') this.day = '01';
            else this.day = str2Day;
            if (str3LetterMonth.length !== 3 && str3LetterMonth !== '') this.month = 'JAN';
            else this.month = str3LetterMonth.toUpperCase();
            if (str2Year.length !== 2 && str2Year !== '') this.year = '00';
            else this.year = str2Year;
            if (str2Hours.length !== 2 && str2Hours !== '') this.hours = '00';
            else this.hours = str2Hours;
            if (str2Minutes.length !== 2 && str2Minutes !== '') this.minutes = '00';
            else this.minutes = str2Minutes;
        } else {
            this.day = '00';
            this.month = 'JAN';
            this.year = '00';
            this.hours = '00';
            this.minutes = '00';
        }
    }

    getFormattedDateAndTime() {
        if (this.day === '' && this.month === '' && this.year === '' && this.hours === '' && this.minutes === '') return '';
        else return `${this.day}${this.month}${this.year} ${this.hours}:${this.minutes}`
    }
}

module.exports = TimeStamp;

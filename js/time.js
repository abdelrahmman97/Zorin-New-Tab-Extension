const userLang = 'eng';
const Userformat = true;

window.onload = displayClock();

function displayClock() {
    var lang = userLang;
    var format_ampm = Userformat;

    const monthNames = [
        { ar: "يناير", eng: "Jan" },
        { ar: "فبراير", eng: "Feb" },
        { ar: "مارس", eng: "Mar" },
        { ar: "أبريل", eng: "Apr" },
        { ar: "مايو", eng: "May" },
        { ar: "يونيو", eng: "Jun" },
        { ar: "يوليو", eng: "Jul" },
        { ar: "أغسطس", eng: "Aug" },
        { ar: "سبتمبر", eng: "Sep" },
        { ar: "أكتوبر", eng: "Oct" },
        { ar: "موفمبر", eng: "Nov" },
        { ar: "ديسمبر", eng: "Dec" }
        // 'Jan',
        // 'Feb',
        // 'Mar',
        // 'Apr',
        // 'May',
        // 'Jun',
        // 'Jul',
        // 'Aug',
        // 'Sep',
        // 'Oct',
        // 'Nov',
        // 'Dec',
    ];

    const daysList = [
        { ar: "الأحد", eng: "Su" },
        { ar: "الاثنين", eng: "Mo" },
        { ar: "الثلاثاء", eng: "Tu" },
        { ar: "الأربعاء", eng: "We" },
        { ar: "الخميس", eng: "Th" },
        { ar: "الجمعة", eng: "Fr" },
        { ar: "السبت", eng: "Sa" }
        // 'Su',
        // 'Mo',
        // 'Tu',
        // 'We',
        // 'Th',
        // 'Fr',
        // 'Sa',
    ];

    const am = { ar: " ص ", eng: " am" };
    const pm = { ar: " م ", eng: " pm" };

    // Set to true to use a 12 hour date format
    var format_12hour = format_ampm;

    var d = new Date();
    var mm, days;
    switch (lang) {
        case 'ar':
            mm = monthNames[d.getMonth()].ar;
            days = daysList[d.getDay()].ar;
            break;
        case 'eng':
            mm = monthNames[d.getMonth()].eng;
            days = daysList[d.getDay()].eng;
            break;
        default:
            break;
    }
    var dd = d.getDate();
    var min = (min = ('0' + d.getMinutes()).slice(-2));
    var hh = d.getHours();
    var ampm = '';

    // var d = new Date();
    // var mm = monthNames[d.getMonth()];
    // var days = daysList[d.getDay()];
    // var dd = d.getDate();
    // var min = (mins = ('0' + d.getMinutes()).slice(-2));
    // var hh = d.getHours();
    // var ampm = '';

    if (format_12hour) {
        switch (lang) {
            case 'ar':
                ampm = hh >= 12 ? pm.ar : am.ar;
                break;
            case 'eng':
                ampm = hh >= 12 ? pm.eng : am.eng;
                break;
            default:
                break;
        }
        hh = hh % 12;
        hh = hh ? hh : 12; //show mod 0 as 12
    }

    if (lang == 'ar') {
        document.getElementById('sblock__date').setAttribute("dir","rtl");
    }

    document.getElementById('hour').innerText = hh;
    document.getElementById('separator').innerHTML = ' : ';
    document.getElementById('minutes').innerText = min + ampm;

    document.getElementById('month').innerText = mm;
    document.getElementById('day').innerText = dd;
    document.getElementById('dayS').innerText = days + ",";

    setTimeout(displayClock, 1000);
}
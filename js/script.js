// Creating Element Vars
var dateEl = $('#currentDay');
var containerEl = $('.container')

// set the date at top of page
function setDay() {
    var today = moment().format("dddd, MMM Do, YYYY");
    var day = localStorage.getItem("day");
    if (day === null || day !== today){
        localStorage.clear();
        localStorage.setItem('day', today);
    } 
    dateEl.text(today);
}

function saveToStore(event){
    var textCont = $( event.target ).siblings("textarea").val();
    var unixTime = $( event.target ).siblings("textarea").attr('data-unix');
    localStorage.setItem(unixTime, textCont);
    location.reload()
}

function getFromStore(unix) {
    var storedText = localStorage.getItem(unix)
    return storedText
};

function createAppendEls(time, timeFormatted, now) {
    if (time===now) {
        var divEl = $('<div>').attr({'class':'present row time-block'}).appendTo(containerEl);
    } else if (time < now) { // else if the time is less than now it is in the past and give the class of past
        var divEl = $('<div>').attr({'class':'past row time-block'}).appendTo(containerEl);
    } else { // else it is in the future so give the class of future
        var divEl = $('<div>').attr({'class':'future row time-block'}).appendTo(containerEl);
    }
    // create the rest of the elements
    // place the formatted time of the element in the text
    var hourEl = $('<div>').text(timeFormatted).attr('class', 'col-2 hour').appendTo(divEl);
    var storedText = getFromStore(time)
    if (time === null) {
        var txtareaEl = $('<textarea>').attr({'class':'col-9', 'data-unix': time}).appendTo(divEl);
    } else {
        var txtareaEl = $('<textarea>').text(storedText).attr({'class':'col-9', 'data-unix': time, placeholder:"What now?"}).appendTo(divEl);
    }
    //  create the button to save and place the save icon in it
    var btnEl = $('<button>').attr({'class':'col-1 saveBtn'}).appendTo(divEl);
    var imgSaveEl = $('<i>').attr('class', 'fa fa-save').appendTo(btnEl);
    btnEl.on('click', saveToStore);
}

function renderList() {
    for (let i = 0; i < 24; i++) {
        // get the time from the start of the day increasing by one hour and format as unix to be compared against actual time
        var time = moment().startOf('day').add(i, "hours").format('x');
        // get time to display on page. format = 12pm
        var timeFormatted = moment().startOf('day').add(i, "hours").format('ha');
        // get the now's hour to compare against the time of this element
        var now = moment().startOf('hour').format('x');
        // if the now's hour is the same as the time of this element then give it the class of present
        createAppendEls(time, timeFormatted, now);
    };
}


// A function to run at the start of page load to initiate page and load local storage
function init() {
  setDay();
  renderList();
}

init();

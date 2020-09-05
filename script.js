$("#today").text(moment().format("dddd, MMMM Do"));

var daySchedule= [
    { time : '9 AM', event: "" },
    { time : '10 AM', event: "" },
    { time : '11 AM', event: "" },
    { time : '12 PM', event: "" },
    { time : '1 PM', event: "" },
    { time : '2 PM', event: "" },
    { time : '3 PM', event: "" },
    { time : '4 PM', event: "" },
    { time : '5 PM', event: "" },
];

var blockColor = function (time) {
    var testTime = moment(moment().format("H A"), "H A");
    var testBlock = moment(time, "H A");

    if (testTime.isBefore(testBlock) === true) {
        return "future";
    } else if (testTime.isAfter(testBlock) === true) {
        return "past";
    } else {
        return "present";
    }
};

if (JSON.parse(localStorage.getItem("savedSchedule")) !==null) {
    daySchedule = JSON.parse(localStorage.getItem("savedSchedule"));
};

daySchedule.forEach(function(hourBlock, index) {
    let timeLabel = hourBlock.time;
    let hourColor = blockColor(timeLabel);
    let hourFormat = '<div class="time-block" id="' +
    index +
    '"><div class="row no-gutters input-group"><div class="col-sm-2 col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
    timeLabel +
    '</div><textarea class="form-control ' +
    hourColor +
    ' description">' +
    hourBlock.event +
    '</textarea><div class="col-sm-2 col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="far fa-save"></i></button></div></div></div>';

    $(".container").append(hourFormat);
});

$(".saveBtn").on("click", function(event) {
    let blockID = parseInt($(this).closest(".time-block").attr("id"));
    let userEntry = $.trim($(this).parent().siblings("textarea").val());
    daySchedule[blockID].event = userEntry;
    localStorage.setItem("savedSchedule", JSON.stringify(daySchedule));
});
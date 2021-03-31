
var myJumbo = $(".container")




function createHourTile(counter)
{
    currentTime = moment();
    slotTime = moment().hour(9) // first hour is 9 AM
    slotTime.add(counter, 'hours');
    // add conditional to add id to the card depending on the hour
    var cardID = ""
    if (slotTime.isBefore(currentTime))
    {
        cardID = "past";
    }

    else if(slotTime.isSame(currentTime))
    {
        cardID = "present"

    }

    else 
    {
        cardID = "future";
    }


    var timeSlotEl = $("<div>", {
        class: "input-group",
        id: cardID
    });
    
    var timeCardEl = $("<div>", {
        class: "badge badge-secondary",
        text: slotTime.format("h A"),
    });
    
    var inputEl = $("<input>", {
        type: "text",
        class: "form-control",
        placeholder: "Enter event here",
        id:cardID
    });
    
    var saveButton = $("<button>", {
        class:"btn btn-primary",
        text: "Submit",
        id:"sizing-addon2"
    });
    
    timeSlotEl.appendTo(myJumbo);
    timeCardEl.appendTo(timeSlotEl);
    inputEl.appendTo(timeSlotEl);
    saveButton.appendTo(timeSlotEl);
    return timeSlotEl;
    
}



for (var i = 0; i < 9; i++)
{
    var myHour = createHourTile(i);
    myHour.appendTo(myJumbo);

}



$(".btn-primary").on("click", ()=> {alert("don't click")})

var myJumbo = $(".container")
events = [];

// this function is meant to be used in a loop with the counter variable
// adding to the initialHour variable to generate time slots 1 hour apart from each other
// PS: probably bad design but it is what it is; this code has gone through
// several refactorings already and used to look way worse 
function createHourTile(initialHour, hourOffset)
{
    currentTime = moment();
    slotTime = moment().hour(initialHour); // first hour is 9 AM
    slotTime.add( hourOffset, 'hours'); // add to the hour
    // add conditional to add id to the card depending on the hour
    var cardID = "";
    // compare the slot's time to the current time and set the attribute accordingly
    if (slotTime.isBefore(currentTime))
    {
        cardID = "past";
    }

    else if (slotTime.isSame(currentTime))
    {
        cardID = "present"
    }

    else 
    {
        cardID = "future";
    }
    // generate div to store all the elements of a timeslot
    var timeSlotEl = $("<div>", 
    {
        class: "input-group",
        // this attribute is used to style the element accordingly in css
        id: cardID
    });
    
    // this displays the time on the left side of a time slot
    var timeCardEl = $("<div>", 
    {
        class: "badge badge-secondary",
        text: slotTime.format("h A"),
    });
    
    // input element to write events
    var inputEl = $("<input>", 
    {
        type: "text",
        class: "form-control",
        placeholder: "Enter event here",
        id:cardID,
        // borrowing an arbitrary attribute to encode positional data during generation
        // this attr is used to set the eventID when saving events in the event array
        name: hourOffset,
    });
    
    var saveButton = $("<button>", 
    {
        class:"btn btn-primary",
        id:"sizing-addon2"
    });

    var saveButtonGlyp = $("<i>", 
    {
        class: "fa fa-floppy-o"
    })
    
    // append all the elements to the time slot and return it
    timeCardEl.appendTo(timeSlotEl);
    inputEl.appendTo(timeSlotEl);
    saveButtonGlyp.appendTo(saveButton)
    saveButton.appendTo(timeSlotEl);
    return timeSlotEl;
    
}

// generate a defined number of time slots in a loop
function generateTimeSlots(numberOFSlots)
{
    for (var i = 0; i < numberOFSlots; i++)
    {
        var myHour = createHourTile(9, i);
        myHour.appendTo(myJumbo);
    }
    
}

// saves the event array into local storage
function saveEvents()
{   
    localStorage.setItem("events", JSON.stringify(events));
}

// retrieves the saved events from local storage, adds them to the events array,
// and renders them to the page
function loadEvents()
{   // retrieve events from local storage
    var storedEvents = JSON.parse(localStorage.getItem("events"));
    var displayEventEl = $("input");
    // load the stored events into the events array
    if(storedEvents !== null)
    {
        events = storedEvents;
    }

    // loop through each input element and set the text to the retrieved text
    for(var i = 0; i < events.length;i++ )
    {    
        if(events[i] != null)
        { 
            displayEventEl.eq(i).val(events[i].event);
        }
    }

}

function submitEvent() 
{
    // get the input text in a somewhat convoluted way
    var textInput = $(this).parent().children("input").val();
    // get the event id in a similarly convoluted way
    var eventId = $(this).parent().children("input").attr("name");
    if(textInput!= null) // store in events array if the input is not null
    {
        events[eventId] = {event: textInput, id: eventId};
    }
    console.log({event: textInput, id: eventId});
    // save the event
    saveEvents();
}

// display the current time on the page 
$("#currentDay").text(moment().format("dddd MMMM Do"));
// generate 9 time slots 
generateTimeSlots(9);
// load the events from local storage
loadEvents();
// listen for click events 
$(".btn-primary").on("click", submitEvent);

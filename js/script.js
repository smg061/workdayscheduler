
var myJumbo = $(".container")
events = [];
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

    var timeSlotEl = $("<div>", 
    {
        class: "input-group",
        id: cardID
    });
    
    var timeCardEl = $("<div>", 
    {
        class: "badge badge-secondary",
        text: slotTime.format("h A"),
    });
    
    var inputEl = $("<input>", 
    {
        type: "text",
        class: "form-control",
        placeholder: "Enter event here",
        id:cardID,
        // borrowing an attribute to encode positional data during generation
        name: counter,
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
    
    timeCardEl.appendTo(timeSlotEl);
    inputEl.appendTo(timeSlotEl);
    saveButtonGlyp.appendTo(saveButton)
    saveButton.appendTo(timeSlotEl);
    return timeSlotEl;
    
}

function generateTimeSlots(numberOFSlots)
{
    for (var i = 0; i < numberOFSlots; i++)
    {
        var myHour = createHourTile(i);
        eventText = myHour.children("input").value;
        myHour.appendTo(myJumbo);
    }
    
}

function saveEvents()
{   
    localStorage.setItem("events", JSON.stringify(events));
}

function loadEvents()
{   
    var storedEvents = JSON.parse(localStorage.getItem("events"));
    var displayEventEl = $("input");
    if(storedEvents !=null)
    {
        events = storedEvents;

    }
    for(var i = 0; i < events.length;i++ )
    {    
        if(events[i] != null)
        { 
            displayEventEl.eq(i).val(events[i].event);
        }
    }

}

generateTimeSlots(9)
loadEvents()

$(".btn-primary").on("click", function() {
    var textInput = $(this).parent().children("input").val();
    var eventId = $(this).parent().children("input").attr("name");

    if(textInput!= null)
    {
        events[eventId] = {event: textInput, id: eventId};

    }
    console.log({event: textInput, id: eventId});
    saveEvents();
    
})
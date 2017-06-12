/**
 * Created by Aditya on 6/11/2017.
 */

//this is the AJAX containing HttpRequest to POST the data on server
var PostHttpRequest = function (url, PostData, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(request.responseText);
        }
    }
    request.open("POST", window.location.origin + url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(PostData));
}

// Function to create Counter Dynamically, along with the disable Counter Button
var index = 1;
function CreateCounter() {
    var ClickNumber = 0;
    var button = document.createElement("button");
    var DeleteButton = document.createElement("button");

    var TextArea = document.createElement("INPUT");
    TextArea.setAttribute("type", "text");

    var TextInsideButton = document.createTextNode("Counter " + index);
    button.appendChild(TextInsideButton);
    button.style.color = 'white';
    button.style.backgroundColor = "#4CAF50";
    button.style.padding = '15px 32px';
    button.style.display = 'inline';
    button.style.fontSize = '16px';
    button.style.margin = '4px 2px';
    button.style.cursor = 'pointer';
    button.id = index.toString();

    var TextInsideDeleteButton = document.createTextNode("Disable  " + index);
    DeleteButton.appendChild(TextInsideDeleteButton);
    DeleteButton.style.color = 'white';
    DeleteButton.style.backgroundColor = "#e3360f";
    DeleteButton.style.padding = '15px 32px';
    DeleteButton.style.display = 'inline-block';
    DeleteButton.style.fontSize = '16px';
    DeleteButton.style.cursor = 'pointer';


    DeleteButton.onclick = function DisableButton() {
        document.getElementById(button.id).disabled = true;
        button.style.backgroundColor = "#dde3de";
        button.style.color = 'black';

        //POST Request to disable the related button
        PostHttpRequest("/DisableButton", [{"data1": button.id}], function (data) {
        });

    }

    button.onclick = function () {
        ClickNumber++;
        TextArea.setAttribute("value", ClickNumber)
        var PresentTime = new Date();
        var TimeStamp = PresentTime.getTime();
        SendDataOfCounter(button.id, ClickNumber, TimeStamp);
        return false;
    };

    TextArea.style.display = 'block';
    TextArea.className = "myclass";
    document.body.appendChild(button);
    document.body.appendChild(DeleteButton);
    document.body.appendChild(TextArea);
    index++;
}


//The Data is Packed and sent to AJAX function for sending to the server
function SendDataOfCounter(CounterNumber, ClickNumber, TimeStamp) {
    PostHttpRequest("/IncrementCounter", [{
        "data1": CounterNumber,
        "data2": ClickNumber,
        "data3": TimeStamp
    }], function (data) {
    });
}


//function to see the count of clicks every specific hour, 3 hours, 6 hours .... time frame
function FindResultsFixed() {
    var CounterNumber = document.getElementById("CounterNumber").value;

    PostHttpRequest("/FixedRequest", [{"data1": CounterNumber}], function (data) {
        if (data) {
            var HtmlTags = "<table border='2' ><tr><th>Past Hour</th><th>Past 3 Hours</th><th>Past 6 Hours</th><th>Past 12 Hours</th><th>Past 24 Hours</th><th>All Time</th> </tr><tr>";
            data = data.replace(/[ [ \]\ ]/g, "").split(',').map(Number);
            for (var index = 0; index < data.length; index++) {
                HtmlTags += "<td bgcolor='#878c93' style='color:white' >" + data[index] + "</td>";
            }
            HtmlTags += "</tr></table>";
            document.getElementById('test').innerHTML = HtmlTags;
        }
    });
}

//function to see the count of clicks on the given number of hours
function FindResultsDynamic() {
    var NumberOfHours = document.getElementById("NumberOfHours").value;
    var CounterNumber = document.getElementById("CounterNumber").value;

    PostHttpRequest("/DynamicRequest", [{"data1": NumberOfHours}, {"data2": CounterNumber}], function (data) {
        if (data) {
            var HtmlTags = "<table><tr>";
            data1 = data.replace(/[ [ \]\ ]/g, "");
            HtmlTags += "<td>" + data1 + "</td>";
            HtmlTags += "</tr></table>";
            document.getElementById('NOH').innerHTML = HtmlTags;
        }
    });
}


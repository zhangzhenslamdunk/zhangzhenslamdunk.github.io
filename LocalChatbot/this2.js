//links
//http://eloquentjavascript.net/09_regexp.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
nlp = window.nlp_compromise;

var messages = [], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'Singapore Data Science Consortium', //name of the chatbot
  talking = false; //when false the speach function doesn't work

//debug
var toshow = "not assigned value yet";
//debug

//
//
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//edit this function to change what the chatbot says
function chatbotResponse() {
  talking = false;
  //botMessage = "I'm confused"; //the default message
  botMessage = "Thanks for your interest! Singapore Data Science Consortium (SDSC) is the key platform in Singapore for industry to access the latest data science technologies, applications, and expertise from the academia to create innovative solutions that solve real-world challenges. For more information, please visit our website http://sdsc.sg/ or contact us at sdsc AT nus DOT edu DOT sg";

  if (lastUserMessage === 'hi' || lastUserMessage =='hello') {
    const hi = ['hi','howdy','hello']
    botMessage = hi[Math.floor(Math.random()*(hi.length))];;
  }

  if (lastUserMessage === 'name') {
    botMessage = 'My name is ' + botName;
  }
}
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//
//
//
//this runs each time enter is pressed.
//It controls the overall input and output
function newEntry() {
  //if the message from the user isn't empty then run 
  if (document.getElementById("chatbox").value != "") {
    //pulls the value from the chatbox ands sets it to lastUserMessage
    lastUserMessage = document.getElementById("chatbox").value;
    //sets the chat box to be clear
    document.getElementById("chatbox").value = "";
    //adds the value of the chatbox to the array messages
    //messages.push("<b>You: </b>" + lastUserMessage);
    
    // from heroku
    
    var xhr = new XMLHttpRequest();
    //xhr.open('POST', 'https://tryherokubotlibre.herokuapp.com/webhook', true);
    xhr.open('POST', 'https://4afb4cc9.ngrok.io/webhook', true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin','*');
    //xhr.send();
    //var result = JSON.parse(xhr.response).fulfillmentText;
    //var toshow = "not assigned value yet";
    xhr.onload = function() { 
      console.log(JSON.parse(xhr.response).fulfillmentText.toString());
      
      //alert(JSON.parse(xhr.response).fulfillmentText.toString());
      toshow = JSON.parse(xhr.response).fulfillmentText.toString();
      console.log(toshow);
      messages.push(toshow);
      messages.push("inside onload function");
    };
    xhr.send();
    messages.push("outside onload function");
    messages.push(toshow);
    console.log(toshow);
    console.log("good good good");
    console.log(toshow);
    //JSON.parse(xhr.response).fulfillmentText.toString()
    /*
    var result = xhr.response
    xhr.onload = function() { console.log(this.status) }
    xhr.onerror = function(err) { console.error(err) }

    if (this.readyState == 0 && this.status == 200) {
        var myObj = JSON.parse(xhr);
        document.getElementById("demo").innerHTML = xhr.status;
     }
     */
    
    //messages.push(JSON.parse(xhr.response).fulfillmentText.toString());
    //messages.push("debug888");
    // from heroku
    
    //Speech(lastUserMessage);  //says what the user typed outloud
    //sets the variable botMessage in response to lastUserMessage
    chatbotResponse();
    //add the chatbot's name and message to the array messages
    messages.push("<b>" + botName + ":</b> " + botMessage);
    // says the message using the text to speech function written below
    
    //debug
    messages.push(toshow);
    
    //debug
    
    Speech(botMessage);
    //outputs the last few array elements of messages to html
    for (var i = 1; i < 8; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
  }
}

//text to Speech
//https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
function Speech(say) {
  if ('speechSynthesis' in window && talking) {
    var utterance = new SpeechSynthesisUtterance(say);
    //msg.voice = voices[10]; // Note: some voices don't support altering params
    //msg.voiceURI = 'native';
    //utterance.volume = 1; // 0 to 1
    //utterance.rate = 0.1; // 0.1 to 10
    //utterance.pitch = 1; //0 to 2
    //utterance.text = 'Hello World';
    //utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
}

//runs the keypress() function when a key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
    newEntry();
    
    //debug
    messages.push(toshow);
    //debug
    
  }
  if (key == 38) {
    console.log('hi')
      //document.getElementById("chatbox").value = lastUserMessage;
  }
}

//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
}

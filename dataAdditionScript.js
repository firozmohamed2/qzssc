// firebase credentials


const firebaseConfig = {
  apiKey: "AIzaSyA88fPkOvcI4QA9qD3ROpk-ay-V6ibQQlc",
  authDomain: "my-application-7fd40.firebaseapp.com",
  projectId: "my-application-7fd40",
  storageBucket: "my-application-7fd40.appspot.com",
  messagingSenderId: "269589994279",
  appId: "1:269589994279:web:4c617a622c328a1224e702",
  measurementId: "G-D8MD1J28GR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);




//auth state check - login or not 

firebase.auth().onAuthStateChanged((user) => {
  if (user) {

    var uid = user.uid;


    if (user.isAnonymous) {
      signinState = 0;
    } else {
      email = user.email;
    }



    // ...
  } else {
    // User is signed out
    // ...
    signinState = 0;
    //anonymous signin





    firebase.auth().signInAnonymously()
      .then(function() {


      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }
});

//auth check completed



//firebase components
const firestore = firebase.firestore();
let questions = [];
var topicName ;

const nme = localStorage.getItem('name');
const id = localStorage.getItem('id');

topicName = nme + " " + id;
document.getElementById("topic").innerHTML = topicName;



async function saveQuestions() {
  var questionInput = "";
  questionInput = document.getElementById('questionInput').value;
  // const questionsArray = parseQuestionsInput(questionInput);
  var questionsArray =[];

  
   questionsArray = parseQuizData(questionInput);


  






    
  
  

  
    
    
    



  // Save questions to Firestore
  questionsArray.forEach((questionData) => {
    addQuestionToFirestore(questionData);
  });



}








async function addQuestionToFirestore(questionData) {
  try {
    questionData.topic = id; // Add the topicName to the questionData object

    // Generate a reference for the new document without actually adding it to Firestore yet
    const newDocRef = firestore.collection('ssc').doc("questions").collection("all_questions").doc();
    
    // Get the generated document ID
    const docId = newDocRef.id;

    questionData.docId = docId;


    await newDocRef.set(questionData);
    // const docRef = await firestore.collection('ssc').doc("questions").collection("all_questions").add(questionData);
    console.log(`Added question with ID: ${newDocRef.id}`);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}



function parseQuizData(data) {

  questions = [];
  const lines = data.split('\n');
  let currentQuestion = {};


  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine !== '') {
      if (trimmedLine.startsWith('Q')) {
        currentQuestion.question = trimmedLine.substring(2);
        // currentQuestion.topic = topicName;

      } else if (trimmedLine.startsWith('A')) {
        if (!currentQuestion.options) {
          currentQuestion.options = [];
        }
        var t= trimmedLine.substring(3);
        var c = t.trim();     currentQuestion.options.push(c);
      } else if (trimmedLine.startsWith('a')) {
        if (!currentQuestion.options) {
          currentQuestion.options = [];
        }
        var t= trimmedLine.substring(3);
        var c = t.trim();     currentQuestion.options.push(c);

      } else if (trimmedLine.startsWith('B')) {
        if (!currentQuestion.options) {
          currentQuestion.options = [];
        }
        var t= trimmedLine.substring(3);
        var c = t.trim();        currentQuestion.options.push(c);

      } else if (trimmedLine.startsWith('b')) {
        if (!currentQuestion.options) {
          currentQuestion.options = [];
        }
        var t= trimmedLine.substring(3);
        var c = t.trim();        currentQuestion.options.push(c);

      } else if (trimmedLine.startsWith('C')) {
        if (!currentQuestion.options) {
          currentQuestion.options = [];
        }
        var t= trimmedLine.substring(3);
        var c = t.trim();        currentQuestion.options.push(c);

      } else if (trimmedLine.startsWith('c')) {
        if (!currentQuestion.options) {
          currentQuestion.options = [];
        }
        var t= trimmedLine.substring(3);
        var c = t.trim();        currentQuestion.options.push(c);

      } else if (trimmedLine.startsWith('D')) {
        if (!currentQuestion.options) {
          currentQuestion.options = [];
        }
        var t= trimmedLine.substring(3);
        var c = t.trim();        currentQuestion.options.push(c);

      } else if (trimmedLine.startsWith('d')) {
        if (!currentQuestion.options) {
          currentQuestion.options = [];
        }
        var t= trimmedLine.substring(3);
        var c = t.trim();        currentQuestion.options.push(c);

      } else if (trimmedLine.startsWith('Z')) {
        var correctOption = trimmedLine.substring(2);

        switch (correctOption) {
          case 'a':
            currentQuestion.answer = currentQuestion.options[0];
            break;
          case 'b':
            currentQuestion.answer = currentQuestion.options[1];
            break;
          case 'c':
            currentQuestion.answer = currentQuestion.options[2];
            break;
          default:
            currentQuestion.answer = currentQuestion.options[3];
            break;
        }
        shuffleArray(currentQuestion.options);

        questions.push(currentQuestion);
        currentQuestion = {};
      } else {
      }
    }
  });

  return questions;
}




function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

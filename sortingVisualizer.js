// Initialization of canvas and context for drawing arrays
const canva1 = document.getElementById("Canvas1");
const CanvaCont1 = canva1.getContext("2d");

// Automatically adjust to fit the window display
canva1.width = Math.floor(.97 * window.innerWidth);
canva1.height = Math.floor(.4 * window.innerHeight);
const boxWidth = Math.floor(.07 * window.innerWidth);

const choiceAlg = document.getElementById('algorithm');
const choiceSize = document.getElementById('setsize');
const choiceType = document.getElementById('setType');
const sortButton = document.getElementById('sort');
const resetStatsButton = document.getElementById('clearStats');
const buttonIds = ['sort', 'stop', 'last', 'next', 'generate'];
const Languages = document.getElementById('codeTypeButtons')

const speedDelay = document.getElementById('speed');
const text1 = document.getElementById('myText1');
const text2 = document.getElementById('myText2');

var arr = [], oldarr = [], copy = [];
var currentSortAlgorithm = "";
var chosenLang = 1;

const Bubblepseudo ="procedure bubbleSort(array)\n\t n = array.length\n\t for i = 0 to n-2\n\t\t for j = 0 to n-i-2\n\t\t\t if array[j] > array[j+1] then\n\t\t\t\t temp = array[j]\n\t\t\t\t array[j] = array[j+1]\n\t\t\t\t array[j+1] = temp\n\t\t\t endif\n\t\t endfor\n\t endfor\nendprocedure" 
const BubblePython = "def bubbleSort(arr):\n\t n = len(arr)\n\t for i in range(n-1):\n\t\t for j in range(0, n-i-1):\n\t\t\t if arr[j] > arr[j+1]:\n\t\t\t\t arr[j], arr[j+1] = arr[j+1], arr[j]";
const BubbleJava = "static void bubbleSort(int[] arr) {\n\t int n = arr.length;\n\t int temp = 0;\n\t for(int i=0; i < n; i++){\n\t\t for(int j=1; j < (n-i); j++){\n\t\t\t if(arr[j-1] > arr[j]){\n\t\t\t\t temp = arr[j-1];\n\t\t\t\t arr[j-1] = arr[j];\n\t\t\t\t arr[j] = temp;\n\t\t\t }\n\t\t }\n\t }";

const SelectionSortpseudo = "procedure SelectionSort(array)\n\t for i = 0 to array.length - 1\n\t\t min = i\n\t\t for j = i + 1 to array.length - 1\n\t\t\t if array[j] < array[min] then\n\t\t\t\t min = j\n\t\t\t endif\n\t\t endfor\n\t\t temp = array[i]\n\t\t array[i] = array[min]\n\t\t array[min] = temp\n\t endfor\nendprocedure";
const SelectionSortPython = "def selection_sort(arr):\n\t for i in range(len(arr)):\n\t\t min_idx = i\n\t\t for j in range(i+1, len(arr)):\n\t\t\t if arr[min_idx] > A[j]:\n\t\t\t\t min_idx = j\n\t\t arr[i], arr[min_idx] = arr[min_idx], arr[i]";
const SelectionSortJava = "void selectionSort(int arr[])\n{\n\t int n = arr.length;\n\n\t for (int i = 0; i < n-1; i++)\n\t {\n\t\t int min_idx = i;\n\t\t for (int j = i+1; j < n; j++)\n\t\t\t if (arr[j] < arr[min_idx])\n\t\t\t\t min_idx = j;\n\n\t\t int temp = arr[min_idx];\n\t\t arr[min_idx] = arr[i];\n\t\t arr[i] = temp;\n\t }\n}";

const InsertionSortpseudo = "procedure insertionSort(array)\n\t for i = 0 to array.length - 1\n\t\t j = i - 1\n\t\t while j >= 0\n\t\t\t if array[j + 1] < array[j] then\n\t\t\t\t temp = array[j]\n\t\t\t\t array[j] = array[j + 1]\n\t\t\t\t array[j + 1] = temp\n\t\t\t else\n\t\t\t\t break\n\t\t\t endif\n\t\t\t j = j - 1\n\t\t endwhile\n\t endfor\nendprocedure";
const InsertionSortPython = "def insertionSort(arr):\n\t for i in range(1, len(arr)):\n\t\t key = arr[i]\n\t\t j = i-1\n\t\t while j >= 0 and key < arr[j] :\n\t\t\t arr[j + 1] = arr[j]\n\t\t\t j -= 1\n\t\t arr[j + 1] = key";
const InsertionSortJava = "void insertionSort(int arr[])\n{\n\t int n = arr.length;\n\t for (int i = 1; i < n; ++i) {\n\t\t int key = arr[i];\n\t\t int j = i - 1;\n\n\t\t while (j >= 0 && arr[j] > key) {\n\t\t\t arr[j + 1] = arr[j];\n\t\t\t j = j - 1;\n\t\t }\n\t\t arr[j + 1] = key;\n\t }\n}";


var isWorking = false, sorted, chartType = 1;
const sortCol = "green", wrongCol = "red", checkCol = "orange";
const initCol = ["#c71585", "#8B4513"]; // multi coloured for the elements in the array to alternate colour so as to improve readability
var p, steps = 0, oldsteps = 0, delay, go = 0;
var userEntry;
//declaring key variables to be used throughout the code


var statist = {
    n: 0, // Number of sorts
    t: 0,  // Total comparisons
    bubbleSorts: 0, // Total bubble sorts performed
    insertionSorts: 0, // Total insertion sorts performed
    selectionSorts: 0 // Total selection sorts performed
};

if (isLocalStorageAvailable()) {
    statist.n = localStorage.getItem('sorts') ? parseInt(localStorage.getItem('sorts'), 10) : 0;
    statist.t = localStorage.getItem('comparisons') ? parseInt(localStorage.getItem('comparisons'), 10) : 0;
    statist.bubbleSorts = localStorage.getItem('bubbleSorts') ? parseInt(localStorage.getItem('bubbleSorts'), 10) : 0;
    statist.insertionSorts = localStorage.getItem('insertionSorts') ? parseInt(localStorage.getItem('insertionSorts'), 10) : 0;
    statist.selectionSorts = localStorage.getItem('selectionSorts') ? parseInt(localStorage.getItem('selectionSorts'), 10) : 0;
} else {
    console.log('Local Storage is not available.');
}
//get the total sorts and comparisions from local storage if it is there

describe();
gen();
//used to provide a starting screen 


function gen() {
  if(isWorking) { return; }
  size = +(choiceSize.value);
  type = +(choiceType.value);
//getting the size of array wanted and type of algorithm wanted

  if(type == 3) {
    for(i = 0; i < size; i++) {
      arr[i] = {
        val: size - i,
        x: boxWidth * (i + 1),
        y: Math.floor(.8 * canva1.height),
        col: initCol[i % 2]
      };
    }
    console.log(arr.map(element => element.val));
  }
//Type 3 is used to generate a descending order set in order to show off worst case senarios


  if(type == 1) {
    for(i = 0; i < size; i++) {
      arr[i] = {
        val: Math.floor(1 + Math.random() * 9),
        x: boxWidth * (i + 1),
        y: Math.floor(.8 * canva1.height),
        col: initCol[i % 2]
      };
    }
    console.log(arr.map(element => element.val));
  }
  //type 1 is to randomly generate the array


  if(type == 4) {
    for(i = 0; i < size; i++) {
      arr[i] = {
        val: i + 1,
        x: boxWidth * (i + 1),
        y: Math.floor(.8 * canva1.height),
        col: initCol[i % 2]
      };
    }
    console.log(arr.map(element => element.val));
  }
  //type 4 is to generate a pre sorted array


  if(type == 2) {
    for(i = 0; i < size; i++) {
      userEntry = Number(validEntry(i)); // Pass current index to the function to get prompt
      arr[i] = {
        val: userEntry,
        x: boxWidth * (i + 1),
        y: Math.floor(.8 * canva1.height),
        col: initCol[i % 2]
      };
    }
    console.log(arr.map(element => element.val));
  }
  //type 2 is to ask the user for input to allow the user to pick the elements within the array
  
  steps = 0; oldsteps = 0;
  oldarr = JSON.parse(JSON.stringify(arr));
  display(arr);
  //this will set the steps to 0 once gen is run as this is to reset the array
  //old arr and old steps are used to be able to go back if the user selects the go back button
}

function describe() {
  if(choiceAlg.value == "Bubble") {
    buttonIds.forEach(id => document.getElementById(id).style.display = 'inline-block');
    resetStatsButton.style.display = 'none';
    Languages.style.display = 'block';
    // Showing the buttons to perform sort functions
    text1.value = "Bubble sort functions by iteratively going through the array for the number of elements within the array. It swaps as it goes moving the largest number it has found up the list until it reaches a larger number and then begins to bubble that up to the top. Once it has reached the top it then repeats this process for however many elements in the array there is. Due to this it has an average and worst case of O(n^2) and a best case in the event the numbers are already sorted of O(n). As it will not create any more variables besides from two to index the array as the list gets longer it has a space complexity of O(1).";
    if (chosenLang==1){
      text2.value=Bubblepseudo;
    }

  if (chosenLang==2){
      text2.value=BubblePython;
    }
  if (chosenLang==3){
      text2.value=BubbleJava;
    }
  }
  // pseudocode for bubble sort in text2 and how bubble sort works in text1

  if(choiceAlg.value == "Insertion") {
    buttonIds.forEach(id => document.getElementById(id).style.display = 'inline-block');
    resetStatsButton.style.display = 'none';
    Languages.style.display = 'block';
    // Showing the buttons to perform sort functions
    text1.value = "Insertion sort is an algorithm that functions by splitting the list into two sublists a sorted and unsorted. This starts from using the first element in the array as sorted and moving the pointer along while “inserting” new numbers into their correct order. Due to the more logical sorting, it will on average be faster than bubble sort however due to the two loops this again has a time complexity of O(n^2) both on average and on worst case. For the best case it will simply go through the array once so has a best case of O(n). It will only create few additional variables which will not change depending on the size thus it has a space complexity of O(1).";
    if (chosenLang==1){
      text2.value=InsertionSortpseudo;
    }

  if (chosenLang==2){
      text2.value=InsertionSortPython;
    }
  if (chosenLang==3){
      text2.value=InsertionSortJava;
    }
  }
  // pseudocode for insertion sort in text2 and how insertion sort works in text1

  if(choiceAlg.value == "Selection") {
    buttonIds.forEach(id => document.getElementById(id).style.display = 'inline-block');
    resetStatsButton.style.display = 'none';
    Languages.style.display = 'block';
    // Showing the buttons to perform sort functions
    text1.value = "Selection sort functions by iteratively going through the entire list to find the smallest element. This will then be swapped with the first element. This then repeats while not counting those already sorted smallest ones throughout the entire array until it is sorted. Due to the fact that selection sort must go through the whole array for the number of times there are numbers within the array the number of comparisons will be ((n^2)-n)/2 which in big O notation simplifies to O(n^2). This results in the time complexity of selection sort being O(n^2) regardless of how the array is originally sorted."; 
    if (chosenLang==1){
        text2.value=SelectionSortpseudo;
      }

    if (chosenLang==2){
        text2.value=SelectionSortPython;
      }
    if (chosenLang==3){
        text2.value=SelectionSortJava;
      }
  }
  // pseudocode for selection sort in text2 and how selection sort works in text1

  if(choiceAlg.value == "Statistics") {
    buttonIds.forEach(id => document.getElementById(id).style.display = 'none');
    resetStatsButton.style.display = 'inline-block';
    Languages.style.display = 'none'
    //Hiding the buttons to perform sort functions to reduce bugs 
    text1.value = "There have been " + statist.t + " compares over " + statist.n + " sorts. \n" + "There have been " + statist.bubbleSorts + " bubble sorts. \n" + "There have been " + statist.insertionSorts + " insertion sorts. \n" + "There have been " + statist.selectionSorts + " selection sorts.";
// this is to say how many sorts and comparisons have taken place

    if (statist.t == 0 && statist.n == 0) {
        text2.value = "This means overall there were an average of " + 0 + " swaps per sort";
    } 
    // Check to ensure that if no sorts have occured otherwise this will divide by 0 giving an error
    else {
        text2.value = "This means overall there were an average of " + (statist.t / statist.n) + " swaps per sort";
    }
  }
}

function display(item) {
  CanvaCont1.clearRect(0, 0, canva1.width, canva1.height); // Begins by clearing 
  CanvaCont1.fillStyle = "black";
  CanvaCont1.font = "8vw Monospace";
  CanvaCont1.fillText(steps, .9 * canva1.width, .5 * canva1.height); //Display the current step count
  CanvaCont1.font = "4vw Monospace";
  // Function to visually display the array and sorting steps
  
  //
  for(i = 0; i < size; i++) {
    CanvaCont1.fillStyle = item[i].col;


    if(chartType == 1) {
      CanvaCont1.fillRect(item[i].x, item[i].y, .95 * boxWidth, -.05 * canva1.height * item[i].val);
    }
    // If chart type one it wil draw bars 

    else {
      CanvaCont1.beginPath();
      CanvaCont1.arc(item[i].x + 10, item[i].y - 10, .45 * boxWidth, 0, 6.29);
      CanvaCont1.fill();
      CanvaCont1.lineWidth = 2;
      CanvaCont1.stroke();
      CanvaCont1.fillStyle = "pink";
      CanvaCont1.fillText(item[i].val, item[i].x, item[i].y);
    }
    // If not one it will draw circles with the number it represents contained within
  }
}

function onePlay() {
  go = 1;
  oneSort();
}
// Performs only a single sort due to go being 1, this is used to show one step


function longPlay() {
  go = 9999;
  oneSort();
}
// Performs up to 9999 sorts however will not reach that so can be used to show the full sort

function stopSort() {
  go = 0;
}
// sets go to 0 to stop the sort

function oneSort() {
  if(isWorking){
    return; 
  }
  // If the sort is already in progress then cancel this function calling
  if(fullySorted()){
    return;
  }
  // If the array is already sorted then cancel as well
  currentSortAlgorithm = choiceAlg.value;
  isWorking = true; //Used to show sorting has now begun
  oldarr = JSON.parse(JSON.stringify(arr));
  oldsteps = steps;
  // saves old array to be used on the back button 

  delay = (7 - +(speedDelay.value)) * 100;
  //delay based on user input

  if(choiceAlg.value == "Bubble") {
    bubbleSort();
  }
  if(choiceAlg.value == "Insertion") { 
    arr[0].col = sortCol; insertSort(sortedUpTo(arr));
  }
  if(choiceAlg.value == "Selection") {
    selectSort(sortedUpTo(arr));
  }
  // calls the sort required depending on what is asked
}


function fullySorted() {
  for(let d = 0; d < size; d++) {
    if(arr[d].col != sortCol) {
      return false;
    }
  }
  return true;
}
// iterative function to go through the array to check if it is sorted or not

function sortedUpTo(lookin) {
  for(let u = 0; u < size; u++) {
    if(lookin[u].col != sortCol) {
      return u;
    }
  }
  return (size + 1);
}
// Function used to find the position of unsorted element, if they are all sorted this will instead return a position outside the array 


function proceed() {
  isWorking = false; // resets the variable work to allow for new sorts to occur
  go--;
  if(go > 0) { oneSort(); }
  // reduces go by 1, if go is still then above 0 it will continue sorting
}

function selectSort(s) {
  if(s >= size - 1) {
     console.log(arr.map(element => element.val));
     finish(); return; 
    } 
    // Checks if the sort is complete and if so calls the finish function and returns

  arr[s].col = checkCol;
  display(arr);
  lowest = arr[s].val;
  lowPos = s;
  check = s + 1;
  while(check < size) {
    if(arr[check].val < lowest) { lowest = arr[check].val; lowPos = check; }
    check++;
    steps++;
  }
  
  if(lowPos != s) {
    arr[lowPos].col = wrongCol;
    setTimeout(function() { display(arr); }, .6 * delay);
  }
  // Loops through array to find number lower than variable S, S is marked as yellow and once a lower is found it is marked as red.

  setTimeout(function() { swap(s, lowPos); arr[lowPos].col = initCol[lowPos % 2]; arr[s].col = sortCol; display(arr); }, delay); // performs a swap and then pauses using a delay
  setTimeout(function() { proceed(); }, 1.5 * delay); // continues the sort after another delay
   // the delays are used here so the sort doesnt appear instantaneous and instead allows the users to see the swaps taking place
  
}

function insertSort(i) {  
  arr[i].col = checkCol; //highlights the element being sorted
  display(arr);
  arr[i].col = sortCol; // Marks the first element as being sorted
  check = i;
  
  while(check > 0) {
    steps++;
    if(arr[check - 1].val > arr[check].val) {
      swap(check - 1, check);
      check--;
    } else { break; }
  }
  // Cycles through rest of the array to find element to swap to if needed however if it is in the correct location break and no swaps are performed.

  if(i != check) { // If swaps have occured
    for(let z = 0; z < 7; z++) { 
      copy[z] = JSON.parse(JSON.stringify(arr)); // Creates copies of the array for the animation
      copy[z][check].y = copy[z][check].y * z / 6;
      copy[z][check].col = checkCol; // Highlight what is being sorted
      for(let slide = check + 1; slide <= i; slide++) {
        copy[z][slide].x -= boxWidth * (6 - z) / 7;
      }
      setTimeout(function() {
        display(copy[z]); // display each step of the animation with a delay so it doesnt happen instantly 
      }, (1 + .1 * z) * delay);
    }
  }
  setTimeout(function() { display(arr); }, 1.9 * delay); // updates display with the final state with delay
  if(i >= size - 1) {
     setTimeout(function() {console.log(arr.map(element => element.val)); finish(); }, 2 * delay); 
    } 
    // finish if array is sorted

  else {
     setTimeout(function() { proceed(); }, 2 * delay); 
    } 
    // If not fully sorted continue sorting after delay
}

function bubbleSort() {  
  p = 0; // Makes pointer position the first element
  sorted = true; // asssumes the array is sorted
  bubble(); // Starts the bubble sort
}

function bubble() {
  if(p > size - 2 || arr[p + 1].col == sortCol) { // check if sorting is already complete
    arr[p].col = sortCol;
    display(arr);
    if(sorted) { console.log(arr.map(element => element.val)); finish(); return; } // if array already sorted calls finish otherwise returns
    else { setTimeout(function() { proceed(); }, delay); return; } // Otherwise continue on with sorting
  }
  steps++;
 
  if(arr[p + 1].val < arr[p].val) { // check is a swap is needed
    sorted = false;
    arr[p].col = wrongCol;
    arr[p + 1].col = wrongCol;
    // if true sets sorted to false to indicate the array is not sorted, highlights both elements are unsorted
      
    for(let z = 0; z < 7; z++) { 
      copy[z] = JSON.parse(JSON.stringify(arr));
      copy[z][p].x += boxWidth * z / 6;
      copy[z][p + 1].x -= boxWidth * z / 6;
      // animates the required swap 
      setTimeout(function() {
        display(copy[z]);
        //display each step of the animation
      }, .1 * z * delay);      
    }
    swap(p, p + 1);
    //peforms the swap on the array 
  } 
  
  else { // else if no swap is needed
    arr[p].col = sortCol; 
    arr[p + 1].col = sortCol;
    display(arr);
    // changes colours to show correct and then updates the display
  }
    
  arr[p].col = initCol[p % 2];
  arr[p + 1].col = initCol[(p + 1) % 2];
  // This ensures elements keep the correct colour for their position after a swap 

  if(p == size - 2 || arr[p + 2].col == sortCol) {
     arr[p + 1].col = sortCol; 
    }
    // Marks the next element as sorted if end of array is reached
  setTimeout(function() { display(arr); }, .7 * delay);
  setTimeout(function() { p++; bubble(); }, delay);
}

function swap(a, b) {
  temp = arr[a].val;
  arr[a].val = arr[b].val;
  arr[b].val = temp;
}
//function to swap using a temporary variable 

function back() {
  arr = JSON.parse(JSON.stringify(oldarr)); 
  steps = oldsteps;
  display(arr);
}
// This sets the array and steps to what it used to be and then updates the display to show this

function chart() {
  chartType = -chartType;
  display(arr);
} 
// Variable used to toggle between the chart type allowing for circles and bars

function finish() {
  if(currentSortAlgorithm) {
    switch(currentSortAlgorithm) {
      case "Bubble":
        statist.bubbleSorts++;
        break;
      case "Insertion":
        statist.insertionSorts++;
        break;
      case "Selection":
        statist.selectionSorts++;
        break;
    }
    currentSortAlgorithm = "";
  }

  statist.n++;
  statist.t += steps;
  if (isLocalStorageAvailable()) {
    localStorage.setItem('sorts', statist.n.toString());
    localStorage.setItem('comparisons', statist.t.toString());
    localStorage.setItem('bubbleSorts', statist.bubbleSorts.toString());
    localStorage.setItem('insertionSorts', statist.insertionSorts.toString());
    localStorage.setItem('selectionSorts', statist.selectionSorts.toString());
  }
  // Adds the total sorts and comparisons to local storage if avaiable 


  for(let f = 0; f < size; f++) { arr[f].col = sortCol; } // marks all elements as sorted
  display(arr); 
  steps = 0;
  isWorking = false;
  go = 0;
  // sets the steps to 0 and working to false to ready for next swap 
}

function confirmReset() {
  const isConfirmed = confirm("Are you sure you wish to reset the statistics?");
  if (isConfirmed) {
    clearStatistics(); 
  } 
  else {
    console.log("Reset cancelled by user.");
  }
}
// Check to confirm user wishes to reset the stats to remove accidential clicks


function clearStatistics() {
  if (isLocalStorageAvailable()) {
    localStorage.clear();
    statist.n = 0;
    statist.t = 0;
    statist.bubbleSorts  = 0;
    statist.insertionSorts = 0;
    statist.selectionSorts = 0;

    describe();
    // resets the statistics within local storage
  } else {
    console.log('Local Storage is not available.');
  }
}

function isLocalStorageAvailable() {
  var test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch(e) {
    return false;
  }
  // check to see if local storage is avaliable by using a temp element named test and then removing it, if any errors arrise then it will return the function as false 
}
//https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available


function changeCodeDisplay(Lang){
  switch(Lang)
  {
    case 1:
      chosenLang = 1;
      console.log(chosenLang)
      describe()
      break;
    case 2:
      chosenLang = 2;
      console.log(chosenLang)
      describe()
      break;
    case 3:
      chosenLang = 3;
      console.log(chosenLang)
      describe()
      break;
  }

}

function validEntry(index) {
  var isValid = false; // Flag to check if input is valid
  var userInput;

  while (!isValid) {
      userInput = prompt("Enter item " + (index + 1) + "\n (number must be greater than 0 and less than 50):");
      let num = Number(userInput); // Convert input to number
      if(!isNaN(num) && num > 0 && num < 50) {
          isValid = true; // Input is valid
      } 
      else {
          alert("Invalid input. Please enter a number greater than 0 and less than 50.");
      }
  }

  return Number(userInput); // Return the valid input as a number
}
// Function to get user's input
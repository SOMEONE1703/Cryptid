//should implement the game rules and let us play, ideally
round = 0;
turnList = ["red", "green", "orange", "blue", "purple"];
turn = 0;
var initTurn = document.getElementsByClassName(turnList[turn]);
initTurn[0].style.backgroundColor = "red";
searching = false;
temporaryTurn = -1;
var posOfAskedCell = "";

document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll(".color").forEach((div) => {
    div.addEventListener("click", function () {
      if (ask == true && searching == false) {
        // Remove the background color from all divs
        document
          .querySelectorAll(".color")
          .forEach((d) => (d.style.backgroundColor = ""));
        // Set the background color to the color specified in the class list
        const colorClass = this.classList[1];
        temporaryTurn = turnList.indexOf(colorClass);
        console.log("This is my temporay " + temporaryTurn);
        this.style.backgroundColor = colorClass;
      }
    });
  });
});

function cellClicked(cellClass) {
  var cells = document.getElementsByClassName(cellClass);
  var cell = cells[0];
  var classesArray = Array.from(cell.classList);

  if (round < 2) {
    var shapeDiv = createPiece("square", turn);
    var classToAdd = turnList[turn];
    if (
      !classesArray.includes("c" + classToAdd) &&
      !classesArray.includes("neg")
    ) {
      cell.classList.add("c" + turnList[turn]);
      cell.classList.add("neg");
      cell.classList.add("n" + turnList[turn]);
      processTurn();
      cell.appendChild(shapeDiv);
    }
  } else {
    if (ask == false && !classesArray.includes("neg")) {
      cell.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      cell.classList.add("askedCell");
      posOfAskedCell = cellClass;
      ask = true;
      load_question_options();
    }
  }
}

function yes() {
  console.log("yes clicked");
  var cells = document.getElementsByClassName(posOfAskedCell);
  var cell = cells[0];
  var classesArray = Array.from(cell.classList);
  var shapeDiv = createPiece("circle", temporaryTurn);
  var classToAdd = turnList[temporaryTurn];
  if (
    !classesArray.includes("c" + classToAdd) &&
    !classesArray.includes("neg") &&
    turn != temporaryTurn &&
    temporaryTurn != -1
  ) {
    console.log(turn + "vs" + temporaryTurn);
    cell.classList.add("c" + turnList[temporaryTurn]);
    cell.classList.add("p" + turnList[temporaryTurn]);
    cell.appendChild(shapeDiv);
    cell.style.backgroundColor = "#80808000";
    ask = false;
    document
      .querySelectorAll(".color")
      .forEach((d) => (d.style.backgroundColor = ""));
    processTurn();
  } else if (searching == true && !classesArray.includes("neg")) {
    if (!classesArray.includes("c" + turnList[turn])) {
      shapeDiv = createPiece("circle", turn);
      console.log(turn + "vs" + temporaryTurn);
      cell.classList.add("c" + turnList[turn]);
      cell.classList.add("p" + turnList[turn]);
      cell.appendChild(shapeDiv);
      document
        .querySelectorAll(".color")
        .forEach((d) => (d.style.backgroundColor = ""));
      processTurn();
    } else {
      processTurn();
    }
  }
}

function no() {
  console.log("no clicked");
  var cells = document.getElementsByClassName(posOfAskedCell);
  var cell = cells[0];
  var classesArray = Array.from(cell.classList);
  var shapeDiv = createPiece("square", temporaryTurn);
  var classToAdd = turnList[temporaryTurn];
  if (searching == true) classToAdd = turnList[turn];
  if (
    !classesArray.includes("c" + classToAdd) &&
    !classesArray.includes("neg") &&
    (turn != temporaryTurn || searching == true) &&
    (temporaryTurn != -1 || searching == true)
  ) {
    console.log("We are good");
    if (searching == true) {
      temporaryTurn = turn;
      shapeDiv = createPiece("square", temporaryTurn);
    }
    cell.classList.add("c" + turnList[temporaryTurn]);
    cell.classList.add("n" + turnList[temporaryTurn]);
    cell.classList.add("neg");
    cell.appendChild(shapeDiv);
    cell.style.backgroundColor = "#80808000";
    ask = false;
    searching = false;
    document
      .querySelectorAll(".color")
      .forEach((d) => (d.style.backgroundColor = ""));
    processTurn();
  }
}

function createPiece(shape, turn) {
  var shapeDiv = document.createElement("div");
  shapeDiv.style.width = "20%"; // Adjust width as needed
  shapeDiv.style.aspectRatio = "1/1"; // Adjust height as needed
  shapeDiv.style.backgroundColor = turnList[turn];
  if (shape == "square") {
    shapeDiv.classList.add("square");
  } else {
    shapeDiv.classList.add("circle");
    shapeDiv.style.borderRadius = "50%";
  }
  return shapeDiv;
}

function processTurn() {
  turn++;
  if (turn == 5) {
    turn = 0;
    round++;
  }
  var prev = turn - 1;
  if (prev == -1) prev = 4;
  var currentTurn = document.getElementsByClassName(turnList[turn]);
  currentTurn[0].style.backgroundColor = turnList[turn];
  var prevTurn = document.getElementsByClassName(turnList[prev]);
  prevTurn[0].style.backgroundColor = "";
}

function search() {
  //searching=true;
  if (searching == false) {
    console.log("search clicked");
    var cells = document.getElementsByClassName(posOfAskedCell);
    var cell = cells[0];
    var classesArray = Array.from(cell.classList);
    var shapeDiv = createPiece("circle", turn);
    var classToAdd = turnList[turn];
    if (!classesArray.includes("neg")) {
      if (!classesArray.includes("c" + classToAdd)) {
        console.log(turn + "vs" + turn);
        cell.classList.add("c" + turnList[turn]);
        cell.classList.add("p" + turnList[turn]);
        cell.appendChild(shapeDiv);
        //cell.style.backgroundColor = "#80808000";
        //ask = false;
        document
          .querySelectorAll(".color")
          .forEach((d) => (d.style.backgroundColor = ""));
      }
      processTurn();
      searching = true;
    }
  }
}

function load_possible_actions() {
  let one = document.createElement("button");
  one.className = "actions";
  one.textContent = "Question";
  one.addEventListener("click", () => {
    console.log("Questioning");
    bq = turn;
    questioning = true;
    question_mark(uhm);
    load_question_options();
  });

  let two = document.createElement("span");
  two.style.width = "10px";

  let three = document.createElement("button");
  three.className = "actions";
  three.textContent = "Search";
  three.addEventListener("click", () => {
    console.log("Searching");
    bq = turn;
    searcher = turnList[turn];
    search_turn = turn;
    search_count = 0;
    searching = true;
    search_mark(uhm);
    start_search();
    process_search_turn();
  });

  let four = document.getElementById("buttons");
  four.replaceChildren();
  four.appendChild(one);
  four.appendChild(two);
  four.appendChild(three);
}

function load_question_options() {
  let one = document.createElement("div");
  one.className = "circs";
  one.textContent = "Search";
  one.addEventListener("click", () => {
    console.log("Questioning");
    bq = turn;
    questioning = true;
    question_mark(uhm);
    load_question_options();
  });

  let h = document.getElementById("buttons");
  h.replaceChildren();
  h.appendChild(one);
  for (let i = 0; i < turnList.length; i++) {
    if (turnList[turn] == turnList[i]) {
      continue;
    }
    let r = document.createElement("div");
    r.className = "circs";
    r.style.backgroundColor = turnList[i];
    r.textContent = `Player${i + 1}`;
    r.addEventListener("click", () => {
      questioned = r.style.backgroundColor;
      console.log(`${questioned}, questioned`);
      document.getElementById("butts").replaceChildren();
      load_possible_answers();
      start_quest();
    });

    h.appendChild(r);
  }
}

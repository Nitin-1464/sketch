const NewEL = (sel, prop) => Object.assign(document.createElement(sel), prop);
//grid box creat
const EL_grid = document.querySelector("#grid");
 //Erase
const EL_clear = document.querySelector("#erase");

const EL_color = document.querySelector("[name=color]");

const EL_size = document.querySelector("[name=size]");

let size = parseInt(EL_size.value, 10);
let color = "black";
let isPenDown = false;

function makeGrid() {
  EL_grid.innerHTML = ""; 
  
  // Clear current grid!
  for (let i = 0; i < size ** 2; i++) {
    EL_grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    EL_grid.append(NewEL("div", {
      className: "box",
      onmousedown()  { isPenDown = true; paint(this); },
      onmouseup()    { isPenDown = false; },
      onmouseenter() { if (isPenDown) paint(this); },
    }));
  }
};

function paint(EL) {
  EL.style.backgroundColor = color;  
}

EL_clear.addEventListener("click", () => {
  const tmp_color = color; 
  
  // Remember current color
  color = "transparent";  
   
  // Temporarily set it to transparent
  EL_grid.querySelectorAll(".box").forEach(paint); // Paint all cells as transparent
  color = tmp_color;      
  
  
});


  //* Reset as it was before.
EL_color.addEventListener("change", () => {
  color = EL_color.value;
  if (color === "random") color = `hsl(${~~(Math.random() * 360)}, 80%, 50%)`;
});

EL_size.addEventListener("change", () => {
  size = parseInt(EL_size.value, 10);
  makeGrid();
});

// INIT!
makeGrid();

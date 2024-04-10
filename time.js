const TimeObj=[
  {
    category:"work",
    sub_category:"project",
    duration:40,
    task:"documentation"
},{
    category:"personal work",
    sub_category:"Meeting",
    duration:20,
    task:"documentation"
},{
    category:"work",
    sub_category:"Meeting",
    duration:20,
    task:"daily scrum"
},{
    category:"personal work",
    sub_category:"project",
    duration:30,
    task:"documentation"
},{
    category:"work",
    sub_category:"Meeting",
    duration:50,
    task:"documentation"
},{
    category:"work",
    sub_category:"Meeting",
    duration:60,
    task:"daily scrum"
},{
    category:"work",
    sub_category:"project",
    duration:10,
    task:"client meeting"
},{
    category:"work",
    sub_category:"Meeting",
    duration:10,
    task:"client meeting"
}
]


function insertTable(taskData) {
    var tableBody = document.querySelector("#taskTable tbody");
    tableBody.innerHTML = "";
    taskData.forEach(function(task,index) {
      var row = "<tr>";
      row += "<td>" + task.category + "</td>";
      row += "<td>" + task.sub_category + "</td>";
      row += "<td>" + task.duration + "</td>";
      row += "<td>" + task.task + "</td>";
      row += `<td><button class='update' data-index=${index}>update</button></td>`;
      row += `<td><button class='delete' data-index=${index}>delete</button></td>`;
      row += "</tr>";
      tableBody.innerHTML += row;
    });
      var delButtons = document.querySelectorAll(".delete");
      delButtons.forEach(function(button) {
          button.addEventListener('click', function() {
              var idToDelete = parseInt(button.getAttribute("data-index"));
              // console.log("Delete ID:", idToDelete);
              TimeObj.splice(idToDelete,1);
              insertTable(TimeObj);
          });
      });
      var updatebuttons = document.querySelectorAll(".update");

      updatebuttons.forEach(function(button){
      
        button.addEventListener('click',function updateHandler(){
          var idToUpdate = parseInt(button.getAttribute("data-index"));
          var updateobj=TimeObj[idToUpdate];
          document.querySelector("#selectcat").value=updateobj.category;
          document.querySelector("#sub_category").value=updateobj.sub_category;
          document.querySelector("#task").value=updateobj.task;
          var updateTaskButton= document.querySelector("#updatetask");
          updateTaskButton.removeEventListener("click", updateHandler);
          updateTaskButton.addEventListener("click",function uphand(){
            TimeObj[idToUpdate] = {
              category: document.getElementById("selectcat").value,
              sub_category: document.getElementById("sub_category").value,
              duration:counttime,
              task: document.getElementById("task").value
          };
            updateTaskButton.removeEventListener("click", uphand);
            insertTable(TimeObj);
          })
        })
      })
  }
  insertTable(TimeObj);

  function filterTasks(cat) {
    var filteredTasks = TimeObj.filter(function(task) {
      return (!cat || task.category === cat);
    });
    insertTable(filteredTasks);
  }
  document.getElementById("filterForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var category = document.getElementById("category").value;
    filterTasks(category);
  });
  var count=document.querySelector("p");
  var btnstop=document.querySelector("#stop");
  var btnreset=document.querySelector("#reset");
  
  timer=false;
  var sec=1;
  var hr=0;
  var min=0;
  btnstop.addEventListener('click',(e)=>{
    e.preventDefault();
      if(btnstop.textContent=="stop")btnstop.textContent="start";
      else btnstop.textContent="stop";
      timer=!timer;
  })
  
  btnreset.addEventListener('click',()=>{count.textContent="00:00:00"; 
  timer=false
  sec=0;
  min=0;
  hr=0;
  btnstop.textContent="start"
  });
  
  setInterval(()=>{if(timer){
   if(sec==60){
      sec=0;
      min++;
   }
   if(min==60){
      sec=0;
      min=0;
      hr++;
   }
    counttime=`${hr.toString().padStart(2,0)}:${min.toString().padStart(2,0)}:${(sec++).toString().padStart(2,0)}`;
   count.textContent=`${hr.toString().padStart(2,0)}:${min.toString().padStart(2,0)}:${(sec++).toString().padStart(2,0)}`;
  }},1000);

  document.querySelector(".formtask").addEventListener("submit",(e)=>{
    e.preventDefault();
    TimeObj.push({
      category:document.getElementById("selectcat").value,
      sub_category:document.getElementById("sub_category").value,
      duration:this.counttime,
      task:document.getElementById("task").value
  });
    insertTable(TimeObj);
  })
var E_Manager = require('./E_Manager.js');


///WEBIX LAYOUT

/// Left Menu
//Toolbar
var l_toolBar = {view:"toolbar",
                elements:[
                  //Toggle Run Random Learning
                  { id:"ID_TOGGLE_TRAINNING",view:"toggle", type:"iconButton", name:"s4", width:150,
                      offIcon:"play",  onIcon:"pause",
                      offLabel:"Run Trainning", onLabel:"Stop Trainning"
                  },

                  {id:"ID_UPLOAD_OBJ", view:"button", value:"Upload OBJ", width:250},
                  {id:"ID_UPLOAD_STL", view:"button", value:"Upload STL", width:250}
                ]};


//Left Viewport : Visualize Original Mesh
var l_leftMenu = {id:"ID_VIEW_LEFT", view:"template"};

//Right Viewport : Visuzlize Voxelized Mesh
var l_rightMenu = {id:"ID_VIEW_RIGHT", view:"template"};

//Log Menuv
var l_logMenu = {id:"ID_LOG", view:"template", gravity:0.5};

var layout = new webix.ui({
  rows:[
    l_toolBar,
    {
      cols:[
        l_leftMenu,
        {view:"resizer"},
        l_rightMenu
      ]
    },
    {view:"resizer"},
    l_logMenu
  ]
})



//Initialize Manager
var Manager = new E_Manager();


///IO event
window.addEventListener("resize", function(){
  Manager.UpdateWindowSize();
  Manager.Redraw();
});

$$("ID_VIEW_LEFT").attachEvent("onViewResize", function(){
  Manager.UpdateWindowSize();
  Manager.Redraw();
});

$$("ID_VIEW_RIGHT").attachEvent("onViewResize", function(){
  Manager.UpdateWindowSize();
  Manager.Redraw();
});

$$("ID_LOG").attachEvent("onViewResize", function(){
  Manager.UpdateWindowSize();
  Manager.Redraw();
});



$$("ID_TOGGLE_TRAINNING").attachEvent("onItemClick", function(id){
  Manager.OnRunTrainning(this.getValue());
});



///OBJ
$$("ID_UPLOAD_OBJ").attachEvent("onItemClick", function(){
  var parent = this.getNode().childNodes[0];

  //Create File Dialog
  var fileDialog = document.createElement("input");
  fileDialog.setAttribute("type", "file");
  //fileDialog.setAttribute("multiple", true);
  fileDialog.click();
  parent.appendChild(fileDialog);

  fileDialog.addEventListener("change", function(ev){

    var path = URL.createObjectURL(ev.target.files[0]);
    Manager.ImportMesh(path);

  });
  parent.removeChild(fileDialog);
});


///STL
$$("ID_UPLOAD_STL").attachEvent("onItemClick", function(){
  var parent = this.getNode().childNodes[0];

  //Create File Dialog
  var fileDialog = document.createElement("input");
  fileDialog.setAttribute("type", "file");
  //fileDialog.setAttribute("multiple", true);
  fileDialog.click();
  parent.appendChild(fileDialog);

  fileDialog.addEventListener("change", function(ev){

    var path = URL.createObjectURL(ev.target.files[0]);
    Manager.ImportSTL(path);

  });
  parent.removeChild(fileDialog);
});

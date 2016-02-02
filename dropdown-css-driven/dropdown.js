(function(window) {
  var customDropDown = function() {
    return this;
  };

  customDropDown.prototype.LoadData = function(data, title) {
    var menuButton = document.querySelector(".dropdown");
    if (!menuButton) return;

    clear(menuButton);
    setup(menuButton, title, data);
  };

  function clear(root) {
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
  }

  function setup(root, title, data) {
    var dropDownName = document.createElement("span");
    dropDownName.textContent = title;
    root.appendChild(dropDownName);
    
    var menu = addMenu(root);
    for (var entry in data) {
      if (data.hasOwnProperty(entry)) {
        addChildren(addMenuItem(menu, entry), data[entry]);
      }
    }
  }

  function addMenuItem(parent, value) {
    var listItem = document.createElement("li");
    listItem.textContent = value;
    listItem.className = 'menu-item';
    parent.appendChild(listItem);
    return listItem;
  }

  function addMenu(parent) {
    var menu = document.createElement("ul");
    menu.className += " dropdown__menu";
    parent.appendChild(menu);
    return menu;
  }

  function addSubMenu(parent) {
    var menu = addMenu(parent);
    menu.className += " dropdown__menu--sub";
    return menu;
  }

  function addChildren(parent, children) {
    if (!children || children && Object.keys(children).length === 0) {
      return;
    }

    var subMenu = addSubMenu(parent);
    for (var entry in children) {
      if (children.hasOwnProperty(entry)) {
        addChildren(addMenuItem(subMenu, entry), children[entry]);
      }
    }
  }

  window.CustomDropDown = customDropDown;
})(window);

var artificalData = {
  'WA': {
    'Tacoma': {},
    'Seattle': {},
    'Kirkland': {},
    'Redmond': {},
    'Issquaiah': {}
  },
  'TX': {},
  'LA': {},
  'NY': {},
  'CA': {}
};

var dropDown = new window.CustomDropDown();
dropDown.LoadData(artificalData, 'Locations');
(function(window) {
  var customDropDown = function() {
    return this;
  };

  customDropDown.prototype.LoadData = function(data, title) {
    var dropdown = document.querySelector(".dropdown");
    if (!dropdown) return;

    clear(dropdown);
    setup(dropdown, title, data);
  };

  function clear(root) {
    cleanupAllBehaviour(root);
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
    setupBehaviour(parent);
    return menu;
  }

  function addSubMenu(parent) {
    var menu = addMenu(parent);
    menu.className += " dropdown__menu--sub";
    return menu;
  }

  function addChildren(parent, children) {
    if (!children || children && Object.keys(children).length === 0) {
      setupBehaviour(parent);
      return;
    }

    var subMenu = addSubMenu(parent);
    for (var entry in children) {
      if (children.hasOwnProperty(entry)) {
        addChildren(addMenuItem(subMenu, entry), children[entry]);
      }
    }
  }

  function mouseover(event) {
    var element = event.currentTarget;
    element.classList.add('menu__item--hover');
    for (var i = 0; i < element.children.length; i++) {
      var child = element.children[i];
      if (child.nodeName === 'UL') {
        child.classList.add('dropdown__menu--hover');
      }
    }
  }

  function mouseout(event) {
    var element = event.currentTarget;
    element.classList.remove('menu__item--hover');

    for (var i = 0; i < element.children.length; i++) {
      var child = element.children[i];
      if (child.nodeName === 'UL') {
        child.classList.remove('dropdown__menu--hover');
      }
    }
  }

  function setupBehaviour(element) {
    element.addEventListener("mouseover", mouseover, false);
    element.addEventListener("mouseout", mouseout, false);
  }

  function removeBehaviour(element) {
    element.removeEventListener("mouseover", mouseover, false);
    element.removeEventListener("mouseout", mouseout, false);
  }

  function cleanupAllBehaviour(dropdown) {
    removeBehaviour(dropdown);
    var menuItems = dropdown.querySelectorAll(".menu-item");
    if (!menuItems || menuItems && menuItems.length === 0) return;

    for (var i = 0; i < menuItems.length; i++) {
      var child = menuItems[i].firstChild;
      if (child) {
        removeBehaviour(child);
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
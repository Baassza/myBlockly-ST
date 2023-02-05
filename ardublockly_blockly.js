
'use strict';
var Ardublockly = Ardublockly || {};
Ardublockly.workspace = null;

Ardublockly.xmlTree = null;
Ardublockly.injectBlockly = function(blocklyEl, toolboxXml, blocklyPath) {
  if (blocklyPath.substr(-1) === '/') {
    blocklyPath = blocklyPath.slice(0, -1);
  }
  Ardublockly.xmlTree = Blockly.Xml.textToDom(toolboxXml);
  Ardublockly.workspace = Blockly.inject(blocklyEl, {
      collapse: true,
      comments: true,
      css: true,
      disable: true,
      grid: false,
      maxBlocks: Infinity,
      media: blocklyPath + '/media/',
      rtl: false,
      scrollbars: true,
      sounds: true,
      toolbox: Ardublockly.xmlTree,
      trashcan: true,
      zoom: {
        controls: true,
        wheel: false,
        startScale: 1.0,
        maxScale: 2,
        minScale: 0.2,
        scaleSpeed: 1.2
      }
  });
  Ardublockly.loadSessionStorageBlocks();
};

/** Binds the event listeners relevant to Blockly. */
Ardublockly.bindBlocklyEventListeners = function() {
  Ardublockly.workspace.addChangeListener(function(event) {
    if (event.type != Blockly.Events.UI) {
      Ardublockly.renderContent();
    }
  });
  window.addEventListener('resize',
      function() { Blockly.asyncSvgResize(Ardublockly.workspace); }, false);
};

Ardublockly.generateST = function() {
  return Blockly.ST.workspaceToCode(Ardublockly.workspace);
};

/** @return {!string} Generated XML code from the Blockly workspace. */
Ardublockly.generateXml = function() {
  var xmlDom = Blockly.Xml.workspaceToDom(Ardublockly.workspace);
  return Blockly.Xml.domToPrettyText(xmlDom);
};

Ardublockly.loadXmlBlockFile = function(xmlFile, cbSuccess, cbError) {
  var request = Ardublockly.ajaxRequest();
  var requestCb = function() {
    if (request.readyState == 4) {
      if (request.status == 200) {
        var success = Ardublockly.replaceBlocksfromXml(request.responseText);
        cbSuccess(success);
      } else {
        cbError();
      }
    }
  };
  try {
    request.open('GET', xmlFile, true);
    request.onreadystatechange = requestCb;
    request.send(null);
  } catch (e) {
    cbError();
  }
};

Ardublockly.replaceBlocksfromXml = function(blocksXml) {
  var xmlDom = null;
  try {
    xmlDom = Blockly.Xml.textToDom(blocksXml);
  } catch (e) {
    return false;
  }
  Ardublockly.workspace.clear();
  var sucess = false;
  if (xmlDom) {
    sucess = Ardublockly.loadBlocksfromXmlDom(xmlDom);
  }
  return sucess;
};

Ardublockly.loadBlocksfromXmlDom = function(blocksXmlDom) {
  try {
    Blockly.Xml.domToWorkspace(blocksXmlDom, Ardublockly.workspace);
  } catch (e) {
    return false;
  }
  return true;
};

Ardublockly.saveSessionStorageBlocks = function() {
  if (window.sessionStorage) {
    var xml = Blockly.Xml.workspaceToDom(Ardublockly.workspace);
    var text = Blockly.Xml.domToText(xml);
    window.sessionStorage.loadOnceBlocks = text;
  }
};

Ardublockly.loadSessionStorageBlocks = function() {
  try {
    var loadOnce = window.sessionStorage.loadOnceBlocks;
  } catch (e) {
    var loadOnce = null;
  }
  if (loadOnce) {
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(loadOnce);
    Blockly.Xml.domToWorkspace(xml, Ardublockly.workspace);
  }
};

Ardublockly.discardAllBlocks = function() {
    Ardublockly.workspace.clear();
    Ardublockly.renderContent();
};

/** @return {!boolean} Indicates if the Blockly workspace has blocks. */
Ardublockly.isWorkspaceEmpty = function() {
  return Ardublockly.workspace.getAllBlocks().length ? false : true;
};

/**
 * Changes the Arduino board profile if different from the currently set one.
 * @param {string} newBoard Name of the new profile to set.
 */
Ardublockly.changeBlocklyArduinoBoard = function(newBoard) {
  if (Blockly.Arduino.Boards.selected !== Blockly.Arduino.Boards[newBoard]) {
    Blockly.Arduino.Boards.changeBoard(Ardublockly.workspace, newBoard);
  }
};


/**
 * Adds a category to the current toolbox.
 * @param {!string} categoryTitle Toolbox category title.
 * @param {!Element} categoryDom Toolbox category to add add the end of tree.
 */
Ardublockly.addToolboxCategory = function(categoryTitle, categoryDom) {
  categoryDom.id = 'cat' + categoryTitle.replace(/\s+/g, '');
  categoryDom.setAttribute('name', categoryTitle);
  Ardublockly.xmlTree.appendChild(document.createElement('sep'));
  Ardublockly.xmlTree.appendChild(categoryDom);
  Ardublockly.workspace.updateToolbox(Ardublockly.xmlTree);
};

/**
 * Removes a category to the current toolbox.
 * @param {!String} categoryTitle Toolbox category name to remove from tree.
 */
Ardublockly.removeToolboxCategory = function(categoryTitle) {
  var categoryId = 'cat' + categoryTitle.replace(/\s+/g, '');
  var categoryNodes = Ardublockly.xmlTree.getElementsByTagName('category');
  for (var i = 0; i < categoryNodes.length; i++) {
    if (categoryNodes[i].getAttribute('id') === categoryId) {
      var previousNode = categoryNodes[i].previousElementSibling;
      Ardublockly.xmlTree.removeChild(categoryNodes[i]);
      if (previousNode && previousNode.nodeName == 'sep') {
        Ardublockly.xmlTree.removeChild(previousNode);
      }
    }
  }
  Ardublockly.workspace.updateToolbox(Ardublockly.xmlTree);
};

/** Closes the toolbox block container sub-menu. */
Ardublockly.blocklyCloseToolbox = function() {
  Ardublockly.workspace.toolbox_.flyout_.hide();
};

/** @return {!integer} The width of the blockly workspace toolbox. */
Ardublockly.blocklyToolboxWidth = function() {
  return Ardublockly.workspace.toolbox_.width;
};

/** @return {!boolean} Indicates if a block is currently being dragged. */
Ardublockly.blocklyIsDragging = function() {
  return (Blockly.dragMode_ != 0) ? true : false;
};

/** Wraps the blockly 'cut' functionality. */
Ardublockly.blocklyCut = function() {
  if (Blockly.selected) {
    Blockly.copy_(Blockly.selected);
    Blockly.selected.dispose(true, true);
  }
};

/** Wraps the blockly 'copy' functionality. */
Ardublockly.blocklyCopy = function() {
  if (Blockly.selected) {
    Blockly.copy_(Blockly.selected);
  }
};

/** Wraps the blockly 'paste' functionality. */
Ardublockly.blocklyPaste = function() {
  if (Blockly.clipboardXml_) {
    Blockly.hideChaff();
    Blockly.clipboardSource_.paste(Blockly.clipboardXml_);
  }
};

/** Wraps the blockly 'delete' functionality. */
Ardublockly.blocklyDelete = function() {
  if (Blockly.selected && Blockly.selected.isDeletable()) {
    Blockly.hideChaff();
    Blockly.selected.dispose(true, true);
  }
};

/** @return {XMLHttpRequest} An XML HTTP Request multi-browser compatible. */
Ardublockly.ajaxRequest = function() {
  var request;
  try {
    // Firefox, Chrome, IE7+, Opera, Safari
    request = new XMLHttpRequest();
  } catch (e) {
    try {
      // IE6 and earlier
      request = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
      try {
        request = new ActiveXObject('Microsoft.XMLHTTP');
      } catch (e) {
        throw 'Your browser does not support AJAX';
        request = null;
      }
    }
  }
  return request;
};

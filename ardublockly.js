
'use strict';
var Ardublockly = Ardublockly || {};
Ardublockly.init = function() {
  Ardublockly.injectBlockly(document.getElementById('content_blocks'), Ardublockly.TOOLBOX_XML, '../blockly/');
  Ardublockly.designJsInit();
  Ardublockly.bindDesignEventListeners();
  Ardublockly.bindActionFunctions();
  Ardublockly.bindBlocklyEventListeners();
};

Ardublockly.bindActionFunctions = function() {
  Ardublockly.bindClick_('button_load', Ardublockly.loadUserXmlFile);
  Ardublockly.bindClick_('button_save', Ardublockly.saveXmlFile);
  Ardublockly.bindClick_('button_delete', Ardublockly.discardAllBlocks);
  Ardublockly.bindClick_('button_load_xml', Ardublockly.XmlTextareaToBlocks);
};


Ardublockly.loadUserXmlFile = function() {
  var parseInputXMLfile = function(e) {
    var xmlFile = e.target.files[0];
    var filename = xmlFile.name;
    var extensionPosition = filename.lastIndexOf('.');
    if (extensionPosition !== -1) {
      filename = filename.substr(0, extensionPosition);
    }
    var reader = new FileReader();
    reader.onload = function() {
      var success = Ardublockly.replaceBlocksfromXml(reader.result);
      if (success) {
        Ardublockly.renderContent();
        Ardublockly.sketchNameSet(filename);
      }
    };
    reader.readAsText(xmlFile);
  };
  var selectFile = document.getElementById('select_file');
  if (selectFile === null) {
    var selectFileDom = document.createElement('INPUT');
    selectFileDom.type = 'file';
    selectFileDom.id = 'select_file';
    var selectFileWrapperDom = document.createElement('DIV');
    selectFileWrapperDom.id = 'select_file_wrapper';
    selectFileWrapperDom.style.display = 'none';
    selectFileWrapperDom.appendChild(selectFileDom);
    document.body.appendChild(selectFileWrapperDom);
    selectFile = document.getElementById('select_file');
    selectFile.addEventListener('change', parseInputXMLfile, false);
  }
  selectFile.click();
};

Ardublockly.saveXmlFile = function() {
  Ardublockly.saveTextFileAs(
      document.getElementById('sketch_name').value + '.xml',
      Ardublockly.generateXml());
};

Ardublockly.saveTextFileAs = function(fileName, content) {
  const a = document.createElement('a');
  const file = new Blob([content], {type: 'text/plain'});
  a.href= URL.createObjectURL(file);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
};


Ardublockly.XmlTextareaToBlocks = function() {
  var success = Ardublockly.replaceBlocksfromXml(
      document.getElementById('content_xml').value);
  if (success) {
    Ardublockly.renderContent();
  }
};

Ardublockly.PREV_ARDUINO_CODE_ = 'void setup() {\n\n}\n\n\nvoid loop() {\n\n}';
Ardublockly.renderContent = function() {
  var arduinoCode = Ardublockly.generateST();
  if (arduinoCode !== Ardublockly.PREV_ARDUINO_CODE_) {
    var diff = JsDiff.diffWords(Ardublockly.PREV_ARDUINO_CODE_, arduinoCode);
    var resultStringArray = [];
    for (var i = 0; i < diff.length; i++) {
      if (!diff[i].removed) {
        var escapedCode = diff[i].value.replace(/</g, '&lt;')
                                       .replace(/>/g, '&gt;');
        if (diff[i].added) {
          resultStringArray.push(
              '<span class="code_highlight_new">' + escapedCode + '</span>');
        } else {
          resultStringArray.push(escapedCode);
        }
      }
    }
    document.getElementById('content_arduino').innerHTML =
        prettyPrintOne(resultStringArray.join(''), 'cpp', false);
    Ardublockly.PREV_ARDUINO_CODE_ = arduinoCode;
  }
  document.getElementById('content_xml').value = Ardublockly.generateXml();
};

Ardublockly.bindClick_ = function(el, func) {
  if (typeof el == 'string') {
    el = document.getElementById(el);
  }
  // Need to ensure both, touch and click, events don't fire for the same thing
  var propagateOnce = function(e) {
    e.stopPropagation();
    e.preventDefault();
    func();
  };
  el.addEventListener('ontouchend', propagateOnce);
  el.addEventListener('click', propagateOnce);
};


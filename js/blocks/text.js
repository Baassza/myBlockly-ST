/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.texts');  // Deprecated
goog.provide('Blockly.Constants.Text');

goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.Blocks.texts = {};
Blockly.Blocks.texts.HUE = 160;
Blockly.Blocks.text = {
    init: function () {
        this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendDummyInput().appendField(this.newQuote_(!0)).appendField(new Blockly.FieldTextInput(""), "TEXT").appendField(this.newQuote_(!1));
        this.setOutput(!0, 'String');
        var a = this;
        this.setTooltip(function () {
            var b = a.getParent();
            return b && b.getInputsInline() && b.tooltip || Blockly.Msg.TEXT_TEXT_TOOLTIP
        })
    },
    newQuote_: function (a) {
        return new Blockly.FieldImage(a == this.RTL ?
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC",
            12, 12, '"')
    },
    getBlockType: function () {
        return Blockly.Types.TEXT
    }
};
Blockly.Blocks.text_join = {
    init: function () {
        this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.itemCount_ = 2;
        this.updateShape_();
        this.setOutput(!0, 'string');
        this.setMutator(new Blockly.Mutator(["text_create_join_item"]));
        this.setTooltip(Blockly.Msg.TEXT_JOIN_TOOLTIP)
    },
    mutationToDom: function () {
        var a = document.createElement("mutation");
        a.setAttribute("items", this.itemCount_);
        return a
    },
    domToMutation: function (a) {
        this.itemCount_ = parseInt(a.getAttribute("items"),
            10);
        this.updateShape_()
    },
    decompose: function (a) {
        var b = a.newBlock("text_create_join_container");
        b.initSvg();
        for (var c = b.getInput("STACK").connection, d = 0; d < this.itemCount_; d++) {
            var e = a.newBlock("text_create_join_item");
            e.initSvg();
            c.connect(e.previousConnection);
            c = e.nextConnection
        }
        return b
    },
    compose: function (a) {
        var b = a.getInputTargetBlock("STACK");
        for (a = []; b;) a.push(b.valueConnection_), b = b.nextConnection && b.nextConnection.targetBlock();
        for (b = 0; b < this.itemCount_; b++) {
            var c = this.getInput("ADD" + b).connection.targetConnection;
            c && -1 == a.indexOf(c) && c.disconnect()
        }
        this.itemCount_ = a.length;
        this.updateShape_();
        for (b = 0; b < this.itemCount_; b++) Blockly.Mutator.reconnect(a[b], this, "ADD" + b)
    },
    saveConnections: function (a) {
        a = a.getInputTargetBlock("STACK");
        for (var b = 0; a;) {
            var c = this.getInput("ADD" + b);
            a.valueConnection_ = c && c.connection.targetConnection;
            b++;
            a = a.nextConnection && a.nextConnection.targetBlock()
        }
    },
    updateShape_: function () {
        this.itemCount_ && this.getInput("EMPTY") ? this.removeInput("EMPTY") : this.itemCount_ || this.getInput("EMPTY") ||
            this.appendDummyInput("EMPTY").appendField(this.newQuote_(!0)).appendField(this.newQuote_(!1));
        for (var a = 0; a < this.itemCount_; a++)
            if (!this.getInput("ADD" + a)) {
                var b = this.appendValueInput("ADD" + a);
                0 == a && b.appendField(Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH)
            } for (; this.getInput("ADD" + a);) this.removeInput("ADD" + a), a++
    },
    newQuote_: Blockly.Blocks.text.newQuote_,
    getBlockType: function () {
        return Blockly.Types.TEXT
    }
};
Blockly.Blocks.text_create_join_container = {
    init: function () {
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.TEXT_CREATE_JOIN_TITLE_JOIN);
        this.appendStatementInput("STACK");
        this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.text_create_join_item = {
    init: function () {
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.TEXT_CREATE_JOIN_ITEM_TITLE_ITEM);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_ITEM_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.text_append = {
    init: function () {
        this.setHelpUrl(Blockly.Msg.TEXT_APPEND_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendValueInput("TEXT").appendField(Blockly.Msg.TEXT_APPEND_TO).appendField(new Blockly.FieldVariable(Blockly.Msg.TEXT_APPEND_VARIABLE), "VAR").appendField(Blockly.Msg.TEXT_APPEND_APPENDTEXT);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        var a = this;
        this.setTooltip(function () {
            return Blockly.Msg.TEXT_APPEND_TOOLTIP.replace("%1", a.getFieldValue("VAR"))
        })
    },
    getVarType: function (a) {
        return Blockly.Types.TEXT
    }
};
Blockly.Blocks.text_length = {
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.TEXT_LENGTH_TITLE,
            args0: [{
                type: "input_value",
                name: "VALUE",
            }],
            
            colour: Blockly.Blocks.texts.HUE,
            tooltip: Blockly.Msg.TEXT_LENGTH_TOOLTIP,
            helpUrl: Blockly.Msg.TEXT_LENGTH_HELPURL
        })
    },
    getBlockType: function () {
        return Blockly.Types.NUMBER
    }
};
Blockly.Blocks.text_isEmpty = {
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.TEXT_ISEMPTY_TITLE,
            args0: [{
                type: "input_value",
                name: "VALUE",
                
            }],
           
            colour: Blockly.Blocks.texts.HUE,
            tooltip: Blockly.Msg.TEXT_ISEMPTY_TOOLTIP,
            helpUrl: Blockly.Msg.TEXT_ISEMPTY_HELPURL
        })
    },
    getBlockType: function () {
        return Blockly.Types.BOOLEAN
    }
};
Blockly.Blocks.text_indexOf = {
    init: function () {
        var a = [
            [Blockly.Msg.TEXT_INDEXOF_OPERATOR_FIRST, "FIRST"],
            [Blockly.Msg.TEXT_INDEXOF_OPERATOR_LAST, "LAST"]
        ];
        this.setHelpUrl(Blockly.Msg.TEXT_INDEXOF_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        
        this.appendValueInput("VALUE").appendField(Blockly.Msg.TEXT_INDEXOF_INPUT_INTEXT);
        this.appendValueInput("FIND").appendField(new Blockly.FieldDropdown(a),
            "END");
        Blockly.Msg.TEXT_INDEXOF_TAIL && this.appendDummyInput().appendField(Blockly.Msg.TEXT_INDEXOF_TAIL);
        this.setInputsInline(!0);
        this.setTooltip(Blockly.Msg.TEXT_INDEXOF_TOOLTIP)
    }
};
Blockly.Blocks.text_charAt = {
    init: function () {
        this.WHERE_OPTIONS = [
            [Blockly.Msg.TEXT_CHARAT_FROM_START, "FROM_START"],
            [Blockly.Msg.TEXT_CHARAT_FROM_END, "FROM_END"],
            [Blockly.Msg.TEXT_CHARAT_FIRST, "FIRST"],
            [Blockly.Msg.TEXT_CHARAT_LAST, "LAST"],
            [Blockly.Msg.TEXT_CHARAT_RANDOM, "RANDOM"]
        ];
        this.setHelpUrl(Blockly.Msg.TEXT_CHARAT_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.setOutput(!0, 'string');
        this.appendValueInput("VALUE").appendField(Blockly.Msg.TEXT_CHARAT_INPUT_INTEXT);
        this.appendDummyInput("AT");
        this.setInputsInline(!0);
        this.updateAt_(!0);
        this.setTooltip(Blockly.Msg.TEXT_CHARAT_TOOLTIP)
    },
    mutationToDom: function () {
        var a = document.createElement("mutation"),
            b = this.getInput("AT").type == Blockly.INPUT_VALUE;
        a.setAttribute("at", b);
        return a
    },
    domToMutation: function (a) {
        a = "false" != a.getAttribute("at");
        this.updateAt_(a)
    },
    updateAt_: function (a) {
        this.removeInput("AT");
        this.removeInput("ORDINAL", !0);
        a ? (this.appendValueInput("AT"), Blockly.Msg.ORDINAL_NUMBER_SUFFIX &&
            this.appendDummyInput("ORDINAL").appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)) : this.appendDummyInput("AT");
        Blockly.Msg.TEXT_CHARAT_TAIL && (this.removeInput("TAIL", !0), this.appendDummyInput("TAIL").appendField(Blockly.Msg.TEXT_CHARAT_TAIL));
        var b = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function (b) {
            var c = "FROM_START" == b || "FROM_END" == b;
            if (c != a) {
                var e = this.sourceBlock_;
                e.updateAt_(c);
                e.setFieldValue(b, "WHERE");
                return null
            }
        });
        this.getInput("AT").appendField(b, "WHERE")
    }
};
Blockly.Blocks.text_getSubstring = {
    init: function () {
        this.WHERE_OPTIONS_1 = [
            [Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_START, "FROM_START"],
            [Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_END, "FROM_END"],
            [Blockly.Msg.TEXT_GET_SUBSTRING_START_FIRST, "FIRST"]
        ];
        this.WHERE_OPTIONS_2 = [
            [Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_START, "FROM_START"],
            [Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_END, "FROM_END"],
            [Blockly.Msg.TEXT_GET_SUBSTRING_END_LAST, "LAST"]
        ];
        this.setHelpUrl(Blockly.Msg.TEXT_GET_SUBSTRING_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendValueInput("STRING").appendField(Blockly.Msg.TEXT_GET_SUBSTRING_INPUT_IN_TEXT);
        this.appendDummyInput("AT1");
        this.appendDummyInput("AT2");
        Blockly.Msg.TEXT_GET_SUBSTRING_TAIL && this.appendDummyInput("TAIL").appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL);
        this.setInputsInline(!0);
        this.setOutput(!0, 'string');
        this.updateAt_(1, !0);
        this.updateAt_(2, !0);
        this.setTooltip(Blockly.Msg.TEXT_GET_SUBSTRING_TOOLTIP)
    },
    mutationToDom: function () {
        var a =
            document.createElement("mutation"),
            b = this.getInput("AT1").type == Blockly.INPUT_VALUE;
        a.setAttribute("at1", b);
        b = this.getInput("AT2").type == Blockly.INPUT_VALUE;
        a.setAttribute("at2", b);
        return a
    },
    domToMutation: function (a) {
        var b = "true" == a.getAttribute("at1");
        a = "true" == a.getAttribute("at2");
        this.updateAt_(1, b);
        this.updateAt_(2, a)
    },
    updateAt_: function (a, b) {
        this.removeInput("AT" + a);
        this.removeInput("ORDINAL" + a, !0);
        b ? (this.appendValueInput("AT" + a), Blockly.Msg.ORDINAL_NUMBER_SUFFIX &&
            this.appendDummyInput("ORDINAL" + a).appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)) : this.appendDummyInput("AT" + a);
        2 == a && Blockly.Msg.TEXT_GET_SUBSTRING_TAIL && (this.removeInput("TAIL", !0), this.appendDummyInput("TAIL").appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL));
        var c = new Blockly.FieldDropdown(this["WHERE_OPTIONS_" + a], function (c) {
            var d = "FROM_START" == c || "FROM_END" == c;
            if (d != b) {
                var f = this.sourceBlock_;
                f.updateAt_(a, d);
                f.setFieldValue(c, "WHERE" + a);
                return null
            }
        });
        this.getInput("AT" + a).appendField(c,
            "WHERE" + a);
        1 == a && this.moveInputBefore("AT1", "AT2")
    }
};
Blockly.Blocks.text_changeCase = {
    init: function () {
        var a = [
            [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_UPPERCASE, "UPPERCASE"],
            [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_LOWERCASE, "LOWERCASE"],
            [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_TITLECASE, "TITLECASE"]
        ];
        this.setHelpUrl(Blockly.Msg.TEXT_CHANGECASE_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendValueInput("TEXT").appendField(new Blockly.FieldDropdown(a), "CASE");
        this.setOutput(!0, 'string');
        this.setTooltip(Blockly.Msg.TEXT_CHANGECASE_TOOLTIP)
    }
};
Blockly.Blocks.text_trim = {
    init: function () {
        var a = [
            [Blockly.Msg.TEXT_TRIM_OPERATOR_BOTH, "BOTH"],
            [Blockly.Msg.TEXT_TRIM_OPERATOR_LEFT, "LEFT"],
            [Blockly.Msg.TEXT_TRIM_OPERATOR_RIGHT, "RIGHT"]
        ];
        this.setHelpUrl(Blockly.Msg.TEXT_TRIM_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendValueInput("TEXT").appendField(new Blockly.FieldDropdown(a), "MODE");
        this.setOutput(!0, 'string');
        this.setTooltip(Blockly.Msg.TEXT_TRIM_TOOLTIP)
    },
    getBlockType: function () {
        return Blockly.Types.TEXT
    }
};
Blockly.Blocks.text_print = {
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.TEXT_PRINT_TITLE,
            args0: [{
                type: "input_value",
                name: "TEXT"
            }],
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.texts.HUE,
            tooltip: Blockly.Msg.TEXT_PRINT_TOOLTIP,
            helpUrl: Blockly.Msg.TEXT_PRINT_HELPURL
        })
    }
};

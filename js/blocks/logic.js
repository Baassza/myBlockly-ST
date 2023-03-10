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
 * @fileoverview Logic blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Blocks.logic');  // Deprecated
goog.provide('Blockly.Constants.Logic');

goog.require('Blockly.Blocks');
goog.require('Blockly');

/**
 * Unused constant for the common HSV hue for all blocks in this category.
 * @deprecated Use Blockly.Msg.LOGIC_HUE. (2018 April 5)
 */
Blockly.Constants.Logic.HUE = 210;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    // Block for boolean data type: true and false.
    {
        "type": "logic_boolean",
        "message0": "%1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "BOOL",
                "options": [
                    ["%{BKY_LOGIC_BOOLEAN_TRUE}", "TRUE"],
                    ["%{BKY_LOGIC_BOOLEAN_FALSE}", "FALSE"]
                ]
            }
        ],
        "output": "BOOL",
        "colour": "50",
        "tooltip": "%{BKY_LOGIC_BOOLEAN_TOOLTIP}",
        "helpUrl": "%{BKY_LOGIC_BOOLEAN_HELPURL}"
    },
    // Block for if/elseif/else condition.
    {
        "type": "controls_if",
        "message0": "%{BKY_CONTROLS_IF_MSG_IF} %1",
        "args0": [
            {
                "type": "input_value",
                "name": "IF0",
                "check": "BOOL"
            }
        ],
        "message1": "%{BKY_CONTROLS_IF_MSG_THEN} %1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO0"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "50",
        "helpUrl": "%{BKY_CONTROLS_IF_HELPURL}",
        "mutator": "controls_if_mutator",
        "extensions": ["controls_if_tooltip"]
    },
    // If/else block that does not use a mutator.
    {
        "type": "controls_ifelse",
        "message0": "%{BKY_CONTROLS_IF_MSG_IF} %1",
        "args0": [
            {
                "type": "input_value",
                "name": "IF0",
                "check": "BOOL"
            }
        ],
        "message1": "%{BKY_CONTROLS_IF_MSG_THEN} %1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO0"
            }
        ],
        "message2": "%{BKY_CONTROLS_IF_MSG_ELSE} %1",
        "args2": [
            {
                "type": "input_statement",
                "name": "ELSE"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "50",
        "tooltip": "%{BKYCONTROLS_IF_TOOLTIP_2}",
        "helpUrl": "%{BKY_CONTROLS_IF_HELPURL}",
        "extensions": ["controls_if_tooltip"]
    },
    // Block for comparison operator.
    {
        "type": "logic_compare",
        "message0": "%1 %2 %3",
        "args0": [
            {
                "type": "input_value",
                "name": "A",
                "check": Blockly.ST.ANY_ELEMENTARY_TYPE
            },
            {
                "type": "field_dropdown",
                "name": "OP",
                "options": [
                    ["=", "EQ"],
                    ["\u2260", "NEQ"],
                    ["<", "LT"],
                    ["\u2264", "LTE"],
                    [">", "GT"],
                    ["\u2265", "GTE"]
                ]
            },
            {
                "type": "input_value",
                "name": "B",
                "check": Blockly.ST.ANY_ELEMENTARY_TYPE
            }
        ],
        "inputsInline": true,
        "output": "BOOL",
        "colour": "50",
        "helpUrl": "%{BKY_LOGIC_COMPARE_HELPURL}",
        "extensions": ["logic_compare", "logic_op_tooltip"]
    },
    // Block for logical operations: 'and', 'or'.
    {
        "type": "logic_operation",
        "message0": "%1 %2 %3",
        "args0": [
            {
                "type": "input_value",
                "name": "A",
                "check": Blockly.ST.ANY_BIT_TYPE
            },
            {
                "type": "field_dropdown",
                "name": "OP",
                "options": [
                    ["%{BKY_LOGIC_OPERATION_AND}", "AND"],
                    ["%{BKY_LOGIC_OPERATION_OR}", "OR"],
                    ["xor", "XOR"]
                ]
            },
            {
                "type": "input_value",
                "name": "B",
                "check": Blockly.ST.ANY_BIT_TYPE
            }
        ],
        "inputsInline": true,
        "output": Blockly.ST.ANY_BIT_TYPE,
        "colour": "50",
        "helpUrl": "%{BKY_LOGIC_OPERATION_HELPURL}",
        "extensions": ["logic_op_tooltip"]
    },
    // Block for negation.
    {
        "type": "logic_negate",
        "message0": "%{BKY_LOGIC_NEGATE_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "BOOL",
                "check": Blockly.ST.ANY_BIT_TYPE
            }
        ],
        "output": Blockly.ST.ANY_BIT_TYPE,
        "colour": "50",
        "tooltip": "%{BKY_LOGIC_NEGATE_TOOLTIP}",
        "helpUrl": "%{BKY_LOGIC_NEGATE_HELPURL}"
    },
    // Block for null data type.
    {
        "type": "logic_null",
        "message0": "%{BKY_LOGIC_NULL}",
        "output": null,
        "colour": "50",
        "tooltip": "%{BKY_LOGIC_NULL_TOOLTIP}",
        "helpUrl": "%{BKY_LOGIC_NULL_HELPURL}"
    },
    // Block for ternary operator.
    {
        "type": "logic_ternary",
        "message0": "%{BKY_LOGIC_TERNARY_CONDITION} %1",
        "args0": [
            {
                "type": "input_value",
                "name": "IF",
                "check": "BOOL"
            }
        ],
        "message1": "%{BKY_LOGIC_TERNARY_IF_TRUE} %1",
        "args1": [
            {
                "type": "input_value",
                "name": "THEN"
            }
        ],
        "message2": "%{BKY_LOGIC_TERNARY_IF_FALSE} %1",
        "args2": [
            {
                "type": "input_value",
                "name": "ELSE"
            }
        ],
        "output": null,
        "colour": "50",
        "tooltip": "%{BKY_LOGIC_TERNARY_TOOLTIP}",
        "helpUrl": "%{BKY_LOGIC_TERNARY_HELPURL}",
        "extensions": ["logic_ternary"]
    },
    {
        "type": "logic_switch",
        "message0": "If the following value %1",
        "args0": [
            {
                "type": "input_value",
                "name": "IF",
                "check": "BOOL"
            }
        ],
        "colour": "50",
        "tooltip": "Matches",
        "previousStatement": null,
        "nextStatement": null,
        "mutator": "controls_switch_mutator"
    },
    {
        "type": "logic_bit_shift",
        "message0": "%1 %2 by %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIR",
                "options": [
                    [
                        "Left Shift",
                        "LEFT"
                    ],
                    [
                        "Right Shift",
                        "RIGHT"
                    ],
                    [
                        "Rot. Right",
                        "ROT_RIGHT"
                    ],
                    [
                        "Rot. Left",
                        "ROT_LEFT"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "IN",
                "check": Blockly.ST.ANY_BIT_TYPE
            },
            {
                "type": "input_value",
                "name": "BITS",
                "check": Blockly.ST.ANY_INT_TYPE

            }
        ],
        "inputsInline": true,
        "output": Blockly.ST.ANY_BIT_TYPE,
        "colour": "50",
        "tooltip": "Bit shift",
        "helpUrl": ""
    }
]);  // END JSON EXTRACT (Do not delete this comment.)

Blockly.defineBlocksWithJsonArray([ // Mutator blocks. Do not extract.
    // Block representing the if statement in the controls_if mutator.
    {
        "type": "controls_if_if",
        "message0": "%{BKY_CONTROLS_IF_IF_TITLE_IF}",
        "nextStatement": null,
        "enableContextMenu": false,
        "colour": "50",
        "tooltip": "%{BKY_CONTROLS_IF_IF_TOOLTIP}"
    },
    // Block representing the else-if statement in the controls_if mutator.
    {
        "type": "controls_if_elseif",
        "message0": "%{BKY_CONTROLS_IF_ELSEIF_TITLE_ELSEIF}",
        "previousStatement": null,
        "nextStatement": null,
        "enableContextMenu": false,
        "colour": "50",
        "tooltip": "%{BKY_CONTROLS_IF_ELSEIF_TOOLTIP}"
    },
    // Block representing the else statement in the controls_if mutator.
    {
        "type": "controls_if_else",
        "message0": "%{BKY_CONTROLS_IF_ELSE_TITLE_ELSE}",
        "previousStatement": null,
        "enableContextMenu": false,
        "colour": "50",
        "tooltip": "%{BKY_CONTROLS_IF_ELSE_TOOLTIP}"
    },
    {
        "type": "controls_switch_switch",
        "message0": "Switch",
        "nextStatement": null,
        "enableContextMenu": false
    },
    {
        "type": "controls_switch_case",
        "message0": "Matches with",
        "previousStatement": null,
        "nextStatement": null,
        "enableContextMenu": false,
    },
    {
        "type": "controls_switch_default",
        "message0": "No match",
        "previousStatement": null,
        "enableContextMenu": false
    }
]);

/**
 * Tooltip text, keyed by block OP value. Used by logic_compare and
 * logic_operation blocks.
 * @see {Blockly.Extensions#buildTooltipForDropdown}
 * @package
 * @readonly
 */
Blockly.Constants.Logic.TOOLTIPS_BY_OP = {
    // logic_compare
    'EQ': '%{BKY_LOGIC_COMPARE_TOOLTIP_EQ}',
    'NEQ': '%{BKY_LOGIC_COMPARE_TOOLTIP_NEQ}',
    'LT': '%{BKY_LOGIC_COMPARE_TOOLTIP_LT}',
    'LTE': '%{BKY_LOGIC_COMPARE_TOOLTIP_LTE}',
    'GT': '%{BKY_LOGIC_COMPARE_TOOLTIP_GT}',
    'GTE': '%{BKY_LOGIC_COMPARE_TOOLTIP_GTE}',

    // logic_operation
    'AND': '%{BKY_LOGIC_OPERATION_TOOLTIP_AND}',
    'OR': '%{BKY_LOGIC_OPERATION_TOOLTIP_OR}',
	'XOR': 'Return true if both inputs are odd.'
};

Blockly.Extensions.register('logic_op_tooltip',
    Blockly.Extensions.buildTooltipForDropdown(
        'OP', Blockly.Constants.Logic.TOOLTIPS_BY_OP));

/**
 * Mutator methods added to controls_if blocks.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Logic.CONTROLS_IF_MUTATOR_MIXIN = {
    elseifCount_: 0,
    elseCount_: 0,

    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        if (!this.elseifCount_ && !this.elseCount_) {
            return null;
        }
        var container = document.createElement('mutation');
        if (this.elseifCount_) {
            container.setAttribute('elseif', this.elseifCount_);
        }
        if (this.elseCount_) {
            container.setAttribute('else', 1);
        }
        return container;
    },
    /**
     * Parse XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
        this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('controls_if_if');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;
        for (var i = 1; i <= this.elseifCount_; i++) {
            var elseifBlock = workspace.newBlock('controls_if_elseif');
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;
        }
        if (this.elseCount_) {
            var elseBlock = workspace.newBlock('controls_if_else');
            elseBlock.initSvg();
            connection.connect(elseBlock.previousConnection);
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        // Count number of inputs.
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
        var valueConnections = [null];
        var statementConnections = [null];
        var elseStatementConnection = null;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_if_elseif':
                    this.elseifCount_++;
                    valueConnections.push(clauseBlock.valueConnection_);
                    statementConnections.push(clauseBlock.statementConnection_);
                    break;
                case 'controls_if_else':
                    this.elseCount_++;
                    elseStatementConnection = clauseBlock.statementConnection_;
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 1; i <= this.elseifCount_; i++) {
            Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
            Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
        }
        Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        var i = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_if_elseif':
                    var inputIf = this.getInput('IF' + i);
                    var inputDo = this.getInput('DO' + i);
                    clauseBlock.valueConnection_ =
                        inputIf && inputIf.connection.targetConnection;
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    i++;
                    break;
                case 'controls_if_else':
                    var inputDo = this.getInput('ELSE');
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @this Blockly.Block
     * @private
     */
    updateShape_: function () {
        // Delete everything.
        if (this.getInput('ELSE')) {
            this.removeInput('ELSE');
        }
        var i = 1;
        while (this.getInput('IF' + i)) {
            this.removeInput('IF' + i);
            this.removeInput('DO' + i);
            i++;
        }
        // Rebuild block.
        for (var i = 1; i <= this.elseifCount_; i++) {
            this.appendValueInput('IF' + i)
                .setCheck('BOOL')
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
            this.appendStatementInput('DO' + i)
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        }
        if (this.elseCount_) {
            this.appendStatementInput('ELSE')
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
        }
    }
};

Blockly.Constants.Logic.CONTROLS_SWITCH_MUTATOR_MIXIN = {

    matchesCount_: 0,
    defaultCount_: 0,

    /**
     * Serializes the mutation to XML
     * @returns {*}
     */
    mutationToDom: function () {
        if (!this.matchesCount_ && !this.defaultCount_) {
            return null;
        }
        var container = document.createElement('mutation');
        if (this.matchesCount_) {
            container.setAttribute("matches", this.matchesCount_);
        }
        if (this.defaultCount_) {
            container.setAttribute("default", this.defaultCount_);
        }
        return container;
    },

    /**
     * Deserializes the mutation form XML
     * @param xmlElement
     */
    domToMutation: function (xmlElement) {
        this.matchesCount_ = parseInt(xmlElement.getAttribute("matches"), 10) || 0;
        this.defaultCount_ = parseInt(xmlElement.getAttribute("default"), 10) || 0;
        this.updateShape_();
    },

    decompose: function (workspace) {
        var containerBlock = workspace.newBlock("controls_switch_switch");
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;
        for (var i = 1; i <= this.matchesCount_; i++) {
            var caseBlock = workspace.newBlock("controls_switch_case");
            caseBlock.initSvg();
            connection.connect(caseBlock.previousConnection);
            connection = caseBlock.nextConnection;
        }
        if (this.defaultCount_) {
            var defaultBlock = workspace.newBlock("controls_switch_default");
            defaultBlock.initSvg();
            connection.connect(defaultBlock.previousConnection);
        }
        return containerBlock;
    },

    compose: function (containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        this.matchesCount_ = 0;
        this.defaultCount_ = 0;
        var valueConnections = [null];
        var statementConnections = [null];
        var defaultConnections = null;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_switch_case':
                    this.matchesCount_++;
                    valueConnections.push(clauseBlock.valueConnection_);
                    statementConnections.push(clauseBlock.statementConnection_);
                    break;
                case 'controls_switch_default':
                    this.defaultCount_++;
                    defaultConnections = clauseBlock.statementConnection_;
                    break;
            }
            clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
        }
        this.updateShape_();
        for (var i = 1; i <= this.matchesCount_; i++) {
            Blockly.Mutator.reconnect(valueConnections[i], this, 'CASE' + i);
            Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
        }
        Blockly.Mutator.reconnect(defaultConnections, this, "DEFAULT");
    },

    saveConnections: function (containerBlock) {
        var causeBlock = containerBlock.nextConnection.targetBlock();
        var i = 1;
        while (causeBlock) {
            switch (causeBlock.type) {
                case "controls_switch_case":
                    var caseInput = this.getInput("CASE" + i);
                    var caseDo = this.getInput("DO" + i);
                    causeBlock.valueConnection_ = caseInput && caseInput.connection.targetConnection;
                    causeBlock.statementConnection_ = caseDo && caseDo.connection.targetConnection;
                    i++;
                    break;
                case "controls_switch_default":
                    var defaultDo = this.getInput("DEFAULT");
                    causeBlock.statementConnection_ = defaultDo && defaultDo.connection.targetConnection;
                    break;
            }
            causeBlock = causeBlock.nextConnection && causeBlock.nextConnection.targetBlock();
        }
    },

    updateShape_: function () {

        if (this.getInput("DEFAULT")) {
            this.removeInput("DEFAULT");
        }

        if(this.getInput("SPACING")){
            this.removeInput("SPACING");
        }

        var i = 1;
        while (this.getInput("CASE" + i)) {
            this.removeInput("CASE" + i);
            this.removeInput("DO" + i);
            i++;
        }
        this.appendDummyInput("SPACING").appendField(" ");
        for (var i = 1; i <= this.matchesCount_; i++) {
            this.appendValueInput("CASE" + i)
                .appendField("Matches with");
            this.appendStatementInput("DO" + i)
                .appendField("Do");
        }
        if (this.defaultCount_) {
            this.appendStatementInput("DEFAULT")
                .appendField("No match");
        }
    }
};

Blockly.Extensions.registerMutator('controls_if_mutator',
    Blockly.Constants.Logic.CONTROLS_IF_MUTATOR_MIXIN, null,
    ['controls_if_elseif', 'controls_if_else']);


Blockly.Extensions.registerMutator("controls_switch_mutator",
    Blockly.Constants.Logic.CONTROLS_SWITCH_MUTATOR_MIXIN, null, ['controls_switch_case', 'controls_switch_default']);
/**
 * "controls_if" extension function. Adds mutator, shape updating methods, and
 * dynamic tooltip to "controls_if" blocks.
 * @this Blockly.Block
 * @package
 */
Blockly.Constants.Logic.CONTROLS_IF_TOOLTIP_EXTENSION = function () {

    this.setTooltip(function () {
        if (!this.elseifCount_ && !this.elseCount_) {
            return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
        } else if (!this.elseifCount_ && this.elseCount_) {
            return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
        } else if (this.elseifCount_ && !this.elseCount_) {
            return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
        } else if (this.elseifCount_ && this.elseCount_) {
            return Blockly.Msg.CONTROLS_IF_TOOLTIP_4;
        }
        return '';
    }.bind(this));
};

Blockly.Extensions.register('controls_if_tooltip',
    Blockly.Constants.Logic.CONTROLS_IF_TOOLTIP_EXTENSION);

/**
 * Corrects the logic_compare dropdown label with respect to language direction.
 * @this Blockly.Block
 * @package
 */
Blockly.Constants.Logic.fixLogicCompareRtlOpLabels =
    function () {
        var rtlOpLabels = {
            'LT': '\u200F<\u200F',
            'LTE': '\u200F\u2264\u200F',
            'GT': '\u200F>\u200F',
            'GTE': '\u200F\u2265\u200F'
        };
        var opDropdown = this.getField('OP');
        if (opDropdown) {
            var options = opDropdown.getOptions();
            for (var i = 0; i < options.length; ++i) {
                var tuple = options[i];
                var op = tuple[1];
                var rtlLabel = rtlOpLabels[op];
                if (goog.isString(tuple[0]) && rtlLabel) {
                    // Replace LTR text label
                    tuple[0] = rtlLabel;
                }
            }
        }
    };

/**
 * Adds dynamic type validation for the left and right sides of a logic_compare block.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Logic.LOGIC_COMPARE_ONCHANGE_MIXIN = {
    /**
     * Called whenever anything on the workspace changes.
     * Prevent mismatched types from being compared.
     * @param {!Blockly.Events.Abstract} e Change event.
     * @this Blockly.Block
     */
    onchange: function (e) {
        if (!this.prevBlocks_) {
            this.prevBlocks_ = [null, null];
        }

        var blockA = this.getInputTargetBlock('A');
        var blockB = this.getInputTargetBlock('B');
        // Disconnect blocks that existed prior to this change if they don't match.
        if (blockA && blockB &&
            !blockA.outputConnection.checkType_(blockB.outputConnection)) {
            // Mismatch between two inputs.  Revert the block connections,
            // bumping away the newly connected block(s).
            Blockly.Events.setGroup(e.group);
            var prevA = this.prevBlocks_[0];
            if (prevA !== blockA) {
                blockA.unplug();
                if (prevA && !prevA.isShadow()) {
                    // The shadow block is automatically replaced during unplug().
                    this.getInput('A').connection.connect(prevA.outputConnection);
                }
            }
            var prevB = this.prevBlocks_[1];
            if (prevB !== blockB) {
                blockB.unplug();
                if (prevB && !prevB.isShadow()) {
                    // The shadow block is automatically replaced during unplug().
                    this.getInput('B').connection.connect(prevB.outputConnection);
                }
            }
            this.bumpNeighbours_();
            Blockly.Events.setGroup(false);
        }
        this.prevBlocks_[0] = this.getInputTargetBlock('A');
        this.prevBlocks_[1] = this.getInputTargetBlock('B');
    }
};

/**
 * "logic_compare" extension function. Corrects direction of operators in the
 * dropdown labels, and adds type left and right side type checking to
 * "logic_compare" blocks.
 * @this Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Logic.LOGIC_COMPARE_EXTENSION = function () {
    // Fix operator labels in RTL.
    if (this.RTL) {
        Blockly.Constants.Logic.fixLogicCompareRtlOpLabels.apply(this);
    }

    // Add onchange handler to ensure types are compatible.
    this.mixin(Blockly.Constants.Logic.LOGIC_COMPARE_ONCHANGE_MIXIN);
};

Blockly.Extensions.register('logic_compare',
    Blockly.Constants.Logic.LOGIC_COMPARE_EXTENSION);

/**
 * Adds type coordination between inputs and output.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Logic.LOGIC_TERNARY_ONCHANGE_MIXIN = {
    prevParentConnection_: null,

    /**
     * Called whenever anything on the workspace changes.
     * Prevent mismatched types.
     * @param {!Blockly.Events.Abstract} e Change event.
     * @this Blockly.Block
     */
    onchange: function (e) {
        var blockA = this.getInputTargetBlock('THEN');
        var blockB = this.getInputTargetBlock('ELSE');
        var parentConnection = this.outputConnection.targetConnection;
        // Disconnect blocks that existed prior to this change if they don't match.
        if ((blockA || blockB) && parentConnection) {
            for (var i = 0; i < 2; i++) {
                var block = (i == 1) ? blockA : blockB;
                if (block && !block.outputConnection.checkType_(parentConnection)) {
                    // Ensure that any disconnections are grouped with the causing event.
                    Blockly.Events.setGroup(e.group);
                    if (parentConnection === this.prevParentConnection_) {
                        this.unplug();
                        parentConnection.getSourceBlock().bumpNeighbours_();
                    } else {
                        block.unplug();
                        block.bumpNeighbours_();
                    }
                    Blockly.Events.setGroup(false);
                }
            }
        }
        this.prevParentConnection_ = parentConnection;
    }
};

Blockly.Extensions.registerMixin('logic_ternary',
    Blockly.Constants.Logic.LOGIC_TERNARY_ONCHANGE_MIXIN);

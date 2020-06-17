/*global QUnit*/

sap.ui.define([
	"gdsd/Inspect/controller/TaskList.controller"
], function (Controller) {
	"use strict";

	QUnit.module("TaskList Controller");

	QUnit.test("I should test the TaskList controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
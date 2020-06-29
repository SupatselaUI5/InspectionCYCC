sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/json/JSONModel",
	'sap/ui/Device'
], function (Controller, Filter, JSONModel, Device) {
	"use strict";
	return Controller.extend("gdsd.Inspect.controller.TaskList", {
		onInit: function () {
				this._oODataModel = this.getOwnerComponent().getModel();
			this._oODataModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			this.Router = sap.ui.core.UIComponent.getRouterFor(this);
			this.Router.getRoute("TaskList").attachPatternMatched(this._onObjectMatched, this);
			
		},
		
		_onObjectMatched: function () {
		
			this.onBindSWBP();
		},
		
		
			onBindSWBP: function () {
			sap.ui.core.BusyIndicator.show();
			// var filterVal = "BpNo eq '0000000114'";
			this._oODataModel.read("/GET_BPSet", {
				//User details retrieved successfully
				success: (function (oData) {
					var BPJsonModel = new sap.ui.model.json.JSONModel({
						data: oData.results[0]
					});
					
						this.byId("objHeaderSW").setModel(this._oODataModel);
					this.byId("objHeaderSW").bindElement({
						path: "/data" // use OData parameters here if needed
					});
					
				//	this.byId("objHeaderSW").setModel(BPJsonModel);
				//	this.byId("objHeaderSW").bindElement({
				//		path: "/data"
							// use OData parameters here if needed
				//	});
					//this.SWBP = oData.results[0].But000.Partner; - NISH
					this.SWBP = oData.results[0].But000.Partner;
					var filterVal = "BpNo eq '" + this.SWBP + "'";
					this.getTaskData(filterVal);
				}).bind(this),
				error: (function (e, x, r) {
					// console.log("Error " + e);
				})
			});
		},
		
	
		
		
			getTaskData: function (filter) {
			var oList = this.byId("taskList");
			this._oODataModel.read("/GetCyccInspectionSet", { // sPath - path of your Entityset
				urlParameters: {
					"$filter": filter
				},
				success: function (data, response) {
					var TaskJsonModel = new sap.ui.model.json.JSONModel(data);
					oList.setModel(TaskJsonModel);
					sap.ui.getCore().setModel(TaskJsonModel, "TaskJsonModel");
					sap.ui.core.BusyIndicator.hide();
					//your code for manipulation of the data received 
				}.bind(this), // if you want to use the current controller instance within this function
				error: function (response) {
						// for handling the error received
					}.bind(this) // if you want to use the current controller instance within this function
			});
		},


		onTaskPress: function (oEvent) {
			var oItem = oEvent.getSource();
			this.Router.navTo("CYCCInspection", {
				taskPath: window.encodeURIComponent(oItem.getBindingContext().getPath().substr(1)),
				BPNo: this.SWBP
			});
		},
		
			onSearch: function (oEvent) {
			// add filter for search
			//var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var contains = sap.ui.model.FilterOperator.Contains;
				var aFilters = new Filter([
						new sap.ui.model.Filter("But000/NameFirst", contains, sQuery),
						new sap.ui.model.Filter("But000/NameLast", contains, sQuery),
						new sap.ui.model.Filter("Description", contains, sQuery),
						new sap.ui.model.Filter("DescriptionP", contains, sQuery),
						new sap.ui.model.Filter("BpNo", contains, sQuery)
					],
					false);
			}
			// update list binding
			var oList = this.byId("taskList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Application");
		},
		
		
	handleFilterDialogConfirm: function (oEvent) {
			var oList = this.byId("taskList"),
				mParams = oEvent.getParameters(),
				oBinding = oList.getBinding("items"),
				aFilters = [];

			mParams.filterItems.forEach(function (oItem) {
				var aSplit = oItem.getKey().split("___"),
					sPath = aSplit[0],
					sOperator = aSplit[1],
					sValue1 = aSplit[2],
					sValue2 = aSplit[3],
					oFilter = new Filter(sPath, sOperator, sValue1, sValue2);
				aFilters.push(oFilter);
			});

			// apply filter settings
			oBinding.filter(aFilters);

			// update filter bar
			// this.byId("vsdFilterBar").setVisible(aFilters.length > 0);
			// this.byId("vsdFilterLabel").setText(mParams.filterString);
		},
		createViewSettingsDialog: function (sDialogFragmentName) {

			// https://stackoverflow.com/questions/55667673/how-to-remove-duplicates-and-display-only-unique-values-in-viewsettingsitem
			var oDialog = this._mViewSettingsDialogs[sDialogFragmentName];
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(sDialogFragmentName, this);
				this._mViewSettingsDialogs[sDialogFragmentName] = oDialog;

				if (Device.system.desktop) {
					oDialog.addStyleClass("sapUiSizeCompact");
				}
			}
			var TaskJsonModel = sap.ui.getCore().getModel("TaskJsonModel");
			var objData = TaskJsonModel.getData();
			var finalArr = this.removeDuplicates(objData.results, "DescriptionP");
			var TastTypeModel = new sap.ui.model.json.JSONModel(finalArr);
			oDialog.setModel(TastTypeModel);
			return oDialog;
		},

		removeAllDuplicates: function (array) {
			var x = {};
			var unique = [];
			array.forEach(function (i) {
				if (!x[i]) {
					x[i] = true;
					unique.push(i);

				}
			});
			return unique;
		},

		removeDuplicates: function (originalArray, prop) {
			var newArray = [];
			var lookupObject = {};

			for (var i in originalArray) {
				lookupObject[originalArray[i][prop]] = originalArray[i];
			}

			for (i in lookupObject) {
				newArray.push(lookupObject[i]);
			}
			return newArray;
		},

		handleFilterButtonPressed: function () {
			this.createViewSettingsDialog("gdsd.ProcessNote.Fragments.FilterDialog").open();
		},

		onExit: function () {
			var oDialogKey,
				oDialogValue;

			for (oDialogKey in this._mViewSettingsDialogs) {
				oDialogValue = this._mViewSettingsDialogs[oDialogKey];

				if (oDialogValue) {
					oDialogValue.destroy();
				}
			}
		}
		
		
		

	
	});
});
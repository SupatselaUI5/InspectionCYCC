sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox"
], function (Controller, History, MessageBox) {
	"use strict";
	return Controller.extend("gdsd.Inspect.controller.CYCCInspection", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf gdsd.Inspect.view.CYCCInspection
		 */
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("CYCCInspection").attachPatternMatched(this._onObjectMatched, this);
			this._oODataModel = this.getOwnerComponent().getModel();
			this._oODataModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
		},
		
		_onObjectMatched: function (oEvent) {
		/*
			sap.ui.core.BusyIndicator.show();
		//	this._oODataModel = this.getOwnerComponent().getModel();
			this._oODataModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			this._oODataModel.read("/GET_BPSet('1000000025')", {
				//User details retrieved successfully
				success: function (oData) {
					//	this.byId("SectionA").setModel(this._oODataModel);
					//	this.byId("SectionA").bindElement({
					//	path: "/GET_BPSet('115')"	
					//	});
					
					this.byId("form0").setModel(this._oODataModel);
					this.byId("form0").bindElement({
						path: "/GET_BPSet('1000000025')" // use OData parameters here if needed
					});
					
					this.byId("header0").setModel(this._oODataModel);
					this.byId("header0").bindElement({
						path: "/GET_BPSet('1000000025')" // use OData parameters here if needed
					});
					
					sap.ui.core.BusyIndicator.hide(); //console.log("Success " + oData);
				}.bind(this)
			
				
			});
				*/
				var TaskJsonModel = sap.ui.getCore().getModel("TaskJsonModel");
			this.getView().setModel(TaskJsonModel);
		this.oModelProperty = TaskJsonModel.getProperty("/" + window.decodeURIComponent(oEvent.getParameter("arguments").taskPath));
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").taskPath)
			});
			this.SWBP = oEvent.getParameter("arguments").BPNo;
			this.onResetFields();
		
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
				//	this.byId("header0").setModel(BPJsonModel);
			//		this.byId("header0").bindElement({
				//		path: "/data"
							// use OData parameters here if needed
				//	});
					//this.SWBP = oData.results[0].But000.Partner; - NISH
					this.SWBP = '1000000025';
					var filterVal = "BpNo eq '" + this.SWBP + "'";
					this.getTaskData(filterVal);
				}).bind(this),
				error: (function (e, x, r) {
					// console.log("Error " + e);
				})
			});
		},
		
		
			getTaskData: function (filter) {
			var oList = this.byId("form0");
			this._oODataModel.read("/GetCyccInspectionSet", { // sPath - path of your Entityset
				urlParameters: {
					"$filter": filter
				},
				success: function (data, response) {
					var TaskJsonModel = new sap.ui.model.json.JSONModel(data);
			//		oList.setModel(TaskJsonModel);
					sap.ui.getCore().setModel(TaskJsonModel, "TaskJsonModel");
					sap.ui.core.BusyIndicator.hide();
					//your code for manipulation of the data received 
				}.bind(this), // if you want to use the current controller instance within this function
				error: function (response) {
						// for handling the error received
					}.bind(this) // if you want to use the current controller instance within this function
			});
		},
		
	
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("TaskList", true);
			}
		},
		
		onUpdateInspectionCYCC: function () {
			//var path = "/GetProcessNoteSet('" + this.SWBP + "')";
			this.getView().setBusy(true);
			var oEntry = {};
			oEntry.BpNo = '1000000025';//this.SWBP;
			oEntry.Guid = '00505695B7F81EDA9BD6512B50F3312C';// 25-06-2020 Nish this.oModelProperty.Guid;
			oEntry.ObjectId = '216';//this.oModelProperty.ObjectId;
			//Fields - Text Areas
			oEntry.Zv01 = this.byId("Zv01").getValue();
			oEntry.Zv02 = this.byId("Zv02").getValue();
			oEntry.Zv03 = this.byId("Zv03").getValue();
			oEntry.Zv25 = this.byId("Zv25").getValue();
			oEntry.Zv04 = this.byId("Zv04").getValue();
			oEntry.Zv05 = this.byId("Zv05").getValue();
			oEntry.Zv06 = this.byId("Zv06").getValue();
			oEntry.Zv07 = this.byId("Zv07").getValue();
			oEntry.Zv08 = this.byId("Zv08").getValue();
			oEntry.Zv09 = this.byId("Zv09").getValue();
			oEntry.Zv10 = this.byId("Zv10").getValue();
			oEntry.Zv11 = this.byId("Zv11").getValue();
			oEntry.Zv12 = this.byId("Zv12").getValue();
			oEntry.Zv13 = this.byId("Zv13").getValue();
			oEntry.Zv14 = this.byId("Zv14").getValue();
			oEntry.Zv15 = this.byId("Zv15").getValue();
			oEntry.Zv16 = this.byId("Zv16").getValue();
			oEntry.Zv17 = this.byId("Zv17").getValue();
			oEntry.Zv18 = this.byId("Zv18").getValue();
			oEntry.Zv19 = this.byId("Zv19").getValue();
			oEntry.Zv20 = this.byId("Zv20").getValue();
			oEntry.Zv21 = this.byId("Zv21").getValue();
			oEntry.Zv22 = this.byId("Zv22").getValue();
			oEntry.Zv23 = this.byId("Zv23").getValue();
			oEntry.Zv24 = this.byId("Zv24").getValue();
		//	var sPath = "/GetCyccInspectionSet(Guid='" + this.oModelProperty.Guid + "',BpNo='" + this.SWBP + "',ObjectId='" + this.oModelProperty.ObjectId +
		//		"')"; 25-06-2020 Nish
				
					var sPath = "/GetCyccInspectionSet(Guid='" + '00505695B7F81EDA9BD6512B50F3312C' + "',BpNo='"+ '1000000025' +"',ObjectId='"+ '216' +"')";

			this._oODataModel.update(sPath, oEntry, {
				success: function (oData) {
					this.getView().setBusy(false);
					this.handleSuccessMessageBoxPress();

				}.bind(this),
				error: function (results) {
					this.getView().setBusy(false);
					this.handleErrorMessageBoxPress();

				}.bind(this)
			});
		},
		
			_getSimpleFormFields: function (oSimpleForm) {
			var aControls = [];
			var aFormContent = oSimpleForm.getContent();
			var sControlType;
			for (var i = 0; i < aFormContent.length; i++) {
				sControlType = aFormContent[i].getMetadata().getName();
				if (sControlType === "sap.m.TextArea") {
					aControls.push({
						control: aFormContent[i],
						required: aFormContent[i - 1].getRequired && aFormContent[i - 1].getRequired()
					});
				}
			}
			return aControls;
		},
		
		onResetFields: function () {
			this.byId("Zv01").setValue(null);
			this.byId("Zv02").setValue(null);
			this.byId("Zv03").setValue(null);
			this.byId("Zv25").setValue(null); //Zv25 Pocket Money
			this.byId("Zv04").setValue(null);
			this.byId("Zv05").setValue(null);
			this.byId("Zv06").setValue(null);
			this.byId("Zv07").setValue(null);
			this.byId("Zv08").setValue(null);
			this.byId("Zv09").setValue(null);
			this.byId("Zv10").setValue(null);
			this.byId("Zv11").setValue(null);
			this.byId("Zv12").setValue(null);
			this.byId("Zv13").setValue(null);
			this.byId("Zv14").setValue(null);
			this.byId("Zv15").setValue(null);
			this.byId("Zv16").setValue(null);
			this.byId("Zv17").setValue(null);
			this.byId("Zv18").setValue(null);
			this.byId("Zv19").setValue(null);
			this.byId("Zv20").setValue(null);
			this.byId("Zv21").setValue(null);
			this.byId("Zv22").setValue(null);
			this.byId("Zv23").setValue(null);
			this.byId("Zv24").setValue(null);
		},
		
		handleSuccessMessageBoxPress: function () {
		//Nish 25-06-2020	MessageBox.success("CYCC Inspection #" + this.oModelProperty.ObjectId+  " has been successfully submitted", {
	MessageBox.success("CYCC Inspection #" + '216' +  " has been successfully submitted", {
				title: "Sucessful",
				onClose: function (sAction) {
					this.oRouter.navTo("TaskList");
				}.bind(this)
			});
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf gdsd.Inspect.view.CYCCInspection
		 */
		//	onBeforeRendering: function() {
		//
		//	},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf gdsd.Inspect.view.CYCCInspection
		 */
		//	onAfterRendering: function() {
		//
		//	},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf gdsd.Inspect.view.CYCCInspection
		 */
		//	onExit: function() {
		//
		//	}
		/**
		 *@memberOf gdsd.ApplicationForFunding1.controller.ProvincialBusinessPlanSectionA
		 */
		onToStreetAddress: function () {
			this.byId("bar0").setSelectedKey("streetaddressKey"); //	var oTable = this.getView().byId("idProductsTable");
			//oTable.removeSelections();
			//this.byId("bar0").setSelectedKey("streetaddressKey");
		},
		onToName: function (oEvent) {
			//This code was generated by the layout editor.
			this.byId("bar0").setSelectedKey("nameKey"); //
		},
		onToHistory: function (oEvent) {
			//This code was generated by the layout editor.
			this.byId("bar0").setSelectedKey("historyKey"); //
		},
		onToAdmin: function (oEvent) {
			//This code was generated by the layout editor.
			this.byId("bar0").setSelectedKey("adminKey"); //
		},
		onToProvince: function (oEvent) {
			this.byId("bar0").setSelectedKey("provinceKey"); //
		},
		/**
		 *@memberOf gdsd.ApplicationForFunding1.controller.ProvincialBusinessPlanSectionA
		 */
		onToProfile: function (oEvent) {
			this.byId("bar0").setSelectedKey("profileKey"); //
			//This code was generated by the layout editor.
		},
		/**
		 *@memberOf gdsd.ApplicationForFunding1.controller.ProvincialBusinessPlanSectionA
		 */
		goToPoor: function (oEvent) {
			//This code was generated by the layout editor.
			this.byId("bar0").setSelectedKey("poorKey"); //
		},
		/**
		 *@memberOf gdsd.ApplicationForFunding1.controller.ProvincialBusinessPlanSectionA
		 */
		goToTarget: function (oEvent) {
			this.byId("bar0").setSelectedKey("targetKey"); //
			//This code was generated by the layout editor.
		},
		/**
		 *@memberOf gdsd.ApplicationForFunding1.controller.ProvincialBusinessPlanSectionA
		 */
		goToName: function (oEvent) {
			this.byId("bar0").setSelectedKey("nameKey"); //
			//This code was generated by the layout editor.
		},
		/**
		 *@memberOf gdsd.ApplicationForFunding1.controller.ProvincialBusinessPlanSectionA
		 */
		onToDescribe: function (oEvent) {
			this.byId("bar0").setSelectedKey("describeKey"); //
			//This code was generated by the layout editor.
		},
		/**
		 *@memberOf gdsd.ApplicationForFunding1.controller.ProvincialBusinessPlanSectionA
		 */
		onToPurpose: function (oEvent) {
			this.byId("bar0").setSelectedKey("purposeKey"); //
			//This code was generated by the layout editor.
		},
		/**
		 *@memberOf gdsd.ApplicationForFunding1.controller.ProvincialBusinessPlanSectionA
		 */
		onToType: function (oEvent) {
			this.byId("bar0").setSelectedKey("typeKey"); //
			//This code was generated by the layout editor.
		},
		/**
		 *@memberOf gdsd.Inspect.controller.CYCCInspection
		 */
		action: function (oEvent) {
			var that = this;
			var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
			var eventType = oEvent.getId();
			var aTargets = actionParameters[eventType].targets || [];
			aTargets.forEach(function (oTarget) {
				var oControl = that.byId(oTarget.id);
				if (oControl) {
					var oParams = {};
					for (var prop in oTarget.parameters) {
						oParams[prop] = oEvent.getParameter(oTarget.parameters[prop]);
					}
					oControl[oTarget.action](oParams);
				}
			});
			var oNavigation = actionParameters[eventType].navigation;
			if (oNavigation) {
				var oParams = {};
				(oNavigation.keys || []).forEach(function (prop) {
					oParams[prop.name] = encodeURIComponent(JSON.stringify({
						value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
						type: prop.type
					}));
				});
				if (Object.getOwnPropertyNames(oParams).length !== 0) {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
				} else {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
				}
			}
		}
	});
});
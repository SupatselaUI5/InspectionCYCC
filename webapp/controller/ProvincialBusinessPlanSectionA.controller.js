sap.ui.define(["sap/ui/core/mvc/Controller",
	'sap/ui/core/Fragment'
], function (Controller, Fragment) {
	"use strict";
	return Controller.extend("gdsd.InspectionCYCC.controller.ProvincialBusinessPlanSectionA", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf gdsd.SocialCareSolution.view.ProvincialBusinessPlanSectionA
		 */
		onInit: function () {

			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("ProvincialBusinessPlanA").attachPatternMatched(this._onObjectMatched, this);

		},

		_onAddProgram: function () {

			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("gdsd.ApplicationForFunding1.fragments.DialogAddProgram");
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		},
		onAddProgram: function () {
			this._onAddProgram().open();
		},
	

	

		onSubmit: function () {

		},

		_onObjectMatched: function () {
			sap.ui.core.BusyIndicator.show();
			this._oODataModel = this.getOwnerComponent().getModel();
			this._oODataModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			this._oODataModel.read("/GET_BPSet('151')", {
				//User details retrieved successfully
				success: (function (oData) {
					//	this.byId("SectionA").setModel(this._oODataModel);
					//	this.byId("SectionA").bindElement({
					//	path: "/GET_BPSet('115')"	
					//	});

					this.byId("form0").setModel(this._oODataModel);
					this.byId("form0").bindElement({
						path: "/GET_BPSet('151')"
							// use OData parameters here if needed
					});

					this.byId("header0").setModel(this._oODataModel);
					this.byId("header0").bindElement({
						path: "/GET_BPSet('151')"
							// use OData parameters here if needed
					});

					this.byId("form0_0").bindElement({
						path: "/GET_BPSet('151')"
							// use OData parameters here if needed
					});
					
			//			this.byId("list0").bindElement({
				//		path: "/GetBPProgramSet('151')"
							// use OData parameters here if needed
				//	});
					
				//		this.byId("list1").bindElement({
				//		path: "/GetBPProgramSet"
							// use OData parameters here if needed
				//	});
					
					sap.ui.core.BusyIndicator.hide();
					//console.log("Success " + oData);
				}).bind(this)

			});
		},

		/**
		 *@memberOf gdsd.SocialCareSolution.controller.ProvincialBusinessPlanSectionA
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
			/**
			 *@memberOf gdsd.ApplicationForFunding1.controller.ProvincialBusinessPlanSectionA
			 */
			,
		/**
		 *@memberOf gdsd.ApplicationForFunding1.controller.ProvincialBusinessPlanSectionA
		 */
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
		}
	});
});
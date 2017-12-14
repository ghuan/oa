Ext.namespace('Ext.ux.form');

/*
 * extend setTimeout function to support arguments
 */
function setTimeoutEx(fRef, mDelay) {
	if (typeof fRef == 'function') {
		var args = Array.prototype.slice.call(arguments, 2);
		var f = function() {
			fRef.apply(null, args);
		};
		return setTimeout(f, mDelay);
	}
	return setTimeout(fRef, mDelay);
}

Ext.ux.form.FCKeditor = function(config) { // add fckeditor config  fckconfig
	if(config.id==null){
		config.id='__fckeditor_' + parseInt(1000*Math.random());
	}
	// object
	this.config = config;
	this.fckconfig = config;
	Ext.ux.form.FCKeditor.superclass.constructor.call(this, config);
	this.instanceLoaded = false;
	this.instanceValue = '';
	this.editorInstance = undefined;
};

Ext.extend(Ext.ux.form.FCKeditor, Ext.form.TextArea, {
			initEvents : function() {
				this.on('destroy', function() {
							if (typeof this.editorInstance != 'undefined') {
								delete this.editorInstance;
							}
						});
			},
			onRender : function(ct, position) {
				if (!this.el) {
					this.defaultAutoCreate = {
						tag : "textarea",
						style : "width:300px;height:660px;",
						autocomplete : "off"
					};
				}
				Ext.form.TextArea.superclass.onRender.call(this, ct, position);
				this.hideMode = "visibility";
				
				this.hidden = true;
				if (this.grow) {
					this.textSizeEl = Ext.DomHelper.append(document.body, {
								tag : "pre",
								cls : "x-form-grow-sizer"
							});
					if (this.preventScrollbars) {
						this.el.setStyle("overflow", "hidden");
					}
					this.el.setHeight(this.growMin);
				}
				setTimeoutEx(loadFCKeditor, 100, this.config.id, this.fckconfig); // setTimeoutEx
				// support
				// arguments
			},
			setIsLoaded : function(v) {
				this.instanceLoaded = v;
			},
			getIsLoaded : function() {
				return this.instanceLoaded;
			},
			setValue : function(value) {
				this.instanceValue = value;
				if (this.instanceLoaded) {
					this.FCKeditorSetValue(value);
				}
				Ext.form.TextArea.superclass.setValue.apply(this, [value]);
			},
			getValue : function() {
				if (this.instanceLoaded) {
					value = this.FCKeditorGetValue();
					Ext.form.TextArea.superclass.setValue.apply(this, [value]);
					return Ext.form.TextArea.superclass.getValue.call(this);
				} else {
					return this.instanceValue;
				}
			},
			getRawValue : function() {
				if (this.instanceLoaded) {
					value = this.FCKeditorGetValue();
					Ext.form.TextArea.superclass.setRawValue.apply(this,
							[value]);
					return Ext.form.TextArea.superclass.getRawValue.call(this);
				} else {
					return this.instanceValue;
				}
			},
			FCKeditorSetValue : function(value) {
				if (this.instanceLoaded == false) {
					return;
				}
				var runner = new Ext.util.TaskRunner();
				var task = {
					run : function() {
						try {
							var editor = this.editorInstance;
							if (editor.EditorDocument.body) {
								editor.SetData(value);
								runner.stop(task);
							}
						} catch (ex) {
						}
					},
					interval : 100,
					scope : this
				};
				runner.start(task);
			},
			FCKeditorGetValue : function() {
				var data = '';
				if (this.instanceLoaded == false) {
					return data;
				}
				data = this.editorInstance.GetData();
				return data;
			},
			isDirty : function() {
				return this.editorInstance.IsDirty();
			},
			resetIsDirty : function() {
				this.editorInstance.ResetIsDirty();
			}
		});
Ext.reg('fckeditor', Ext.ux.form.FCKeditor);

function loadFCKeditor(element, config) {
	//加载fckEditor js
	$ImportSimpleJs([__ctxPath+'/js/fckeditor/fckeditor.js'],function(){
		var oFCKeditor = new FCKeditor(element,config.width,config.height);
		for (var key in config) { // fckeditor config from object argument
			if (typeof oFCKeditor[key] != 'undefined') {
				oFCKeditor[key] = config[key];
			}
		}
		oFCKeditor.ReplaceTextarea();
	});
}

function FCKeditor_OnComplete(editorInstance) {
	var activeEditor = Ext.getCmp(editorInstance.Name);
	activeEditor.editorInstance = editorInstance;
	activeEditor.instanceLoaded = true;
	activeEditor.FCKeditorSetValue(activeEditor.instanceValue);
	editorInstance.Events.AttachEvent('OnBlur', FCKeditor_OnBlur);
	editorInstance.Events.AttachEvent('OnFocus', FCKeditor_OnFocus);
	editorInstance.ToolbarSet.Collapse();
}

function FCKeditor_OnBlur(editorInstance) {
	editorInstance.ToolbarSet.Collapse();
}

function FCKeditor_OnFocus(editorInstance) {
	editorInstance.ToolbarSet.Expand();
}

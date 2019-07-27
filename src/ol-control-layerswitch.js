
ol.control.LayerSwitch = function(opt_options){
    var options = opt_options ? opt_options : {};
    this.element = document.createElement('div');
    var defaultControlClassName = 'ol-unselectable ol-control';
    var className = 'ol-control-layerswitch';
    this.element.className = defaultControlClassName + ' ' + className;
    ol.control.Control.call(this, {
        element: this.element,
        target: options.target
    })
}

ol.inherits(ol.control.LayerSwitch, ol.control.Control);

/**
 * 初始化
 */
ol.control.LayerSwitch.prototype.init = function(){
    var layers = this.getMap().getLayers();
    layers.forEach(element => {
        this.addLayerItem(element);
    });
}

/**
 * 添加选项
 * @param {ol.layer.Layer} layer
 */
ol.control.LayerSwitch.prototype.addLayerItem = function(layer){
    var div = document.createElement('div');
    div.className = 'ol-control-layerswitch-opt';
    div.setAttribute('layerid', ol.getUid(layer).toString());

    var child = document.createElement('input');
    child.setAttribute('type', 'checkbox');
    child.onclick = function(evt){
        layer.setVisible(evt.target.checked);
    };
    child.checked = true;
    div.appendChild(child);

    var label = document.createElement('span');
    label.innerText = layer.get('title');
    
    div.appendChild(label);

    this.element.appendChild(div);
}

/**
 * 移除选项
 * @param {ol.layer.Layer} layer
 */
ol.control.LayerSwitch.prototype.removeLayerItem = function(layer){
    var childs = this.element.getElementsByClassName('ol-control-layerswitch-opt')
    for (let index = 0; index < childs.length; index++) {
        const divChild = childs[index];
        if(divChild.getAttribute('layerid') === ol.getUid(layer).toString()){
            this.element.removeChild(divChild);
        }
    }
}

/**
 * 设置map
 * @param {ol.Map} map
 */
ol.control.LayerSwitch.prototype.setMap = function(map){
    ol.control.Control.prototype.setMap.call(this, map);
    if(map){
        this.init();
        var layers = map.getLayers();
        layers.on(['add','remove'], function(evt){
            this.update(evt);
        }.bind(this));
    }
}

/**
 * 更新
 * @param {ol.event} evt
 */
ol.control.LayerSwitch.prototype.update = function(evt){
    if(evt.type === 'add'){
        this.addLayerItem(evt.element);
    }else{
        this.removeLayerItem(evt.element);
    }
}
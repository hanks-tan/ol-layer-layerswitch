var app = {
    map: undefined,
    initMap: function(){
        var baseLayer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
            }),
            title: '底图'
        });
        var map = new ol.Map({
            target: 'map',
            view: new ol.View({
                projection: 'EPSG:4326',
                center: [118, 36],
                zoom: 7
            }),
            layers: [baseLayer]
        });
        this.map = map;

        var drawControl = new ol.control.LayerSwitch();
        map.addControl(drawControl);
    },
    addLayer: function(url, title){
        var vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            title: title
        });
        this.map.addLayer(vectorLayer);
        $.getJSON(url, function(data){
            var fts = new ol.format.GeoJSON().readFeatures(data);
            vectorLayer.getSource().addFeatures(fts);
        })
        return vectorLayer;
    },
    removeLayer: function(layer){
        this.map.removeLayer(layer);
    }
};

app.initMap();

var region = 'data/shandong.geojson';


var layer = app.addLayer(region, '山东省界');


$('#add').click(function(){
    var point = 'data/point.geojson';
    app.addLayer(point, '监测站');
});

$('#remove').click(function(){
    app.removeLayer(layer);
});

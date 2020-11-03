var selecciondia  = new dc.SelectMenu('#selecciondia'), //BANDERA DE IDENTIFICACIÓN
    seleccionmes  = new dc.SelectMenu('#seleccionmes'), //BANDERA DE IDENTIFICACIÓN
    seleccionanio = new dc.SelectMenu('#seleccionanio'), //BANDERA DE IDENTIFICACIÓN
    seleccionevento = new dc.SelectMenu('#seleccionevento'),

    graficotorta   = new dc.PieChart("#graficoxregiones");
    cursovxp   = new dc.BarChart("#cursovxp");
    contexto   = new dc.RowChart("#contexto");
    torta = new dc.PieChart("#torta");
    edad = new dc.PieChart("#edad");



  d3.csv("base_para_dimesiones.csv").then(function(experiments) {
    
   var  ndx = crossfilter(experiments),// 1 Crea la instancia de filtro cruzado.
        regionesDim = ndx.dimension(function(d) {return d.regiones;}), // 2 crea la dimesión para analizar filtrar o agrupar
        agrupamientoXProvincia = regionesDim.group().reduceCount(function(d) {return +d.conteo;}),
      
        eventoDim = ndx.dimension(function(d) {return d.Nombre_evento;}),//para filtrar por eventos


        contextoDim = ndx.dimension(function(d) {return d.contexto;}),
        contextoDim2= contextoDim.group().reduceCount(function(d) {return d.conteo;}),

        
        //DIMENSIÓN DE GENERO
        generoDim = ndx.dimension(function(d) {return d.genero;}),
        generoDim2= generoDim.group().reduceCount(function(d) {return d.genero}),

        //DIMENSIÓN DE edad
        grupoedadDim = ndx.dimension(function(d) {return d.grupoEdad;}),
        edadDim2= grupoedadDim.group().reduceCount(function(d) {return d.genero}),



        fechas = ndx.dimension(function(d) {return d.secuencia;}),
        agrupamientoxevento = fechas.group().reduceCount(function(d) {return d.conteo;}),


        //fechasaMostrar      = ndx.dimension(function(d) {return d.fecha;}), 
        diaDimension = ndx.dimension(function(d) {return d.dia;}), 
        mesDimension = ndx.dimension(function(d) {return d.mes;}), 
        anioDimension = ndx.dimension(function(d) {return d.anio;});

        
    

//grafico
edad
    .width(668)
    .height(380)
    .slicesCap(10)
    .innerRadius(60)
    .externalLabels(50)
    .externalRadiusPadding(30)
    .drawPaths(false)
    .dimension(grupoedadDim)
    .group(edadDim2)
    .legend(dc.legend().highlightSelected(true))
     .on('pretransition', function(chart) {
        chart.selectAll('text.pie-slice').text(function(d) {
            return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
        })
    });

//grafico
torta
    .width(668)
    .height(380)
    .slicesCap(6)
    .innerRadius(60)
    .externalLabels(50)
    .externalRadiusPadding(30)
    .drawPaths(false)
    .dimension(generoDim)
    .group(generoDim2)
    .legend(dc.legend().highlightSelected(true))
    .on('pretransition', function(chart) {
        chart.selectAll('text.pie-slice').text(function(d) {
            return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
        })
    });

    

    // Libreria D3.js
  cursovxp
    .width(1200)
    .height(300)
    .x(d3.scaleBand())
    .xUnits(dc.units.ordinal)
    .brushOn(false)
    .centerBar(false)
    .elasticY(true)
    .elasticX(true)
    .yAxisLabel("Actividad")
    .xAxisLabel("Fecha")
    .dimension(fechas)
    .group(agrupamientoxevento)
    .margins({left: 100, top: 20, right: 0, bottom: 100});

    contexto
    .width(600)
    .height(400)
    .x(d3.scaleLinear().domain())
    .elasticX(true)
    .dimension(contextoDim)
    .group(contextoDim2);



    // Libreria D3.js
  graficotorta
    .width(600)
    .height(400)
    .slicesCap(6)
    .innerRadius(100)
    //.x(d3.scaleBand())
    //.xUnits(dc.units.ordinal)
    //.brushOn(false)
    //.centerBar(false)
    //.elasticY(true)
    //.elasticX(true)
    //.yAxisLabel("Actividad")
    //.xAxisLabel("Regiones")
    .dimension(regionesDim)
    .group(agrupamientoXProvincia)
    //.margins({left: 100, top: 20, right: 0, bottom: 100});


   seleccionanio
    .dimension(anioDimension)
    .group(anioDimension.group())
    .controlsUseVisibility(false)
    //.multiple(true)
    //.numberVisible(15);

   seleccionmes
    .dimension(mesDimension)
    .group(mesDimension.group())
    .controlsUseVisibility(false)
    .multiple(true)
    .numberVisible(6);

   selecciondia
    .dimension(diaDimension)
    .group(diaDimension.group())
    .controlsUseVisibility(false)
    .multiple(true)
    .numberVisible(6);




    seleccionevento
    .dimension(regionesDim)
    .group(regionesDim.group())
    .controlsUseVisibility(false)
    //.multiple(true)
    //.numberVisible(6);

    graficotorta.render();
    cursovxp.render();
    seleccionanio.render();
    seleccionmes.render();
    selecciondia.render();
    seleccionevento.render();
    contexto.render();
    torta.render();
    edad.render();
});


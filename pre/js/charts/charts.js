//Desarrollo de las visualizaciones
import * as d3 from 'd3';
require('./sellect');
import { numberWithCommas3 } from '../helpers';
import { getInTooltip, getOutTooltip, positionTooltip } from '../modules/tooltip';
import { setChartHeight } from '../modules/height';
import { setChartCanvas, setChartCanvasImage } from '../modules/canvas-image';
import { setRRSSLinks } from '../modules/rrss';
import { setFixedIframeUrl } from './chart_helpers';

//Colores fijos
const COLOR_PRIMARY_1 = '#F8B05C',
COLOR_COMP_2 = '#AADCE0',
COLOR_ANAG_PRIM_3 = '#9E3515';
let tooltip = d3.select('#tooltip');

export function initChart() {
    //Creación de otros elementos relativos al gráfico que no requieran lectura previa de datos > Selectores múltiples o simples, timelines, etc 

    //Lectura de datos
    d3.csv('https://raw.githubusercontent.com/CarlosMunozDiazCSIC/informe_perfil_mayores_2022_demografia_1_10/main/data/piramide_2021_extranjeros_nacional.csv', function(error,data) {
        if (error) throw error;

        //SELECCIÓN DE ELEMENTOS
        let selectedArr = ['Españoles','Extranjeros'];
        let mySellect = sellect("#my-element", {
            originList: ['Españoles','Extranjeros','Nacional'],
            destinationList: ['Españoles','Extranjeros'],
            onInsert: onChange,
            onRemove: onChange
        });

        function onChange() {
            selectedArr = mySellect.getSelected();
            setPyramids(selectedArr);
        }

        mySellect.init();

        /////////////////VISUALIZACIÓN DE PIRÁMIDES///////////////
        ///Dividir los datos
        let currentType = 'Porcentajes';
        let dataAbsolutoEspanol = data.filter(function(item) { if (item.Tipo == 'Españoles' && item.Data == 'Absolutos') { return item; }});
        let dataAbsolutoExtranjero = data.filter(function(item) { if (item.Tipo == 'Extranjeros' && item.Data == 'Absolutos') { return item; }});
        let dataAbsolutoNacional = data.filter(function(item) { if (item.Tipo == 'Nacional' && item.Data == 'Absolutos') { return item; }});
        let dataRelativoEspanol = data.filter(function(item) { if (item.Tipo == 'Españoles' && item.Data == 'Porcentajes') { return item; }});
        let dataRelativoExtranjero = data.filter(function(item) { if (item.Tipo == 'Extranjeros' && item.Data == 'Porcentajes') { return item; }});
        let dataRelativoNacional = data.filter(function(item) { if (item.Tipo == 'Nacional' && item.Data == 'Porcentajes') { return item; }});

        ///Valores iniciales de altura, anchura y márgenes > Primer desarrollo solo con Valores absolutos
        let margin = {top: 5, right: 25, bottom: 20, left: 70},
            width = document.getElementById('chart').clientWidth - margin.left - margin.right,
            height = width * 0.67 - margin.top - margin.bottom;

        let svg = d3.select("#chart")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let x = d3.scaleLinear()
            .domain([-1.5,1.5])
            .range([0,width]);

        let xM = d3.scaleLinear()
            .domain([1.5,0])
            .range([0, width / 2]);

        let xF = d3.scaleLinear()
            .domain([0,1.5])
            .range([width / 2, width]);

        let xAxis = function(svg) {
            svg.call(d3.axisBottom(x).ticks(6).tickFormat(function(d) { return numberWithCommas3(Math.abs(d)); }));
            svg.call(function(g){
                g.selectAll('.tick line')
                    .attr('class', function(d,i) {
                        if (d == 0) {
                            return 'line-special';
                        }
                    })
                    .attr('y1', '0')
                    .attr('y2', `-${height}`)
            });
        }

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr('class','x-axis')
            .call(xAxis);

        let y = d3.scaleBand()
            .range([ 0, height ])
            .domain(dataAbsolutoEspanol.map(function(item) { return item.Edad; }).reverse())
            .padding(.1);

        let yAxis = function(svg) {
            svg.call(d3.axisLeft(y).tickValues(y.domain().filter(function(d,i){ return !(i%10)})));
            svg.call(function(g){g.selectAll('.tick line').remove()});
        }

        svg.append("g")
            .call(yAxis);

        function setPyramids(types) {
            //Borrado de datos
            svg.selectAll('.chart-g')
                .remove();

            //Lógica de ejes y pirámides
            if(currentType == 'Absolutos') {

                x.domain([-500000,500000]);
                svg.select(".x-axis").call(xAxis);                
                xM.domain([500000,0]);
                xF.domain([0,500000]);

                for(let i = types.length - 1; i >= 0; i--) {

                    if(types[i] == 'Españoles') {
                        svg.append("g")
                            .attr('class', 'chart-g')
                            .selectAll("rect")
                            .data(dataAbsolutoEspanol)
                            .enter()
                            .append("rect")
                            .attr('class', 'prueba')
                            .attr("fill", COLOR_PRIMARY_1)
                            .style('opacity', '0.8')
                            .attr("x", x(0))
                            .attr("y", function(d) { return y(d.Edad); })
                            .attr("width", 0)
                            .attr("height", y.bandwidth())
                            .on('mouseover', function(d,i,e) {
                                //Dibujo contorno de la rect
                                this.style.stroke = '#000';
                                this.style.strokeWidth = '1';
            
                                //Texto en tooltip
                                let html = '<p class="chart__tooltip--title">' + d.Sexo + ' (' + d.Edad + ' años)</p>' + 
                                    '<p class="chart__tooltip--title_2">Tipo: ' + d.Tipo + '</p>' +
                                    '<p class="chart__tooltip--text">Número absoluto de personas: ' + numberWithCommas3(parseInt(d.Valor))+ '</p>';
                            
                                tooltip.html(html);
            
                                //Tooltip
                                positionTooltip(window.event, tooltip);
                                getInTooltip(tooltip);
                            })
                            .on('mouseout', function(d,i,e) {
                                //Fuera contorno
                                this.style.stroke = 'none';
                                this.style.strokeWidth = '0';
            
                                //Fuera tooltip
                                getOutTooltip(tooltip);
                            })
                            .transition()
                            .duration(2000)
                            .attr("x", function(d) { if(d.Sexo == 'Hombres') { return xM(d.Valor); } else { return xF(0); }})
                            .attr('width', function(d) { if(d.Sexo == 'Hombres') { return xM(0) - xM(d.Valor); } else { return xF(d.Valor) - xF(0); }});
                    }
        
                    if(types[i] == 'Extranjeros') {
                        svg.append("g")
                            .attr('class', 'chart-g')
                            .selectAll("rect")
                            .data(dataAbsolutoExtranjero)
                            .enter()
                            .append("rect")
                            .attr('class', 'prueba')
                            .attr("fill", COLOR_COMP_2)
                            .style('opacity', '0.8')
                            .attr("x", x(0))
                            .attr("y", function(d) { return y(d.Edad); })
                            .attr("width", 0)
                            .attr("height", y.bandwidth())
                            .on('mouseover', function(d,i,e) {
                                //Dibujo contorno de la rect
                                this.style.stroke = '#000';
                                this.style.strokeWidth = '1';
            
                                //Texto en tooltip
                                let html = '<p class="chart__tooltip--title">' + d.Sexo + ' (' + d.Edad + ' años)</p>' + 
                                    '<p class="chart__tooltip--title_2">Tipo: ' + d.Tipo + '</p>' +
                                    '<p class="chart__tooltip--text">Número absoluto de personas: ' + numberWithCommas3(parseInt(d.Valor))+ '</p>';
                            
                                tooltip.html(html);
            
                                //Tooltip
                                positionTooltip(window.event, tooltip);
                                getInTooltip(tooltip);
                            })
                            .on('mouseout', function(d,i,e) {
                                //Fuera contorno
                                this.style.stroke = 'none';
                                this.style.strokeWidth = '0';
            
                                //Fuera tooltip
                                getOutTooltip(tooltip);
                            })
                            .transition()
                            .duration(2000)
                            .attr("x", function(d) { if(d.Sexo == 'Hombres') { return xM(d.Valor); } else { return xF(0); }})
                            .attr('width', function(d) { if(d.Sexo == 'Hombres') { return xM(0) - xM(d.Valor); } else { return xF(d.Valor) - xF(0); }});
                    }
    
                    if(types[i] == 'Nacional') {
                        svg.append("g")
                            .attr('class', 'chart-g')
                            .selectAll("rect")
                            .data(dataAbsolutoNacional)
                            .enter()
                            .append("rect")
                            .attr('class', 'prueba')
                            .attr("fill", COLOR_ANAG_PRIM_3)
                            .style('opacity', '0.8')
                            .attr("x", x(0))
                            .attr("y", function(d) { return y(d.Edad); })
                            .attr("width", 0)
                            .attr("height", y.bandwidth())
                            .on('mouseover', function(d,i,e) {
                                //Dibujo contorno de la rect
                                this.style.stroke = '#000';
                                this.style.strokeWidth = '1';
            
                                //Texto en tooltip
                                let html = '<p class="chart__tooltip--title">' + d.Sexo + ' (' + d.Edad + ' años)</p>' + 
                                    '<p class="chart__tooltip--title_2">Tipo: ' + d.Tipo + '</p>' +
                                    '<p class="chart__tooltip--text">Número absoluto de personas: ' + numberWithCommas3(parseInt(d.Valor))+ '</p>';
                            
                                tooltip.html(html);
            
                                //Tooltip
                                positionTooltip(window.event, tooltip);
                                getInTooltip(tooltip);
                            })
                            .on('mouseout', function(d,i,e) {
                                //Fuera contorno
                                this.style.stroke = 'none';
                                this.style.strokeWidth = '0';
            
                                //Fuera tooltip
                                getOutTooltip(tooltip);
                            })
                            .transition()
                            .duration(2000)
                            .attr("x", function(d) { if(d.Sexo == 'Hombres') { return xM(d.Valor); } else { return xF(0); }})
                            .attr('width', function(d) { if(d.Sexo == 'Hombres') { return xM(0) - xM(d.Valor); } else { return xF(d.Valor) - xF(0); }});
                    }
                }                

            } else {

                x.domain([-1.5,1.5]);
                svg.select(".x-axis").call(xAxis);
                xM.domain([1.5,0]);
                xF.domain([0,1.5]);

                for(let i = types.length - 1; i >= 0; i--) {

                    if(types[i] == 'Españoles') {
                        svg.append("g")
                            .attr('class', 'chart-g')
                            .selectAll("rect")
                            .data(dataRelativoEspanol)
                            .enter()
                            .append("rect")
                            .attr('class', 'prueba')
                            .attr("fill", COLOR_PRIMARY_1)
                            .style('opacity', '0.8')
                            .attr("x", x(0))
                            .attr("y", function(d) { return y(d.Edad); })
                            .attr("width", 0)
                            .attr("height", y.bandwidth())
                            .on('mouseover', function(d,i,e) {
                                //Dibujo contorno de la rect
                                this.style.stroke = '#000';
                                this.style.strokeWidth = '1';
            
                                //Texto en tooltip
                                let html = '<p class="chart__tooltip--title">' + d.Sexo + ' (' + d.Edad + ' años)</p>' + 
                                '<p class="chart__tooltip--title_2">Tipo: ' + d.Tipo + '</p>' +
                                '<p class="chart__tooltip--text">% sobre total del grupo: ' + numberWithCommas3(parseFloat(d.Valor).toFixed(2))+ '%</p>';
                            
                                tooltip.html(html);
            
                                //Tooltip
                                positionTooltip(window.event, tooltip);
                                getInTooltip(tooltip);
                            })
                            .on('mouseout', function(d,i,e) {
                                //Fuera contorno
                                this.style.stroke = 'none';
                                this.style.strokeWidth = '0';
            
                                //Fuera tooltip
                                getOutTooltip(tooltip);
                            })
                            .transition()
                            .duration(2000)
                            .attr("x", function(d) { if(d.Sexo == 'Hombres') { return xM(d.Valor); } else { return xF(0); }})
                            .attr('width', function(d) { if(d.Sexo == 'Hombres') { return xM(0) - xM(d.Valor); } else { return xF(d.Valor) - xF(0); }});
                    }
        
                    if(types[i] == 'Extranjeros') {
                        svg.append("g")
                            .attr('class', 'chart-g')
                            .selectAll("rect")
                            .data(dataRelativoExtranjero)
                            .enter()
                            .append("rect")
                            .attr('class', 'prueba')
                            .attr("fill", COLOR_COMP_2)
                            .style('opacity', '0.8')
                            .attr("x", x(0))
                            .attr("y", function(d) { return y(d.Edad); })
                            .attr("width", 0)
                            .attr("height", y.bandwidth())
                            .on('mouseover', function(d,i,e) {
                                //Dibujo contorno de la rect
                                this.style.stroke = '#000';
                                this.style.strokeWidth = '1';
            
                                //Texto en tooltip
                                let html = '<p class="chart__tooltip--title">' + d.Sexo + ' (' + d.Edad + ' años)</p>' + 
                                '<p class="chart__tooltip--title_2">Tipo: ' + d.Tipo + '</p>' +
                                '<p class="chart__tooltip--text">% sobre total del grupo: ' + numberWithCommas3(parseFloat(d.Valor).toFixed(2))+ '%</p>';
                            
                                tooltip.html(html);
            
                                //Tooltip
                                positionTooltip(window.event, tooltip);
                                getInTooltip(tooltip);
                            })
                            .on('mouseout', function(d,i,e) {
                                //Fuera contorno
                                this.style.stroke = 'none';
                                this.style.strokeWidth = '0';
            
                                //Fuera tooltip
                                getOutTooltip(tooltip);
                            })
                            .transition()
                            .duration(2000)
                            .attr("x", function(d) { if(d.Sexo == 'Hombres') { return xM(d.Valor); } else { return xF(0); }})
                            .attr('width', function(d) { if(d.Sexo == 'Hombres') { return xM(0) - xM(d.Valor); } else { return xF(d.Valor) - xF(0); }});
                    }
    
                    if(types[i] == 'Nacional') {
                        svg.append("g")
                            .attr('class', 'chart-g')
                            .selectAll("rect")
                            .data(dataRelativoNacional)
                            .enter()
                            .append("rect")
                            .attr('class', 'prueba')
                            .attr("fill", COLOR_ANAG_PRIM_3)
                            .style('opacity', '0.8')
                            .attr("x", x(0))
                            .attr("y", function(d) { return y(d.Edad); })
                            .attr("width", 0)
                            .attr("height", y.bandwidth())
                            .on('mouseover', function(d,i,e) {
                                //Dibujo contorno de la rect
                                this.style.stroke = '#000';
                                this.style.strokeWidth = '1';
            
                                //Texto en tooltip
                                let html = '<p class="chart__tooltip--title">' + d.Sexo + ' (' + d.Edad + ' años)</p>' + 
                                '<p class="chart__tooltip--title_2">Tipo: ' + d.Tipo + '</p>' +
                                '<p class="chart__tooltip--text">% sobre total del grupo: ' + numberWithCommas3(parseFloat(d.Valor).toFixed(2))+ '%</p>';
                            
                                tooltip.html(html);
            
                                //Tooltip
                                positionTooltip(window.event, tooltip);
                                getInTooltip(tooltip);
                            })
                            .on('mouseout', function(d,i,e) {
                                //Fuera contorno
                                this.style.stroke = 'none';
                                this.style.strokeWidth = '0';
            
                                //Fuera tooltip
                                getOutTooltip(tooltip);
                            })
                            .transition()
                            .duration(2000)
                            .attr("x", function(d) { if(d.Sexo == 'Hombres') { return xM(d.Valor); } else { return xF(0); }})
                            .attr('width', function(d) { if(d.Sexo == 'Hombres') { return xM(0) - xM(d.Valor); } else { return xF(d.Valor) - xF(0); }});
                    }

                }
                
            }
        }

        ////////////
        ////////////RESTO
        ////////////
        setPyramids(selectedArr, currentType);

        //Uso de dos botones para ofrecer datos absolutos y en miles
        document.getElementById('data_absolutos').addEventListener('click', function() {
            //Cambiamos color botón
            document.getElementById('data_porcentajes').classList.remove('active');
            document.getElementById('data_absolutos').classList.add('active');

            //Cambiamos valor actual
            currentType = 'Absolutos';

            //Cambiamos gráfico
            setPyramids(selectedArr, currentType);        
            
            setTimeout(() => {
                setChartCanvas();
            }, 4000);
        });

        document.getElementById('data_porcentajes').addEventListener('click', function() {
            //Cambiamos color botón
            document.getElementById('data_porcentajes').classList.add('active');
            document.getElementById('data_absolutos').classList.remove('active');

            //Cambiamos valor actual
            currentType = 'Porcentajes';

            //Cambiamos gráfico
            setPyramids(selectedArr, currentType); 
            
            setTimeout(() => {
                setChartCanvas();
            }, 4000);
        });

        //Animación del gráfico
        document.getElementById('replay').addEventListener('click', function() {
            setPyramids(selectedArr, currentType);

            setTimeout(() => {
                setChartCanvas();
            }, 4000);
        });

        //Iframe
        setFixedIframeUrl('informe_perfil_mayores_2022_demografia_1_10','piramide_espanoles_Extranjeros');

        //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
        setRRSSLinks('piramide_espanoles_Extranjeros');

        //Captura de pantalla de la visualización
        setTimeout(() => {
            setChartCanvas();
        }, 4000);

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('piramide_espanoles_Extranjeros');
        });

        //Altura del frame
        setChartHeight();
    });    
}
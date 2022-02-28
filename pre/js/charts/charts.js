//Desarrollo de las visualizaciones
import * as d3 from 'd3';
import { numberWithCommas2 } from '../helpers';
//import { getInTooltip, getOutTooltip, positionTooltip } from './modules/tooltip';
import { setChartHeight } from '../modules/height';
import { setChartCanvas, setChartCanvasImage, setCustomCanvas, setChartCustomCanvasImage } from '../modules/canvas-image';
import { setRRSSLinks } from '../modules/rrss';
import { setFixedIframeUrl } from './chart_helpers';

//Colores fijos
const COLOR_PRIMARY_1 = '#F8B05C', 
COLOR_PRIMARY_2 = '#E37A42', 
COLOR_ANAG_1 = '#D1834F', 
COLOR_ANAG_2 = '#BF2727', 
COLOR_COMP_1 = '#528FAD', 
COLOR_COMP_2 = '#AADCE0', 
COLOR_GREY_1 = '#B5ABA4', 
COLOR_GREY_2 = '#64605A', 
COLOR_OTHER_1 = '#B58753', 
COLOR_OTHER_2 = '#731854';

export function initChart1_1(iframe) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Figura 1.1. Evolución de la población de 65 y más años. España, 1908-2035';
    document.getElementById('subtitle').textContent = 'Muestra de datos en valores absolutos y en valores relativos.';
    document.getElementById('data-source').textContent = 'Human Mortality Database (HMD): datos entre 1908 y 2019. Instituto Nacional de Estadística: Estadísticas del Padrón continuo (2020-2021) y proyecciones de población (2022-2035).';
    document.getElementById('data-note').textContent = 'De 1908 a 2021 los datos son reales. De 2022 a 2035 son proyecciones.';

    //Creación de otros elementos relativos al gráfico que no requieran lectura previa de datos > Selectores múltiples o simples, timelines, etc 

    //Lectura de datos
    d3.csv('https://raw.githubusercontent.com/CarlosMunozDiazCSIC/informe-perfil-mayores-2022-demografia/main/data/evolucion_mayores_1908_2035.csv', function(error,data) {
        if (error) throw error;

        console.log(data);

        /////
        /////
        // Resto
        /////
        /////
        
        //Animación del gráfico
        document.getElementById('replay').addEventListener('click', function() {
            animateChart();
        });

        //Iframe
        setFixedIframeUrl('evolucion_poblacion_65ymas');

        //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
        setRRSSLinks('evolucion_poblacion_65ymas');

        //Captura de pantalla de la visualización
        setChartCanvas();
        setCustomCanvas();

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('evolucion_poblacion_65ymas');
            setChartCustomCanvasImage('evolucion_poblacion_65ymas');
        });

        //Altura del frame
        setChartHeight(iframe);

    });    
}

export function initChart1_2(iframe) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Figura 1.2. Comparativa de pirámides de población de España urbana y de España rural, 2021';
    document.getElementById('subtitle').textContent = 'Datos en valores absolutos.';
    document.getElementById('data-source').textContent = 'Instituto Nacional de Estadística (INE): Estadística del Padrón continuo a 1 de enero de 2021.';
    document.getElementById('data-note').textContent = 'La España rural es la población que vive en municipios de 2.000 habitantes o menos.';

    //Creación de otros elementos relativos al gráfico que no requieran lectura previa de datos > Selectores múltiples o simples, timelines, etc 

    //Lectura de datos
    d3.csv('https://raw.githubusercontent.com/CarlosMunozDiazCSIC/informe-perfil-mayores-2022-demografia/main/data/piramide_2021_urbano-rural_nacional.csv', function(error,data) {
        if (error) throw error;

        //Animación del gráfico
        document.getElementById('replay').addEventListener('click', function() {
            animateChart();
        });

        //Iframe
        setFixedIframeUrl('comparativa_piramides_espana_rural');

        //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
        setRRSSLinks('comparativa_piramides_espana_rural');

        //Captura de pantalla de la visualización
        setChartCanvas();
        setCustomCanvas();

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('comparativa_piramides_espana_rural');
            setChartCustomCanvasImage('comparativa_piramides_espana_rural');
        });

        //Altura del frame
        setChartHeight(iframe);
    });    
}

export function initChart1_3(iframe) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Figura 1.3. Evolución de la población por sexo y edad en España, 1908-2035';
    document.getElementById('subtitle').textContent = 'Datos en valores absolutos.';
    document.getElementById('data-source').textContent = 'Human Mortality Database (HMD): datos entre 1908 y 2019. Instituto Nacional de Estadística: Estadísticas del Padrón continuo (2020-2021) y proyecciones de población (2022-2035).';
    document.getElementById('data-note').textContent = 'De 1908 a 2021 los datos son reales. De 2022 a 2035 son proyecciones.';

    //Creación de otros elementos relativos al gráfico que no requieran lectura previa de datos > Selectores múltiples o simples, timelines, etc 

    //Lectura de datos
    d3.csv('https://raw.githubusercontent.com/CarlosMunozDiazCSIC/informe-perfil-mayores-2022-demografia/main/data/evolucion_poblacion_1908_2035.csv', function(error,data) {
        if (error) throw error;

        /////
        /////
        // Resto
        /////
        /////

        //Animación del gráfico
        document.getElementById('replay').addEventListener('click', function() {
            animateChart();
        });

        //Iframe
        setFixedIframeUrl('proyecciones_sexo_edad');

        //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
        setRRSSLinks('proyecciones_sexo_edad');

        //Captura de pantalla de la visualización
        setChartCanvas();
        setCustomCanvas();

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('proyecciones_sexo_edad');
            setChartCustomCanvasImage('proyecciones_sexo_edad');
        });

        //Altura del frame
        setChartHeight(iframe);
    });    
}

export function initChart1_4(iframe) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Figura 1.4. Diferencia entre la población de hombres y mujeres por grupo de edad en España, 2021';
    document.getElementById('subtitle').textContent = 'Datos en valores absolutos.';
    document.getElementById('data-source').textContent = 'INE: Estadística del Padrón continuo a 1 de enero de 2021';
    document.getElementById('data-note').textContent = '';

    //Creación de otros elementos relativos al gráfico que no requieran lectura previa de datos > Selectores múltiples o simples, timelines, etc 

    //Lectura de datos
    d3.csv('https://raw.githubusercontent.com/CarlosMunozDiazCSIC/informe-perfil-mayores-2022-demografia/main/data/diferencias_hombres_mujeres_2021.csv', function(error,data) {
        if (error) throw error;


        /////
        /////
        // Resto
        /////
        /////

        //Animación del gráfico
        document.getElementById('replay').addEventListener('click', function() {
            animateChart();
        });

        //Iframe
        setFixedIframeUrl('diferencia_poblacion_sexo');

        //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
        setRRSSLinks('diferencia_poblacion_sexo');

        //Captura de pantalla de la visualización
        setChartCanvas();
        setCustomCanvas();

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('diferencia_poblacion_sexo');
            setChartCustomCanvasImage('diferencia_poblacion_sexo');
        });

        //Altura del frame
        setChartHeight(iframe);
    });    
}

export function initChart1_5(iframe) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Tabla 1.1. Población por grupo de edad y tamaño municipal, 2021';
    document.getElementById('subtitle').textContent = 'Datos en valores absolutos. Los porcentajes, en comparativa horizontal';
    document.getElementById('data-source').textContent = 'Instituto Nacional de Estadística (INE): Estadística del Padrón continuo a 1 de enero de 2021. Consulta: febrero de 2021.';
    document.getElementById('data-note').textContent = 'Grupos de edad: Jóvenes (población menor de 16 años), adultos (población de 16 a 64 años) y mayores (población de 65 y más años).';

    //Desarrollo del gráfico > Tabla con datos brutos
    let tableChart = document.getElementById('chart');
    tableChart.classList.add('viz-table');
    
    /////
    // TABLA
    /////
    let table = document.createElement('table');

    //Cabecera
    let thead = document.createElement('thead');
    
    let thead1 = document.createElement('tr');
    let thead1_1 = document.createElement('th');
    thead1_1.textContent = 'Tamaño del municipio';
    thead1_1.rowSpan = 2;
    let thead1_2 = document.createElement('th');
    thead1_2.textContent = 'Número de municipios';
    thead1_2.rowSpan = 2;
    let thead1_3 = document.createElement('th');
    thead1_3.textContent = 'Grupos de edad';
    thead1_3.rowSpan = 1;
    thead1_3.colSpan = 4;
    thead1.appendChild(thead1_1,thead1_2,thead1_3);

    let thead2 = document.createElement('tr');
    let thead2_1 = document.createElement('th');
    thead2_1.textContent = 'Total';
    let thead2_2 = document.createElement('th');
    thead2_2.textContent = 'Jóvenes';
    let thead2_3 = document.createElement('th');
    thead2_3.textContent = 'Adultos';
    let thead2_4 = document.createElement('th');
    thead2_4.textContent = 'Mayores';
    thead2.appendChild(thead2_1,thead2_2,thead2_3,thead2_4);

    thead.appendChild(thead1);
    thead.appendChild(thead2);

    //Cuerpo
    let tbody = document.createElement('tbody');

    //Unión
    table.appendChild(thead);
    table.appendChild(tbody);

    tableChart.appendChild(table);

    /////
    /////
    // Resto
    /////
    /////

    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('tabla_poblacion_municipios');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('tabla_poblacion_municipios');

    //Captura de pantalla de la visualización
    setChartCanvas();
    setCustomCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('tabla_poblacion_municipios');
        setChartCustomCanvasImage('tabla_poblacion_municipios');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart1_6(iframe) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Figura 1.5. Comparativa de las pirámides de población en España por tamaño de municipio, 2021';
    document.getElementById('subtitle').textContent = 'Datos en valores absolutos.';
    document.getElementById('data-source').textContent = 'Instituto Nacional de Estadística (INE): Estadística del Padrón continuo a 1 de enero de 2021. Consulta: febrero de 2022.';
    document.getElementById('data-note').textContent = 'La clasificación es la misma que la utilizada por el INE.';

    //Creación de otros elementos relativos al gráfico que no requieran lectura previa de datos > Selectores múltiples o simples, timelines, etc 

    //Lectura de datos
    d3.csv('https://raw.githubusercontent.com/CarlosMunozDiazCSIC/informe-perfil-mayores-2022-demografia/main/data/piramide_2021_tamanos_nacional.csv', function(error,data) {
        if (error) throw error;

        /////
        /////
        // Resto
        /////
        /////

        //Animación del gráfico
        document.getElementById('replay').addEventListener('click', function() {
            animateChart();
        });

        //Iframe
        setFixedIframeUrl('comparativa_porc_espana_tamanios');

        //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
        setRRSSLinks('comparativa_porc_espana_tamanios');

        //Captura de pantalla de la visualización
        setChartCanvas();
        setCustomCanvas();

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('comparativa_porc_espana_tamanios');
            setChartCustomCanvasImage('comparativa_porc_espana_tamanios')
        });

        //Altura del frame
        setChartHeight(iframe);
    });


    
}

export function initChart1_7(iframe) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Figura 1.6. Personas con 65 y más años en España a nivel autonómico, 2021';
    document.getElementById('subtitle').textContent = 'Datos en porcentaje.';
    document.getElementById('data-source').textContent = 'Instituto Nacional de Estadística (INE): Estadística del Padrón continuo a 1 de enero de 2021. Consulta: febrero de 2022';
    document.getElementById('data-note').textContent = '';

    //Creación de otros elementos relativos al gráfico que no requieran lectura previa de datos > Selectores múltiples o simples, timelines, etc 

    //Lectura de datos
    d3.csv('https://raw.githubusercontent.com/CarlosMunozDiazCSIC/informe-perfil-mayores-2022-demografia/main/data/poblacion_anciana_ccaa.csv', function(error,data) {
        if (error) throw error;

        //Animación del gráfico
        document.getElementById('replay').addEventListener('click', function() {
            animateChart();
        });

        //Iframe
        setFixedIframeUrl('porc_personas_mayores_espana');

        //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
        setRRSSLinks('porc_personas_mayores_espana');

        //Captura de pantalla de la visualización
        setChartCanvas();
        setCustomCanvas();

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('porc_personas_mayores_espana');
            setChartCustomCanvasImage('porc_personas_mayores_espana');
        });

        //Altura del frame
        setChartHeight(iframe);
    });    
}

export function initChart1_8(iframe) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Figura 1.7. Personas con 65 y más años en España a nivel municipal, 2021';
    document.getElementById('subtitle').textContent = 'Datos en valores porcentuales.';
    document.getElementById('data-source').textContent = 'Instituto Nacional de Estadística (INE): Estadística del Padrón continuo a 1 de enero de 2021.';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico
    //Mapa a desarrollar por Joaquín y/o Julia

    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('mapa_municipios_personas_mayores');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('mapa_municipios_personas_mayores');

    //Captura de pantalla de la visualización
    setChartCanvas();
    setCustomCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('mapa_municipios_personas_mayores');
        setChartCustomCanvasImage('mapa_municipios_personas_mayores');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart1_9(iframe) { //Botones para gráfico y mapa
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Figura 1.8. Comparativa de personas de 65 y más años en Europa a nivel nacional, 2020';
    document.getElementById('subtitle').textContent = 'Datos en valores porcentuales.';
    document.getElementById('data-source').textContent = 'Eurostat (Population on 1 January by broad age group and sex; demo_pjanbroad). Consulta: febrero de 2022.';
    document.getElementById('data-note').textContent = 'Los datos de Reino Unido, Andorra y Bielorrusia son de 2019';

    d3.csv('', function(error,data) {
        if (error) throw error;
        //Botones para elegir gráfico o mapa

        /////
        /////
        // Resto
        /////
        /////
        //Animación del gráfico
        document.getElementById('replay').addEventListener('click', function() {
            animateChart();
        });

        //Iframe
        setFixedIframeUrl('comparativa_europa_personas_mayores');

        //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
        setRRSSLinks('comparativa_europa_personas_mayores');

        //Captura de pantalla de la visualización
        setChartCanvas();
        setCustomCanvas();

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('comparativa_europa_personas_mayores');
            setChartCustomCanvasImage('comparativa_europa_personas_mayores');
        });

        //Altura del frame
        setChartHeight(iframe);
    });    
}

export function initChart1_10(iframe) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Figura 1.9. Distribución de la población extranjera por nacionalidad en España, 2021';
    document.getElementById('subtitle').textContent = 'Comparativa entre la población total y la población con 65 y más años. Datos en valores porcentuales.';
    document.getElementById('data-source').textContent = 'Instituto Nacional de Estadística (INE): Estadística del Padrón continuo a 1 de enero de 2021. Consulta: febrero de 2022.';
    document.getElementById('data-note').textContent = 'No se incluye Reino Unido dentro de la Unión Europea.';

    //Desarrollo del gráfico
    d3.csv('https://raw.githubusercontent.com/CarlosMunozDiazCSIC/informe-perfil-mayores-2022-demografia/main/data/piramide_extranjeros_nacional.csv', function(error,data) {
        if (error) throw error;

        /////
        /////
        // Resto
        /////
        /////
        //Animación del gráfico
        document.getElementById('replay').addEventListener('click', function() {
            animateChart();
        });

        //Iframe
        setFixedIframeUrl('distribucion_poblacion_mayor_extranjera');

        //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
        setRRSSLinks('distribucion_poblacion_mayor_extranjera');

        //Captura de pantalla de la visualización
        setChartCanvas();
        setCustomCanvas();

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('distribucion_poblacion_mayor_extranjera');
            setChartCustomCanvasImage('distribucion_poblacion_mayor_extranjera');
        });

        //Altura del frame
        setChartHeight(iframe);
    });    
}

export function initChart1_11(iframe) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Figura 1.10. Comparativa de pirámides de población nacional y extranjera en España por nacionalidad, 2021';
    document.getElementById('subtitle').textContent = 'Datos en valores porcentuales.';
    document.getElementById('data-source').textContent = 'Instituto Nacional de Estadística (INE): Estadística del Padrón continuo a 1 de enero de 2021. Consulta: febrero de 2022.';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico
    d3.csv('https://raw.githubusercontent.com/CarlosMunozDiazCSIC/informe-perfil-mayores-2022-demografia/main/data/piramide_extranjeros_nacional.csv', function(error,data) {
        if (error) throw error;

        /////
        /////
        // Resto
        /////
        /////
        //Animación del gráfico
        document.getElementById('replay').addEventListener('click', function() {
            animateChart();
        });

        //Iframe
        setFixedIframeUrl('piramide_espanoles_extranjeros');

        //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
        setRRSSLinks('piramide_espanoles_extranjeros');

        //Captura de pantalla de la visualización
        setChartCanvas();
        setCustomCanvas();

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('piramide_espanoles_extranjeros');
            setChartCustomCanvasImage('piramide_espanoles_extranjeros');
        });

        //Altura del frame
        setChartHeight(iframe);
    }); 


    
}
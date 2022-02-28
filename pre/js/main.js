import 'url-search-params-polyfill';
import './modules/tabs';
import * as charts from './charts/charts';

//Necesario para importar los estilos de forma automática en la etiqueta 'style' del html final
import '../css/main.scss';

/////////////
//////// RECOGIDA DE PARÁMETROS DE LA URL
/////////////
getUrlParams();

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);

    //Visualización y tipo de iframe
    const viz = params.get('chart');
    const iframe = params.get('iframe');

    setChart(viz, iframe);
}

function setChart(viz, iframe) {
    pymChild.onMessage('viewport-iframe-position', onScroll);    

    function onScroll(parentInfo) {
        let steps = parentInfo.split(" ");

        if(steps[2] != 0 && !isChartActive) {
            switch(viz){
                //Demografía
                case '1_1':
                    charts.initChart1_1(iframe, steps[2]);
                    break;
                case '1_2':
                    charts.initChart1_2(iframe, steps[2]);
                    break;
                case '1_3':
                    charts.initChart1_3(iframe, steps[2]);
                    break;
                case '1_4':
                    charts.initChart1_4(iframe, steps[2]);
                    break;
                case '1_5':
                    charts.initChart1_5(iframe, steps[2]);
                    break;
                case '1_6':
                    charts.initChart1_6(iframe, steps[2]);
                    break;
                case '1_7':
                    charts.initChart1_7(iframe, steps[2]);
                    break;
                case '1_8':
                    charts.initChart1_8(iframe, steps[2]);
                    break;
                case '1_9':
                    charts.initChart1_9(iframe, steps[2]);
                    break;
                case '1_10':
                    charts.initChart1_10(iframe, steps[2]);
                    break;
                case '1_11':
                    charts.initChart1_11(iframe, steps[2]);
                    break;
                default: //Si no hay parámetros en la URL
                    charts.initChart1_1('responsive', steps[2]);
                        break;                
            }
            isChartActive = true;
        }
    }    
}
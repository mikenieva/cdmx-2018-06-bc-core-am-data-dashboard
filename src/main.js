
const getJSON = url => fetch(url).then(response => response.json());

const drawTable = (listaEstudiantes) => {

    if(document.getElementById("estadistica").hasChildNodes()){
        let elementoEstadistica = document.getElementById("estadistica");
        while (elementoEstadistica.hasChildNodes()) {
            elementoEstadistica.removeChild(elementoEstadistica.lastChild);
            }
        }

    let counter = 1; 

    listaEstudiantes.map( (elemento) => {

        // Creación de variables TR (Tabla principal)
        let trvariable = document.createElement("tr");

        // Creación de elementos TH (Númerico ID) y TD (Propiedad Normal)
        let thvariableNumber = document.createElement("th");
        let tdvariableName = document.createElement("td");
        let tdvariableEmail = document.createElement("td");
        let tdvariableCampus = document.createElement("td");
        let tdvariableGeneration = document.createElement("td");
        let tdvariableCompletedPercentage = document.createElement("td");

        // Obtención de valores TH (Númerico ID) y TD (Propiedad Normal)
        let thNumber = document.createTextNode(counter);
        let tdName = document.createTextNode(elemento.name);
        let tdEmail = document.createTextNode(elemento.email);
        let tdCampus = document.createTextNode(((elemento.campus).charAt(0).toUpperCase()) + (elemento.campus).slice(1));
        let tdGeneration = document.createTextNode(((elemento.generation).charAt(0).toUpperCase()) + (elemento.generation).slice(1));
        let tdCompletedPercentage = document.createTextNode(elemento.stats.completedPercentage);

        
        // Anexo de los elementos al TR actual
        trvariable.appendChild(thvariableNumber);
        trvariable.appendChild(tdvariableName);
        trvariable.appendChild(tdvariableEmail);
        trvariable.appendChild(tdvariableCampus);
        trvariable.appendChild(tdvariableGeneration);
        trvariable.appendChild(tdvariableCompletedPercentage);
        
        // Igualar valores a los elementos anteriores
        thvariableNumber.appendChild(thNumber);
        tdvariableName.appendChild(tdName);
        tdvariableEmail.appendChild(tdEmail);
        tdvariableCampus.appendChild(tdCampus);
        tdvariableGeneration.appendChild(tdGeneration);
        tdvariableCompletedPercentage.appendChild(tdCompletedPercentage);

        let currentDiv = document.getElementById("estadistica");
        document.getElementById("estadistica").appendChild(trvariable);

        counter++;
    })
}

/* Inicio de eventos */

document.getElementById("sede").addEventListener("change",function(){
    
    let sedeCapturada = document.getElementById("sede").value.toLowerCase();

    getJSON("https://raw.githubusercontent.com/mikenieva/cdmx-2018-06-bc-core-am-data-dashboard/master/data/laboratoria.json")
    .then(function(resultados){
        let arrListaEstudiantes = computeStudentsStats(resultados);
        let arrListaEstudiantesSede = arrListaEstudiantes.filter(function(item){
          return item.campus == sedeCapturada;
        })   
        drawTable(arrListaEstudiantesSede)
    })
});


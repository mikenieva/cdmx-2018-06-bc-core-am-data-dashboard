window.computeStudentsStats = (laboratoria) => {
  finalArray = [];
  let laboratoriaSedes = Object.keys(laboratoria);
  for(z = 0; z < laboratoriaSedes.length; z++){  
    let currentCampus = laboratoriaSedes[z];
    let laboratoriaGeneracion = Object.keys(laboratoria[laboratoriaSedes[z]].generacion)
    for(m = 0; m < laboratoriaGeneracion.length; m++){
        let currentGeneration = laboratoriaGeneracion[m];
        let laboratoriaEstudiantes = laboratoria[laboratoriaSedes[z]].generacion[laboratoriaGeneracion[m]].estudiantes;
         let everyone = laboratoriaEstudiantes.map(function(object){
            let objeto = {
              name: "name",
              email: "email",
              campus: currentCampus,
              generation: currentGeneration,
              stats: {
                status: 0,
                completedPercentage: 0,
                topics: {
                  '01-Introduccion-a-programacion': {
                    completedPercentage: 0,
                    percentageDuration: 0,
                    subtopics: {
                      '00-bienvenida-orientacion': {
                        completedPercentage: 0,
                        type: "String",
                        duration: 0
                      },
                      '01-desarrollo-profesional': {
                        completedPercentage: 0,
                        type: "String",
                        duration: 0
                      },
                      '02-por-que-aprender-a-programar': {
                        completedPercentage: 0,
                        type: "String",
                        duration: 0
                      },
                      '03-tu-primer-sitio': {
                        completedPercentage: 0,
                        type: "String",
                        duration: 0
                      },
                      '04-quiz': {
                        completedPercentage: 0,
                        type: "String",
                        duration: 0
                      }
                    }
                  },
                  '02-Variables-y-tipo-de-datos': {
                    completedPercentage: 0,
                    percentageDuration: 0,
                    subtopics: {
                      '00-Tipos-de-datos-y-operadores': {
                        completedPercentage: 0,
                        type: "String",
                        duration: 0
                      },
                      '01-variables': {
                        completedPercentage: 0,
                        type: "String",
                        duration: 0
                      },
                      '02-auto-aprendizaje-MDN': {
                        completedPercentage: 0,
                        type: "String",
                        duration: 0
                      },
                      '03-comments': {
                        completedPercentage: 0,
                        type: "String",
                        duration: 0
                      },
                      '04-ejercicios-guiados': {
                        completedPercentage: 0,
                        type: "String",
                        duration: 0
                      },
                      '05-quiz': {
                        completedPercentage: 0,
                        type: "String",
                        duration: 0
                      },
                      '06-ejercicios': {
                        completedPercentage: 0,
                        type: "String",
                        duration: 0
                      }
                    }
                  },
                  '03-UX': {
                    completedPercentage: 0,
                    percentageDuration: 0,
                    subtopics:{
                    '00-equipos-de-desarrollo': {
                      completedPercentage: 0,
                      type: "String",
                      duration: 0
                    },
                    '01-ux-diseno': {
                      completedPercentage: 0,
                      type: "String",
                      duration: 0
                    },
                    '02-ux-vs-ui': {
                      completedPercentage: 0,
                      type: "String",
                      duration: 0
                    },
                    '03-quiz': {
                      completedPercentage: 0,
                      type: "String",
                      duration: 0
                    }
                    }
                  }
                }
              }
            } 
          objeto.name = object.nombre;
          objeto.email = object.correo;

          let status;
          if(object.progreso.porcentajeCompletado>90){
            status = "Great student"
            } else if(object.progreso.porcentajeCompletado<60){
              status = "Student with difficulties"
            } else{
              status = "Average student"
            }
          objeto.stats.status = status;
          objeto.stats.completedPercentage = object.progreso.porcentajeCompletado;
          let arrTemas = Object.keys(object.progreso.temas);
              for(i=0;i<arrTemas.length;i++){
                objeto.stats.topics[arrTemas[i]].completedPercentage = object.progreso.temas[arrTemas[i]].porcentajeCompletado;
                objeto.stats.topics[arrTemas[i]].percentageDuration = Math.round((object.progreso.temas[arrTemas[i]].duracionTemaCompletado / object.progreso.temas[arrTemas[i]].duracionTema) * 100 );
                let arrSubtemas = Object.keys(object.progreso.temas[arrTemas[i]].subtemas);
                  for(x=0;x<arrSubtemas.length;x++){  
                        objeto.stats.topics[arrTemas[i]].subtopics[arrSubtemas[x]].completedPercentage = ((object.progreso.temas[arrTemas[i]].subtemas[arrSubtemas[x]].completado) * 100);

                        objeto.stats.topics[arrTemas[i]].subtopics[arrSubtemas[x]].type = object.progreso.temas[arrTemas[i]].subtemas[arrSubtemas[x]].tipo;

                        objeto.stats.topics[arrTemas[i]].subtopics[arrSubtemas[x]].duration = object.progreso.temas[arrTemas[i]].subtemas[arrSubtemas[x]].duracionSubtema;
                  };
              }              
          return objeto;
      })
      finalArray.push(everyone);
    } 
  }

  let finalfinalArray = finalArray[0].concat(
    finalArray[1],
    finalArray[2],
    finalArray[3],
    finalArray[4],
    finalArray[5],
    finalArray[6],
    finalArray[7],
    finalArray[8]
  );
  return finalfinalArray;
}


window.computeGenerationsStats = (laboratoria) => {

  let finalArray = [];
  let laboratoriaSedes = Object.keys(laboratoria);

  for (i=0; i<laboratoriaSedes.length; i++){ 
    let currentCampus = laboratoriaSedes[i];
    let laboratoriaGeneracion = Object.keys(laboratoria[laboratoriaSedes[i]].generacion);
    
    for (j=0; j < laboratoriaGeneracion.length; j++){
      let currentGeneration = laboratoriaGeneracion[j];
      let laboratoriaEstudiantes = laboratoria[laboratoriaSedes[i]].generacion[laboratoriaGeneracion[j]].estudiantes;

      let objeto = {
            campus: currentCampus,
            generation: currentGeneration,
            average: 0,
            count: 0
        }      

      let sumGeneration = laboratoriaEstudiantes.reduce((accumulator, currentValue) => {
          return  accumulator + currentValue.progreso.porcentajeCompletado;
      }, 0);

      objeto.average = Math.round(sumGeneration / laboratoriaEstudiantes.length);
      objeto.count = laboratoriaEstudiantes.length;
      finalArray.push(objeto);
    }
    
  }
return finalArray;
}

window.sortStudents = (students, orderBy, orderDirection) => {

  // ASCENDENTE - Menor a Mayor -  (A a Z)
  // DESCENDENTE - Mayor a Menor - (Z a A)

    if(orderBy == "name" && orderDirection == "ASC"){
      let newstudents = students.sort(function(a, b) {
      let nombreActual = a.name.toUpperCase();
      let nombreSiguiente = b.name.toUpperCase();
      if (nombreActual < nombreSiguiente){
        return -1;
        } else if(nombreActual > nombreSiguiente) {
          return 1
        } else{
          return 0
        } ;
      }); 
      return newstudents;  
    }
  
    if(orderBy == "name" && orderDirection == "DESC"){
      let newstudents = students.sort(function(a, b) {
      let nombreActual = a.name.toUpperCase();
      let nombreSiguiente = b.name.toUpperCase();
      if (nombreActual < nombreSiguiente){
        return 1;
        } else if(nombreActual > nombreSiguiente) {
          return -1
        } else{
          return 0
        } ;
      }); 
      return newstudents;  
    }
  
  
    if(orderBy == "completedPercentage" && orderDirection == "ASC"){
      let newstudents = students.sort(function(a, b) {
      let porcentajeActual = a.stats.completedPercentage;
      let porcentajeSiguiente = b.stats.completedPercentage;
      if (porcentajeActual < porcentajeSiguiente){
        return -1;
        } else if(porcentajeActual > porcentajeSiguiente) {
          return 1
        } else{
          return 0
        } ;
      }); 
      return newstudents;  
    }
  
    if(orderBy == "completedPercentage" && orderDirection == "DESC"){
      let newstudents = students.sort(function(a, b) {
      let porcentajeActual = a.stats.completedPercentage;
      let porcentajeSiguiente = b.stats.completedPercentage;
      if (porcentajeActual < porcentajeSiguiente){
        return 1;
        } else if(porcentajeActual > porcentajeSiguiente) {
          return -1
        } else{
          return 0
        } ;
      }); 
      return newstudents;  
    }

  }

window.filterStudents = (students, search) => {
  let newStudents = students.filter(function(item){
    return item.name == search;
  })
  return newStudents;
}
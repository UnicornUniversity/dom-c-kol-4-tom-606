//IMPORT úkolu 3
// vytvořime allias, ať nejsou ty dvě main funkce v konflitku.

import { main as ukol3 } from './src/ukol3.js';

//TODO doc
/**
 * The main function which calls the application. 
 * Please, add specific description here for the application purpose.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {object} containing the statistics
 */
export function main(dtoIn) {
  //TODO code
  // zavolání funkce getEmployeeStatisctics
  // getEmployeeStatistics(generateEmployeeData(dtoIn));
  //let dtoOut = exMain(dtoIn);
  return getEmployeeStatistics(generateEmployeeData(dtoIn));
}

/**
 * We import and call the application used to generate Employee data and return it's output.
 * The imported aplication generates an aray of objects of employees based on input dtoIn.
 * This function valides input, calls functions and then returns their output in an Array.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */
export function generateEmployeeData(dtoIn) {
  return ukol3(dtoIn);
}

/**
 * Please, add specific description here 
 * @param {Array} employees containing all the mocked employee data
 * @returns {object} statistics of the employees
 */
export function getEmployeeStatistics(employees) {
  //TODO code
  let workStats = workloadStats(employees);
  let ageStats = GetAgeStats(employees);

  let dtoOut = {
    total: workStats[0],
    workload10: workStats[1],
    workload20: workStats[2],
    workload30: workStats[3],
    workload40: workStats[4],
    averageAge: ageStats[0],
    minAge: ageStats[1],
    maxAge: ageStats[2],
    medianAge: ageStats[3],
    medianWorkload: workStats[5],
    averageWomenWorkload: workStats[6],
    sortedByWorkload: employees.sort((a, b) => a.workload - b.workload),
  }
  // sortedByWorkload: seznam zaměstanců setříděných dle výše úvazku od nejmenšího po největší

  function workloadStats(employees) {
    let workload10Count = [];
    let workload20Count = [];
    let workload30Count = [];
    let workload40Count = [];

    employees.forEach(zamec => {
    switch (zamec.workload) {
      case 10:
        workload10Count.push(10);
        break;
      case 20:
        workload20Count.push(20);
        break;
      case 30:
        workload30Count.push(30);
        break;
      case 40:
        workload40Count.push(40);
        break;
    } 
  });
  
    let workloadTotalCount = [];
    workloadTotalCount = workload10Count.concat(workload20Count, workload30Count, workload40Count);
    let meanWork = medianCounter(workloadTotalCount);
    // průměrná výši úvazku v rámci žen - 1 des. číslo
    let zenaWork = [];
    employees.forEach(zena => {
    if (zena.gender === "female") {
      zenaWork.push(zena.workload);
    }
  });
    // sečíst workload žen
    let zenaWorkTotal = 0;
    // nutno dosadit default value.
    for (let i = 0; i < zenaWork.length; i++) {
      zenaWorkTotal += zenaWork[i];
    }
    // výpočet průměru
    let zenaWorkArg = averageCounter(zenaWorkTotal, zenaWork.length);
    return [workloadTotalCount.length, workload10Count.length, workload20Count.length, workload30Count.length, workload40Count.length, meanWork, +zenaWorkArg]
  }

  function GetAgeStats(employees) {
    let now = new Date();
    let ageArray = [];
    employees.forEach(vek => {
      // převod z ISOStringu do Date, zjistíme přesný věk daného člověka v MS
      let aktualniBirthday = now - new Date(vek.birthdate); // rozdíl v ms
      let pomoc = new Date(aktualniBirthday); // převod na Date od roku 1970
      let rok = (pomoc.getFullYear())-1970;
      let mesic = pomoc.getMonth();
      let den = pomoc.getDate();

      let age = rok + (mesic/12) + (den/365.25); // vyjádříme měsíc a den jakož to poměr roku.
      ageArray.push(+age); // mažu zaokrouhlení Math.floor - snad to pomůže testům.
    })
    let ageTotal = 0;
    for (let i = 0; i < ageArray.length; i++) {
    ageTotal += ageArray[i];
  }
  let avgAge = averageCounter(ageTotal, ageArray.length);
  // sorting
  let sortedAge = ageArray.sort((a, b) => a - b);
  // zaokrouhlujeme dolů každý věk.
  let roundedSortedAge = [];
  for (let i = 0; i < sortedAge.length; i++) {
    roundedSortedAge.push(Math.floor(sortedAge[i])) 
  }
  // volání medianCounter
  let medianAge = medianCounter(roundedSortedAge);
  // min/max
  // zaokrouhluju DOLŮ - hodí se jen v případě, že ages array nejsou jen přirozená čísla.
  let minAge = Math.floor(Math.min(...ageArray)); // nejmladší zamec.
  let maxAge = Math.floor(Math.max(...ageArray)); // věk nejstaršího zamce. Např. 33,9856478 --> 33

  return [avgAge, minAge, maxAge, medianAge]
  }
  //let dtoOut = exGetEmployeeStatistics(employees);
  return dtoOut;
}
// jednoduchá funkce na výpočet průměru
function averageCounter(TotalArray, TotalArrayLength) {
  return +(TotalArray/TotalArrayLength).toFixed(1);
  // ten plus na převod tu mám dvakrát, jak tady tak kde to returnuju..
}

// vypočítá medián z sestřídeného pole prvků
function medianCounter(SortedTotalArray) {
  let suda = false; 
  if (SortedTotalArray.length % 2 === 0) {
    suda = true;
  }
  
  // VÝPOČET MEDIÁNU
  let mean;
  // aplikujeme standartní vzoreček na výpočet mediánu.
  if (suda) {
    mean = (SortedTotalArray[(SortedTotalArray.length/2)-1]+SortedTotalArray[((SortedTotalArray.length/2)+1)-1])/2;
    // Odečítáme od konečného indexu -1, neboť array v JS začíná od nuly
  } else {
    mean = SortedTotalArray[((SortedTotalArray.length+1)/2)-1];
     // Odečítáme od konečného indexu -1, neboť array v JS začíná od nuly
  }
  return Math.round(mean); // TODO - check - původně jsem počítal s tím, že ageArray bude jen přirozené číslo.
}


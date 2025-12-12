//IMPORT úkolu 3
// vytvořime allias, ať nejsou ty dvě main funkce v konflitku.

import { main as ukol3 } from './src/ukol3.js';

/**
 * The main function which calls the application. 
 * We call the getEmployeeStatistics function, to it's parametters, 
 * we put calling the generateEmployeeData, to which we input dToIn.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {object} containing the statistics
 */
export function main(dtoIn) {
  // zavolání funkce getEmployeeStatistics
  return getEmployeeStatistics(generateEmployeeData(dtoIn));
}

/**
 * We import and call the application used to generate Employee data and return it's output.
 * The imported aplication generates an array of objects of employees based on input dtoIn.
 * This function valides input, calls functions and then returns their output in an Array.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */
export function generateEmployeeData(dtoIn) {
  return ukol3(dtoIn);
}

/**
 * Function to generate statistics of employees from input.
 * This function also includes 4 subFunctions:
 * Functions to work with workloadStats and AgeStats respectively,
 * 2 to count median and average.
 * @param {Array} employees containing all the mocked employee data
 * @returns {object} statistics of the employees
 */
export function getEmployeeStatistics(employees) {
  // volání pomocných podfunkcí
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
    sortedByWorkload: structuredClone(employees).sort((a, b) => a.workload - b.workload)
  }
  // sortedByWorkload: seznam zaměstanců setříděných dle výše úvazku od nejmenšího po největší. structuredClone aby se nezměnilo původní pole se zaměstnanci z výstupu ukol3.js.
  
  /**
   * Subfunction to count required statistics about workload
   * @param {Array} employees containing all the mocked employee data
   * @returns {Array} counted workload statistics
   */
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
    let zenaWorkAvg = averageCounter(zenaWorkTotal, zenaWork.length);
    return [workloadTotalCount.length, workload10Count.length, workload20Count.length, workload30Count.length, workload40Count.length, meanWork, +zenaWorkAvg]
  }
  /**
   * Subfunction to count statistics about age
   * @param {Array} employees containing all the mocked employee data
   * @returns {Array} counted average, median, min and max age.
   */
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
  // zaokrouhlujeme dolů každý věk --> ŠPATNĚ, TOTO TESTY NECHTĚJÍ
  /*let roundedSortedAge = [];
  for (let i = 0; i < sortedAge.length; i++) {
    roundedSortedAge.push(Math.floor(sortedAge[i])) 
  }
  */
  // volání medianCounter
  let medianAge = medianCounter(sortedAge);
  // min/max
  // zaokrouhluju DOLŮ - hodí se jen v případě, že ages array nejsou jen přirozená čísla.
  let minAge = Math.floor(Math.min(...ageArray)); // nejmladší zamec.
  let maxAge = Math.floor(Math.max(...ageArray)); // věk nejstaršího zamce.

  return [avgAge, minAge, maxAge, medianAge]
  }
  return dtoOut;
}
/**
 * Simple subfunction to count average
 * @param {Array} TotalArray Array of numbers
 * @param {number} TotalArrayLength Length of the array.
 * @returns {number} Average rounded to one decimal number.
 */
function averageCounter(TotalArray, TotalArrayLength) {
  return +(TotalArray/TotalArrayLength).toFixed(1);
}

/**
 * Simple subfunction, which
 * counts median from an array of sorted elements.
 * @param {Array} SortedTotalArray Array of elements, sorted from smallest to highest value.
 * @returns {number} Counted median, rounded to lowest int.
 */
function medianCounter(SortedTotalArray) {
  let suda = false; 
  if (SortedTotalArray.length % 2 === 0) {
    suda = true;
  }
  
  // VÝPOČET MEDIÁNU
  let median;
  // aplikujeme standartní vzoreček na výpočet mediánu.
  if (suda) {
    median = (SortedTotalArray[(SortedTotalArray.length/2)-1]+SortedTotalArray[((SortedTotalArray.length/2)+1)-1])/2;
    // Odečítáme od konečného indexu -1, neboť array v JS začíná od nuly
  } else {
    median = SortedTotalArray[((SortedTotalArray.length+1)/2)-1];
     // Odečítáme od konečného indexu -1, neboť array v JS začíná od nuly
  }
  return Math.floor(median); // testy očekávají medián zaokrouhelný dolů a vstup do výpočtu mediánu seřazený ale nezaokrouhlený
}


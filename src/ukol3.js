/**
 * Generates an array of random birthdates in ISO format
 * within the given age range relative to the current date.
 *
 * @param {number} count - Number of birthdates to generate.
 * @param {number} minAge - Minimum age (youngest possible person).
 * @param {number} maxAge - Maximum age (oldest possible person).
 * @returns {string[]} - Array of birthdates in ISO string format.
 */
function BirthdayRandomizer(count, minAge, maxAge) {
    const now = new Date();
    // generování validních hranic narozenin a jejich následný převod do MS od roku 1970
    const youngestBirthday = new Date((now.getFullYear()-minAge),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds()).getTime(); // minimální věk --> nejvyšší možný datum narozenin
    const oldestBirthday = new Date((now.getFullYear()-maxAge),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds()).getTime(); // maximální věk --> nejnižší možný datum narozenin

    let BirthdayArray = [];
    for(let i = 0; i < count; i++) {
    let randomBirthdayInMS=(Math.floor(Math.random() * (youngestBirthday - oldestBirthday + 1) + oldestBirthday));
    // + 1 umožňuje vygenerovat i maximální hodnotu.
    // validace výstupu
    if (randomBirthdayInMS<oldestBirthday || randomBirthdayInMS>youngestBirthday) {
    console.log("ERROR");
    }
    // převod na .ISOString
    // let randomBirthdayISO = new Date(randomBirthdayInMS).toISOString();
    BirthdayArray.push((new Date(randomBirthdayInMS).toISOString()));
    // console.log(BirthdayArray[i])
}
  return BirthdayArray;
}

/**
 * Generates an array of people objects with random gender,
 * first name and surname, the latter two depending on generated gender.
 *
 * @param {number} count - Number of people to generate.
 * @returns {Array<{gender: string, name: string, surname: string}>}
 * Array of people objects.
 */
function names(count) {
    const muzKrestni = ["Richard", "Michal", "Igor", "Bohouš", "Jakub", "Ondra", "Tomáš", "Jan", "Martin", "Tonda", "Josef", "Jarmil", "Jára", "Miloš", "David", "Václav", "Karel", "Přemysl", "Otakar"]; //19
    const muzPrimeni = ["Genzer", "Suchánek", "Chmela", "Novotný", "Kohák", "Sokol", "Sýkora", "Vrána,", "Vrabec", "Skočdopole", "Nudil", "Vrtěl", "Cimrman", "Zeman", "Sušil", "Havel", "Čtvrtý", "Hnědý", "Holub"]; //19
    const zenaKrestni = ["Elena", "Anna","Marie","Eva","Lucie","Petra","Jana","Hana","Alena","Martina","Veronika","Tereza","Barbora","Monika","Lenka","Kateřina","Markéta","Dagmar","Ivana","Zuzana","Šárka"]; //21
    const zenaPrimeni = ["Živá", "Nováková","Svobodová","Dvořáková","Horáková","Černá","Bílá","Malá","Velká","Krásná","Pokorná","Jelínková","Kučerová","Procházková","Králová","Urbanová","Bláhová","Říhová","Fialová","Veselá","Zubatá", "Slizká"]; //22

    let pplArray = [];

    for (let i = 0; i < count; i++) {
      let clovek = {};
        // RANDOM GENDER
        let genderNumber = Math.round(Math.random());
        switch (genderNumber) {
            case 0:
                clovek.gender = "male";
                // random jméno
                // let randomNameIndex = Math.floor(Math.random() * muzKrestni.length);
                //clovek.name = muzKrestni[randomNameIndex];
                clovek.name = muzKrestni[(Math.floor(Math.random() * muzKrestni.length))];
                // let randomSurnameIndex = Math.floor(Math.random() * muzPrimeni.length);
                clovek.surname = muzPrimeni[(Math.floor(Math.random() * muzPrimeni.length))];
                break;
            case 1:
                clovek.gender = "female";
                // let randomFNameIndex = Math.floor(Math.random() * zenaKrestni.length);
                clovek.name = zenaKrestni[(Math.floor(Math.random() * zenaKrestni.length))];
                // let randomFSurnameIndex = Math.floor(Math.random() * zenaPrimeni.length);
                clovek.surname = zenaPrimeni[(Math.floor(Math.random() * zenaPrimeni.length))];
                break;
        }
        pplArray.push(clovek);
    }
    return pplArray;
}
/**
 * Generates an array of random workload values.
 * Workload values are chosen from [10, 20, 30, 40].
 * 40 means full-time.
 * 
 * @param {number} count - Number of workload values to generate.
 * @returns {number[]} Array of workload values.
 */
function workloadGen(count) {
  let workloadArray = [];
  for (let i = 0; i < count; i++) {
    let workIndex = Math.floor(Math.random() * 4);
    switch (workIndex) {
      case 0:
        workloadArray.push(10);
        break;
      case 1:
        workloadArray.push(20);
        break;
      case 2:
        workloadArray.push(30);
        break;
      case 3:
        workloadArray.push(40);
        break;
    }
  }
  return workloadArray;
}
/**
 * The main function which calls the application. 
 * Generates an aray of objects of employees based on input dtoIn.
 * This function valides input, calls functions and then returns their output in an Array.
 * 
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */
export function main(dtoIn) {
    // Validace vstupu
  if (Number.isNaN(dtoIn.count) || Number.isNaN(dtoIn.age.min) || Number.isNaN(dtoIn.age.max)) {
    console.log("ERROR - Chybné vstupní hodnoty!");
  }
    // nula
  if (dtoIn.count === 0) {
    return 0;
  }
    // Volání funkcí
  let lidi = names(dtoIn.count); // [pole, v němž jsou objekty lidí - pohlaví, jméno a příjmení]
  let birthday = BirthdayRandomizer(dtoIn.count, dtoIn.age.min, dtoIn.age.max); // pole ISO stringů
  let workload = workloadGen(dtoIn.count); // pole čísel
    // sloučení do jednoho výstupu
  let vystup = [];
  for (let i = 0; i < dtoIn.count; i++) {
    vystup.push({
      gender: lidi[i].gender,
      name: lidi[i].name,
      surname: lidi[i].surname,
      birthdate: birthday[i],
      workload: workload[i]
    });
  }
  console.log(vystup);
  return vystup;
}


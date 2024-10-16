// Pole jmen a příjmení; nezaobírám se s přechylováním
const names = ["Jan", "Petr", "Pavel", "Martin", "Tomáš", "Jiří", "Jaroslav", "Michal", "František", "Josef", "Marie", "Jana", "Eva", "Hana", "Anna", "Lenka", "Kateřina", "Lucie", "Věra", "Alena"];
const surnames = ["Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Němec", "Nováková", "Svobodová", "Novotná", "Dvořáková", "Černá", "Procházková", "Kučerová", "Veselá", "Horáková", "Němcová"];

// Funkce pro generování náhodného data narození
function generateRandomBirthdate(minAge, maxAge) {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    const randomDate = new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
    return randomDate.toISOString();
}

// Funkce pro náhodný výběr pohlaví; nezaobírám se s genderem, takze Tomáš Dvořák je žena
function generateRandomGender() {
    return Math.random() < 0.5 ? "male" : "female";
}

// Funkce pro náhodný výběr pracovního úvazku
function generateRandomWorkload() {
    const workloads = [10, 20, 30, 40];
    return workloads[Math.floor(Math.random() * workloads.length)];
}

// Funkce pro generování seznamu zaměstnanců
function generateEmployeeData(dtoIn) {
    const { count, age } = dtoIn;
    const employees = [];

    for (let i = 0; i < count; i++) {
        const gender = generateRandomGender();
        const nameIndex = Math.floor(Math.random() * names.length);
        const surnameIndex = Math.floor(Math.random() * surnames.length);

        employees.push({
            gender,
            birthdate: generateRandomBirthdate(age.min, age.max),
            name: names[nameIndex],
            surname: surnames[surnameIndex],
            workload: generateRandomWorkload()
        });
    }

    return employees;
}

// Funkce pro zjištění nejčastějších jmen
function getEmployeeChartContent(employees) {
    const countNames = (employeeList) => {
        return employeeList.reduce((acc, emp) => {
            acc[emp.name] = (acc[emp.name] || 0) + 1;
            return acc;
        }, {});
    };

    const sortAndFormatNames = (nameCount) => {
        return Object.entries(nameCount)
            .sort((a, b) => b[1] - a[1])
            .reduce((acc, [name, count]) => {
                acc[name] = count;
                return acc;
            }, {});
    };

    const createChartData = (nameCount) => {
        return Object.entries(nameCount)
            .sort((a, b) => b[1] - a[1])
            .map(([label, value]) => ({ label, value }));
    };

    const allNames = countNames(employees);
    const maleNames = countNames(employees.filter(emp => emp.gender === 'male'));
    const femaleNames = countNames(employees.filter(emp => emp.gender === 'female'));
    const femalePartTimeNames = countNames(employees.filter(emp => emp.gender === 'female' && emp.workload < 40));
    const maleFullTimeNames = countNames(employees.filter(emp => emp.gender === 'male' && emp.workload === 40));

    return {
        names: {
            all: sortAndFormatNames(allNames),
            male: sortAndFormatNames(maleNames),
            female: sortAndFormatNames(femaleNames),
            femalePartTime: sortAndFormatNames(femalePartTimeNames),
            maleFullTime: sortAndFormatNames(maleFullTimeNames)
        },
        chartData: {
            all: createChartData(allNames),
            male: createChartData(maleNames),
            female: createChartData(femaleNames),
            femalePartTime: createChartData(femalePartTimeNames),
            maleFullTime: createChartData(maleFullTimeNames)
        }
    };
}

// Hlavní funkce
function main(dtoIn) {
    const employees = generateEmployeeData(dtoIn);
    return getEmployeeChartContent(employees);
}

// Použití v zadání
const dtoIn = {
    count: 50,
    age: {
        min: 19,
        max: 35
    }
};

//výpis
const dtoOut = main(dtoIn);
console.log(JSON.stringify(dtoOut, null, 2));
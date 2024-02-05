// calculateBonuses.js

const fs = require('fs');
const xlsx = require('xlsx');

const calculateBonus = (annualSalary) => {
  if (annualSalary < 50000) {
    return { percentage: 5, amount: annualSalary * 0.05 };
  } else if (annualSalary >= 50000 && annualSalary <= 100000) {
    return { percentage: 7, amount: annualSalary * 0.07 };
  } else {
    return { percentage: 10, amount: annualSalary * 0.1 };
  }
};

const processEmployeeData = (filePath) => {
  try {
    const workbook = xlsx.readFile(filePath);
    // console.log(workbook);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const newData = jsonData.map((employee) => {
      const { AnnualSalary } = employee;
      const { percentage, amount } = calculateBonus(AnnualSalary);

      return {
        ...employee,
        BonusPercentage: percentage,
        BonusAmount: amount,
      };
    });

    const newWorkbook = xlsx.utils.book_new();
    const newWorksheet = xlsx.utils.json_to_sheet(newData);
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet 1');

    const outputFileName = 'output.xlsx';
    xlsx.writeFile(newWorkbook, outputFileName);

    console.log(`Bonus calculation completed. Results saved in ${outputFileName}`);
  } catch (error) {
    console.error('Error processing employee data:', error.message);
  }
};

const filePath = "./employee_data_.xlsx";
// const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide the path to the Excel file as a command-line argument.');
} else if (!fs.existsSync(filePath)) {
  console.error('The specified file does not exist.');
} else {
  processEmployeeData(filePath);
}

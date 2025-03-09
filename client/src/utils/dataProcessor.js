import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export const dataProcessor = {
  // CSV字符串转换为图表数据
  csvToChartData(csvString) {
    return new Promise((resolve, reject) => {
      Papa.parse(csvString, {
        complete: (results) => {
          try {
            const [headers, ...rows] = results.data;
            const chartData = {
              labels: rows.map(row => row[0]),
              datasets: headers.slice(1).map((header, index) => ({
                label: header,
                data: rows.map(row => parseFloat(row[index + 1]) || 0),
                backgroundColor: `rgba(54, 162, 235, ${0.5})`,
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1
              }))
            };
            resolve(chartData);
          } catch (error) {
            reject(new Error('CSV格式错误'));
          }
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  },

  // Excel文件转换为图表数据
  async excelToChartData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
          
          const [headers, ...rows] = jsonData;
          const chartData = {
            labels: rows.map(row => row[0]),
            datasets: headers.slice(1).map((header, index) => ({
              label: header,
              data: rows.map(row => parseFloat(row[index + 1]) || 0),
              backgroundColor: `rgba(54, 162, 235, ${0.5})`,
              borderColor: 'rgb(54, 162, 235)',
              borderWidth: 1
            }))
          };
          resolve(chartData);
        } catch (error) {
          reject(new Error('Excel文件格式错误'));
        }
      };
      reader.onerror = () => {
        reject(new Error('文件读取失败'));
      };
      reader.readAsArrayBuffer(file);
    });
  },

  // 图表数据转换为CSV
  chartDataToCsv(chartData) {
    const headers = ['标签', ...chartData.datasets.map(ds => ds.label)];
    const rows = chartData.labels.map((label, i) => [
      label,
      ...chartData.datasets.map(ds => ds.data[i])
    ]);
    return Papa.unparse([headers, ...rows]);
  },

  // 图表数据转换为Excel
  chartDataToExcel(chartData) {
    const headers = ['标签', ...chartData.datasets.map(ds => ds.label)];
    const rows = chartData.labels.map((label, i) => [
      label,
      ...chartData.datasets.map(ds => ds.data[i])
    ]);
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Chart Data');
    return wb;
  },

  // CSV 处理
  parseCSV(file) {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (results) => {
          const { data, errors } = results;
          if (errors.length > 0) {
            reject(errors);
            return;
          }
          
          // 处理数据格式
          const headers = data[0];
          const rows = data.slice(1).filter(row => row.some(cell => cell !== ''));
          
          resolve({
            labels: headers,
            datasets: headers.slice(1).map((header, index) => ({
              label: header,
              data: rows.map(row => parseFloat(row[index + 1]) || 0)
            }))
          });
        },
        header: false,
        skipEmptyLines: true,
        error: (error) => reject(error)
      });
    });
  },

  // Excel 处理
  async parseExcel(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          const headers = jsonData[0];
          const rows = jsonData.slice(1).filter(row => row.some(cell => cell !== ''));
          
          resolve({
            labels: headers,
            datasets: headers.slice(1).map((header, index) => ({
              label: header,
              data: rows.map(row => parseFloat(row[index + 1]) || 0)
            }))
          });
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  },

  // 导出为 CSV
  exportToCSV(chartData, filename = 'chart-data.csv') {
    const headers = ['Labels', ...chartData.datasets.map(ds => ds.label)];
    const rows = chartData.labels.map((label, i) => [
      label,
      ...chartData.datasets.map(ds => ds.data[i])
    ]);
    
    const csv = Papa.unparse([headers, ...rows]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  },

  // 导出为 Excel
  exportToExcel(chartData, filename = 'chart-data.xlsx') {
    const headers = ['Labels', ...chartData.datasets.map(ds => ds.label)];
    const rows = chartData.labels.map((label, i) => [
      label,
      ...chartData.datasets.map(ds => ds.data[i])
    ]);
    
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Chart Data');
    XLSX.writeFile(wb, filename);
  }
};

export default dataProcessor; 
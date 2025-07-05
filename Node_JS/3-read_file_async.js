const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err || !data) {
        reject(new Error('Cannot load the database'));
        return;
      }
      const lines = data.split('\n').filter(line => line.trim() !== '');
      if (lines.length <= 1) {
        console.log('Number of students: 0');
        resolve();
        return;
      }
      const students = lines.slice(1);
      const fields = {};
      let total = 0;

      students.forEach(line => {
        const parts = line.split(',');
        if (parts.length === 4) {
          const firstname = parts[0].trim();
          const field = parts[3].trim();
          if (!fields[field]) {
            fields[field] = [];
          }
          fields[field].push(firstname);
          total += 1;
        }
      });

      console.log(`Number of students: ${total}`);
      for (const [field, names] of Object.entries(fields)) {
        console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
      }
      resolve();
    });
  });
}

module.exports = countStudents;
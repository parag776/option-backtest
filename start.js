const { exec } = require('child_process');
const path = require('path');

// Define the paths to each service
const services = [
  { name: 'backend', path: path.join(__dirname, 'backend') },
  { name: 'frontend', path: path.join(__dirname, 'frontend') },
  { name: 'other-service', path: path.join(__dirname, 'option-backtest-service') },
];

// Function to run npm install and npm start in each directory
services.forEach(service => {
  const installCommand = `npm install`;
  const startCommand = `npm start`;
  const options = { cwd: service.path };
  console.log(service.path)

  // First, run npm install
  const installProcess = exec(installCommand, options);

  installProcess.stdout.on('data', (data) => {
    console.log(`[${service.name}] ${data}`);
  });

  installProcess.stderr.on('data', (data) => {
    console.error(`[${service.name} ERROR] ${data}`);
  });

  installProcess.on('exit', (code) => {
    console.log(`[${service.name}] npm install exited with code ${code}`);

    // After npm install, run npm start
    if (code === 0) {
      const startProcess = exec(startCommand, options);

      startProcess.stdout.on('data', (data) => {
        console.log(`[${service.name}] ${data}`);
      });

      startProcess.stderr.on('data', (data) => {
        console.error(`[${service.name} ERROR] ${data}`);
      });

      startProcess.on('exit', (startCode) => {
        console.log(`[${service.name}] npm start exited with code ${startCode}`);
      });
    }
  });
});

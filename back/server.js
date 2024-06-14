const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/scrapeIPLScorecard', async (req, res) => {
    try {
        const { year } = req.body;
        console.log(`Received request for IPL scorecard with year: ${year}`);

        const python = 'C:\\Users\\Anand\\AppData\\Local\\Microsoft\\WindowsApps\\python.exe';
        const path = 'C:\\Users\\Anand\\Desktop\\crickback\\cricketback\\src\\back\\ipl.py';

        const response = spawn(python, [path, year]);
        let dataFromPython = '';

        response.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            dataFromPython += data.toString();
        });

        response.stdout.on('end', () => {
            console.log('Python script finished execution');
            console.log(`Full data from Python: ${dataFromPython}`);
            try {
                const jsonData = JSON.parse(dataFromPython);
                res.json(jsonData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).json({ error: 'Internal Server Error: Error parsing JSON' });
            }
        });

        response.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            res.status(500).json({ error: 'Internal Server Error: Error from Python script' });
        });

        response.on('error', (error) => {
            console.error('Error executing Python script:', error);
            res.status(500).json({ error: 'Internal Server Error: Error executing Python script' });
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/worldcup', async (req, res) => {
    try {
        const { year } = req.body;
        console.log(`Received request for World Cup data with year: ${year}`);

        const python = 'C:\\Users\\Anand\\AppData\\Local\\Microsoft\\WindowsApps\\python.exe';
        const path = 'C:\\Users\\Anand\\Desktop\\crickback\\cricketback\\src\\back\\world.py';

        const response = spawn(python, [path, year]);
        let dataFromPython = '';

        response.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            dataFromPython += data.toString();
        });

        response.stdout.on('end', () => {
            console.log('Python script finished execution');
            console.log(`Full data from Python: ${dataFromPython}`);
            try {
                const jsonData = JSON.parse(dataFromPython);
                res.json(jsonData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).json({ error: 'Internal Server Error: Error parsing JSON' });
            }
        });

        response.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            res.status(500).json({ error: 'Internal Server Error: Error from Python script' });
        });

        response.on('error', (error) => {
            console.error('Error executing Python script:', error);
            res.status(500).json({ error: 'Internal Server Error: Error executing Python script' });
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/t20', async (req, res) => {
    try {
        const { year } = req.body;
        console.log(`Received request for T20 data with year: ${year}`);

        const python = 'C:\\Users\\Anand\\AppData\\Local\\Microsoft\\WindowsApps\\python.exe';
        const path = 'C:\\Users\\Anand\\Desktop\\crickback\\cricketback\\src\\back\\t20.py';

        const response = spawn(python, [path, year]);
        let dataFromPython = '';

        response.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            dataFromPython += data.toString();
        });

        response.stdout.on('end', () => {
            console.log('Python script finished execution');
            console.log(`Full data from Python: ${dataFromPython}`);
            try {
                const jsonData = JSON.parse(dataFromPython);
                res.json(jsonData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).json({ error: 'Internal Server Error: Error parsing JSON' });
            }
        });

        response.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            res.status(500).json({ error: 'Internal Server Error: Error from Python script' });
        });

        response.on('error', (error) => {
            console.error('Error executing Python script:', error);
            res.status(500).json({ error: 'Internal Server Error: Error executing Python script' });
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
// const statsModule = require('./stats');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());

app.post('/api/scrapeIPLScorecard', async (req, res) => {
    try {
        const { year } = req.body;
        console.log(year);
        const python = 'C:\\Users\\Anand\\AppData\\Local\\Microsoft\\WindowsApps\\python.exe'; 
        const path = 'C:\\Users\\Anand\\Desktop\\crickback\\cricketback\\src\\back\\ipl.py'; 

        const response = spawn(python, [path, year]);
        let dataFromPython = '';

        response.stdout.on('data', (data) => {
            dataFromPython += data.toString();
        });

        response.stdout.on('end', () => {
            try {
                const jsonData = JSON.parse(dataFromPython);
                res.json(jsonData); 
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).json({ error: 'Internal Server Error: Error parsing JSON' });
            }
        });

        response.stderr.on('data', (data) => {
            console.error(`Error from Python script: ${data}`);
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
        console.log(year);
        const python = 'C:\\Users\\Anand\\AppData\\Local\\Microsoft\\WindowsApps\\python.exe'; 
        const path = 'C:\\Users\\Anand\\Desktop\\crickback\\cricketback\\src\\back\\world.py'; 

        const response = spawn(python, [path, year]);
        let dataFromPython = '';

        response.stdout.on('data', (data) => {
            dataFromPython += data.toString();
        });

        response.stdout.on('end', () => {
            try {
                const jsonData = JSON.parse(dataFromPython);
                res.json(jsonData); 
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).json({ error: 'Internal Server Error: Error parsing JSON' });
            }
        });

        response.stderr.on('data', (data) => {
            console.error(`Error from Python script: ${data}`);
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
        console.log(year);
        const python = 'C:\\Users\\Anand\\AppData\\Local\\Microsoft\\WindowsApps\\python.exe'; 
        const path = 'C:\\Users\\Anand\\Desktop\\crickback\\cricketback\\src\\back\\t20.py'; 

        const response = spawn(python, [path, year]);
        let dataFromPython = '';

        response.stdout.on('data', (data) => {
            dataFromPython += data.toString();
        });

        response.stdout.on('end', () => {
            try {
                const jsonData = JSON.parse(dataFromPython);
                res.json(jsonData); 
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).json({ error: 'Internal Server Error: Error parsing JSON' });
            }
        });

        response.stderr.on('data', (data) => {
            console.error(`Error from Python script: ${data}`);
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

app.post('/api/stats', async (req, res) => {
    try {
        const { name } = req.body;
        console.log('Received name:', name);

        const python = 'C:\\Users\\Anand\\AppData\\Local\\Microsoft\\WindowsApps\\python.exe'; 
        const path = 'C:\\Users\\Anand\\Desktop\\crickback\\cricketback\\src\\back\\stats.py'; 
        
        const response = spawn(python, [path, name]);
        let dataFromPython = '';

        response.stdout.on('data', (data) => {
            dataFromPython += data.toString();
        });

        response.stdout.on('end', () => {
            try {
                // Here, we're assuming that the Python script already returns valid JSON
                res.json(JSON.parse(dataFromPython)); 
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).json({ error: 'Internal Server Error: Error parsing JSON' });
            }
        });

        response.stderr.on('data', (data) => {
            console.error(`Error from Python script: ${data}`);
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
app.use(bodyParser.json());

app.post('/api/rag', async (req, res) => {
    try {
        const { question } = req.body;
        console.log('Received question:', question);

        const python = 'C:\\Users\\Anand\\AppData\\Local\\Microsoft\\WindowsApps\\python.exe'; 
        const path = 'C:\\Users\\Anand\\Desktop\\crickback\\cricketback\\src\\back\\rag.py'; 

        const response = spawn(python, [path, question]);
        let dataFromPython = '';

        response.stdout.on('data', (data) => {
            dataFromPython += data.toString();
        });

        response.on('close', (code) => {
            try {
                const responseData = JSON.parse(dataFromPython);
                res.json(responseData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).json({ error: 'Internal Server Error: Error parsing JSON' });
            }
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


app.post('/api/crick', async (req, res) => {
    try {
        const { format } = req.body;
        console.log('Received format:', format);

        if (!format) {
            return res.status(400).json({ error: 'Format is required' });
        }

        const python = 'C:\\Users\\Anand\\AppData\\Local\\Microsoft\\WindowsApps\\python.exe';
        const path = 'C:\\Users\\Anand\\Desktop\\crickback\\cricketback\\src\\back\\crick.py';

        const response = spawn(python, [path, format]);
        let dataFromPython = '';

        response.stdout.on('data', (data) => {
            dataFromPython += data.toString();
        });

        response.on('close', (code) => {
            console.log('Raw data from Python:', dataFromPython); // Log the raw data received from Python
            try {
                const responseData = JSON.parse(dataFromPython);
                res.json(responseData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).json({ error: 'Internal Server Error: Error parsing JSON' });
            }
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


app.post('/api/video', async (req, res) => {
    try {
        const { name } = req.body;
        console.log('Received format:', name);

        if (!name) {
            return res.status(400).json({ error: 'Format is required' });
        }

        const python = 'C:\\Users\\Anand\\AppData\\Local\\Microsoft\\WindowsApps\\python.exe';
        const path = 'C:\\Users\\Anand\\Desktop\\crickback\\cricketback\\src\\back\\video.py';

        const response = spawn(python, [path, name]);
        let dataFromPython = '';

        response.stdout.on('data', (data) => {
            dataFromPython += data.toString();
        });

        response.on('close', (code) => {
            console.log('Raw data from Python:', dataFromPython); // Log the raw data received from Python
            try {
                const responseData = JSON.parse(dataFromPython);
                res.json(responseData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).json({ error: 'Internal Server Error: Error parsing JSON' });
            }
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

app.use((req, res, next) => {
    res.setHeader('Set-Cookie', 'key=value; SameSite=None; Secure');
    next();
  });



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// app.listen(port, () => 
//     console.log(`Server is running on port ${port}`);
// });

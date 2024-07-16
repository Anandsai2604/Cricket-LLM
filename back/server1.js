const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const user_stats = require('./schema'); 
const Chat = require('./chat'); 

const app = express();
const port = 5000; 

mongoose.connect('Your mongo url', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const pythonExecutable = process.env.PYTHON_EXEC || 'python path';
const scriptBasePath = process.env.SCRIPT_PATH || ;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const executePythonScript = (scriptName, args = [], callback) => {
    const scriptPath = `${scriptBasePath}${scriptName}`;
    const response = spawn(pythonExecutable, [scriptPath, ...args]);

    let dataFromPython = '';
    let errorOccurred = false;

    response.stdout.on('data', (data) => {
        dataFromPython += data.toString();
    });

    response.stderr.on('data', (data) => {
        console.error(`Error from Python script: ${data}`);
        if (!errorOccurred) {
            errorOccurred = true;
            callback({ error: 'Internal Server Error: Error from Python script' });
        }
    });

    response.on('close', (code) => {
        if (!errorOccurred) {
            try {
                const jsonData = JSON.parse(dataFromPython);
                callback(null, jsonData);   
            } catch (error) {
                console.error('Error parsing JSON:', error);
                callback({ error: 'Internal Server Error: Error parsing JSON' });
            }
        }
    });

    response.on('error', (error) => {
        console.error('Error executing Python script:', error);
        if (!errorOccurred) {
            errorOccurred = true;
            callback({ error: 'Internal Server Error: Error executing Python script' });
        }
    });
};


app.post('/api/auth/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await user_stats.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const U_ID = uuidv4();
        user = new user_stats({ U_ID, username, email, password });
        await user.save();

        console.log('User registered successfully');
        res.json({ message: 'User registered successfully', userId: user.U_ID });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await user_stats.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', userId: user.U_ID });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/rag', async (req, res) => {
    const { u_id, question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question is required' });
    if (!u_id) return res.status(400).json({ error: 'User ID is required' });

    console.log(`Fetching cricket data for question: ${question}`);
    console.log(`User ID: ${u_id}`);

    executePythonScript('rag.py', [question], async (error, jsonResponse) => {
        if (error) {
            console.error('Python script error:', error);
            return res.status(500).json(error);
        }

        console.log('Python script response:', jsonResponse);

        try {
            const answer = jsonResponse.result; 
            if (!answer) return res.status(500).json({ error: 'No answer returned from Python script' });

            let chat = await Chat.findOne({ U_ID: u_id });

            if (!chat) {
                chat = new Chat({ U_ID: u_id, chats: [] });
            }

            chat.chats.push({ question, answer });
            await chat.save();

            res.json({ u_id, question, answer });
        } catch (error) {
            console.error('Error saving chat history:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

app.post('/api/chat/history', async (req, res) => {
    const { u_id } = req.body;
    if (!u_id) return res.status(400).json({ error: 'User ID is required' });

    try {
        const chat = await Chat.findOne({ U_ID: u_id });
        if (!chat) {
            return res.status(404).json({ error: 'No chat history found for this user' });
        }

        res.json(chat.chats);
    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/api/scrapeIPLScorecard', (req, res) => {
    const { year } = req.body;
    if (!year) return res.status(400).json({ error: 'Year is required' });
    console.log(`Scraping IPL scorecard for year: ${year}`);
    executePythonScript('ipl.py', [year], (error, data) => {
        if (error) return res.status(500).json(error);
        res.json(data);
    });
});

app.post('/api/worldcup', (req, res) => {
    const { year } = req.body;
    if (!year) return res.status(400).json({ error: 'Year is required' });
    console.log(`Fetching World Cup data for year: ${year}`);
    executePythonScript('world.py', [year], (error, data) => {
        if (error) return res.status(500).json(error);
        res.json(data);
    });
});

app.post('/api/t20', (req, res) => {
    const { year } = req.body;
    if (!year) return res.status(400).json({ error: 'Year is required' });
    console.log(`Fetching T20 data for year: ${year}`);
    executePythonScript('t20.py', [year], (error, data) => {
        if (error) return res.status(500).json(error);
        res.json(data);
    });
});

app.post('/api/stats', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Year is required' });
    console.log(`Fetching T20 data for year: ${name}`);
    executePythonScript('stats6.py', [name], (error, data) => {
        if (error) return res.status(500).json(error);
        res.json(data);
    });
});


app.post('/api/crick', (req, res) => {
    const { format } = req.body;
    if (!format) return res.status(400).json({ error: 'Format is required' });
    console.log(`Fetching cricket data for format: ${format}`);
    executePythonScript('crick.py', [format], res);
});

app.post('/api/video', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    console.log(`Fetching video data for name: ${name}`);
    executePythonScript('video.py', [name], res);
});

app.post('/api/news', (req, res) => {
    console.log('Fetching news');
    executePythonScript('new.py', [], (error, data) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to fetch news' });
        }
        res.json(data);
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

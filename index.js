const express = require('express')
    , mqtt = require('mqtt')
    , app = express();


/* BANCO */

const database = {
    'value': 0,
    'create': new Date()
}

/* API */
const mqttRoute = (req, res) => {
    return res.json(database);
};

app.get('/api/v1/mqtt', mqttRoute);

app.listen(3000, () => {
    console.log('server is running');
    console.log('http://127.0.0.1:3000/api/v1/mqtt');
});

/* MQTT */

const client = mqtt.connect(`mqtt://localhost`);

const mqttTopic = '/mqtt';

client.on('connect', () => {
    console.log(`Connection successfully to mqtt://localhost`);
    client.subscribe(mqttTopic);
});

client.on('message', (topic, message) => {
    if (mqttTopic !== topic) return;

    const value = message.toString();
    console.log(`Mensagem recebida: ${value}`);

    partseData(topic, value);
});

const partseData = (topic, value) => {
    database.value = value;
};
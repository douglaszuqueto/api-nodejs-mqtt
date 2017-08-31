const mqtt = require('mqtt');

/* MQTT */

const client = mqtt.connect(`mqtt://localhost`);

const mqttTopic = '/mqtt';

client.on('connect', () => {
  console.log(`Connection successfully to mqtt://localhost`);
});

let contador = 0;

setInterval(() => {

  client.publish(mqttTopic, contador.toString());
  console.log(`Contador: ${contador}`);

  contador += 1;

}, 1000);

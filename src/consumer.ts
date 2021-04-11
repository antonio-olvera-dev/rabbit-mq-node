import amqplib, { Channel, Connection } from "amqplib"


const setting = {
    protococol: "amqp",
    hostname: "localhost",
    username: "guest",
    password: "guest",
    vhost: "/",
    authMechain: ["PLAIN", "AMQPLAIN", "EXTERNAL"]

}


async function conncetion() {
    try {

        const queue: string = "users";
        const name: string = "Antonio";

        const conex: Connection = await amqplib.connect(setting);
        const channel: Channel = await conex.createChannel();
        const res: any = await channel.assertQueue(queue);

        console.log(`Wait message from ${name}`);
        channel.consume(queue, (message: any) => {

            const user = JSON.parse(message?.content.toString());

            console.log(`Received user ${user.name}`);
            console.log(user);

            channel.ack(message);
            // if (user.name === name) {
            //     channel.ack(message);
            //     console.log('Delete message of queque...\n');
            // }
        });



    } catch (error) {
        console.error(error);

    }
}
conncetion();
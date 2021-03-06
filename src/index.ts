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
        const msgs: any = [
            { name: "Antonio", lastName: "Olvera" },
            { name: "Mario", lastName: "Muñoz" },
        ]

        const conex: Connection = await amqplib.connect(setting);
        const channel: Channel = await conex.createChannel();
        const res: any = await channel.assertQueue(queue);

        for (const key in msgs) {

            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgs[key])));
            console.log(`Mesage send to ${queue}`);
            
        }



    } catch (error) {
        console.error(error);

    }
}
conncetion();
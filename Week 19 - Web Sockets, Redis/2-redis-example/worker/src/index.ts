import { createClient } from "redis";

const redisClient = createClient();

async function processSubmission(submission: string) {
    const { userId, problemId, code, language } = await JSON.parse(submission);

    console.log(`------------------------------------------------------------------`);
    console.log(`Processing submission for problemId ${problemId} for userId ${userId}`);
    console.log(`------------------------------------------------------------------`);
    console.log(`Code: ${code}`);
    console.log(`Language: ${language}`);

    console.log(`Finished processing submission for problemId ${problemId}.`);
    console.log(`------------------------------------------------------------------`);
}


async function startWorker() {
    try {
        await redisClient.connect();
        while (true) {
            const submission = await redisClient.brPop("submissions", 0); // here 0 means wait infinite until the length becomes > 0, can also pass time in seconds like if passed 5 then will stay blocked for 5 seconds no maatter what
            await new Promise(resolve => setTimeout(resolve, 2000)); // artificial delay
            
            // console.log(submission);
            /* 
            submission response will look like:

                {
                  key: 'submissions',
                  element: `{"userId":"321","problemId":"123","code":"console.log('Test log')","language":"JavaScript"}`
                }
            
            */

            // @ts-ignore
            await processSubmission(submission.element); // custom method just to pretify the console.log of the response
        }
    } catch (error) {
        console.log(error);
    }
}
startWorker();
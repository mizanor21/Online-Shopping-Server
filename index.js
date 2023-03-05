const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Simple Node Server Running');
})

// DB_USER: fashionShop
// DB_PASS: 4eQa4Gfh0kfIoNoF


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://fashionShop:4eQa4Gfh0kfIoNoF@cluster0.disah5t.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const WTrending = client.db('fashionShop').collection('WTrending')
        const MTrending = client.db('fashionShop').collection('MTrending')
        const KTrending = client.db('fashionShop').collection('KTrending')

        app.get('/wtrending', async (req, res) => {
            const query = {}
            const cursor = WTrending.find(query)
            const wtrending = await cursor.limit(4).toArray()
            res.send(wtrending);
        })

        app.get('/mtrending', async (req, res) => {
            const query = {}
            const cursor = MTrending.find(query)
            const mtrending = await cursor.limit(4).toArray()
            res.send(mtrending)
        })

        app.get('/ktrending', async (req, res) => {
            const query = {}
            const cursor = KTrending.find(query)
            const ktrending = await cursor.limit(4).toArray()
            res.send(ktrending)
        })
    }
    finally {

    }
}
run().catch(err => console.log(err))

app.listen(port, () => {
    console.log(`Simple node server running on port ${port}`);
})
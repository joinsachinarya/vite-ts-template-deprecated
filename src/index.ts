const express = require("express");
const si = require("systeminformation");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
    try {
        const cpuData = await si.cpu();
        const memoryData = await si.mem();
        const diskData = await si.diskLayout();
        const graphics = await si.graphics();

        const sysInfo = {
            cpu: `${cpuData.manufacturer} ${cpuData.brand}`,
            memoryData: `${memoryData.total}`,
            diskData: `${diskData.map((disk) => disk.name)}`,
            // graphics: `${graphics.display}`
        }
        res.json(sysInfo);
    } catch (error) {
        console.error("Error", error);

    }
})


app.listen(3000, () => {
    console.log(`Server is listening on ${port}`);

})
const express = require('express')
const fs = require('fs')
const app = express()
const cors = require('cors');
const { spawn } = require("child_process");

function runGMMTest() {
    const ls = spawn("python", ['test.py', '--name GMM', '--stage GMM', '--workers 4', '--datamode test', '--data_list test_pairs_same.txt', '--checkpoint checkpoints/GMM_pretrained/gmm_final.pth'], {
        env: {
            NODE_ENV: 'production',
            PATH: process.env.PATH,
        },
        shell : true,
        cwd : 'C:\\Users\\mujum\\Desktop\\Web Development'
    }
    );
    ls.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });
    
    ls.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });
    
    ls.on('error', (error) => {
        console.log(`error: ${error}`);
    });
    
    ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });
}

function runTOMTest() {
    const ls = spawn("python", ['test.py', '--name TOM', '--stage GMM', '--workers 4', '--datamode test', '--data_list test_pairs_same.txt', '--checkpoint checkpoints/GMM_pretrained/gmm_final.pth'], {
        env: {
            NODE_ENV: 'production',
            PATH: process.env.PATH,
        },
        shell : true,
        cwd : 'C:\\Users\\mujum\\Desktop\\Web Development'
    }
    );
    ls.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });
    
    ls.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });
    
    ls.on('error', (error) => {
        console.log(`error: ${error}`);
    });
    
    ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });
}

function testRun () {
    console.log("Inside Test Run")
    const ls = spawn("python", ['test.py'], {
        env: {
            NODE_ENV: 'production',
            PATH: process.env.PATH,
        },
        shell : true,
        cwd : 'C:\\Users\\mujum\\Desktop\\Web Development\\Test'
    }
    );
    ls.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });
    
    ls.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });
    
    ls.on('error', (error) => {
        console.log(`error: ${error}`);
    });
    
    ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });
}



app.use(express.json())
app.use(cors())


app.get('/:data', (req, res) => {

    const {data} = req.params

    let person = "", cloth = "";
    let f = 0; 

    for(let i = 0; i < data.length; i++) {
        if(data[i] == '+') {
            f = 1;
        } else if (f == 0) {
            person += data[i]
            // person.push_back(data[i])
        } else if (f == 1) {
            cloth += data[i]
            // cloth.push_back(data[i])
        }
    }

    console.log(person)
    console.log(cloth)

    const finalString = person + " " + cloth

    fs.writeFile('output.txt', finalString, (err) => {
          
        // In case of a error throw err.
        if (err) throw err;
    })

    testRun()

    res.status(200).send(req.params)
})


app.listen(8080, () => console.log('Server started'))
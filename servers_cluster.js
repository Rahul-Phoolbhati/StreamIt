import cluster  from 'cluster';
import os  from 'os';
import http  from  'http';
import server  from './index.js'


const no_of_core = os.cpus().length;


if(cluster.isPrimary){
    console.log(`Primary ${process.pid} is running`);
    for(let i=0;i < no_of_core; i++){
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);    
})
    
}
else{
    server.listen(process.env.PORT || 3000,() => {
        console.log(`Worker ${process.pid} started`);
    })
}
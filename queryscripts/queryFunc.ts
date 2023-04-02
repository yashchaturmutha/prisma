import run from './run';
import * as fs from 'fs';
import { join } from 'path';

const queryFunc:any=async (tx:any,filename:string,logger:any,file:any)=>{

        const fileContent = fs.readFileSync(__dirname+`/files/${filename}.txt`, { encoding: 'utf-8' });

        var arr = fileContent.toString().split("\n");
        console.log(arr);

        for (let x = 0; x < arr.length; x++) {
        console.log(`Line:${x} `, arr[x]);
        await run(arr[x],tx,logger,file);
		// let query:string = "INSERT INTO master_settings (name, value, created_on, updated_on, created_by, updated_by) VALUES('schoolcount011', '10', now(), now(), 1, 1);";
        // await run(query,tx);
        // query="INSERT INTO master_settings (name, value, created_on, updated_on, created_by, updated_by) VALUES('class_count012', '10', now(), now(), 1, 1);";
        // await run(query,tx);
        }
}

export default queryFunc;
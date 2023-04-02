import { PrismaClient } from '@prisma/client'
import queryFunc from './queryFunc';
import logger from "./utils/logger";
import * as fs from 'fs';
// import updateFunc from './updateFunc';

const prisma = new PrismaClient();

var file = fs.createWriteStream('./files/errQueries.txt');
file.write('');

const main=async()=>{
    // try{
        await prisma.$transaction(async (tx:any) => {
        await queryFunc(tx,"insert",logger,file);
        await queryFunc(tx,"update",logger,file);
        await queryFunc(tx,"delete",logger,file);
        // await updateFunc(tx);
        // await updateFunc();
        })
    // }
    // catch(err){
        // logger.error(err);
        // console.log(err);
    // }
}
main();


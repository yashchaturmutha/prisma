async function executeUpdate(query:string,tx:any){

console.log("executeUpdate");

console.log("In try Update");
const name=query.substring(query.lastIndexOf("=")+2,query.lastIndexOf("'"));
const value=query.substring(query.indexOf('=')+1,query.indexOf('WHERE')-1);

console.log(name);
console.log(value);

const user = await tx.master_settings.update({
  where: { name: name },
  data: { value: value },
});

console.log(user);

}

export default executeUpdate;
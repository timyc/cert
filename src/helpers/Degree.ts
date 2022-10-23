export function degreeString(degree:number,name:string):string {
    const degrees:string[] = ["None", "B.S.","B.A.","M.S.","PhD"];
    return `${degrees[degree]} in ${name}`;
}

export function yearsBetween(date1:Date,date2:Date):string {
    return `${addSuffix(Math.abs(date1.getFullYear() - date2.getFullYear()))} Year`;
}

function addSuffix(i: number):string {
    let a:number = i % 10, b:number = i % 100;

    if (a == 1 && b != 11) {
        return `${i}st`;
    } else if (a == 2 && b != 12) {
        return `${i}nd`;
    } else if (a == 3 && b != 13) {
        return `${i}rd`;
    } else {
        return `${i}th`;
    }
}
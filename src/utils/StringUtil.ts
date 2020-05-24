export class StringUtil {
    public static replaceAt(str:string, index:number, replacement:string) : string {
        return str.substr(0, index) + replacement + str.substr(index + replacement.length);
    }
}

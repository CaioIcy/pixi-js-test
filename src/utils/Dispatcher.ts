export class Dispatcher {
    public static dispatch(time: number, action: ()=>void) : void {
        setTimeout(action, time);
    }
}

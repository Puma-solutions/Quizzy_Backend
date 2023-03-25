export class AppError extends Error{
    private _status: number
    public get status(): number {
        return this._status
    }
    public set status(value: number) {
        this._status = value
    }
    private _message: string
    public get message(): string {
        return this._message
    }
    public set message(value: string) {
        this._message = value
    }

    constructor(status:number,message:string){
        super(message)
        this._message = message
        this._status = status
    }


}
export interface Parameter{
    inputName?: string,
    datatypes?: string,
    value?:string
} 
export interface TestCase{
    id?:string,
    questionId:string,
    questionName:string,
    inputParameter?:Array<Parameter>
    outputParameter?:string,
    hide?:boolean,
    timeCreate?: Date
}
export interface Coding{
    id?:string,
    functionName?: string,
    executionTime?: number,
    inputParameter?:Array<Parameter>
    outputParameter?: string,
}


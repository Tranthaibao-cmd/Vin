import { Parameter } from "./parameter"

export interface TestCase{
  id?:string
  inputs?:Array<Parameter>
  output?:{datatype:string,value:string}
  content_id?:string
  course_id?:string
  lock?:boolean
}

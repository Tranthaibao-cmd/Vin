import { Parameter } from "./parameter"

export interface Function{
  id?:string
  name?:string
  execution_time?:string
  inputs?:Array<Parameter>
  output_data_type?:string
  content_id?:string
  course_id?:string
  is_deleted?: boolean
  created_at_seconds?: number
}

export interface Quiz {
    is_finished:boolean
    id:number
    name:string
    description:string
    time_open:number
    time_close:number
    time_limit:number
    questions:any
  }
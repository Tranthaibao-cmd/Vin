export interface ResourseFile{
    id?:string
    name?:string
    file?:string
    type_code?:number
    //0:video 1:file
    content_id?:string
    course_id?:string
    instructor_id?:string
    size?:number
    is_deleted?:boolean
    created_date_seconds?:number
}

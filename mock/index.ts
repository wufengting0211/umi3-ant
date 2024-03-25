type CourseList = {
    id:'string',
    type:'string',
    name:'string',
    totalPrice:'string',
    amount:'string',
    address:'string'
}

let courseList:CourseList[] = [
    {
        id:'1',
        type:'React',
        name:'dvajs',
        totalPrice:'￥38',
        amount:'￥999',
        address:'https://www.baidu.com'
    },
    {
        id:'2',
        type:'vue',
        name:'ssa',
        totalPrice:'￥28',
        amount:'￥999',
        address:'https://www.baidu.com'
    },
]
//获取路径参数
function getUrlParam(url:string,key:string) {
     //获取参数
     var reg  = new RegExp('(^|&)'+key+'=([^&]*)(&|$)');//匹配目标参数
     var result = url.split('?')[1].match(reg);//返回参数值

     let keywords = result ? decodeURIComponent(result[2]) :"";
     console.log(keywords)
     return keywords;
}
const getCourseList = (req:{url:string},res:any)=>{
    let keywords = getUrlParam(req.url,'keyWords');
    let filterList = 
    !keywords || keywords == ''
    ? courseList
    :courseList.filter((item:{type:string;name:string})=>{
        return (
            item.type.indexOf(keywords) !== -1 || 
            item.name.indexOf(keywords) !== -1
        );
    });
    res.send({
        success:true,
        datas:filterList,
        keywords:keywords
    })
};
//添加课程
const addCourse = (req:{body:CourseList},res:any) =>{
    let {type,name,totalPrice,amount,address} = req.body;
    courseList.unshift({
        id:Date.now().toString(),
        type, 
        name,
        totalPrice,
        amount,
        address
    })

    res.send({msg:'添加成功！',success:true})
    
}
//获取编辑课程信息
const getEditorCourse = (req:{url:string},res:any)=>{
    let id = getUrlParam(req.url,'id');
    let index = courseList.findIndex((item:CourseList)=>item.id ==id);

    if(index== -1) {
        res.send({msg:'课程不存在',success:false})
    }

    res.send({success:true,datas:courseList[index]})
}
//提交编辑
const editCourse = (req:{body:CourseList},res:any)=>{
    let {id}  = req.body;

    console.log(2222)
    let index = courseList.findIndex((item:CourseList)=>item.id ==id);

    if(index== -1) {    
        res.send({msg:'编辑失败！',success:false})
    }
    courseList[index] = {...req.body}

    res.send({msg:'编辑成功！',success:true})

}
//删除课程
//获取编辑课程信息
const deleteCourse = (req:{url:string},res:any)=>{
    let id = getUrlParam(req.url,'id');
    let index = courseList.findIndex((item:CourseList)=>item.id ==id);

    if(index== -1) {
        res.send({msg:'课程不存在',success:false})
    }
    //更新数据
    courseList.splice(index,1);

    res.send({success:true,msg:'删除成功！'})
}
export default {
    '/api/courseList':getCourseList,
    '/api/dictionary/type':{
        datas:[
            {label:'React',value:'React'},
            {label:'Vue',value:'Vue'},
            {label:'Node',value:'Node'},
            {label:'Umi',value:'Umi'},
        ]
    },
    'POST /api/course/add':addCourse,
    '/api/course/editorCourse':getEditorCourse,
    'POST /api/course/edit':editCourse,
    'DELETE /api/course/delete':deleteCourse
}
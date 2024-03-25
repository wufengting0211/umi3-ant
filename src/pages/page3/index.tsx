import React,{useState,useEffect} from 'react';
import { Table ,Input,Button,message} from 'antd';
import { getList ,deleteCourse} from '@/services/courseApi';
import {Data,Response} from '@/utils/type';
import {history,Link} from 'umi';
 
const {Search} = Input;

const index = () => {
      const [datas,setDatas] = useState<Data[]>([] as Data[]);

      const [keyWords,setKeyWords] = useState('');

      useEffect(()=>{
        getDatas({ keyWords });
      },[keyWords])


    const handleRemove = (id:string) => {
     deleteCourse({id}).then((res:Response)=>{
       console.log(res)
        if(res && res.success) {
          message.success(res.msg);
          getDatas({keyWords});
          return;
        }

        message.warning(res.msg ?res.msg :'删除异常')
     })
   }
    const columns = [
        {
          title: '课程类别',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: '课程名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '课程总价',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
            title: '课程数量',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
          },

          {
            title: '课程地址',
            dataIndex: 'address',
            key: 'address',
            render:(text:string) =>(
                <>
                <a target="black" href={text}>
                    查看课程
                </a>
                </>
            )
          },
          {
              title: '操作',
              // dataIndex: 'action',
              key: 'action',
              render:(record:{id:string})=>(
                  <>
                    <Link to={`/course/editor/${record.id}`}>编辑</Link>
                    &nbsp;<a>丨</a>&nbsp;
                    <a onClick={()=>handleRemove(record.id)}>删除</a>
                  </>
              )
          }
      ];

    

  
    const getDatas = (params:object)=>{
      getList(params).then((res:Response)=>{
        // console.log(res.datas)
        setDatas(res.datas as Data[])
      })
        // axios.get("api/courseList",{params}).then((res:AxiosResponse<Data[]>)=>{
        //     setDatas(res.data.datas);
        // }) 
    }

    const handleAdd  = ()=>{
       history.push('/course/add')
    }
    const handleSearch = (keyWords:string) =>{
        setKeyWords(keyWords);

        //搜索
        getDatas({keyWords});
    };
    
    return (
        <div>
          <Button type='primary' onClick={handleAdd}>添加课程</Button>
           <Search
            placeholder="请输入搜索的课程名称"
            onSearch={ handleSearch }
            style={{ width: 200 }}
            />
           <Table 
           columns={columns}
            dataSource = {datas}
            rowKey = {(datas:{id:string})=>datas.id}
            />
        </div>
    )
}

export default index;
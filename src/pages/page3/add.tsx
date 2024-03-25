import React,{useState,useEffect} from 'react'
import { Form, Input, Button, Select ,message} from 'antd';
import { getTypeList,addCourse ,getEditorCourse,editCourse} from '@/services/courseApi';
import { AddData,Response} from '@/utils/type'
import {history,useParams} from 'umi';
import initialState from '@/.umi/plugin-initial-state/models/initialState';
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

const add = () => {
    const { Option } = Select;
    const  [typeList,setTypeList] = useState<AddData[]>([] as AddData[]);
    const { id } = useParams();
    const [form] = Form.useForm();
    useEffect(()=>{
        getTypeDatas();
        id && init(id);

        console.log(form)
    },[])


    const getTypeDatas = ()=>{
        getTypeList().then((res:Response)=>{
            setTypeList(res.datas as AddData[])
        })
    }
    
    //获取编辑课程信息
    const init = (id:string)=>{
        getEditorCourse({id}).then((res:Response)=>{
            if(res && res.success && res.datas) {
                console.log(res.datas)
                form.setFieldsValue({...res.datas})
            }
        })
    }

    const onFinish = (values:object)=>{
        id ? editCourse({id,...values}).then((res:Response)=>{
            if(res && res.success) {
                message.success(res.msg);
                history.push('/course');

                return;
            }
            message.error(res? res.msg:'添加失败！')
        }):addCourse(values).then((res:Response)=>{
            if(res && res.success) {
                message.success(res.msg);
                history.push('course/list')
                return;
            }
          
            message.error(res? res.msg:'添加失败！')
        })
    }
    // const formData = { 
    //     address: "https://www.baidu.com",
    //     amount: "￥999",
    //     id: "1",
    //     name: "dvajs",
    //     totalPrice: "￥38",
    //     type: "React"
    // };
    return (
        <div>
             <Form
                {...layout}
               onFinish={onFinish}  form = {form}>
                <Form.Item
                    label="课程类别"
                    name="type"
                    rules={[{ required: true, message: 'Please input your type!' }]}
                >
                   <Select>
                    {typeList.map((item:{value:string;label:string},index)=>(
                        <Option value = {item.value} key={index}>
                            {item.label}
                        </Option>
                    ))}
                </Select>
                </Form.Item>

               
                <Form.Item
                    label="课程名称"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="课程总价"
                    name="totalPrice"
                    rules={[{ required: true, message: 'Please input your totalPrice!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="课程数量"
                    name="amount"
                    rules={[{ required: true, message: 'Please input your amount!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="课程地址"
                    name="address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    提交
                    </Button>
                </Form.Item>
                </Form>
        </div>
    )
}

export default add

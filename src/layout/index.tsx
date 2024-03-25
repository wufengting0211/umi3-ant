import React from 'react';
import { Layout,Menu} from 'antd';
import {Link ,useHistory} from 'umi';

const { Header,Content,Footer,Sider }  = Layout;

//根据获取到的所有地址，来决定选中状态

const getMenuSelectedKeys = (pathname:string):string[] => {
    if(pathname == '') return [];

    let paths:string[] = pathname.split('/');

    let selectedKeys:string[] = [];

    // paths.forEach((_,i)=>{
    //     selectedKeys.push(paths.slice(0,paths.length-1).join('/'));
    // })

    let pp = pathname.split('/')[1];
    selectedKeys.push('/'+pp);
    // console.log(selectedKeys)
    return selectedKeys;
}

const index = (props:{children:React.ReactNode}) => {

    const { location } = useHistory();

    // console.log(location);

    
    return (
        <Layout>
            <Sider breakpoint='lg' collapsedWidth ='0' style={{minHeight:'800px'}}>
                <div className='title'>米修在线</div>
                <Menu theme='dark' mode='inline'  selectedKeys={getMenuSelectedKeys(location.pathname)}>
                    <Menu.Item key='/about'>
                        <Link to='/about'>关于我们</Link>
                    </Menu.Item>
                    <Menu.Item key='/course'>
                        <Link to='/course'>page3</Link>
                    </Menu.Item>
                </Menu> 
            </Sider>
            <Layout className='site-layout'>
                <Header className='site-layout-background' style={{padding:40}}>
                 <Content className='' style={{margin:'50px 16px',padding:24}}>
                    {props.children}
                 </Content>   
                 <Footer style={{textAlign:'center'}}>umi3-demo</Footer>
                </Header>
            </Layout>
        </Layout>
    )
}

export default index

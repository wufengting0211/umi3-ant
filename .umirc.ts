import { defineConfig } from 'umi';

export default defineConfig({
  title:'米修在线',
  history:{
    type:'hash'
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    // { path: '/', component: '@/pages/index'   },
    {path:'/',component:'@/layout/index',routes:[
      {
        path:'/',
        redirect:'/course',
        title:'关于我们'
      },
      {
        path:'/course',
        // component:"./page3",
        routes: [
          {path:'/course',component:"./page3",title:'添加列表'},
          // {path:'/course/list',component:'./page3'},
          {path:'/course/add',component:'./page3/add',title:'添加课程'},
          {path:'/course/editor/:id',component:'./page3/add',title:'编辑课程'},
        ]
      },
      {
        path:'/about',
        component:"./About",   
      }
    ]}
  ],
});

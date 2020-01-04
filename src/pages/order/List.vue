<template>
    <div>
        <!-- 按钮 -->
        <!-- /按钮结束 -->
        <!-- 表格 -->
       <el-table :data="orders">
           <el-table-column prop="id" label="订单编号" ></el-table-column>
           <el-table-column prop="orderTime" label="下单时间" ></el-table-column>
           <el-table-column prop="total" label="总价" ></el-table-column>
           <el-table-column prop="status" label="状态" ></el-table-column>
            <el-table-column prop="customerId" label="顾客id" ></el-table-column>
           <el-table-column label="操作" >
               <template v-slot="slot">
                    <a href="">详情</a>
               </template>
           </el-table-column>
       </el-table>
        <!-- /表格结束 --> 
        <!-- 分页开始 -->
        <!-- <el-pagination layout="prev, pager, next" :total="50"> -->
        <!-- </el-pagination> -->
        <!-- /分页结束 -->
        <!-- 模态框 -->
         <!-- /模态框结束 -->       
    </div>
</template>

<script>
import request from '@/utils/request'
import querystring from 'querystring'
export default {
    //暴露接口,用于存放网页中需要调用的方法
    methods:{
        loadData(){
            let url = "http://localhost:6677/order/findAll"
            request.get(url).then((response)=>{
            //将查询结果设置到customers中，this指向外部函数的this
            this.orders = response.data;
        })
        },
        
        closeModalHandler(){
            this.visible=false;
        }
    },
    //用于存放要想网页中显示的数据
    data(){
        return{
            visible:false,
            orders:[],
            form:{
                type:"order"
            }
        }
    },
    created(){
        //this为当前vue实例对象
        //vue实例完毕
        this.loadData()
    }    
}
</script>